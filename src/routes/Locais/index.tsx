import { useState } from "react";
import { locaisMock } from "./mock/locais";
import { CampoBusca } from "./components/CampoBusca";
import { FiltrosCategoria } from "./components/FiltrosCategoria";
import { ListaLocais } from "./components/ListaLocais";
import { Paginacao } from "./components/Paginacao";

/**
 * ============================================================
 * STUB — DONO: IGOR
 * ============================================================
 * Página da rota /locais. Figma: telas "Locais / Desktop" e "Locais / Mobile".
 *
 * ESTRUTURA, de cima para baixo:
 *   1. Título "Locais acessíveis" (h1)
 *   2. Subtítulo "Encontre lugares e consulte informações para planejar sua visita."
 *   3. CampoBusca à esquerda + FiltrosCategoria à direita (empilham no mobile)
 *   4. Contador: "4 locais encontrados" — é o tamanho da lista, calculado
 *   5. ListaLocais
 *   6. Paginacao
 *
 * O Header e o Footer NÃO são seus. Eles aparecem no Figma porque são o
 * layout do site inteiro, e vêm de outra issue. Se eles ainda não existirem,
 * sua página começa direto no título. Não construa Header nem Footer:
 * a issue proíbe explicitamente trabalhar fora do Locais.
 *
 * ESTADO DA PÁGINA: os useState da busca, dos filtros e da página ficam
 * aqui, e você passa para os componentes filhos. Os filhos não guardam
 * estado próprio disso.
 *
 * ACESSIBILIDADE: o contador de resultados deve estar num elemento com
 * aria-live="polite". Assim, quando o número muda, o leitor de tela avisa
 * sem que a pessoa precise procurar.
 */

export default function Locais() {
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<string[]>([]);
  const [pagina, setPagina] = useState(1);

  const locais = locaisMock;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-sm text-slate-400">[stub] Página /locais</p>

      <CampoBusca valor={busca} onChange={setBusca} />
      <FiltrosCategoria ativos={filtros} onAlternar={() => setFiltros(filtros)} />
      <ListaLocais locais={locais} />
      <Paginacao paginaAtual={pagina} totalPaginas={1} onMudarPagina={setPagina} />
    </main>
  );
}
