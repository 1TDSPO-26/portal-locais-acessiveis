import type { StatusRecurso } from "../types";

/**
 * Cores de cada status de acessibilidade.
 * Figma: Section / Accessibility Item.
 * Fica em arquivo próprio porque o lint exige que arquivos de
 * componente exportem apenas componentes.
 *
 * DONO: Nezio.
 */
export const corDoStatus: Record<StatusRecurso, string> = {
  disponivel: "text-green-700",
  indisponivel: "text-red-600",
  naoInformado: "text-blue-600",
  naoSeAplica: "text-slate-400",
};