import { getWhitelistCount } from "@/lib/api";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type WaitlistCounterProps = {
  refreshKey?: number;
};

export function WaitlistCounter({ refreshKey = 0 }: WaitlistCounterProps) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const value = useMotionValue(0);

  const rounded = useTransform(value, (latest) =>
    String(Math.floor(latest)).padStart(6, "0"),
  );

  useEffect(() => {
    let mounted = true;

    async function loadCount() {
      try {
        setLoading(true);

        const nextCount = await getWhitelistCount();

        if (!mounted) return;
        setCount(nextCount);
      } catch {
        if (!mounted) return;
        setCount(127);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    loadCount();

    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  useEffect(() => {
    const controls = animate(value, count, {
      duration: 1.4,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, value]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-300/15 bg-black/60 p-5 font-ibm shadow-[inset_0_0_24px_rgba(34,211,238,0.04)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />

      <div className="font-ibm text-[10px] uppercase tracking-[0.32em] text-white/90">
        WHITELIST_ENTRIES_INDEXED
      </div>

      <motion.div className="mt-4 font-kdam text-4xl font-bold leading-none tracking-[-0.06em] text-emerald-100 terminal-text-shadow sm:text-6xl">
        {loading ? "000000" : rounded}
      </motion.div>

      <div className="mt-3 font-ibm text-xs uppercase tracking-[0.25em] text-white/90">
        whitelist entries indexed
      </div>
    </div>
  );
}