import { Link } from "react-router";
import heroHome from "../../assets/images/hero-home.png";

export default function Home() {
  return (
    <section className="bg-white px-8 py-14 text-left md:px-16 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
            Portal colaborativo
          </p>

          <h1 className="m-0! max-w-[580px] text-[32px]! font-bold! leading-[1.12]! text-slate-950! md:text-[36px]!">
            Encontre locais e serviços que funcionam para você.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Consulte informações claras sobre entrada, circulação, banheiros,
            estacionamento e atendimento antes de planejar sua visita.
          </p>

          <div className="mt-6">
            <label
              htmlFor="buscar-locais"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Buscar locais
            </label>

            <input
              id="buscar-locais"
              type="text"
              placeholder="Buscar por nome, serviço ou endereço..."
              className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/locais"
              className="rounded-md bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Explorar locais
            </Link>

            <Link
              to="/sobre"
              className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Saiba mais
            </Link>
          </div>
        </div>

        <img
          src={heroHome}
          alt=""
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}
