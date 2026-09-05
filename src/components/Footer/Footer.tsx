import { NavLink } from "react-router";

const navItems = [
  { label: "Início", to: "/" },
  { label: "Locais", to: "/locais" },
  { label: "Sobre", to: "/sobre" },
];

const projetoItems = [
  { label: "Adicionar local", to: "/cadastrar" },
  { label: "Sobre o projeto", to: "/sobre" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 bg-[#0F172A] px-14 py-9 text-white md:flex-row md:items-start md:justify-between">
  
      <div className="flex max-w-88.75 flex-col gap-3">
        <div className="flex items-center gap-2 text-xl leading-7">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#2563EB]">
            /+
          </span>
          ACESSA +
        </div>
        <p className="text-sm leading-5 opacity-75">
          Informação para planejar visitas com mais autonomia.
        </p>
      </div>

      <div className="flex items-start gap-16">
        <nav aria-label="Navegação do rodapé">
          <h2 className="text-sm font-medium leading-5">Navegação</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className="block rounded text-sm leading-5 text-white/75 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] [&.active]:text-white [&.active]:underline [&.active]:underline-offset-4"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Links do projeto">
          <h2 className="text-sm font-medium leading-5">Projeto</h2>
          <ul className="mt-3 space-y-2">
            {projetoItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="block rounded text-sm leading-5 text-white/75 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] [&.active]:text-white [&.active]:underline [&.active]:underline-offset-4"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
