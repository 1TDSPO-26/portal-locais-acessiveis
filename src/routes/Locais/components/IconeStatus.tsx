import type { StatusRecurso } from "../types";
import { corDoStatus } from "./statusCores";

/**
 * Ícone de status de um recurso de acessibilidade.
 * Figma: Section / Accessibility Item.
 *
 * IMPORTANTE: o ícone é sempre aria-hidden. Quem carrega a informação para
 * leitor de tela é o TEXTO ao lado, nunca a cor nem o ícone sozinho.
 * O Figma é explícito: "Status sempre comunicado por ícone + texto".
 *
 * Nada de instalar lucide-react ou react-icons. SVG na mão resolve.
 *
 * As cores ficam em statusCores.ts porque o lint exige que arquivos de
 * componente exportem apenas componentes.
 *
 * DONO: Nezio.
 */

interface IconeStatusProps {
  status: StatusRecurso;
  className?: string;
}

export function IconeStatus({ status, className = "" }: IconeStatusProps) {
  const cor = corDoStatus[status];
  const base = `h-4 w-4 shrink-0 ${cor} ${className}`;

  if (status === "disponivel") {
    return (
      <svg className={base} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (status === "indisponivel") {
    return (
      <svg className={base} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
      </svg>
    );
  }

  if (status === "naoInformado") {
    return (
      <span className={`${base} text-center text-sm font-semibold leading-4`} aria-hidden="true">
        ?
      </span>
    );
  }

  return (
    <svg className={base} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 8h10" strokeLinecap="round" />
    </svg>
  );
}