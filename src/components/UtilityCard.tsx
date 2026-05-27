import { ReactNode } from "react";

type UtilityCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function UtilityCard({ title, description, icon }: UtilityCardProps) {
  return (
    <div className="group rounded-2xl border border-emerald-300/15 bg-terminal-bg p-5 transition hover:-translate-y-1 hover:border-protocol-green/30 hover:shadow-green">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-emerald-300/25 bg-emerald-300/10 text-protocol-green">
        {icon}
      </div>
      <h3 className="text-base font-bold text-emerald-50">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-emerald-100/50">{description}</p>
    </div>
  );
}
