import { CheckCircle2, Circle, ExternalLink, Mail, Wallet, Radio } from "lucide-react";
import { motion } from "framer-motion";

type TaskChecklistProps = {
  email: string;
  walletAddress: string;
  followedTwitter: boolean;
  submitted: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWallet(wallet: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(wallet);
}

type TaskItemProps = {
  done: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function TaskItem({ done, title, description, icon }: TaskItemProps) {
  return (
    <motion.div
      animate={{
        borderColor: done ? "rgba(57,255,136,0.45)" : "rgba(34,211,238,0.14)",
        backgroundColor: done ? "rgba(57,255,136,0.07)" : "rgba(2,8,23,0.58)",
      }}
      className="flex items-start gap-4 rounded-2xl border p-4 transition-all"
    >
      <div
        className={[
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
          done
            ? "border-green-300/50 bg-terminal-bg text-green-300 shadow-[0_0_18px_rgba(57,255,136,0.18)]"
            : "border-cyan-300/20 bg-cyan-300/5 text-cyan-200/60",
        ].join(" ")}
      >
        {done ? <CheckCircle2 className="h-4 w-4" /> : icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-sm font-bold text-slate-100">
            {title}
          </p>

          <span
            className={[
              "shrink-0 rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
              done
                ? "border-green-300/40 bg-green-300/10 text-green-300"
                : "border-cyan-300/20 bg-cyan-300/5 text-cyan-200/50",
            ].join(" ")}
          >
            {done ? "done" : "pending"}
          </span>
        </div>

        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function TaskChecklist({
  email,
  walletAddress,
  followedTwitter,
  submitted,
}: TaskChecklistProps) {
  const emailDone = isValidEmail(email);
  const walletDone = isValidWallet(walletAddress);

  const tasks = [
    {
      done: followedTwitter,
      title: "Follow Terminal9X on X",
      description: "Required social signal before whitelist indexing.",
      icon: <Radio className="h-4 w-4" />,
    },
    {
      done: emailDone,
      title: "Submit valid email",
      description: emailDone ? "Email format accepted." : "Waiting for a valid email address.",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      done: walletDone,
      title: "Submit EVM wallet",
      description: walletDone ? "Wallet format accepted." : "Wallet must start with 0x and contain 42 characters.",
      icon: <Wallet className="h-4 w-4" />,
    },
    {
      done: submitted,
      title: "Whitelist entry indexed",
      description: submitted
        ? "Your whitelist access request has been accepted."
        : "Submit the form to index your whitelist request.",
      icon: <Circle className="h-4 w-4" />,
    },
  ];

  const completed = tasks.filter((task) => task.done).length;

  return (
    <section className="rounded-[28px] border border-cyan-400/25 bg-[#020817]/80 shadow-neon">
      <div className="border-b border-cyan-400/20 px-6 py-4">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-200/70">
          Task Checklist
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-100">
              Whitelist Signal
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Complete the required signals before your entry gets indexed.
            </p>
          </div>

          <div className="rounded-2xl border border-green-300/25 bg-green-300/10 px-4 py-3 text-right">
            <p className="font-mono text-2xl font-black text-green-300">
              {completed}/4
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-green-200/60">
              complete
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task.title} {...task} />
          ))}
        </div>

        <a
          href="https://x.com/terminal9x"
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-emerald-700/75 bg-protocol-muted px-4 py-4 font-mono text-sm font-black text-slate-100 transition hover:border-green-700/45 hover:bg-green-300/10"
        >
          Follow @terminal9x
          <ExternalLink className="h-4 w-4" />
        </a>

        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          Following on X is manually verified or used as a social task signal.
          Do not submit multiple wallets.
        </p>
      </div>
    </section>
  );
}