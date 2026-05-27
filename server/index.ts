import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db";
import whitelistRouter from "./routes/whitelist";

dotenv.config({ path: "server/.env" });
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: clientOrigin,
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "64kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "online" });
});

app.use("/api/whitelist", whitelistRouter);

async function bootstrap() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Prompt Protocol API online at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start Prompt Protocol API:", error);
    process.exit(1);
  }
}

bootstrap();
