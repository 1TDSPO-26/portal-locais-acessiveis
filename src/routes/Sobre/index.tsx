import { integrantes } from "../../types/integrantes";
import ilustracao from "../../img/imagem-pessoa-cadeirante.png";

export default function Sobre() {
  return (
    <div className="w-full min-h-screen px-5 pt-10 pb-11 flex flex-col gap-6 md:px-[72px] md:pt-16 md:pb-16 md:gap-11">
        <section className="grid w-full max-w-[1136px] gap-16 md:h-[260px] md:grid-cols-[1fr_280px] md:items-center">
          <div className="flex w-full max-w-[652px] flex-col justify-center gap-[14px]">
            <h1
              className="text-left text-[32px] font-bold leading-[40px] tracking-[-0.5px] text-[#0F172A]"
            >
              Sobre o projeto
            </h1>
            <p className="text-left w-full max-w-[560px] text-[18px] font-normal leading-[28px] text-[#475569]">
              O Acessa+ organiza informações sobre acessibilidade de locais e
              serviços para apoiar decisões com mais autonomia.
            </p>
          </div>
          <div className="flex h-[260px] w-full max-w-[420px] items-center justify-center rounded-[20px]">
            <img
              src={ilustracao}
              alt="Pessoa cadeirante"
              className="h-full w-full rounded-[20px] object-cover"
            />
          </div>
        </section>

        <section className="grid w-full max-w-[1136px] min-h-[150px] gap-5 md:grid-cols-3">
          <div className="min-h-[150px] w-full max-w-[350px] rounded-[12px] border border-[#E2E8F0] p-[22px] text-left">
            <h2
              className="text-[20px] font-semibold leading-[28px] text-[#0F172A]"
            >
              Nosso objetivo
            </h2>
            <p className="text-[14px] font-normal leading-[20px] text-[#475569]">
              Facilitar o acesso a informações claras sobre entrada, circulação,
              banheiro, estacionamento e atendimento.
            </p>
          </div>

          <div className="min-h-[150px] w-full max-w-[350px] rounded-[12px] border border-[#E2E8F0] p-[22px] text-left">
            <h2
              className="text-[20px] font-semibold leading-[28px] text-[#0F172A]"
            >
              Como funciona
            </h2>
            <p className="text-[14px] font-normal leading-[20px] text-[#475569]">
              Pessoas consultam os locais e, conforme o projeto evolui, podem
              contribuir com novas informações.
            </p>
          </div>

          <div className="min-h-[150px] w-full max-w-[350px] rounded-[12px] border border-[#E2E8F0] p-[22px] text-left">
            <h2
              className="text-[20px] font-semibold leading-[28px] text-[#0F172A]"
            >
              Para quem é
            </h2>
            <p className="text-[14px] font-normal leading-[20px] text-[#475569]">
              Pessoas com diferentes necessidades, familiares, cuidadores,
              pessoas idosas e cidadãos interessados.
            </p>
          </div>
        </section>

        <section className="mt-8 w-full max-w-[1136px] min-h-[116px] rounded-[12px] bg-blue-50 p-5 flex flex-col gap-2 md:min-h-[124px] md:rounded-[14px] md:p-7 md:gap-3 text-left">
          <h2
            className="text-[24px] font-semibold leading-[32px] tracking-[-0.2px] text-[#0F172A]"
          >
            Princípios do portal
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#475569]">
            Informação objetiva · autonomia do usuário · acessibilidade digital ·
            transparência sobre limites dos dados.
          </p>
        </section>
        
        <section className="mt-10 flex w-full max-w-[786px] flex-col gap-3 text-left">
          <h2
            className="text-[24px] font-semibold leading-[32px] tracking-[-0.2px] text-[#0F172A]"
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