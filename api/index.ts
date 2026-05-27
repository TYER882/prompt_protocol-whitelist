import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import { connectDB } from "../server/lib/db";
import whitelistRouter from "../server/routes/whitelist";

const app = express();

app.use(cors());
app.use(express.json());

let dbConnected = false;

app.use(async (_req, _res, next) => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  next();
});

app.get("/api/health", (_req, res) => {
  return res.json({ ok: true });
});

app.use("/api/whitelist", whitelistRouter);

export default serverless(app);