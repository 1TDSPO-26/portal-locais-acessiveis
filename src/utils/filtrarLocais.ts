// Regras de busca e filtro da listagem de locais.
// Ficam fora do componente para poderem ser testadas sem abrir a tela.
import type { Local } from "../types/locais.ts";

/**
 * Filtra os locais pelo texto digitado (nome ou endereço) e pelos
 * recursos de acessibilidade marcados (todos precisam estar "disponivel").
 */
export function filtrarLocais(locais: Local[], busca: string, filtros: string[]): Local[] {
  const termo = busca.trim().toLowerCase();

  return locais.filter((local) => {
    const correspondeBusca =
      !termo ||
      local.nome.toLowerCase().includes(termo) ||
      local.endereco.toLowerCase().includes(termo);

    const possuiRecursos = filtros.every((id) =>
      local.recursos.some(
        (recurso) => recurso.id === id && recurso.status === "disponivel"
      )
    );

    return correspondeBusca && possuiRecursos;
  });
}
