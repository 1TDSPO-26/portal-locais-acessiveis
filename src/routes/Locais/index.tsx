import { useState } from "react";
import { locaisMock } from "../../types/locais";
import { CampoBusca } from "../../components/CampoBusca/CampoBusca";
import { FiltrosCategoria } from "../../components/FiltrosCategoria/FiltrosCategoria";
import { ListaLocais } from "../../components/ListaLocais/ListaLocais";
import { Paginacao } from "../../components/Paginacao/Paginacao";

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
