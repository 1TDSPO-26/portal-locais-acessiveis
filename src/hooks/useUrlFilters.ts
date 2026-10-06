import { useSearchParams } from "react-router";

export type UrlFilters = {
    busca: string;
    filtros: string[];
};

export function useUrlFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = searchParams.get("busca") ?? "";

    const filtros = searchParams.getAll("filtro");

    const atualizarFiltros = (novosFiltros: UrlFilters) => {
        const params = new URLSearchParams();

        if (novosFiltros.busca.trim()) {
            params.set("busca", novosFiltros.busca);
        }

        novosFiltros.filtros.forEach((filtro) => {
            params.append("filtro", filtro);
        });

        setSearchParams(params);
    };

    const alterarBusca = (valor: string) => {
        atualizarFiltros({
            busca: valor,
            filtros,
        });
    };

    const alterarFiltros = (novosFiltros: string[]) => {
        atualizarFiltros({
            busca,
            filtros: novosFiltros,
        });
    };

    const limparFiltros = () => {
        atualizarFiltros({
            busca: "",
            filtros: [],
        });
    };

    return {
        busca,
        filtros,
        alterarBusca,
        alterarFiltros,
        limparFiltros,
    };
}