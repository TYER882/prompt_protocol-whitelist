import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { WhitelistEntry } from "../models/WhitelistEntry";

const router = Router();

const emailSchema = z.string().email("Invalid email address.").transform((value) => value.trim().toLowerCase());
const walletSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address.")
  .transform((value) => value.trim().toLowerCase());

const whitelistSchema = z.object({
  email: emailSchema,
  walletAddress: walletSchema,
  followedTwitter: z.literal(true, {
    errorMap: () => ({ message: "Please complete the X follow task." }),
  }),
});

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many whitelist attempts. Please try again later." },
});

function maskWallet(walletAddress: string) {
  return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
}

router.post("/", submitLimiter, async (req, res) => {
  const parsed = whitelistSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ success: false, message: parsed.error.errors[0]?.message || "Invalid request." });
  }

  const { email, walletAddress, followedTwitter } = parsed.data;

  try {
    const existingEmail = await WhitelistEntry.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, message: "This email is already registered." });
    }

    const existingWallet = await WhitelistEntry.findOne({ walletAddress });
    if (existingWallet) {
      return res.status(409).json({ success: false, message: "This wallet is already registered." });
    }

    const entry = await WhitelistEntry.create({ email, walletAddress, followedTwitter });

    return res.status(201).json({
      success: true,
      message: "Whitelist entry accepted",
      entry: {
        email: entry.email,
        walletAddress: entry.walletAddress,
        createdAt: entry.createdAt,
      },
    });
  } catch (error: any) {
    if (error?.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];
      const message = duplicateField === "walletAddress" ? "This wallet is already registered." : "This email is already registered.";
      return res.status(409).json({ success: false, message });
    }

    console.error("Whitelist route error:", error);
    return res.status(500).json({ success: false, message: "Whitelist server error." });
  }
});

router.get("/count", async (_req, res) => {
  const count = await WhitelistEntry.countDocuments();
  return res.json({ success: true, count });
});

router.get("/recent", async (_req, res) => {
  const entries = await WhitelistEntry.find({}, { email: 0 })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return res.json({
    success: true,
    entries: entries.map((entry) => ({
      walletAddress: maskWallet(entry.walletAddress),
      followedTwitter: entry.followedTwitter,
      source: entry.source,
      createdAt: entry.createdAt,
    })),
  });
});

export default router;
