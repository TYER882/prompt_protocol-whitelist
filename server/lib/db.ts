import mongoose from "mongoose";

const uri = process.env .MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalAny = global as unknown as {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalAny.mongoose ?? {
  conn: null,
  promise: null,
};

globalAny.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", true);

    cached.promise = mongoose.connect(uri, {
      dbName: process.env.DB_NAME || "prompt",
      serverSelectionTimeoutMS: 10000,
    } as any);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}