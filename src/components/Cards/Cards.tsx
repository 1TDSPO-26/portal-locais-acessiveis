import { integrantes } from "../../types/integrantes";

export default function Cards() {
    return (
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
    );
}
