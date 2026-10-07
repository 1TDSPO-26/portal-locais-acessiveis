import {
  OPCOES_ORDENACAO,
  type CriterioOrdenacao,
} from "../../utils/ordenarLocais";

interface SeletorOrdenacaoProps {
  value: CriterioOrdenacao;
  onChange: (criterio: CriterioOrdenacao) => void;
}

export default function SeletorOrdenacao({
  value,
  onChange,
}: SeletorOrdenacaoProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="ordenacao-locais"
        className="text-[11px] font-medium text-slate-700"
      >
        Ordenar por
      </label>

      <select
        id="ordenacao-locais"
        value={value}
        onChange={(e) => onChange(e.target.value as CriterioOrdenacao)}
        className="h-10 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 outline-none transition focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:text-[11px]"
      >
        {OPCOES_ORDENACAO.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>
    </div>
  );
}