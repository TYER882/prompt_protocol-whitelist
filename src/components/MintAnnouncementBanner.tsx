import { ExternalLink } from "lucide-react";

const OPENSEA_URL = "https://opensea.io/collection/terminal9x/overview";

export function MintAnnouncementBanner() {
  return (
    <a
      href={OPENSEA_URL}
      target="_blank"
      rel="noreferrer"
      className="block border-b border-cyan-400/20 bg-green-300/10 px-4 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-green-300 transition hover:bg-green-300/15"
    >
      PUBLIC_MINT_SCHEDULED · 0.0021 ETH · May 31 19:00 GMT+7 · OpenSea{" "}
      <ExternalLink className="ml-1 inline h-3 w-3" />
    </a>
  );
}