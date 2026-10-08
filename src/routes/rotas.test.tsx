import "@testing-library/jest-dom/vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import {
  act,
  cleanup,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { rotas } from "./rotas";
 
vi.mock("../hooks/useLocais", () => ({
  useLocais: () => ({
    locais: [],
    offline: false,
    carregando: false,
  }),
}));
 
const roteadores: ReturnType<typeof createMemoryRouter>[] = [];
 
beforeEach(() => {
  localStorage.clear();
});
 
afterEach(() => {
  cleanup();
 
  for (const roteador of roteadores) {
    roteador.dispose();
  }
 
  roteadores.length = 0;
  localStorage.clear();
});
 
function abrirRota(caminho: string) {
  const roteador = createMemoryRouter(rotas, {
    initialEntries: [caminho],
  });
 
  roteadores.push(roteador);
  render(<RouterProvider router={roteador} />);
 
  return roteador;
}
 
describe("Rotas com lazy loading", () => {
  it.each([
    ["/", "Encontre locais e serviços que funcionam para você."],
    ["/locais", "Locais acessíveis"],
    ["/locais/1", "Parque Ibirapuera"],
    ["/cadastrar", "Adicionar informações de um local"],
    ["/sobre", "Sobre o projeto"],
    ["/acessibilidade", "Acessibilidade"],
    ["/pagina-inexistente", "Página não encontrada"],
  ])("renderiza %s ao iniciar nessa rota", async (caminho, titulo) => {
    abrirRota(caminho);
 
    expect(
      await screen.findByRole("heading", { name: titulo }),
    ).toBeInTheDocument();
  });
 
  it("preserva o tratamento de um local inexistente", async () => {
    abrirRota("/locais/id-inexistente");
 
    expect(
      await screen.findByRole("heading", {
        name: "Local não encontrado",
      }),
    ).toBeInTheDocument();
  });
 
  it("permite navegar, voltar e avançar no histórico", async () => {
    const roteador = abrirRota("/");
 
    await screen.findByRole("heading", {
      name: "Encontre locais e serviços que funcionam para você.",
    });
 
    await act(async () => {
      await roteador.navigate("/sobre");
    });
 
    expect(
      await screen.findByRole("heading", { name: "Sobre o projeto" }),
    ).toBeInTheDocument();
 
    expect(roteador.state.location.pathname).toBe("/sobre");
 
    await act(async () => {
      await roteador.navigate(-1);
    });
 
    expect(
      await screen.findByRole("heading", {
        name: "Encontre locais e serviços que funcionam para você.",
      }),
    ).toBeInTheDocument();
 
    expect(roteador.state.location.pathname).toBe("/");
 
    await act(async () => {
      await roteador.navigate(1);
    });
 
    expect(
      await screen.findByRole("heading", { name: "Sobre o projeto" }),
    ).toBeInTheDocument();
 
    expect(roteador.state.location.pathname).toBe("/sobre");
  });
 
  it("permite abrir uma página pelo teclado usando um link real", async () => {
    const usuario = userEvent.setup();
    const roteador = abrirRota("/");
 
    await screen.findByRole("heading", {
      name: "Encontre locais e serviços que funcionam para você.",
    });
 
    const rodape = screen.getByRole("contentinfo");
 
    const navegacao = within(rodape).getByRole("navigation", {
      name: "Navegação do rodapé",
    });
 
    const linkSobre = within(navegacao).getByRole("link", {
      name: "Sobre",
    });
 
    linkSobre.focus();
    expect(linkSobre).toHaveFocus();
 
    await usuario.keyboard("{Enter}");
 
    expect(
      await screen.findByRole("heading", { name: "Sobre o projeto" }),
    ).toBeInTheDocument();
 
    expect(roteador.state.location.pathname).toBe("/sobre");
  });
});