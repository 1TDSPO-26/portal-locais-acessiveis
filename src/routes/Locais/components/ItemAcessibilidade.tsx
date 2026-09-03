import type { RecursoAcessibilidade } from "../types";
import { IconeStatus } from "./IconeStatus";
import { corDoStatus } from "./statusCores";

/**
 * ============================================================
 * STUB — DONO: ALEXANDRE
 * ============================================================
 * Figma: Section / Accessibility Item, usado na tela de detalhes
 * no bloco "Recursos de acessibilidade".
 *
 * LAYOUT: ícone à esquerda, e à direita duas linhas:
 *   linha 1: rótulo em negrito, cor escura ("Entrada")
 *   linha 2: detalhe, colorido conforme o status ("Acesso em nível e rampa")
 *
 * O IconeStatus (./IconeStatus) e o mapa corDoStatus (./statusCores)
 * já estão prontos, é só usar.
 *
 * REGRA DO DESIGN, leia com atenção: "Status sempre comunicado por
 * ícone + texto. Sem selo genérico de 'local acessível'."
 * Traduzindo: a cor nunca pode ser a única forma de saber o status.
 * O texto do detalhe já diz "Disponível" / "Não informado" / "Não se aplica",
 * então está resolvido. Só não apague esse texto.
 */

interface ItemAcessibilidadeProps {
  recurso: RecursoAcessibilidade;
}

export function ItemAcessibilidade({ recurso }: ItemAcessibilidadeProps) {
  return (
    <li className="flex gap-3">
      <IconeStatus status={recurso.status} className="mt-0.5" />
      <div>
        <p className="text-sm font-medium text-slate-900">{recurso.rotulo}</p>
        <p className={`text-sm ${corDoStatus[recurso.status]}`}>{recurso.detalhe}</p>
      </div>
    </li>
  );
}