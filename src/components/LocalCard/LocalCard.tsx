import { NavLink } from "react-router";

import type { Local } from "../../types/locais";

import BadgeAcessibilidade from "../BadgeAcessibilidade/BadgeAcessibilidade";

interface LocalCardProps {
  local: Local;
}

export default function LocalCard({ local }: LocalCardProps) {
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

        <div>
          <span className="h-fit rounded-full bg-blue-50 px-2 py-1 text-[9px] text-blue-600">
            {local.categoria}
          </span>
        </div>
      </div>
    </article>
  );
}