import type { Local } from "../types/locais";

export type CriterioOrdenacao = "nome-asc" | "nome-desc" | "mais-recursos";

export const OPCOES_ORDENACAO: { valor: CriterioOrdenacao; rotulo: string }[] = [
  { valor: "nome-asc", rotulo: "Nome (A–Z)" },
  { valor: "nome-desc", rotulo: "Nome (Z–A)" },
  { valor: "mais-recursos", rotulo: "Mais recursos acessíveis" },
];

/** Quantidade de recursos de acessibilidade confirmados como disponíveis. */
export function contarRecursosDisponiveis(local: Local): number {
  return local.recursos.filter((recurso) => recurso.status === "disponivel")
    .length;
}

// "sensitivity: base" ignora acentos e maiúsculas: "Estação" fica junto do "E".
const compararNomes = (a: Local, b: Local) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });

/**
 * Retorna uma NOVA lista ordenada, sem alterar a original
 * (importante porque o array vem de locaisMock / do estado do React).
 */
export function ordenarLocais(
  locais: Local[],
  criterio: CriterioOrdenacao,
): Local[] {
  const copia = [...locais];

  switch (criterio) {
    case "nome-desc":
      return copia.sort((a, b) => compararNomes(b, a));

    case "mais-recursos":
      // Empate de recursos desempata por nome, para a ordem ser previsível.
      return copia.sort(
        (a, b) =>
          contarRecursosDisponiveis(b) - contarRecursosDisponiveis(a) ||
          compararNomes(a, b),
      );

    case "nome-asc":
    default:
      return copia.sort(compararNomes);
  }
}
