import { useState } from "react";
import {
  Box,
  ExternalLink,
  RadioTower,
  Signal,
  Terminal,
  UserPlus,
} from "lucide-react";

import { AnimatedTerminal } from "./AnimatedTerminal";
import { GlowPanel } from "./GlowPanel";
import { Modal } from "./Modal";
import { ProtocolTerminalLog } from "./ProtocolTerminalLog";
import { StatCard } from "./StatCard";
import { WaitlistCounter } from "./WaitlistCounter";
import { WhitelistForm, type WhitelistFormState } from "./WhitelistForm";
import "../index.css";
import "@fontsource/kdam-thmor-pro/400.css";

const promptCodeLines = [
  "Prompt Protocol[000] =",
  '  "AI prompt syntax collectible";',
  "",
  "model =",
  '  "Onchain";',
  "",
  "status =",
  '  "WHITELIST_OPEN";',
];

const initialForm: WhitelistFormState = {
  email: "",
  walletAddress: "",
  followedTwitter: false,
  acceptedDisclaimer: false,
};

type SignalRowProps = {
  label: string;
  active: boolean;
  activeText?: string;
  inactiveText?: string;
};

function SignalRow({
  label,
  active,
  activeText = "READY",
  inactiveText = "PENDING",
}: SignalRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-400/15 bg-emerald-300/5 px-4 py-3">
      <span className="text-sm text-slate-300">{label}</span>

      <span
        className={[
          "shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em]",
          active ? "text-green-300" : "text-slate-500",
        ].join(" ")}
      >
        {active ? activeText : inactiveText}
      </span>
    </div>
  );
}

function TaskModalContent({
  form,
  openWhitelist,
}: {
  form: WhitelistFormState;
  openWhitelist: () => void;
}) {
  const signals = [
    {
      label: "X Follow",
      active: form.followedTwitter,
      activeText: "DONE",
    },
    {
      label: "Email",
      active: Boolean(form.email),
      activeText: "READY",
    },
    {
      label: "Wallet",
      active: Boolean(form.walletAddress),
      activeText: "READY",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-emerald-400/20 bg-protocol-muted p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-200/70">
          Required Signal
        </p>

        <h3 className="mt-2 text-lg font-black text-slate-100">
          Follow @terminal9x on X
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          Follow the official X account, then confirm it inside the whitelist
          form.
        </p>

        <a
          href="https://x.com/terminal9x"
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-green-300/40 bg-green-300/10 px-4 py-3 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-slate-100 transition hover:border-green-300/70 hover:bg-green-300/15"
        >
          Open X Task
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="rounded-2xl border border-emerald-400/20 bg-protocol-muted p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">
            Form Signal
          </p>

          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-100/60">
            Live
          </span>
        </div>

        <div className="grid gap-2">
          {signals.map((signal) => (
            <div
              key={signal.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-cyan-400/15 bg-cyan-300/5 px-3 py-2.5"
            >
              <span className="text-xs font-medium text-slate-300">
                {signal.label}
              </span>

              <span
                className={[
                  "font-mono text-[10px] font-bold uppercase tracking-[0.14em]",
                  signal.active ? "text-green-300" : "text-slate-500",
                ].join(" ")}
              >
                {signal.active ? signal.activeText : "PENDING"}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={openWhitelist}
          className="mt-4 w-full rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-3 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-slate-100 transition hover:border-green-300/50 hover:bg-green-300/10"
        >
          Continue to Form
        </button>
      </div>

      <div className="rounded-xl border border-yellow-300/20 bg-yellow-300/5 px-3 py-2.5">
        <p className="font-mono text-[10px] leading-relaxed text-yellow-100/70">
          SYS [TASK] -- X follow is manually verified or used as a social
          signal.
        </p>
      </div>
    </div>
  );
}
export function HeroTerminal() {
  const [form, setForm] = useState<WhitelistFormState>(initialForm);
  const [whitelistModalOpen, setWhitelistModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [lastSubmittedWallet, setLastSubmittedWallet] = useState("");
  const [counterVersion, setCounterVersion] = useState(0);

  function handleSubmitted(walletAddress: string) {
    setLastSubmittedWallet(walletAddress);
    setCounterVersion((current) => current + 1);
  }

  function openWhitelistModal() {
    setTaskModalOpen(false);
    setWhitelistModalOpen(true);
  }

  function openTaskModal() {
    setWhitelistModalOpen(false);
    setTaskModalOpen(true);
  }

  return (
    <GlowPanel className="overflow-hidden">
  <div className="grid min-h-[640px] items-center gap-8 p-5 sm:p-8 xl:grid-cols-[0.9fr_1.1fr] xl:p-10">        <section className="max-w-3xl">
          <div className="mb-10 max-w-2xl rounded-[28px] border border-emerald-400/25 bg-protocol-muted/0 shadow-neon">
            {/* <div className="border-b border-cyan-400/20 px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                Terminal Telemetry
              </p>
            </div> */}

            <div className="space-y-2 p-2">
              <WaitlistCounter key={counterVersion} />

             
            </div>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-lime-300/25 bg-lime-300/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-lime-100">
            <Terminal className="h-4 w-4" />
            ERC-721 Whitelist
          </div>

          <h1 className="text-4xl font-kdam sm:text-5xl lg:text-6xl">
            Terminal<span className="text-emerald-400">9x</span>
          </h1>

          <p className="mt-5 text-base leading-8 text-terminal-muted sm:text-lg">
            AI prompt syntax, tokenized as terminal-native collectibles.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openWhitelistModal}
              className="rounded-2xl border border-green-300/40 bg-green-300/10 px-6 py-4 font-mono text-sm font-black uppercase tracking-[0.22em] text-slate-100 shadow-[0_0_24px_rgba(57,255,136,0.10)] transition hover:border-green-300/70 hover:bg-green-300/15"
            >
              Join Whitelist
            </button>

            <button
              type="button"
              onClick={openTaskModal}
              className="rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-6 py-4 font-mono text-sm font-black uppercase tracking-[0.22em] text-slate-100 transition hover:border-cyan-300/70 hover:bg-cyan-300/15"
            >
              Follow on X
            </button>
          </div>
        </section>

        <section className="space-y-4 self-center">
          <div className="rounded-[28px]  p-14 shadow-neon">
            <AnimatedTerminal
              title="/protocol/prompt-001.ts"
              lines={promptCodeLines}
              startDelay={220}
              charDelay={24}
              lineDelay={320}
              heightClassName="h-[150px]"
            />
          </div>

         <ProtocolTerminalLog
  submittedWallet={lastSubmittedWallet}
  heightClassName="h-[250px]"
/>
        </section>
      </div>

     <Modal
  open={whitelistModalOpen}
  onClose={() => setWhitelistModalOpen(false)}
  title="Whitelist Access Form"
  subtitle="Submit your email, EVM wallet, and confirm the X follow task."
  size="sm"
>
  <WhitelistForm
    form={form}
    setForm={setForm}
    onSubmitted={handleSubmitted}
  />
</Modal>

      <Modal
  open={taskModalOpen}
  onClose={() => setTaskModalOpen(false)}
  title="Whitelist Task"
  subtitle="Complete the required social signal before your whitelist entry gets indexed."
  size="sm"
>
  <TaskModalContent form={form} openWhitelist={openWhitelistModal} />
</Modal>
    </GlowPanel>
  );
}