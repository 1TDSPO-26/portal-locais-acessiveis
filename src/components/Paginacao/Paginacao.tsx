interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  onChange,
}: PaginacaoProps) {
  const paginas = Array.from(
    { length: totalPaginas },
    (_, index) => index + 1
  );

  return (
    <nav
      aria-label="Paginação da lista de locais"
      className="flex items-center justify-center gap-1">

      <span className="sr-only" aria-live="polite">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        type="button"
        aria-label="Ir para a página anterior"
        disabled={paginaAtual === 1}
        onClick={() => onChange(paginaAtual - 1)}
        className="cursor-pointer flex size-8 sm:size-9 items-center justify-center rounded-lg text-xs sm:text-sm text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
      >
        ‹
      </button>

      {paginas.map((pagina) => (
        <button
          key={pagina}
          type="button"
          aria-label={`Ir para a página ${pagina}`}
          aria-current={pagina === paginaAtual ? "page" : undefined}
          onClick={() => onChange(pagina)}
          className={`cursor-pointer size-8 sm:size-9 rounded-lg text-xs sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] ${pagina === paginaAtual
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100"
            }`}
        >
          {pagina}
        </button>
      ))}

      <button
        type="button"
        aria-label="Ir para a próxima página"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onChange(paginaAtual + 1)}
        className="cursor-pointer flex size-8 sm:size-9 items-center justify-center rounded-lg text-xs sm:text-sm text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
      >
        ›
      </button>
    </nav>
  );
}