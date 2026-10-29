import { useEffect, useState } from "react";
import { Link } from "react-router";
import LocalCard from "../../../components/LocalCard/LocalCard";
import { useFavoritos } from "../../../hooks/useFavoritos";
import { listarLocais } from "../../../services/locaisService";
import type { Local } from "../../../types/locais";

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const [locais, setLocais] = useState<Local[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    document.title = "FAVORITOS | ACESSO+";

    const controller = new AbortController();

    listarLocais(controller.signal)
      .then(setLocais)
      .catch(() => {
        if (!controller.signal.aborted) setErro(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCarregando(false);
      });

    return () => controller.abort();
  }, []);

  const locaisFavoritos = locais.filter((local) =>
    favoritos.includes(local.id)
  );

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Meus favoritos
      </h1>

      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Aqui estão os locais que você salvou.
      </p>

      {carregando ? (
        <p role="status" className="py-10 text-center text-slate-500">
          Carregando favoritos...
        </p>
      ) : erro ? (
        <p role="alert" className="py-10 text-center text-red-600">
          Não foi possível carregar os locais. Tente novamente mais tarde.
        </p>
      ) : locaisFavoritos.length === 0 ? (
        <section className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-slate-200 px-6 py-10 text-center dark:border-slate-600">
          <div className="mb-4 rounded-full bg-amber-50 p-4 dark:bg-amber-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-10 w-10 text-amber-600 dark:text-amber-300"
              aria-hidden="true"
            >
              <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Seus favoritos estão vazios
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Você ainda não possui locais salvos nos favoritos.
            Explore os locais e salve aqueles que gostar.
          </p>

          <Link
            to="/locais"
            className="mt-5 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
          >
            Explorar locais
          </Link>
        </section>
      ) : (
        <div className="w-full">
          {locaisFavoritos.map((local) => (
            <div key={local.id} className="my-3">
              <LocalCard local={local} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}