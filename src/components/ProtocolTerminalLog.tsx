import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useTypewriterLines } from "@/hooks/useTypewriterLines";
import { cn } from "@/lib/utils";

export type ProtocolTerminalLogProps = {
  title?: string;
  lines?: string[];
  startDelay?: number;
  charDelay?: number;
  lineDelay?: number;
  heightClassName?: string;
  loop?: boolean;
  loopDelay?: number;
  submittedWallet?: string;
};

const DEFAULT_LINES = [
  "SYS [BOOT]      --prompt protocol whitelist initialized",
  "SYS [NETWORK]   --base mint layer prepared",
  "SYS [SUPPLY]    --333 prompt cards indexed",
  "SYS [TASK]      --follow @terminal9x required",
  "SYS [STATUS]    --whitelist open",
  "SYS [WAITLIST]  --entries syncing",
];

const TAG_CLASSES: Record<string, string> = {
  BOOT: "text-[#7FA6B8]",
  NETWORK: "text-[#93C5FD]",
  SUPPLY: "text-[#A3E635]",
  METADATA: "text-[#22D3EE]",
  REVEAL: "text-[#22D3EE]",
  WALLET: "text-[#FACC15]",
  MINTED: "text-[#A3E635]",
  REVEALED: "text-[#22D3EE]",
  ERROR: "text-[#F87171]",
  STATUS: "text-[#E5F7FF]",
  WAITLIST: "text-[#93C5FD]",
  TASK: "text-[#22D3EE]",
  SUBMIT: "text-[#A3E635]",
  SUCCESS: "text-[#A3E635]",
  CURSOR: "text-[#39ff88]",
};

function maskWallet(wallet?: string) {
  if (!wallet) return "";
  if (wallet.includes("...")) return wallet;
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

function renderLine(line: string) {
  const match = line.match(/^(\S+)\s+(\[[A-Z]+\])(\s+--.*)?$/);

  if (!match) {
    return <span className="text-cyan-100/70">{line}</span>;
  }

  const prefix = match[1];
  const rawTag = match[2];
  const message = match[3] ?? "";
  const tag = rawTag.replace(/[\[\]]/g, "");

  return (
    <>
      <span className="text-cyan-100/80">{prefix}</span>
      <span> </span>
      <span className={cn("font-bold", TAG_CLASSES[tag] ?? "text-cyan-200")}>
        {rawTag}
      </span>
      <span className="text-cyan-100/55">{message}</span>
    </>
  );
}

export function ProtocolTerminalLog({
  submittedWallet,
  title = "/protocol/whitelist.log",
  lines = DEFAULT_LINES,
  startDelay = 180,
  charDelay = 18,
  lineDelay = 260,
  heightClassName = "max-h-[260px]",
  loop = false,
  loopDelay = 1800,
}: ProtocolTerminalLogProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const terminalLines = useMemo(() => {
    const nextLines = [...lines];

    if (submittedWallet) {
      nextLines.push(
        `USR [SUBMIT]    --wallet ${maskWallet(submittedWallet)} indexed`,
        "SYS [SUCCESS]   --whitelist entry accepted",
      );
    }

    return nextLines;
  }, [lines, submittedWallet]);

  const { displayedLines, activeLineIndex } = useTypewriterLines({
    lines: terminalLines,
    startDelay,
    charDelay,
    lineDelay,
    loop,
    loopDelay,
  });

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, [displayedLines]);

  return (
    <section className="overflow-hidden rounded-[28px]- shadow-neon">
      {/* <div className="border-b border-emerald-400/20 px-6 py-4">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
          Live Protocol Log
        </p>
      </div> */}

      <div className="p-6">
        <div className="overflow-hidden rounded-2xl border border-emerald-300/15 bg-black/45">
          <div className="flex items-center gap-2 border-b border-emerald-300/10 bg-emerald-300/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-300/80" />

            <span className="ml-3 truncate font-mono text-xs text-cyan-100/55">
              {title}
            </span>
          </div>

          <div
            ref={scrollRef}
            className={cn(
              "min-h-[250px] overflow-y-auto p-4 font-mono text-xs sm:text-sm",
              heightClassName,
            )}
          >
            <div className="space-y-3">
              {displayedLines.map((line, index) => (
                <motion.div
                  key={`${line}-${index}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className={cn(
                    "leading-relaxed",
                    index === activeLineIndex ? "text-cyan-100" : "text-cyan-100/70",
                  )}
                >
                  {renderLine(line)}
                </motion.div>
              ))}

              <div className="leading-relaxed">
                <span className="text-cyan-100/80">SYS</span>{" "}
                <span className="font-bold text-green-300">[CURSOR]</span>
                <span className="text-cyan-100/55"> --awaiting input</span>
                <span className="animate-blink text-green-300">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}