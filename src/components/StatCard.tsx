import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, description, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#020b16]/90 p-4 shadow-[0_0_28px_rgba(34,211,238,0.08)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-green-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-green-300 shadow-[0_0_12px_rgba(57,255,136,0.9)]" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">
            {label}
          </span>

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-700/70 bg-protocol-muted text-cyan-200/70">
            {icon ?? <span className="font-mono text-xs">/&gt;</span>}
          </div>
        </div>

        <div className="break-words font-mono text-2xl font-black leading-tight tracking-tight text-slate-100 drop-shadow-[0_0_16px_rgba(34,211,238,0.22)]">
          {value}
        </div>

        <div className="mt-2 font-mono text-xs leading-relaxed text-slate-400">
          {description}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
    </motion.div>
  );
}