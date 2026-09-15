interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

export default function Paginacao({ paginaAtual, totalPaginas, onChange }: PaginacaoProps) {
  const paginas = Array.from(
    { length: totalPaginas },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={paginaAtual === 1}
        onClick={() => onChange(paginaAtual - 1)}
        className="cursor-pointer flex size-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹
      </button>

      {paginas.map((pagina) => (
        <button
          key={pagina}
          type="button"
          onClick={() => onChange(pagina)}
          className={`cursor-pointer size-9 rounded-lg text-sm ${
            pagina === paginaAtual
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {pagina}
        </button>
      ))}

      <button
        type="button"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onChange(paginaAtual + 1)}
        className="cursor-pointer flex size-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ›
      </button>
    </div>
  );
};