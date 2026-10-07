import { useEffect, useMemo, useState } from "react";

import CampoBusca from "../../components/CampoBusca/CampoBusca";
import FiltrosCategoria from "../../components/FiltrosCategoria/FiltrosCategoria";
import Paginacao from "../../components/Paginacao/Paginacao";
import LocalCard from "../../components/LocalCard/LocalCard";
import SeletorOrdenacao from "../../components/SeletorOrdenacao/SeletorOrdenacao";



import { locaisMock } from "../../types/locais";
import { ordenarLocais, type CriterioOrdenacao } from "../../utils/ordenarLocais";

const ITENS_POR_PAGINA = 4;

export default function Locais() {

  useEffect(() => {
    document.title = "LOCAIS | ACESSO+";
  }, []);

  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<string[]>([]);
  const [ordenacao, setOrdenacao] = useState<CriterioOrdenacao>("nome-asc");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const locaisFiltrados = useMemo(() => {
    const filtrados = locaisMock.filter((local) => {
      const termo = busca.trim().toLowerCase();

      const correspondeBusca =
        !termo ||
        local.nome.toLowerCase().includes(termo) ||
        local.endereco.toLowerCase().includes(termo);

      const possuiRecursos = filtros.every((id) =>
        local.recursos.some(
          (recurso) =>
            recurso.id === id &&
            recurso.status === "disponivel"
        )
      );

      return correspondeBusca && possuiRecursos;
    });

    return ordenarLocais(filtrados, ordenacao);
  }, [busca, filtros, ordenacao]);

  const totalPaginas = Math.ceil(
    locaisFiltrados.length / ITENS_POR_PAGINA
  );

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;

  const locaisDaPagina = locaisFiltrados.slice(
    inicio,
    inicio + ITENS_POR_PAGINA
  );

  const alterarBusca = (valor: string) => {
    setBusca(valor);
    setPaginaAtual(1);
  };

  const alterarOrdenacao = (criterio: CriterioOrdenacao) => {
    setOrdenacao(criterio);
    setPaginaAtual(1);
  };

  const alterarFiltros = (novosFiltros: string[]) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 sm:mb-5">
        <h1 className="mb-2 text-start text-2xl font-bold text-slate-900 sm:mb-0 sm:text-[inherit]">
          Locais acessíveis
        </h1>

        <p className="max-w-[260px] text-start text-sm leading-5 text-slate-500 sm:max-w-none sm:text-[12px] sm:leading-normal">
          Encontre lugares e consulte informações para planejar sua visita.
        </p>
      </div>

      <div className="mb-5">
        <label className="mb-1 block text-start text-[11px] font-medium text-slate-700">
          Buscar
        </label>

        <div className="flex flex-col items-stretch gap-7 sm:flex-row sm:items-end sm:gap-4">
          <div className="w-full sm:w-[620px]">
            <CampoBusca
              value={busca}
              onChange={alterarBusca}
            />
          </div>

          <FiltrosCategoria
            selecionados={filtros}
            onChange={alterarFiltros}
            onClear={() => alterarFiltros([])}
          />
        </div>
      </div>

      <div className="mb-3 mt-5 flex flex-col gap-3 sm:mb-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-start text-[11px] text-slate-500"
          role="status"
          aria-live="polite"
        >
          {locaisFiltrados.length}{" "}
          {locaisFiltrados.length === 1
            ? "local encontrado"
            : "locais encontrados"}
        </p>

        <SeletorOrdenacao value={ordenacao} onChange={alterarOrdenacao} />
      </div>

      {locaisDaPagina.length ? (
        <div className="w-full overflow-hidden">
          {locaisDaPagina.map((local, index) => (
            <div
              key={local.id}
              className={`my-3 ${index !== locaisDaPagina.length - 1
                }`}
            >
              <LocalCard local={local} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-slate-200 px-6 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Nenhum local encontrado
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Tente alterar sua busca ou remover algum filtro.
          </p>
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="mt-6">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onChange={setPaginaAtual}
          />
        </div>
      )}
    </main>
  );
}