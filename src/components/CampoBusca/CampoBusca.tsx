import { useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";

interface CampoBuscaProps {
  value: string;
  onChange: (value: string) => void;
  /** Chamado quando a busca é confirmada (Enter ou clique no histórico). */
  onPesquisar?: (termo: string) => void;
  /** Últimas buscas, da mais recente para a mais antiga. */
  historico?: string[];
  onRemoverHistorico?: (termo: string) => void;
  onLimparHistorico?: () => void;
}

export default function CampoBusca({
  value,
  onChange,
  onPesquisar,
  historico = [],
  onRemoverHistorico,
  onLimparHistorico,
}: CampoBuscaProps) {
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const idHistorico = useId();

  const mostrarHistorico = historicoAberto && historico.length > 0;

  const pesquisar = (termo: string) => {
    onChange(termo);
    onPesquisar?.(termo);
    setHistoricoAberto(false);
  };

  const aoPressionarTecla = (evento: KeyboardEvent<HTMLInputElement>) => {
    if (evento.key === "Enter") {
      evento.preventDefault();
      pesquisar(value);
    }

    if (evento.key === "Escape") {
      setHistoricoAberto(false);
    }
  };

  // Fecha a lista só quando o foco sai do campo E da lista de histórico.
  const aoPerderFoco = (evento: FocusEvent<HTMLDivElement>) => {
    if (!evento.currentTarget.contains(evento.relatedTarget)) {
      setHistoricoAberto(false);
    }
  };

  const removerDoHistorico = (termo: string) => {
    onRemoverHistorico?.(termo);
    inputRef.current?.focus();
  };

  const limparHistorico = () => {
    onLimparHistorico?.();
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" onBlur={aoPerderFoco}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="absolute left-3 top-1/2 size-4 sm:size-3.5 -translate-y-1/2 text-slate-700"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        aria-label="Buscar por local ou endereço"
        aria-expanded={historico.length > 0 ? mostrarHistorico : undefined}
        aria-controls={mostrarHistorico ? idHistorico : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setHistoricoAberto(true)}
        onClick={() => setHistoricoAberto(true)}
        onKeyDown={aoPressionarTecla}
        placeholder="Buscar por local ou endereço..."
        className="h-11 sm:h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs sm:text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-blue-400"
      />

      {mostrarHistorico && (
        <div
          id={idHistorico}
          role="region"
          aria-label="Buscas recentes"
          className="absolute left-0 right-0 top-full z-20 mt-1 rounded-md border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-600 dark:bg-slate-800"
        >
          <div className="mb-1 flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Buscas recentes
            </span>

            {onLimparHistorico && (
              <button
                type="button"
                onClick={limparHistorico}
                className="rounded px-1 text-[11px] font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] dark:text-blue-300"
              >
                Limpar histórico
              </button>
            )}
          </div>

          <ul className="flex flex-col">
            {historico.map((termo) => (
              <li key={termo} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => pesquisar(termo)}
                  aria-label={`Buscar novamente por ${termo}`}
                  className="flex min-h-9 flex-1 items-center gap-2 truncate rounded px-2 text-left text-xs text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-3.5 shrink-0 text-slate-500 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <span className="truncate">{termo}</span>
                </button>

                {onRemoverHistorico && (
                  <button
                    type="button"
                    onClick={() => removerDoHistorico(termo)}
                    aria-label={`Remover ${termo} do histórico`}
                    className="flex size-9 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-red-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-3.5"
                      aria-hidden="true"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
