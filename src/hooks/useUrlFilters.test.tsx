import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import { useUrlFilters } from "./useUrlFilters";

describe("useUrlFilters", () => {
    it("lê os filtros presentes na URL", () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MemoryRouter initialEntries= { ["/locais?busca=restaurante&filtro=acessibilidade"]} >
            { children }
            </MemoryRouter>
);

    const { result } = renderHook(() => useUrlFilters(), { wrapper });

    expect(result.current.busca).toBe("restaurante");
    expect(result.current.filtros).toEqual(["acessibilidade"]);

});

it("altera a busca", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries= { ["/locais"]} >
        { children }
        </MemoryRouter>
);

const { result } = renderHook(() => useUrlFilters(), { wrapper });

act(() => {
    result.current.alterarBusca("restaurante");
});

expect(result.current.busca).toBe("restaurante");

});

it("limpa os filtros", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries= { ["/locais?busca=restaurante&filtro=acessibilidade"]} >
        { children }
        </MemoryRouter>
);

const { result } = renderHook(() => useUrlFilters(), { wrapper });

act(() => {
    result.current.limparFiltros();
});

expect(result.current.busca).toBe("");
expect(result.current.filtros).toEqual([]);

});
});