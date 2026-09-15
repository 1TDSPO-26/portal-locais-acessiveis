import type { Local } from "../../types/locais";

interface LocalCardProps {
  local: Local;
  variante?: "list" | "grid";
}

export function LocalCard({ local, variante = "list" }: LocalCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-400">
        [stub] LocalCard · {local.nome} · variante {variante}
      </p>
    </div>
  );
}
