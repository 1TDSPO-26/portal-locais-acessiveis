import Cards from "../../components/Cards/Cards";
import ilustracao from "../../img/imagem-pessoa-cadeirante.png";


export default function Sobre() {
  return (
    <div className="w-full min-h-screen px-5 pt-10 pb-11 flex flex-col gap-8 md:px-[72px] md:pt-16 md:pb-16 md:gap-11 mx-auto max-w-[1136px]">
        <section className="grid w-full gap-8 md:gap-16 md:min-h-[260px] grid-cols-1 md:grid-cols-[1fr_420px] md:items-center">
          <div className="flex w-full md:max-w-[652px] flex-col justify-center gap-[14px]">
            <h1
              className="text-left text-[32px] font-bold leading-[40px] tracking-[-0.5px] text-[#0F172A]"
            >
              Sobre o projeto
            </h1>
            <p className="text-left w-full max-w-[560px] text-[18px] font-normal leading-[28px] text-[#475569]">
              O Acessa+ organiza informações sobre acessibilidade para apoiar decisões com mais autonomia.
            </p>
          </div>
          <div className="flex h-[250px] md:h-[260px] w-full items-center justify-center rounded-[20px]">
            <img
              src={ilustracao}
              alt="Pessoa cadeirante"
              className="h-full w-full rounded-[20px] object-cover"
            />
          </div>
        </section>

        <section className="grid w-full min-h-[150px] gap-6 grid-cols-1 md:grid-cols-3">
          <div className="w-full rounded-[12px] border border-[#E2E8F0] p-6 text-left flex flex-col gap-2">
            <h2
              className="text-[20px] font-semibold leading-[28px] text-[#0F172A]"
            >
              Nosso objetivo
            </h2>
            <p className="text-[14px] font-normal leading-[20px] text-[#475569] mt-2">
              Facilitar o acesso a informações claras sobre condições de acessibilidade.
            </p>
          </div>

          <div className="min-h-[150px] w-full rounded-[12px] border border-[#E2E8F0] p-[22px] text-left">
            <h2
              className="text-[20px] font-semibold leading-[28px] text-[#0F172A]"
            >
              Como funciona
            </h2>
            <p className="text-[14px] font-normal leading-[20px] text-[#475569]">
              Consulte locais e, conforme o projeto evolui, contribua com informações.
            </p>
          </div>

          <div className="w-full rounded-[12px] border border-[#E2E8F0] p-6 text-left flex flex-col gap-2"> 
            <h2
              className="text-[20px] font-semibold leading-[28px] text-[#0F172A]"
            >
              Para quem é
            </h2>
            <p className="text-[14px] font-normal leading-[20px] text-[#475569] mt-2">
              Pessoas com diferentes necessidades e cidadãos interessados.
            </p>
          </div>
        </section>

        <section className="w-full min-h-[116px] rounded-[12px] bg-blue-50 p-5 flex flex-col gap-2 md:min-h-[124px] md:rounded-[14px] md:p-7 md:gap-3 text-left">
          <h2
            className="text-[24px] font-semibold leading-[32px] tracking-[-0.2px] text-[#0F172A]"
          >
            Princípios
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#475569]">
            Autonomia · clareza · acessibilidade digital · transparência.
          </p>
        </section>

        <Cards />
    </div>
  );
}