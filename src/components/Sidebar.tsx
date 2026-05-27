import { Activity, Database, KeyRound, RadioTower, ShieldCheck } from "lucide-react";
const items = [
  { icon: Activity, label: "WHITELIST_OPEN", value: "TRUE" },
  { icon: RadioTower, label: "BASE_MINT_LAYER", value: "READY" },
  { icon: Database, label: "IPFS_METADATA", value: "SYNC" },
  { icon: KeyRound, label: "ERC721_SUPPLY", value: "333" },
  { icon: ShieldCheck, label: "FOLLOW_TASK", value: "REQUIRED" },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border border-emerald-700/75 bg-terminal-bg p-4 shadow-neon backdrop-blur-xl">
        <div className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-200/60">Protocol Index</div>
        <div className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-xl border border-cyan-300/10 bg-black/20 p-3">
                <div className="flex items-center gap-2 text-[11px] text-cyan-100/65">
                  <Icon className="h-4 w-4 text-protocol-green" />
                  {item.label}
                </div>
                <div className="mt-2 text-sm font-bold text-cyan-50 terminal-text-shadow">{item.value}</div>
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
