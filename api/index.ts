import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import serverless from "serverless-http";

import { connectDB } from "../server/lib/db";
import whitelistRouter from "../server/routes/whitelist";

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 lazy DB connection (SAFE FOR SERVERLESS)
let dbConnected = false;

app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error("DB CONNECTION ERROR:", err);
    }
  }
  next();
});

// health check
app.get("/api/health", (_req: Request, res: Response) => {
  return res.json({
    success: true,
    status: "online",
  });
});

// routes
app.use("/api/whitelist", whitelistRouter);

// ❗ IMPORTANT: convert express → serverless
export default serverless(app);