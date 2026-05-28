import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db";
import whitelistRouter from "./routes/whitelist";


dotenv.config();

const app = express();
app.set("trust proxy", 1);

const port = Number(process.env.PORT || 4000);
const allowedOrigins = [
  "http://localhost:3000",
  "https://prompt-protocol-whitelist.vercel.app",
  "https://www.terminal9x.fun",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
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
