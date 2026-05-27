import { HeroTerminal } from "./components/HeroTerminal";
import { MatrixBackground } from "./components/MatrixBackground";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

function UtilityCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-terminal-bg p-5 transition hover:border-green-300/40 hover:bg-green-300/5">
      <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-green-300 shadow-[0_0_12px_rgba(57,255,136,0.9)]" />

      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/60">
        Utility
      </p>

      <h3 className="mt-4 text-xl font-black text-slate-100">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-protocol-bg text-slate-100">
      <MatrixBackground />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto grid w-full max-w-[1800px] gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar />

          <div className="min-w-0 space-y-10">
            <HeroTerminal />

            <section id="utility" className="space-y-5 pb-10 pt-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-green-300">
                  Utility Preview
                </p>

                <h2 className="mt-3 text-3xl font-black text-slate-100">
                  Prompt-native access layers
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <UtilityCard
                  title="Prompt Vault"
                  description="Planned holder-only prompt library."
                />

                <UtilityCard
                  title="Prompt Remix"
                  description="Planned prompt card remix tools."
                />

                <UtilityCard
                  title="Syntax Identity"
                  description="Public prompt identity pages."
                />

                <UtilityCard
                  title="Holder Gallery"
                  description="View owned Prompt Protocol collections cards."
                />

                <UtilityCard
                  title="Future Allowlist"
                  description="Early access to future drops."
                />

                <UtilityCard
                  title="Theme Voting"
                  description="Vote on future prompt packs."
                />
              </div>

              {/* <div className="rounded-[28px] border border-yellow-300/20 bg-protocol-muted p-6">
                <p className="text-sm leading-relaxed text-yellow-100/80">
                  Joining the whitelist does not guarantee mint allocation,
                  financial returns, or rewards. Prompt Protocol is an
                  experimental AI/Web3 collectible project focused on creative
                  tools, prompt identity, and community access.
                </p>
              </div> */}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}