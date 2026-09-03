/**
 * ============================================================
 * STUB — DONO: JÚLIA
 * ============================================================
 * Figma: Section / Pagination.
 *
 * Setinha ‹ , números das páginas, setinha ›.
 * Estados: normal (borda cinza), ativa (fundo azul, texto branco),
 * foco (borda azul com ring de 2px) e desabilitada (cinza claro).
 *
 * ATENÇÃO AO ESCOPO: por enquanto isso é só VISUAL. Não precisa
 * fatiar a lista de verdade nem mexer em URL. A API não existe.
 * O componente recebe a página atual e avisa quando alguém clica.
 * Quem decide o que fazer com isso é a página do Igor.
 *
 * ACESSIBILIDADE:
 *   - envolver em <nav aria-label="Paginação">
 *   - a página ativa leva aria-current="page"
 *   - as setas precisam de aria-label ("Página anterior" / "Próxima página"),
 *     porque ‹ e › sozinhos não significam nada para leitor de tela
 *   - setas desabilitadas usam o atributo disabled, não só cor cinza
 */

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
