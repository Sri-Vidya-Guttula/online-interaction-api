#  Node.js + TypeScript + MongoDB

## 🚀 Objective

Design a simple Node.js REST API server using TypeScript and MongoDB to manage users, posts, and comments, and implement error handling and best practices.

---

## 🛠️ Tech Stack

- **Node.js (TypeScript)**
- **Express.js**
- **MongoDB Atlas**

---

## 📁 Project Structure

/src
├── controllers/
├── models/
├── routes/
├── services/
└── index.ts
tsconfig.json
package.json


---

## 🔧 Local Development Setup

### 1. Clone the Repository

bash
git clone https://github.com/Sri-Vidya-Guttula/online-interaction-api.git
cd online-interaction-api

### 2. Install Dependencies
npm install

## 3. Setup TypeScript 
npx tsc --init

Ensure your tsconfig.json looks like this:

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}

4. Setup Environment Variables
Create a .env file in the root directory:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/swift?retryWrites=true&w=majority
PORT=3000

5. Build and Run Locally

npm run build
npm start

🌐 API Endpoints

| Method | Route            | Description                                  |
| ------ | ---------------- | -------------------------------------------- |
| GET    | `/load`          | Fetches and stores data from JSONPlaceholder |
| DELETE | `/users`         | Deletes all users                            |
| DELETE | `/users/:userId` | Deletes a specific user                      |
| GET    | `/users/:userId` | Fetch user with posts and comments           |
| PUT    | `/users`         | Adds a new user                              |

🧪 Sample Data Format

{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "body": "Post body...",
      "comments": [
        {
          "id": 1,
          "name": "Commenter",
          "email": "comment@example.com",
          "body": "Comment content"
        }
      ]
    }
  ]
}

🛡️ Error Handling
400 Bad Request: Invalid user or post data

404 Not Found: User not found

500 Internal Server Error: MongoDB or server issues

🚀 Deployment on Railway (No Credit Card Required)
Visit https://railway.app and sign in using GitHub.

Click New Project → Deploy from GitHub repo.

4.Connect your repo and import the project.

Set environment variables in the Railway dashboard:

MONGODB_URI=<Your Atlas URI>
PORT=3000

5.Railway auto-detects the build command. Make sure your package.json includes:

"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}

6.After successful deploy, Railway provides a live link like:

https://your-app-name.up.railway.app



