import { Link } from "react-router";

import heroHome from "../../assets/images/hero-home.png";

export default function Home() {
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
                  className="pointer-events-none absolute top-1/2 left-3 h-[10px] w-[10px] -translate-y-1/2 text-[#64748B]"
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
                  placeholder="Buscar por nome, serviço ou endereço..."
                  className="h-[44px] w-full rounded-[8px] border border-[#CBD5E1] bg-white pr-3 pl-[30px] text-[14px] leading-[20px] text-[#0F172A] placeholder:font-normal placeholder:text-[#64748B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Link
                to="/locais"
                className="inline-flex items-center justify-center rounded-lg bg-[#005FCC] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 active:scale-95"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Explorar locais
              </Link>

              {/* Mobile: Saiba mais */}
              <Link
                to="/sobre"
                className="flex h-[44px] w-full items-center justify-center whitespace-nowrap rounded-[8px] border border-[#CBD5E1] bg-white px-4 text-[14px] font-medium leading-[20px] text-[#0052B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] sm:hidden"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Saiba mais
              </Link>

              {/* Desktop: Explorar locais, conforme Figma */}
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

      {/* LOCAIS EM DESTAQUE - ROBERTÃO */}
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

          <div>{/* Area reservada ao LocalCard */}</div>
        </div>
      </section>

      {/* CTA - MADU */}
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

          <Link
            to="/cadastrar"
            className="inline-flex items-center justify-center rounded-lg bg-[#005FCC] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 active:scale-95"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Adicionar local
          </Link>
        </div>
      </section>
    </>
  );
}
