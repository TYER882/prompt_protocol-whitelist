import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { WhitelistEntry } from "../models/WhitelistEntry";

const router = Router();

const emailSchema = z.string().email().transform(v => v.trim().toLowerCase());

const walletSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/)
  .transform(v => v.trim().toLowerCase());

const whitelistSchema = z.object({
  email: emailSchema,
  walletAddress: walletSchema,
  followedTwitter: z.literal(true),
});

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
});

function maskWallet(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

router.post("/", submitLimiter, async (req: Request, res: Response) => {
  const parsed = whitelistSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.errors[0]?.message,
    });
  }

  const { email, walletAddress, followedTwitter } = parsed.data;

  try {
    const existingEmail = await WhitelistEntry.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, message: "Email already used" });
    }

    const existingWallet = await WhitelistEntry.findOne({ walletAddress });
    if (existingWallet) {
      return res.status(409).json({ success: false, message: "Wallet already used" });
    }

    const entry = await WhitelistEntry.create({
      email,
      walletAddress,
      followedTwitter,
    });

    return res.status(201).json({
      success: true,
      message: "Whitelist entry accepted",
      entry,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get("/count", async (_req: Request, res: Response) => {
  const count = await WhitelistEntry.countDocuments();
  return res.json({ success: true, count });
});

router.get("/recent", async (_req: Request, res: Response) => {
  const entries = await WhitelistEntry.find({}, { email: 0 })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return res.json({
    success: true,
    entries: entries.map((e) => ({
      walletAddress: maskWallet(e.walletAddress),
      followedTwitter: e.followedTwitter,
      createdAt: e.createdAt,
    })),
  });
});

export default router;