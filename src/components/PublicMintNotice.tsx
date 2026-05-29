import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarClock,
  ExternalLink,
  Gem,
  Hourglass,
  Store,
  Timer,
} from "lucide-react";

const OPENSEA_URL = "https://opensea.io/collection/terminal9x/overview";

const MINT_START = new Date("2026-05-31T19:00:00+07:00").getTime();
const MINT_END = new Date("2026-06-03T22:03:00+07:00").getTime();

type CountdownState = {
  status: "scheduled" | "live" | "ended";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(): CountdownState {
  const now = Date.now();

  if (now >= MINT_END) {
    return {
      status: "ended",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  if (now >= MINT_START) {
    return {
      status: "live",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const diff = MINT_START - now;

  return {
    status: "scheduled",
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-protocol-muted p-4">
      <div className="absolute right-3 top-3 text-emerald-200/35">
        {icon}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
        {label}
      </p>

      <p className="mt-4 max-w-[14rem] text-lg font-black leading-tight text-slate-100">
        {value}
      </p>
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/5 px-4 py-3 text-center">
      <p className="font-mono text-2xl font-black text-emerald-300">
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-100/50">
        {label}
      </p>
    </div>
  );
}

export function PublicMintNotice() {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    getCountdown(),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const statusLabel = useMemo(() => {
    if (countdown.status === "live") return "PUBLIC_MINT_LIVE";
    if (countdown.status === "ended") return "PUBLIC_MINT_ENDED";
    return "SCHEDULED";
  }, [countdown.status]);

  return (
    <section
      id="mint"
      className="relative overflow-hidden rounded-[28px] border border-emerald-400/25 bg-terminal-bg shadow-neon"
    >
      <div className="pointer-events-none absolute inset-0 bg-terminal-grid bg-[size:28px_28px] opacity-[0.035]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
      <div className="pointer-events-none absolute -right-28 top-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-28 left-20 h-72 w-72 rounded-full bg-lime-300/10 blur-[90px]" />

      <div className="relative z-10 grid gap-6 p-5 sm:p-8 xl:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-lime-300/25 bg-lime-300/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-lime-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
              {statusLabel}
            </div>

            <a
              href={OPENSEA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/5 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-emerald-100/70 transition hover:border-emerald-300/50 hover:bg-emerald-300/10 hover:text-emerald-100"
            >
              OpenSea
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
            PUBLIC_MINT_SCHEDULE
          </p>

          <h2 className="mt-4 max-w-3xl font-kdam text-3xl leading-tight text-slate-100 sm:text-4xl">
            Terminal<span className="text-emerald-400">9x</span> public mint is
            scheduled.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Prompt Protocol: Edition Identity opens public mint on OpenSea.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <InfoCard
              label="Stage"
              value="Public"
              icon={<Gem className="h-4 w-4" />}
            />

            <InfoCard
              label="Price"
              value="0.0021 ETH"
              icon={<Store className="h-4 w-4" />}
            />

            <InfoCard
              label="Starts"
              value="May 31, 7:00 PM GMT+7"
              icon={<CalendarClock className="h-4 w-4" />}
            />

            <InfoCard
              label="Ends"
              value="June 3, 10:03 PM GMT+7"
              icon={<Hourglass className="h-4 w-4" />}
            />

            <InfoCard
              label="Platform"
              value="OpenSea"
              icon={<ExternalLink className="h-4 w-4" />}
            />
          </div>

          {countdown.status === "scheduled" ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <CountdownBox label="Days" value={countdown.days} />
              <CountdownBox label="Hours" value={countdown.hours} />
              <CountdownBox label="Minutes" value={countdown.minutes} />
              <CountdownBox label="Seconds" value={countdown.seconds} />
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-4">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                {countdown.status === "live"
                  ? "PUBLIC_MINT_LIVE"
                  : "PUBLIC_MINT_ENDED"}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={OPENSEA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex animate-pulse items-center justify-center gap-2 rounded-2xl border border-emerald-300/45 bg-emerald-300/10 px-6 py-4 font-mono text-xs font-black uppercase tracking-[0.22em] text-slate-100 transition hover:border-emerald-300/70 hover:bg-emerald-300/15"
            >
              <Bell className="h-4 w-4" />
              Set Reminder / Mint on OpenSea
            </a>

            <a
              href={OPENSEA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/25 bg-protocol-muted px-6 py-4 font-mono text-xs font-black uppercase tracking-[0.22em] text-slate-100 transition hover:border-emerald-300/60 hover:bg-emerald-300/10"
            >
              View Collection
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Mint is hosted on OpenSea. Always verify the collection URL before
            minting.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-300/20 bg-black/45">
          <div className="flex items-center gap-2 border-b border-emerald-300/10 bg-emerald-300/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-300/80" />

            <span className="ml-3 font-mono text-xs text-emerald-100/55">
              /terminal9x/public-mint.log
            </span>
          </div>

          <div className="space-y-4 p-5 font-mono text-xs leading-relaxed sm:text-sm">
            <div>
              <span className="text-emerald-300">mint.stage</span>{" "}
              <span className="text-emerald-100/45">=</span>{" "}
              <span className="text-lime-200">"PUBLIC";</span>
            </div>

            <div>
              <span className="text-emerald-300">mint.price</span>{" "}
              <span className="text-emerald-100/45">=</span>{" "}
              <span className="text-lime-200">"0.0021 ETH";</span>
            </div>

            <div>
              <span className="text-emerald-300">mint.starts</span>{" "}
              <span className="text-emerald-100/45">=</span>{" "}
              <span className="text-lime-200">"May 31 19:00 GMT+7";</span>
            </div>

            <div>
              <span className="text-emerald-300">mint.ends</span>{" "}
              <span className="text-emerald-100/45">=</span>{" "}
              <span className="text-lime-200">"June 03 22:03 GMT+7";</span>
            </div>

            <div>
              <span className="text-emerald-300">mint.platform</span>{" "}
              <span className="text-emerald-100/45">=</span>{" "}
              <span className="text-lime-200">"OpenSea";</span>
            </div>

            <div className="mt-6 border-t border-emerald-300/10 pt-5">
              <p>
                <span className="text-emerald-100/80">SYS</span>{" "}
                <span className="font-bold text-emerald-300">[MINT]</span>
                <span className="text-emerald-100/50">
                  {" "}
                  --public stage scheduled
                </span>
              </p>

              <p className="mt-3">
                <span className="text-emerald-100/80">SYS</span>{" "}
                <span className="font-bold text-emerald-300">[PRICE]</span>
                <span className="text-emerald-100/50"> --0.0021 ETH</span>
              </p>

              <p className="mt-3">
                <span className="text-emerald-100/80">SYS</span>{" "}
                <span className="font-bold text-emerald-300">[TIME]</span>
                <span className="text-emerald-100/50">
                  {" "}
                  --May 31 19:00 GMT+7
                </span>
              </p>

              <p className="mt-3">
                <span className="text-emerald-100/80">SYS</span>{" "}
                <span className="font-bold text-emerald-300">[MARKET]</span>
                <span className="text-emerald-100/50">
                  {" "}
                  --opensea reminder active
                </span>
              </p>

              <p className="mt-3">
                <span className="text-emerald-100/80">SYS</span>{" "}
                <span className="font-bold text-emerald-300">[CURSOR]</span>
                <span className="text-emerald-100/50">
                  {" "}
                  --awaiting mint window
                </span>
                <span className="animate-blink text-emerald-300">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}