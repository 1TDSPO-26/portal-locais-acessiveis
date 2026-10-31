
import { useEffect, useMemo, useState } from "react";

import CampoBusca from "../../components/CampoBusca/CampoBusca";
import FiltrosCategoria from "../../components/FiltrosCategoria/FiltrosCategoria";
import Paginacao from "../../components/Paginacao/Paginacao";
import LocalCard from "../../components/LocalCard/LocalCard";
import SeletorOrdenacao from "../../components/SeletorOrdenacao/SeletorOrdenacao";
import AvisoOffline from "../../components/AvisoOffline/AvisoOffline";
import ErroConsulta from "../../components/ErroConsulta/ErroConsulta";
import { useLocais } from "../../hooks/useLocais";
import { useGeolocalizacao } from "../../hooks/useGeolocalizacao";
import { useHistoricoBusca } from "../../hooks/useHistoricoBusca";
import type { Local } from "../../types/locais";
import { listarLocais } from "../../services/locaisService";
import { ordenarLocais, type CriterioOrdenacao } from "../../utils/ordenarLocais";
import { distanciaDoLocal } from "../../utils/distanciaLocais";

const ITENS_POR_PAGINA = 4;

export default function Locais() {
  const { offline } = useLocais();
  const { coordenadas, carregando: carregandoGeo, erro: erroGeo } = useGeolocalizacao();
  const { historico, salvarBusca, removerBusca, limparHistorico } =
    useHistoricoBusca();

  useEffect(() => {
    document.title = "LOCAIS | ACESSO+";
  }, []);

  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<string[]>([]);
  const [ordenacao, setOrdenacao] = useState<CriterioOrdenacao>("nome-asc");
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Dados vindos da API (JSON Server)
  const [locais, setLocais] = useState<Local[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const [tentando, setTentando] = useState(false);


  useEffect(() => {
    // Cancela a requisição se a tela for fechada antes da resposta chegar
    const controle = new AbortController();

    listarLocais(controle.signal)
      .then((dados) => {
        if (controle.signal.aborted) return;
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
        if (controle.signal.aborted) return;
        setCarregando(false);
        setTentando(false);
      });

    return () => controle.abort();
  }, [tentativa]);

  const tentarNovamente = () => {
    if (tentando) return;
    setTentando(true);
    setTentativa((valor) => valor + 1);
  };

  const locaisFiltrados = useMemo(() => {
    const filtrados = locais.filter((local) => {
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

    return ordenarLocais(filtrados, ordenacao, coordenadas);
  }, [locais, busca, filtros, ordenacao, coordenadas]);

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
    // Se o usuário tentar ordenar por distância mas não tiver coordenadas, não deixa
    if (criterio === "distancia-asc" && !coordenadas) {
      alert("Por favor, permita o acesso à sua localização para ordenar por distância.");
      return;
    }
    setPaginaAtual(1);
    setOrdenacao(criterio);
  };

  const alterarFiltros = (novosFiltros: string[]) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  const excluirLocal = (id: Local["id"]) => {
    const local = locais.find((local) => local.id === id);

    if (!local) return;

    const confirmou = window.confirm(
      `Tem certeza que deseja excluir o local "${local.nome}"?`
    );

    if (!confirmou) return;

    setLocais((locaisAtuais) =>
      locaisAtuais.filter((local) => local.id !== id)
    );
  };

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 sm:mb-5">
        <h1 className="mb-2 text-start text-2xl font-bold text-slate-900 dark:text-slate-100 sm:mb-0 sm:text-[inherit]">
          Locais acessíveis
        </h1>

        <p className="max-w-[260px] text-start text-sm leading-5 text-slate-500 dark:text-slate-400 sm:max-w-none sm:text-[12px] sm:leading-normal">
          Encontre lugares e consulte informações para planejar sua visita.
        </p>
      </div>

      {/* MENSAGEM DE STATUS DA GEOLOCALIZAÇÃO */}
      {carregandoGeo && (
        <div role="status" aria-live="polite" className="mb-4 flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
          Buscando sua localização...
        </div>
      )}

      {erroGeo && (
        <div role="status" aria-live="polite" className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          ⚠️ {erroGeo} (A ordenação por distância não estará disponível)
        </div>
      )}

      <div className="mb-5">
        <label className="mb-1 block text-start text-[11px] font-medium text-slate-700 dark:text-slate-300">
          Buscar
        </label>

        <div className="flex flex-col items-stretch gap-7 sm:flex-row sm:items-end sm:gap-4">
          <div className="w-full sm:w-[620px]">
            <CampoBusca
              value={busca}
              onChange={alterarBusca}
              onPesquisar={salvarBusca}
              historico={historico}
              onRemoverHistorico={removerBusca}
              onLimparHistorico={limparHistorico}
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
          className="flex min-h-64 items-center justify-center rounded-lg border border-slate-200 px-6 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400"
        >
          Carregando locais...
        </div>
      ) : erro ? (
        <ErroConsulta
          titulo="Não foi possível carregar os locais"
          mensagem={erro}
          tentando={tentando}
          onTentarNovamente={tentarNovamente}
        />
      ) : (
        <>
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

            <SeletorOrdenacao
              value={ordenacao}
              onChange={alterarOrdenacao}
              desabilitarDistancia={!coordenadas}
            />
          </div>

          {locaisDaPagina.length ? (
            <div className="w-full overflow-hidden">

              {locaisDaPagina.map((local) => (
                <div
                  key={local.id}
                  className="my-3"
                >
                  <LocalCard
                    local={local}
                    onExcluir={() => excluirLocal(local.id)}
                    distancia={coordenadas
                      ? distanciaDoLocal(local, coordenadas) ?? undefined
                      : undefined
                    }
                  />
                </div>
              ))}

            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-10 text-center dark:border-slate-600 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900">
                Nenhum local encontrado
              </h2>
              <div className="mb-4 rounded-full bg-blue-50 p-4 dark:bg-blue-950">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-10 w-10 text-blue-700 dark:text-blue-300"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                  <path d="M8 11h6" />
                </svg>
              </div>

              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Nenhum resultado encontrado
              </h2>

              <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                {busca.trim()
                  ? `Nenhum resultado encontrado para "${busca.trim()}".`
                  : "Nenhum local corresponde aos filtros selecionados."}
              </p>

              <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Verifique a ortografia ou tente outro termo. Você também pode remover os filtros.
              </p>

              <button
                type="button"
                onClick={() => {
                  alterarBusca("");
                  alterarFiltros([]);
                }}
                className="mt-5 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
              >
                Limpar pesquisa e filtros
              </button>
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
