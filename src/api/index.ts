import express from "express";
import cors from "cors";

import { connectDB } from "../../server/lib/db";
import whitelistRouter from "../../server/routes/whitelist";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    status: "online",
  });
});

app.use("/api/whitelist", whitelistRouter);

export default app;