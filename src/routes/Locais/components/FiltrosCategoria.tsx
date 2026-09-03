/**
 * ============================================================
 * STUB — DONO: IGOR
 * ============================================================
 * Figma: tela "Locais / Desktop", a linha de filtros à direita da busca.
 *
 * São três: "Entrada com rampa", "Banheiro acessível", "Estacionamento".
 * No desktop ficam alinhados à direita, na mesma faixa da busca.
 * No mobile descem para uma linha própria, abaixo do campo.
 *
 * Cada filtro liga e desliga ao ser clicado. Guarde quais estão ativos
 * num estado do React na página.
 *
 * ACESSIBILIDADE: como são botões de liga/desliga, cada um precisa de
 * aria-pressed={ativo}. Sem isso o leitor de tela não sabe se o filtro
 * está aplicado ou não.
 *
 * ESCOPO: visual + estado. A filtragem real depende da API.
 */

interface FiltrosCategoriaProps {
  ativos: string[];
  onAlternar: (filtro: string) => void;
}

export function FiltrosCategoria({ ativos }: FiltrosCategoriaProps) {
  return (
    <div>
      <p className="text-sm text-slate-400">[stub] FiltrosCategoria · {ativos.length} ativos</p>
    </div>
  );
}
