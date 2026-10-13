import { Link, useParams } from "react-router";
import { buscarLocalPorId, type Local } from "../../types/locais";
import { useEffect, useState } from "react";
import BadgeAcessibilidade from "../../components/BadgeAcessibilidade/BadgeAcessibilidade";

type Recurso = Local["recursos"][number];
type StatusRecurso = Recurso["status"];

const CORES_STATUS: Record<StatusRecurso, string> = {
  disponivel: "text-green-600 dark:text-green-400",
  indisponivel: "text-red-600 dark:text-red-400",
  naoInformado: "text-blue-500 dark:text-blue-300",
  naoSeAplica: "text-gray-400 dark:text-slate-400",
};

function IconeStatus({ status }: { status: StatusRecurso }) {
  const cor = CORES_STATUS[status];

  if (status === "disponivel") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className={`h-5 w-5 shrink-0 ${cor}`}
        aria-hidden="true"
      >
        <path
          d="M4 10.5l4 4 8-9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === "indisponivel") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className={`h-5 w-5 shrink-0 ${cor}`}
        aria-hidden="true"
      >
        <path
          d="M6 6l8 8M14 6l-8 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (status === "naoInformado") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className={`h-5 w-5 shrink-0 ${cor}`}
        aria-hidden="true"
      >
        <circle
          cx="10"
          cy="10"
          r="7.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text
          x="10"
          y="14"
          textAnchor="middle"
          fontSize="9"
          fill="currentColor"
        >
          ?
        </text>
      </svg>
    );
  }

  // naoSeAplica
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`h-5 w-5 shrink-0 ${cor}`}
      aria-hidden="true"
    >
      <line
        x1="4"
        y1="10"
        x2="16"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LocalDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [mensagemCompartilhamento, setMensagemCompartilhamento] = useState("");

  const local = id ? buscarLocalPorId(id) : undefined;

  useEffect(() => {
    document.title = local
      ? `${local.nome} | ACESSO+`
      : "Local não encontrado | ACESSO+";
  }, [local]);

  const compartilharLocal = async () => {
    const caminhoLocal = `/local/${id}`;
    const urlParaCopiar = `${window.location.origin}${caminhoLocal}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: local?.nome,
          text: "Confira este local acessível",
          url: urlParaCopiar,
        });
      } else {
        await navigator.clipboard.writeText(urlParaCopiar);
        setMensagemCompartilhamento("Link copiado!");
      }
    } catch (error) {
      console.error("Erro ao compartilhar o local:", error);
    }
  };

  if (!local) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Local não encontrado
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          O local que você está procurando não existe ou foi removido.
        </p>
        <Link
          to="/locais"
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          ← Voltar para locais
        </Link>
      </main>
    );
  }
  
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link
        to="/locais"
        className="mb-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-300"
      >
        ← Voltar para locais
      </Link>

      <header className="mb-1 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
          {local.nome}
        </h1>

        <BadgeAcessibilidade texto={local.categoria} />

        <button
          type="button"
          onClick={compartilharLocal}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Compartilhar
        </button>

        {mensagemCompartilhamento && (
          <span
            className="text-sm text-green-600 dark:text-green-400"
            role="status"
          >
            {mensagemCompartilhamento}
          </span>
        )}
      </header>

      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        {local.cidade} · {local.endereco}
      </p>

      {local.imagemUrl ? (
        <figure className="mb-8">
          <img
            src={local.imagemUrl}
            alt={`Foto de ${local.nome}`}
            className="h-64 w-full rounded-lg object-cover sm:h-80"
          />
        </figure>
      ) : (
        <div className="mb-8 flex h-64 w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400 dark:bg-slate-800 dark:text-slate-400 sm:h-80">
          Sem imagem disponível
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section aria-labelledby="sobre-local">
            <h2
              id="sobre-local"
              className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              Sobre o local
            </h2>

            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {local.descricao}
            </p>
          </section>

          <section aria-labelledby="recursos-acessibilidade">
            <h2
              id="recursos-acessibilidade"
              className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              Recursos de acessibilidade
            </h2>
            <ul className="space-y-4">
              {local.recursos.map((recurso) => (
                <li key={recurso.id} className="flex items-start gap-3">
                  <IconeStatus status={recurso.status} />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {recurso.rotulo}
                    </p>

                    <p
                      className={`text-sm ${CORES_STATUS[recurso.status]}`}
                    >
                      {recurso.detalhe}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside
          className="h-fit rounded-lg bg-slate-50 p-5 dark:bg-slate-800"
          aria-labelledby="endereco-contato"
        >
          <h2
            id="endereco-contato"
            className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100"
          >
            Endereço e contato
          </h2>

          <address className="space-y-1 text-sm not-italic text-slate-600 dark:text-slate-300">
            <p>{local.endereco}</p>
            <p>{local.cidade}</p>
            <p>{local.contato || "Contato não informado"}</p>
          </address>
        </aside>
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950 dark:text-blue-300">
        As informações deste portal não representam certificação oficial de
        acessibilidade e não substituem avaliação técnica especializada.
      </div>
    </main>
  );
}