interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas }: PaginacaoProps) {
  return (
    <div className="flex justify-center">
      <p className="text-sm text-slate-400">
        [stub] Paginacao · {paginaAtual} de {totalPaginas}
      </p>
    </div>
  );
}
