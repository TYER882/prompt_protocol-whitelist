"use client";

import { useEffect, useMemo, useState } from "react";

export function useTypewriterLines({
  lines,
  startDelay = 180,
  charDelay = 24,
  lineDelay = 360,
  loop = false,
  loopDelay = 1800
}: {
  lines: string[];
  startDelay?: number;
  charDelay?: number;
  lineDelay?: number;
  loop?: boolean;
  loopDelay?: number;
}) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const linesKey = useMemo(() => lines.join("\n"), [lines]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    let visibleLines: string[] = [];

    setDisplayedLines([]);
    setActiveLineIndex(lines.length ? 0 : -1);

    if (prefersReducedMotion) {
      setDisplayedLines(lines);
      setActiveLineIndex(-1);
      return undefined;
    }

    function typeNextCharacter() {
      if (cancelled) return;

      if (lineIndex >= lines.length) {
        setActiveLineIndex(-1);
        if (loop && lines.length) {
          timeoutId = setTimeout(() => {
            if (cancelled) return;
            lineIndex = 0;
            charIndex = 0;
            visibleLines = [];
            setDisplayedLines([]);
            setActiveLineIndex(0);
            timeoutId = setTimeout(typeNextCharacter, startDelay);
          }, loopDelay);
        }
        return;
      }

      const line = lines[lineIndex] ?? "";
      if (charIndex <= line.length) {
        visibleLines[lineIndex] = line.slice(0, charIndex);
        setDisplayedLines(visibleLines.slice(0, lineIndex + 1));
        setActiveLineIndex(lineIndex);
        charIndex += 1;
        timeoutId = setTimeout(typeNextCharacter, charDelay);
        return;
      }

      lineIndex += 1;
      charIndex = 0;
      timeoutId = setTimeout(typeNextCharacter, lineDelay);
    }

    timeoutId = setTimeout(typeNextCharacter, startDelay);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [charDelay, lineDelay, lines, linesKey, loop, loopDelay, prefersReducedMotion, startDelay]);

  return {
    displayedLines,
    activeLineIndex,
    isComplete: activeLineIndex === -1 && displayedLines.length === lines.length,
    prefersReducedMotion
  };
}
