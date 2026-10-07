import { NavLink } from "react-router";

import type { Local } from "../../types/locais";

import BadgeAcessibilidade from "../BadgeAcessibilidade/BadgeAcessibilidade";

import { useFavoritos } from "../../hooks/useFavoritos";

interface LocalCardProps {
  local: Local;
}

export default function LocalCard({ local }: LocalCardProps) {

  const { alternarFavorito, ehFavorito } = useFavoritos();
  const favoritado = ehFavorito(local.id);

  const recursosDisponiveis = local.recursos.filter(
    (recurso) => recurso.status === "disponivel"
  );

  return (
    <article className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
      <div className="w-full h-[125px] sm:h-auto sm:w-[14rem] shrink-0 bg-slate-100">
        {local.imagemUrl ? (
          <img
            src={local.imagemUrl}
            alt={local.nome}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Imagem do local
          </div>
        )}
      </div>

      <div className="flex flex-1 justify-between gap-4 p-3 sm:p-4">
        <div className="flex-1 text-start">
          <h2 className="text-base sm:text-lg font-semibold text-black">
            {local.nome}
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {local.cidade}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {recursosDisponiveis.map((recurso) => (
              <BadgeAcessibilidade
                key={recurso.id}
                texto={recurso.rotulo}
              />
            ))}
          </div>

          <NavLink
            to={`/locais/${local.id}`}
            className="mt-2 sm:mt-3 inline-block text-xs sm:text-sm font-medium text-blue-600 hover:underline"
          >
            Ver detalhes →
          </NavLink>
        </div>

        <div className="flex flex-col items-end justify-between h-full min-h-[85px] shrink-0">
          <span className="h-fit rounded-full bg-blue-50 px-2 py-1 text-[9px] text-blue-600">
            {local.categoria}
          </span>

          <button 
            type="button"
            className={`mt-auto p-1.5 rounded-full transition-transform hover:scale-110 active:scale-95 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              favoritado ? 'text-amber-400' : 'text-slate-300 hover:text-slate-400'
            }`}
            onClick={(e) => {
              e.preventDefault();
              alternarFavorito(local.id);
            }}
            aria-label={favoritado ? `Remover ${local.nome} dos favoritos` : `Favoritar ${local.nome}`}
            aria-pressed={favoritado}
          >
            <svg 
              xmlns="http://w3.org" 
              viewBox="0 0 576 512" 
              fill={favoritado ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="32" 
              className="w-4 h-4"
            >
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}