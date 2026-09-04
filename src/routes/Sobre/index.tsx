import { integrantes } from "../../types/integrantes";
export default function Sobre() {
  return (
    <div>
        <section className="grid gap-6 md:grid-cols-[1fr_280px] md:items-start">
          <div>
            <h1
              className="text-left font-semibold"
              style={{ fontSize: "28px", letterSpacing: "normal", margin: "0 0 8px" }}
            >
              Sobre o projeto
            </h1>
            <p className="mt-2 max-w-md text-left text-sm">
              O Acessa+ organiza informações sobre acessibilidade de locais e
              serviços para apoiar decisões com mais autonomia.
            </p>
          </div>
          <div className="flex h-32 items-center justify-center rounded-xl bg-blue-50 md:h-36">
            <span className="text-xs">Ilustração do projeto</span>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-3 text-left">
            <h2
              className="font-semibold"
              style={{ fontSize: "15px", letterSpacing: "normal", margin: "0 0 4px" }}
            >
              Nosso objetivo
            </h2>
            <p className="text-xs">
              Facilitar o acesso a informações claras sobre entrada, circulação,
              banheiro, estacionamento e atendimento.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-3 text-left">
            <h2
              className="font-semibold"
              style={{ fontSize: "15px", letterSpacing: "normal", margin: "0 0 4px" }}
            >
              Como funciona
            </h2>
            <p className="text-xs">
              Pessoas consultam os locais e, conforme o projeto evolui, podem
              contribuir com novas informações.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-3 text-left">
            <h2
              className="font-semibold"
              style={{ fontSize: "15px", letterSpacing: "normal", margin: "0 0 4px" }}
            >
              Para quem é
            </h2>
            <p className="text-xs">
              Pessoas com diferentes necessidades, familiares, cuidadores,
              pessoas idosas e cidadãos interessados.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-xl bg-blue-50 p-4 text-left">
          <h2
            className="font-semibold"
            style={{ fontSize: "16px", letterSpacing: "normal", margin: "0 0 4px" }}
          >
            Princípios do portal
          </h2>
          <p className="text-sm">
            Informação objetiva · autonomia do usuário · acessibilidade digital ·
            transparência sobre limites dos dados.
          </p>
        </section>

        <section className="mt-10 text-left">
          <h2
            className="font-semibold"
            style={{ fontSize: "16px", letterSpacing: "normal", margin: "0 0 4px" }}
          >
            Equipe do projeto
          </h2>
          <p className="text-sm">
            Os integrantes podem ser apresentados por seus perfis do GitHub,
            conforme a opção prevista na Issue.
          </p>
        </section>
        
        <section className="mt-10 text-left">
          <h2
            className="font-semibold"
            style={{ fontSize: "16px", letterSpacing: "normal", margin: "0 0 4px" }}
          >
            Equipe do projeto
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {integrantes.map((integrante) => (
              <div
                key={integrante.github}
                className="rounded-xl border border-gray-200 bg-white p-3 text-sm"
              >
                <a
                  href={`https://github.com/${integrante.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-700 underline"
                >
                  {integrante.nome}
                </a>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}