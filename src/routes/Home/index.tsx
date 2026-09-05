import { Link } from "react-router";

import heroHome from "../../assets/images/hero-home.png";

export default function Home() {
  return (
    <section className="w-full bg-white px-8 py-16 text-left md:px-8">
      <div className="mx-auto grid w-full items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex w-full flex-col gap-[22px]">
          <p
            className="m-0 text-[12px] font-semibold leading-[12px] tracking-[1px] text-[#0052B4] uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Portal colaborativo
          </p>

          <h1
            className="m-0! max-w-[520px] text-[34px]! font-bold! leading-[41px]! tracking-[-0.8px] text-[#0F172A]! md:text-[40px]! md:leading-[48px]!"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Encontre locais e serviços que funcionam para você.
          </h1>

          <p
            className="m-0 max-w-[520px] text-[18px] font-normal leading-[28px] text-[#475569]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Consulte informações claras sobre entrada, circulação, banheiros,
            estacionamento e atendimento antes de planejar sua visita.
          </p>

          <div className="flex w-full max-w-[520px] flex-col gap-1">
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
                className="h-[44px] w-full rounded-[8px] border border-[#CBD5E1] bg-white pr-3 pl-[30px] text-[14px] leading-[20px] text-[#0F172A] placeholder:text-[#64748B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/locais"
              className="flex h-[44px] w-[130px] shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] bg-[#005FCC] px-4 text-[14px] font-medium leading-[20px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Explorar locais
            </Link>

            <Link
              to="/locais"
              className="flex h-[44px] w-[130px] shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border border-[#CBD5E1] bg-white px-4 text-[14px] font-medium leading-[20px] text-[#0052B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Explorar locais
            </Link>
          </div>
        </div>

        <img
          src={heroHome}
          alt=""
          className="aspect-[536/437] w-full rounded-[24px] object-cover"
        />
      </div>
    </section>
  );
}