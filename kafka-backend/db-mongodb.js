import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';  // to allow access to environment variables (.env file)

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from a .env file if needed
const MONGODB_URI = process.env.MONGODB_URI;
           
// const DB_NAME = 'scott';
// const DB_NAME = 'clase';
// const DB_NAME = 'sample_mflix';
const DB_NAME = 'Clase'; ////////// OJO ESTO ES EN CASA

let client;
let db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);

    await client.connect();
    db = client.db(DB_NAME);
    console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);
  }

  return db;
}

export default connectDB;