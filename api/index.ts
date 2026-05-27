import express, { Request, Response } from "express";
import cors from "cors";

import { connectDB } from "../server/lib/db";
import whitelistRouter from "../server/routes/whitelist";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ lazy connect (SAFE for Vercel)
let dbConnected = false;

app.use(async (_req, _res, next) => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  next();
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: "online",
  });
});

app.use("/api/whitelist", whitelistRouter);

export default app;