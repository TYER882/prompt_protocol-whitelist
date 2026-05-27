export type WhitelistPayload = {
  email: string;
  walletAddress: string;
  followedTwitter: boolean;
};

export type WhitelistResponse = {
  success: boolean;
  message: string;
  entry?: {
    email: string;
    walletAddress: string;
    createdAt: string;
  };
};

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "";

async function parseResponse<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T & { message?: string };
  if (!response.ok) {
    throw new Error(data.message || "Protocol request failed.");
  }
  return data;
}

export async function submitWhitelistEntry(data: WhitelistPayload) {
  const response = await fetch(`${API_URL}/api/whitelist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseResponse<WhitelistResponse>(response);
}

export async function getWhitelistCount() {
  const response = await fetch(`${API_URL}/api/whitelist/count`);
  const data = await parseResponse<{ success: boolean; count: number }>(response);
  return data.count;
}
