import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function padTokenId(id: number | string) {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return "000";
  return Math.max(0, numeric).toString().padStart(3, "0");
}

export function clampTokenId(id: number) {
  return Math.min(332, Math.max(0, id));
}

export function shortAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function shortHash(hash?: string) {
  if (!hash) return "";
  return `${hash.slice(0, 6)}...${hash.slice(-3)}`;
}
