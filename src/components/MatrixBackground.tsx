export function MatrixBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-protocol-bg">
      <div className="absolute inset-0 bg-terminal-grid bg-[size:44px_44px] opacity-60" />
      <div className="noise-mask absolute inset-0 opacity-20" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cyan-400/10 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-cyan-300/5 to-transparent animate-scan" />
    </div>
  );
}
