import { integrantes } from "../../types/integrantes";

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function Cards() {
  return (
    <section className="w-full max-w-[1136px] text-left">
      <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.2px] text-[#0F172A]">
        Equipe do projeto
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {integrantes.map((integrante) => {
          const [nome, cargo] = integrante.nome.split(" - ");

          return (
            <div
              key={integrante.github}
              className="flex flex-col items-center gap-2 rounded-[12px] border-2 border-[#CBD5E1] p-4 text-center"
            >
              <img
                src={`https://github.com/${integrante.github}.png`}
                alt={`Foto de ${nome}`}
                className="h-16 w-16 rounded-full object-cover"
              />

              <p className="text-[14px] font-semibold leading-[20px] text-[#0F172A]">
                {nome}
              </p>

              {cargo && (
                <span className="text-[12px] font-medium leading-[16px] text-[#475569]">
                  {cargo}
                </span>
              )}

              <a
                href={`https://github.com/${integrante.github}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub de ${nome}`}
                className="mt-1 text-[#475569] transition-colors hover:text-[#0F172A]"
              >
                <GithubIcon />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}