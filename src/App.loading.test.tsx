import "@testing-library/jest-dom/vitest";
import { lazy } from "react";
import type { ComponentType } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";
import {
    act,
    cleanup,
    render,
    screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

let roteador: ReturnType<typeof createMemoryRouter> | undefined;

afterEach(() => {
    cleanup();
    roteador?.dispose();
    roteador = undefined;
});

describe("Carregamento das páginas no layout", () => {
    it("mantém cabeçalho e rodapé enquanto a página carrega", async () => {
        let liberarPagina: (() => void) | undefined;

        const importacaoPendente = new Promise<{
            default: ComponentType;
        }>((resolve) => {
            liberarPagina = () => {
                resolve({
                    default: () => <h1>Página carregada</h1>,
                });
            };
        });

        const PaginaPendente = lazy(() => importacaoPendente);

        roteador = createMemoryRouter([
            {
                path: "/",
                element: <App />,
                children: [
                    {
                        index: true,
                        element: <PaginaPendente />,
                    },
                ],
            },
        ]);

        render(<RouterProvider router={roteador} />);

        const cabecalho = screen.getByRole("banner");
        const rodape = screen.getByRole("contentinfo");
        const carregamento = screen.getByRole("status");

        expect(carregamento).toHaveTextContent("Carregando página...");
        expect(carregamento).toHaveAttribute("aria-live", "polite");
        expect(carregamento).toHaveAttribute("aria-atomic", "true");

        expect(cabecalho).toBeInTheDocument();
        expect(rodape).toBeInTheDocument();

        expect(
            screen.queryByRole("heading", { name: "Página carregada" }),
        ).not.toBeInTheDocument();

        if (!liberarPagina) {
            throw new Error("A importação controlada não foi inicializada.");
        }

        const concluirImportacao = liberarPagina;

        await act(async () => {
            concluirImportacao();
            await importacaoPendente;
        });

        expect(
            await screen.findByRole("heading", { name: "Página carregada" }),
        ).toBeInTheDocument();

        expect(screen.queryByRole("status")).not.toBeInTheDocument();

        expect(screen.getByRole("banner")).toBe(cabecalho);
        expect(screen.getByRole("contentinfo")).toBe(rodape);
    });
});