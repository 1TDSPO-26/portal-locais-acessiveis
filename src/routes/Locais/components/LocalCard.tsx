import type { Local } from "../types";

/**
  * ============================================================
 * STUB — DONO: GABRIEL
 * ============================================================
 * Este arquivo é um esqueleto. Ele existe para que ninguém quebre
 * o import enquanto o componente não fica pronto. Só o dono edita.
 *
 * Figma: Section / Local Card
 * "Grid para destaques da Home; List para /locais. Acessibilidade
 *  aparece como informação concreta no próprio card."
 *
 * A página /locais usa SEMPRE variante="list". A variante "grid"
 * existe porque o design prevê ela, mas quem consome é a Home
 * (outro grupo). Não vá construir a Home.
 *
 * VARIANTE "list" (desktop):
 *   [ imagem à esquerda, ~200px ] [ conteúdo à direita ]
 *   No mobile vira empilhado: imagem em cima, conteúdo embaixo.
 *
 * VARIANTE "grid":
 *   imagem em cima, conteúdo embaixo, sempre.
 *
 * CONTEÚDO (nesta ordem, nas duas variantes):
 *   1. Nome do local em negrito + Tag da categoria à direita, na mesma linha
 *   2. Cidade em cinza ("São Paulo, SP")
 *   3. Badges verdes dos recursos DISPONÍVEIS (usar BadgeAcessibilidade)
 *   4. Link "Ver detalhes →" apontando para /locais/{id}
 *
 * SE NÃO TIVER IMAGEM: mostrar o placeholder do Figma, um bloco azul
 * clarinho com o texto centralizado "Imagem do local".
 *
 * ACESSIBILIDADE (é critério de aceite da issue):
 *   - o link "Ver detalhes" precisa de aria-label descrevendo o destino,
 *     senão o leitor de tela ouve "ver detalhes" sete vezes seguidas
 *     sem saber de qual local. Ex.: aria-label="Ver detalhes de Parque Ibirapuera"
 *   - foco visível: focus-visible:ring-2 focus-visible:ring-blue-600
 *     (o Figma especifica ring de 2px)
 *   - a imagem precisa de alt. Se for decorativa, alt=""
 *
 * TESTE COM O MOCK INTEIRO antes de abrir o PR. Tem nome longo,
 * local sem imagem e local sem nenhum recurso disponível ali de propósito.
 */

interface LocalCardProps {
  local: Local;
  variante?: "list" | "grid";
}

export function LocalCard({ local, variante = "list" }: LocalCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-400">
        [stub] LocalCard · {local.nome} · variante {variante}
      </p>
    </div>
  );
}
