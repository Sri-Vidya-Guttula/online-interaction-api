import express, { Request, Response } from 'express';
import axios from 'axios';
import { connectToDb, getDb } from './db';
import { User, Post, Comment } from './models/User';


// Simple in-memory cache with TTL (Time To Live)
interface CacheEntry {
  data: any;
  expiry: number;
}

const cache: Map<number, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

function setCache(key: number, data: any) {
  cache.set(key, { data, expiry: Date.now() + CACHE_TTL });
}

function getCache(key: number): any | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function invalidateCache(key: number) {
  cache.delete(key);
}


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

connectToDb();

app.get('/load', async (_req: Request, res: Response) => {
  try {
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/comments'),
    ]);

    const users: User[] = usersRes.data.map((user: any) => ({ ...user, posts: [] }));
    const posts: Post[] = postsRes.data.map((post: any) => ({ ...post, comments: [] }));
    const comments: Comment[] = commentsRes.data;

    // Attach comments to posts
    posts.forEach(post => {
      post.comments = comments.filter(comment => comment.postId === post.id);
    });

    // Attach posts to users
    users.forEach(user => {
      user.posts = posts.filter(post => post.userId === user.id);
    });

    const db = getDb();
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(users);

    res.status(200).send({ message: 'Data loaded successfully' });

  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
});

app.delete('/users', async (_req: Request, res: Response) => {
  try {
    const db = getDb();
    await db.collection('users').deleteMany({});
    res.status(200).json({ message: 'All users deleted' });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ error: 'Failed to delete users' });
  }
});

app.delete('/users/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const db = getDb();
    const result = await db.collection('users').deleteOne({ id: userId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.get('/users/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const db = getDb();
    const user = await db.collection('users').findOne({ id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/users', async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const db = getDb();
    const existing = await db.collection('users').findOne({ id: user.id });
    if (existing) {
      res.status(400).json({ error: 'User already exists.' });
    } else {
      await db.collection('users').insertOne(user);
      res.status(201).json(user);
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
