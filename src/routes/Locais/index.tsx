import { useEffect, useMemo, useState } from "react";

import CampoBusca from "../../components/CampoBusca/CampoBusca";
import FiltrosCategoria from "../../components/FiltrosCategoria/FiltrosCategoria";
import Paginacao from "../../components/Paginacao/Paginacao";
import LocalCard from "../../components/LocalCard/LocalCard";
import AvisoOffline from "../../components/AvisoOffline/AvisoOffline";

import { useLocais } from "../../hooks/useLocais";
import type { Local } from "../../types/locais";
import { listarLocais } from "../../services/locaisService";
// import { filtrarLocais } from "../../utils/filtrarLocais";

const ITENS_POR_PAGINA = 4;

export default function Locais() {
   const { offline} = useLocais();

  useEffect(() => {
    document.title = "LOCAIS | ACESSO+";
  }, []);

  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<string[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Dados vindos da API (JSON Server)
  const [locais, setLocais] = useState<Local[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    // Cancela a requisição se a tela for fechada antes da resposta chegar
    const controle = new AbortController();

    listarLocais(controle.signal)
      .then((dados) => {
        setLocais(dados);
        setErro(null);
      })
      .catch((falha: unknown) => {
        if (controle.signal.aborted) return;
        setErro(
          falha instanceof Error
            ? falha.message
            : "Não foi possível carregar os locais."
        );
      })
      .finally(() => {
        if (!controle.signal.aborted) setCarregando(false);
      });

    return () => controle.abort();
  }, [tentativa]);

  const tentarNovamente = () => {
    setCarregando(true);
    setErro(null);
    setTentativa((valor) => valor + 1);
  };

   const locaisFiltrados = useMemo(() => {
    return locais.filter((local) => {
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
  }, [locais, busca, filtros]);

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

     

      <AvisoOffline offline={offline} />

      {carregando ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-64 items-center justify-center rounded-lg border border-slate-200 px-6 text-sm text-slate-500"
        >
          Carregando locais...
        </div>
      ) : erro ? (
        <div
          role="alert"
          className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 px-6 text-center"
        >
          <h2 className="text-lg font-semibold text-red-800">
            Não foi possível carregar os locais
          </h2>

          <p className="mt-2 text-sm text-red-700">{erro}</p>

          <button
            type="button"
            onClick={tentarNovamente}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
      <>
      <p className="mb-3 mt-5 text-start text-[11px] text-slate-500 sm:mb-4 sm:mt-0">
        {locaisFiltrados.length}{" "}
        {locaisFiltrados.length === 1
          ? "local encontrado"
          : "locais encontrados"}
      </p>

      {carregando ? (
        <p className="text-start text-sm text-slate-500">Carregando locais...</p>
      ) : locaisDaPagina.length ? (
        <div className="w-full overflow-hidden">
          {locaisDaPagina.map((local, index) => (
            <div
              key={local.id}
              className={`my-3 ${
                index !== locaisDaPagina.length - 1
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
      </>
      )}
    </main>
  );
}
