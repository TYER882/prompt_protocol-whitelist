"use client";

import { AnimatedTerminal } from "./AnimatedTerminal";
import { GlowPanel } from "./GlowPanel";

const logs = [
  "SYS [BOOT]      --initializing prompt protocol",
  "SYS [NETWORK]   --base sepolia connected",
  "SYS [SUPPLY]    --333 terminal-native prompts indexed",
  "SYS [METADATA]  --ipfs metadata locked",
  "SYS [REVEAL]    --per-token reveal active",
  "SYS [WALLET]    --awaiting wallet signal"
];

export function TerminalLogPanel() {
  return (
    <GlowPanel title="Protocol Boot" kicker="runtime">
      <div className="p-4">
        <AnimatedTerminal title="/protocol/boot.log" lines={logs} startDelay={160} charDelay={22} lineDelay={320} heightClassName="max-h-[260px]" />
      </div>
    </GlowPanel>
  );
}
