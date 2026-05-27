import { cn } from "@/lib/utils";

export function GlowPanel({
  children,
  className,
  title,
  kicker
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  kicker?: string;
}) {
  return (
    <section
      className={cn(
        "scanline rounded-lg border border-emerald-700/75 bg-terminal-bg shadow-glow backdrop-blur-xl hover:backdrop-blur-md  transition duration-300",
        className
      )}
    >
      {(title || kicker) && (
        <div className="flex items-center justify-between gap-4 border-b border-emerald-300/75 px-4 py-3">
          {title ? <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-terminal-text">{title}</h2> : <span />}
          {kicker ? <span className="text-xs uppercase tracking-[0.18em] text-terminal-lime">{kicker}</span> : null}
        </div>
      )}
      {children}
    </section>
  );
}
