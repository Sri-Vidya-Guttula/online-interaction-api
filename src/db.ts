import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(" MONGODB_URI environment variable is not defined. Please set it in Railway.");
}

const client = new MongoClient(uri);

export const connectToDb = async () => {
  try {
    await client.connect();
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" Error connecting to MongoDB:", err);
  }
};

export const getDb = () => client.db('node_assignment');
