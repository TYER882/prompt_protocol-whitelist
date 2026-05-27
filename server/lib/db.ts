import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export async function connectDB() {
  if (cachedConnection) return cachedConnection;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to server/.env or environment variables.");
  }

  mongoose.set("strictQuery", true);
  cachedConnection = await mongoose.connect(uri, {
    dbName: process.env.DB_NAME || "prompt",
    serverSelectionTimeoutMS: 10000,
  });

  return cachedConnection;
}
