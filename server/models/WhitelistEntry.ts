import mongoose, { Schema, model } from "mongoose";

export type WhitelistEntryDocument = {
  email: string;
  walletAddress: string;
  followedTwitter: boolean;
  source: string;
  createdAt: Date;
  updatedAt: Date;
};

const WhitelistEntrySchema = new Schema<WhitelistEntryDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    followedTwitter: {
      type: Boolean,
      required: true,
    },
    source: {
      type: String,
      default: "prompt-protocol-whitelist",
    },
  },
  { timestamps: true }
);

export const WhitelistEntry =
  mongoose.models.WhitelistEntry ||
  model<WhitelistEntryDocument>(
    "WhitelistEntry",
    WhitelistEntrySchema
  );