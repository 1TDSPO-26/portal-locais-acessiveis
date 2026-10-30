
import type { Local } from "../types/locais";
import {
  distanciaDoLocal,
  type Coordenadas,
} from "./distanciaLocais";

export type CriterioOrdenacao =
  | "nome-asc"
  | "nome-desc"
  | "mais-recursos"
  | "distancia-asc"
  | "mais-proximos";

export const OPCOES_ORDENACAO: {
  valor: CriterioOrdenacao;
  rotulo: string;
}[] = [
  { valor: "nome-asc", rotulo: "Nome (A–Z)" },
  { valor: "nome-desc", rotulo: "Nome (Z–A)" },
  { valor: "mais-recursos", rotulo: "Mais recursos acessíveis" },
  { valor: "distancia-asc", rotulo: "Mais próximos (menor distância)" },
];

export function contarRecursosDisponiveis(local: Local): number {
  return local.recursos.filter(
    (recurso) => recurso.status === "disponivel",
  ).length;
}

const compararNomes = (a: Local, b: Local) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });

export function ordenarLocais(
  locais: Local[],
  criterio: CriterioOrdenacao,
  usuario?: Coordenadas | null,
): Local[] {
  const copia = [...locais];

  switch (criterio) {
    case "nome-desc":
      return copia.sort((a, b) => compararNomes(b, a));

    case "mais-recursos":
      return copia.sort(
        (a, b) =>
          contarRecursosDisponiveis(b) - contarRecursosDisponiveis(a) ||
          compararNomes(a, b),
      );

    case "distancia-asc":
    case "mais-proximos":
      if (!usuario) {
        return copia.sort(compararNomes);
      }

      return copia.sort((a, b) => {
        const distanciaA = distanciaDoLocal(a, usuario);
        const distanciaB = distanciaDoLocal(b, usuario);

        // Locais sem coordenadas ficam no final.
        if (distanciaA === null && distanciaB === null) {
          return compararNomes(a, b);
        }

        if (distanciaA === null) return 1;
        if (distanciaB === null) return -1;

        return distanciaA - distanciaB || compararNomes(a, b);
      });

    case "nome-asc":
    default:
      return copia.sort(compararNomes);
  }
}
