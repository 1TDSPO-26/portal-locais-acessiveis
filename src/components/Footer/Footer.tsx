import { NavLink } from "react-router";
import { footerLink } from "../../design-system/tokens";

const navItems = [
  { label: "Início", to: "/" },
  { label: "Locais", to: "/locais" },
  { label: "Sobre", to: "/sobre" },
  { label: "Acessibilidade", to: "/acessibilidade" },
];

const projetoItems = [
  { label: "Adicionar local", to: "/cadastrar" },
  { label: "Sobre o projeto", to: "/sobre" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 bg-ink px-14 py-9 text-white md:flex-row md:items-start md:justify-between">
      <div className="flex max-w-88.75 flex-col gap-3">
        <div className="flex items-center gap-2 text-xl leading-7">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface text-sm font-bold text-primary">
            /+
          </span>
          ACESSO+
        </div>
        <p className="text-left text-sm leading-5 opacity-75">
          Informação para planejar visitas com mais autonomia.
        </p>
      </div>

      <div className="flex items-start gap-16">
        <nav aria-label="Navegação do rodapé">
          <h2 className="text-sm font-medium leading-5 text-white">Navegação</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }: { isActive: boolean }) =>
                    footerLink(isActive)
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Links do projeto">
          <h2 className="text-sm font-medium leading-5 text-white">Projeto</h2>
          <ul className="mt-3 space-y-2">
            {projetoItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    footerLink(isActive)
                  }
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