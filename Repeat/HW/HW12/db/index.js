import "dotenv/config";
import { MongoClient } from "mongodb";

let client;
let dbConnection;

export async function connectToDatabase() {
  const url = process.env.MONGO_URL;

  if (!url) {
    throw new Error("'MONGO_URL' is not defined in .env");
  }

  client = new MongoClient(url);

  await client.connect();

  dbConnection = client.db();

  console.log(
    `Connected successfully to MongoDB (db: ${dbConnection.databaseName})`,
  );
}

export function getDb() {
  if (!dbConnection) {
    throw new Error("Database not connected");
  }

  return dbConnection;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
}
