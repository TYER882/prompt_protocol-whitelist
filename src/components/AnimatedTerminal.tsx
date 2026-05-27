import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTypewriterLines } from "@/hooks/useTypewriterLines";

export type AnimatedTerminalProps = {
  title?: string;
  lines: string[];
  startDelay?: number;
  charDelay?: number;
  lineDelay?: number;
  heightClassName?: string;
  loop?: boolean;
  loopDelay?: number;
};

const tagClasses: Record<string, string> = {
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
  SYNC: "text-[#93C5FD]"
};

export function AnimatedTerminal({
  title = "/protocol/activity.log",
  lines,
  startDelay = 180,
  charDelay = 24,
  lineDelay = 360,
  heightClassName = "max-h-[260px]",
  loop = false,
  loopDelay = 1800
}: AnimatedTerminalProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const stableLines = useMemo(() => lines, [lines]);
  const { displayedLines, activeLineIndex } = useTypewriterLines({
    lines: stableLines,
    startDelay,
    charDelay,
    lineDelay,
    loop,
    loopDelay
  });

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, [displayedLines]);

  return (
    <section className="terminal-active overflow-hidden rounded-lg border border-cyan-300/20 bg-terminal-panel shadow-glow">
      <div className="flex items-center gap-2 border-b border-cyan-300/12 bg-black/25 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow-300/80" />
        <span className="size-2.5 rounded-full bg-lime-300/80" />
        <span className="ml-2 truncate text-xs text-terminal-muted">{title}</span>
      </div>
      <div ref={scrollRef} className={cn("terminal-scroll scanline terminal-flicker overflow-y-auto bg-black/35 p-4", heightClassName)}>
        <pre className="min-h-28 whitespace-pre-wrap break-words text-xs leading-6 text-cyan-100 sm:text-sm">
          {displayedLines.map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {renderLine(line)}
              {index === activeLineIndex ? <span className="terminal-cursor ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-200" /> : null}
            </span>
          ))}
          {displayedLines.length === 0 ? <span className="terminal-cursor inline-block h-4 w-2 translate-y-0.5 bg-cyan-200" /> : null}
        </pre>
      </div>
    </section>
  );
}

function renderLine(line: string) {
  const match = line.match(/^(\S+)\s+(\[[A-Z]+\])(\s+.*)?$/);
  if (!match) return line;

  const tag = match[2].replace(/[[\]]/g, "");
  return (
    <>
      <span className="text-cyan-100">{match[1]}</span>
      <span> </span>
      <span className={cn("font-semibold", tagClasses[tag] || "text-terminal-muted")}>{match[2]}</span>
      <span className="text-terminal-muted">{match[3] || ""}</span>
    </>
  );
}
