import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function SubmitStatus({ type, message }: { type: "success" | "error"; message: string }) {
  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertTriangle;
  return (
    <div
      className={`mt-4 flex items-start gap-3 rounded-xl border p-4 text-sm ${
        isSuccess
          ? "border-emerald-700/75 bg-protocol-muted text-emerald-100"
          : "border-red-700/75 bg-protocol-muted text-red-100"
      }`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
