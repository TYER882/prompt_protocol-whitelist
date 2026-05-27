import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, Mail, Send, ShieldCheck, Wallet, XCircle } from "lucide-react";
import { submitWhitelistEntry } from "../lib/api";

export type WhitelistFormState = {
  email: string;
  walletAddress: string;
  followedTwitter: boolean;
  acceptedDisclaimer: boolean;
};

type WhitelistFormProps = {
  form: WhitelistFormState;
  setForm: React.Dispatch<React.SetStateAction<WhitelistFormState>>;
  onSubmitted?: (walletAddress: string) => void;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWallet(wallet: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(wallet);
}

export function WhitelistForm({ form, setForm, onSubmitted }: WhitelistFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validation = useMemo(() => {
    if (!form.email.trim()) return null;
    if (!isValidEmail(form.email)) return "Invalid email address.";
    if (!form.walletAddress.trim()) return null;
    if (!isValidWallet(form.walletAddress)) return "Invalid wallet address.";
    if (!form.followedTwitter) return "Please complete the X follow task.";
    if (!form.acceptedDisclaimer) {
      return "Please confirm the whitelist disclaimer.";
    }

    return null;
  }, [form]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const email = form.email.trim().toLowerCase();
    const walletAddress = form.walletAddress.trim().toLowerCase();

    if (!isValidEmail(email)) {
      setStatus({ type: "error", message: "Invalid email address." });
      return;
    }

    if (!isValidWallet(walletAddress)) {
      setStatus({ type: "error", message: "Invalid wallet address." });
      return;
    }

    if (!form.followedTwitter) {
      setStatus({ type: "error", message: "Please complete the X follow task." });
      return;
    }

    if (!form.acceptedDisclaimer) {
      setStatus({
        type: "error",
        message: "Please confirm the whitelist disclaimer.",
      });
      return;
    }

    try {
      setLoading(true);

      await submitWhitelistEntry({
        email,
        walletAddress,
        followedTwitter: form.followedTwitter,
      });

      setStatus({
        type: "success",
        message: "Whitelist entry accepted. Your prompt access request has been indexed.",
      });

      onSubmitted?.(walletAddress);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Whitelist submit failed. Please try again.";

      setStatus({
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">
          Email Address
        </label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200/45" />

          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder="operator@promptprotocol.ai"
            className="w-full rounded-2xl border border-emerald-700/70 bg-protocol-muted px-11 py-4 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-green-300/50 focus:shadow-[0_0_22px_rgba(57,255,136,0.10)]"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">
          EVM Wallet Address
        </label>

        <div className="relative">
          <Wallet className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200/45" />

          <input
            type="text"
            value={form.walletAddress}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                walletAddress: event.target.value,
              }))
            }
            placeholder="0x0000000000000000000000000000000000000000"
            className="w-full rounded-2xl border border-emerald-700/70 bg-protocol-muted  px-11 py-4 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-green-300/50 focus:shadow-[0_0_22px_rgba(57,255,136,0.10)]"
          />
        </div>
      </div>

      <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-emerald-400/20 bg-protocol-muted p-4 transition hover:border-green-300/35 hover:bg-green-300/5">
        <input
          type="checkbox"
          checked={form.followedTwitter}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              followedTwitter: event.target.checked,
            }))
          }
          className="mt-1 h-4 w-4 accent-green-300"
        />

        <span className="text-sm leading-relaxed text-slate-300">
          I followed{" "}
          <a
            href="https://x.com/promptprotocolx"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-cyan-200 hover:text-green-300"
          >
            @terminal9x
          </a>{" "}
          on X
        </span>
      </label>

      <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-emerald-400/20 bg-protocol-muted p-4 transition hover:border-green-300/35 hover:bg-green-300/5">
        <input
          type="checkbox"
          checked={form.acceptedDisclaimer}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              acceptedDisclaimer: event.target.checked,
            }))
          }
          className="mt-1 h-4 w-4 accent-green-300"
        />

        <span className="text-sm leading-relaxed text-slate-300">
          I understand this whitelist does not guarantee mint allocation.
        </span>
      </label>

      {validation ? (
        <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/5 p-4">
          <p className="font-mono text-xs leading-relaxed text-yellow-100/80">
            SYS [VALIDATION] --{validation}
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-green-300/45 bg-emerald-700 px-5 py-4 font-mono text-sm font-black uppercase tracking-[0.22em] text-slate-100 transition hover:border-green-300/70 hover:bg-green-300/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Indexing Entry" : "Submit Whitelist Entry"}
      </button>

      {status ? (
        <div
          className={[
            "flex items-start gap-3 rounded-2xl border p-4",
            status.type === "success"
              ? "border-green-300/30 bg-green-300/10"
              : "border-red-300/30 bg-red-300/10",
          ].join(" ")}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-300" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
          )}

          <p
            className={[
              "text-sm font-semibold leading-relaxed",
              status.type === "success" ? "text-green-100" : "text-red-100",
            ].join(" ")}
          >
            {status.message}
          </p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/5 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200/70" />
          <p className="text-xs leading-relaxed text-slate-500">
            No wallet connect. No transaction. No payment. Your wallet is only used for whitelist indexing.
          </p>
        </div>
      </div>
    </form>
  );
}