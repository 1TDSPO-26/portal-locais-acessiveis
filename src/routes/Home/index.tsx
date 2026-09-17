import { useMemo, useState } from "react";
import { Link } from "react-router";

import Button from "../../components/Button/Button";
import heroHome from "../../assets/images/hero-home.png";
import LocalCard from "../../components/LocalCard/LocalCard";
import { locaisMock } from "../../types/locais";

export default function Home() {
  const [busca, setBusca] = useState("");

  function limparBusca() {
    setBusca("");
  }

  const resultadosBusca = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return [];
    }

    return locaisMock.filter(
      (local) =>
        local.nome.toLowerCase().includes(termo) ||
        local.endereco.toLowerCase().includes(termo)
    );
  }, [busca]);

  return (
    <>
      {/* HERO */}
      <section className="w-full bg-white text-left">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-[18px] px-5 py-11 lg:grid-cols-[536px_536px] lg:gap-16 lg:px-[72px] lg:py-[72px]">
          <div className="flex w-full flex-col gap-[18px] lg:w-[536px] lg:gap-[22px]">
            <p
              className="m-0 text-[11px] font-semibold leading-[100%] tracking-normal text-[#0052B4] uppercase lg:text-[12px] lg:leading-[12px] lg:tracking-[1px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Portal colaborativo
            </p>

            <h1
              className="m-0! w-full max-w-[520px] text-[32px]! font-bold! leading-[40px]! tracking-[-0.5px] text-[#0F172A]! lg:text-[40px]! lg:leading-[48px]! lg:tracking-[-0.8px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Encontre locais e serviços que funcionam para você.
            </h1>

            <p
              className="m-0 w-full max-w-[520px] text-[16px] font-normal leading-[24px] text-[#475569] lg:text-[18px] lg:leading-[28px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Consulte informações claras sobre entrada, circulação, banheiros,
              estacionamento e atendimento antes de planejar sua visita.
            </p>

            <div className="flex w-full max-w-[520px] flex-col gap-[6px]">
              <label
                htmlFor="buscar-locais"
                className="text-[14px] font-medium leading-[20px] text-[#0F172A]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Buscar locais
              </label>

              <div className="relative">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute top-[22px] left-3 z-10 h-[10px] w-[10px] -translate-y-1/2 text-[#64748B]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

                <input
                  id="buscar-locais"
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por nome ou endereço..."
                  autoComplete="off"
                  className="h-[44px] w-full rounded-[8px] border border-[#CBD5E1] bg-white pr-3 pl-[30px] text-[14px] leading-[20px] text-[#0F172A] placeholder:font-normal placeholder:text-[#64748B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                {busca && (
                  <button
                    type="button"
                    onClick={limparBusca}
                    aria-label="Limpar busca"
                    className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
                  >
                    ✕
                  </button>
                )}


                {busca.trim() && resultadosBusca.length > 0 && (
                  <div className="absolute top-[50px] z-20 w-full overflow-hidden rounded-[8px] border border-[#CBD5E1] bg-white shadow-lg">
                    {resultadosBusca.map((local) => (
                      <Link
                        key={local.id}
                        to={`/locais/${local.id}`}
                        className="block border-b border-[#E2E8F0] px-4 py-3 last:border-b-0 hover:bg-[#F8FAFC] focus-visible:bg-[#F8FAFC] focus-visible:outline-2 focus-visible:outline-[#005FCC]"
                      >
                        <p className="m-0 text-[14px] font-semibold text-[#0F172A]">
                          {local.nome}
                        </p>

                        <p className="m-0 mt-1 text-[12px] text-[#64748B]">
                          {local.endereco}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button to="/locais">Explorar locais</Button>

              {/* Mobile: Saiba mais */}
              <Link
                to="/sobre"
                className="flex h-[44px] w-full items-center justify-center whitespace-nowrap rounded-[8px] border border-[#CBD5E1] bg-white px-4 text-[14px] font-medium leading-[20px] text-[#0052B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] sm:hidden"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Saiba mais
              </Link>

              {/* Desktop */}
              <Link
                to="/locais"
                className="hidden h-[44px] w-[130px] items-center justify-center whitespace-nowrap rounded-[8px] border border-[#CBD5E1] bg-white px-4 text-[14px] font-medium leading-[20px] text-[#0052B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] sm:flex"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Explorar locais
              </Link>
            </div>
          </div>

          <img
            src={heroHome}
            alt=""
            className="aspect-[536/437] w-full rounded-[24px] object-cover lg:h-[437px] lg:w-[536px]"
          />
        </div>
      </section>

      {/* LOCAIS EM DESTAQUE */}
      <section className="w-full bg-[#f8fafc] text-left">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-10 lg:px-[72px] lg:py-16">
          <div className="flex items-center justify-between">
            <h2
              className="m-0 text-[24px] !font-semibold leading-[32px] tracking-[-0.2px] !text-[#0F172A]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Locais em destaque
            </h2>

            <Link
              to="/locais"
              className="flex items-center gap-1 text-[14px] font-medium leading-[20px] tracking-[0px] text-[#0052B4]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ver todos →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {locaisMock.slice(0, 6).map((local) => (
              <div
                key={local.id}
                className="[&>article]:!flex-col [&>article>div:first-child]:!h-[130px] [&>article>div:first-child]:!w-full"
              >
                <LocalCard local={local} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#EFF6FF] text-left">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:gap-10 md:px-[72px] md:py-[52px]">
          <div>
            <h2
              className="m-0! text-[24px]! font-semibold! leading-[32px]! tracking-[-0.2px] text-[#0F172A]!"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ajude a manter as informações úteis
            </h2>

            <p
              className="mt-1 text-[16px] font-normal leading-[24px] text-[#475569]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Compartilhe informações sobre um local e ajude outras pessoas a
              planejar suas visitas.
            </p>
          </div>

          <Button to="/cadastrar">Adicionar local</Button>
        </div>
      </section>
    </>
  );
}