/**
 * ============================================================
 * STUB — DONO: IGOR
 * ============================================================
 * Figma: Section / Form Field, variante "Search" (a linha do meio,
 * com a lupa dentro do campo).
 *
 * Na tela /locais:
 *   Label acima: "Buscar"
 *   Placeholder: "Buscar por local ou endereço..."
 *   Lupa à esquerda, dentro do campo
 *
 * Estados previstos no Figma: Default, Focus (borda azul + ring 2px),
 * Filled, Error (borda vermelha + mensagem em texto), Disabled.
 * Para esta issue, Default e Focus bastam.
 *
 * ACESSIBILIDADE: usar <label htmlFor> de verdade ligado ao id do input.
 * Placeholder NÃO é label. Se o design não mostrar o texto do label,
 * use sr-only, mas ele precisa existir no HTML.
 *
 * ESCOPO: só o visual e o estado do texto digitado. Filtrar a lista
 * de verdade é integração com API, que é outra issue.
 */

interface CampoBuscaProps {
  valor: string;
  onChange: (valor: string) => void;
}

export function CampoBusca({ valor }: CampoBuscaProps) {
  return (
    <div>
      <p className="text-sm text-slate-400">[stub] CampoBusca · valor: {valor}</p>
    </div>
  );
}
