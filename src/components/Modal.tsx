import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
};

const sizeClass: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
  size = "md",
}: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close modal overlay"
            onClick={onClose}
            className="absolute inset-0 b backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={[
              "relative z-10 w-full overflow-hidden rounded-[26px]",
              "border border-emerald-400/25 bg-[#000504]",
              "shadow-[0_0_90px_rgba(34,211,238,0.22)]",
              sizeClass[size],
            ].join(" ")}
          >
            <div className="pointer-events-none absolute inset-0 bg-terminal-grid bg-[size:28px_28px] opacity-[0.04]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />

            <div className="relative z-10 flex items-start justify-between gap-4 border-b border-cyan-400/20 px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-green-300/80">
                  Prompt Protocol
                </p>

                <h2 className="mt-2 text-2xl font-black leading-tight text-slate-100">
                  {title}
                </h2>

                {subtitle ? (
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
                    {subtitle}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/5 text-cyan-100/70 transition hover:border-red-300/40 hover:bg-red-300/10 hover:text-red-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative z-10 max-h-[68vh] overflow-y-auto p-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}