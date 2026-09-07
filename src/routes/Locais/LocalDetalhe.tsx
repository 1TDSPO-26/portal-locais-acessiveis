import { useParams } from "react-router";
import { buscarLocalPorId } from "./mock/locais";
import { ItemAcessibilidade } from "./components/ItemAcessibilidade";
import { Tag } from "./components/Tag";

/**
 * ============================================================
 * STUB — DONO: ALEXANDRE
 * ============================================================
 * Página da rota /locais/:id. Figma: telas "Detalhes / Desktop" e
 * "Detalhes / Mobile".
 *
 * ESTRUTURA (desktop):
 *   1. Link "← Voltar para locais"
 *   2. Nome do local (h1) + Tag da categoria ao lado
 *   3. Linha cinza: "São Paulo, SP · Av. Pedro Álvares Cabral, s/n"
 *   4. Imagem grande, largura total
 *   5. Duas colunas:
 *        esquerda  -> "Sobre o local" (descrição) e "Recursos de acessibilidade"
 *        direita   -> caixa cinza clara "Endereço e contato"
 *   6. Faixa azul clara no rodapé com o aviso:
 *      "As informações deste portal não representam certificação oficial de
 *       acessibilidade e não substituem avaliação técnica especializada."
 *
 * NO MOBILE a ordem muda, olhe a tela "Detalhes / Mobile":
 *   a Tag vai para baixo do título, e o bloco "Endereço e contato"
 *   desce para DEPOIS dos recursos de acessibilidade.
 *
 * SE O CONTATO NÃO EXISTIR: escrever "Contato não informado", exatamente
 * como no Figma. Não esconda a linha.
 *
 * SE O ID NÃO EXISTIR NO MOCK: mostrar o 404 do Figma (QA Evidence,
 * seção 5): "404 / Página não encontrada / O endereço que você tentou
 * acessar não existe ou foi alterado." com o botão "Voltar para o início".
 *
 * SUA SEGUNDA TAREFA: registrar as duas rotas no arquivo de rotas que a
 * issue #5 entregou:
 *     /locais       -> a página do Igor (export default de Locais/index.tsx)
 *     /locais/:id   -> esta página
 * Combine esse commit com o Igor, porque é o único arquivo compartilhado
 * entre vocês dois.
 */

export default function LocalDetalhe() {
  const { id } = useParams<{ id: string }>();
  const local = id ? buscarLocalPorId(id) : undefined;

  if (!local) {
    return <p className="text-sm text-slate-400">[stub] 404 — local não encontrado</p>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-sm text-slate-400">[stub] Detalhes de {local.nome}</p>
      <Tag categoria={local.categoria} />
      <ul>
        {local.recursos.map((recurso) => (
          <ItemAcessibilidade key={recurso.id} recurso={recurso} />
        ))}
      </ul>
    </main>
  );
}
