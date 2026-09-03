import { IconeStatus } from "./IconeStatus";

/**
 * Badge verde que aparece DENTRO do card: "✓ Entrada com rampa".
 * Figma: Section / Local Card.
 *
 * No card só entram os recursos com status "disponivel" — os outros
 * aparecem apenas na tela de detalhes, com o status completo.
 *
 * DONO: Nezio.
 */

interface BadgeAcessibilidadeProps {
  rotulo: string;
}

export function BadgeAcessibilidade({ rotulo }: BadgeAcessibilidadeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
      <IconeStatus status="disponivel" className="h-3.5 w-3.5" />
      {rotulo}
    </span>
  );
}
