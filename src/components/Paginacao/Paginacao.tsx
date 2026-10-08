interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}


/**
 * Gera o intervalo de páginas visíveis.
 * Mostra no máximo 5 páginas por bloco (2 antes + atual + 2 depois), sempre incluindo
 * a primeira e a última, com "..." onde houver lacunas.
 */
function gerarIntervaloPaginas(
  paginaAtual: number,
  totalPaginas: number
): (number | "...")[] {

  if (totalPaginas <= 5) {
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  const paginas: (number | "...")[] = [];

  paginas.push(1);

  const inicio = Math.max(2, paginaAtual - 2);
  const fim = Math.min(totalPaginas - 1, paginaAtual + 2);

  if (inicio > 2) {
    paginas.push("...");
  }

  for (let i = inicio; i <= fim; i++) {
    paginas.push(i);
  }

  if (fim < totalPaginas - 1) {
    paginas.push("...");
  }

  paginas.push(totalPaginas);

  return paginas;
}


export default function Paginacao({
  paginaAtual,
  totalPaginas,
  onChange,
}: PaginacaoProps) {
  const paginas = gerarIntervaloPaginas(paginaAtual, totalPaginas);

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
        className="cursor-pointer flex size-8 sm:size-9 items-center justify-center rounded-lg text-xs sm:text-sm text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] dark:text-slate-300 dark:hover:bg-slate-700 dark:focus-visible:outline-blue-300"
      >
        ‹
      </button>


      {/* Se for reticências, renderiza um span não clicável. Senão, renderiza o botão de página normalmente */}
      {paginas.map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="flex size-8 sm:size-9 items-center justify-center text-xs sm:text-sm text-slate-400 dark:text-slate-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={item}
            type="button"
            aria-label={`Ir para a página ${item}`}
            aria-current={item === paginaAtual ? "page" : undefined}
            onClick={() => onChange(item)}
            className={`cursor-pointer size-8 sm:size-9 rounded-lg text-xs sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] dark:focus-visible:outline-blue-300 ${item === paginaAtual
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}>
            {item}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Ir para a próxima página"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onChange(paginaAtual + 1)}
        className="cursor-pointer flex size-8 sm:size-9 items-center justify-center rounded-lg text-xs sm:text-sm text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] dark:text-slate-300 dark:hover:bg-slate-700 dark:focus-visible:outline-blue-300"
      >
        ›
      </button>
    </nav>
  );
}