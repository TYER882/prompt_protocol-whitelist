import { Cpu, ExternalLink } from "lucide-react";
import  Logo  from "./Logo";

const links = [
  { label: "Home", href: "#home" },

  { label: "Utility", href: "#utility" },
  { label: "X/Twitter", href: "https://x.com/terminal9x", external: true },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-300/10 bg-terminal-bg backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 ">
          <Logo />
          <span>
            <span className="block text-sm font-bold uppercase tracking-[0.28em]">Terminal<span className="text-emerald-400">9X</span></span>
          </span>
        </a>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="group flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100/70 transition hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              {link.label}
              {link.external ? <ExternalLink className="h-3.5 w-3.5 opacity-60" /> : null}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
