import type { Local } from "../types/locais";
import { calcularDistanciaHaversine } from "./geolocalizacao";

export type CriterioOrdenacao = "nome-asc" | "nome-desc" | "mais-recursos" | "distancia-asc";

export const OPCOES_ORDENACAO: { valor: CriterioOrdenacao; rotulo: string }[] = [
  { valor: "nome-asc", rotulo: "Nome (A–Z)" },
  { valor: "nome-desc", rotulo: "Nome (Z–A)" },
  { valor: "mais-recursos", rotulo: "Mais recursos acessíveis" },
  { valor: "distancia-asc", rotulo: "Mais próximos (menor distância)" },
];

/** Quantidade de recursos de acessibilidade confirmados como disponíveis. */
export function contarRecursosDisponiveis(local: Local): number {
  return local.recursos.filter((recurso) => recurso.status === "disponivel")
    .length;
}

// "sensitivity: base" ignora acentos e maiúsculas: "Estação" fica junto do "E".
const compararNomes = (a: Local, b: Local) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });

export interface CoordenadasUsuario {
  latitude: number;
  longitude: number;
}

/**
 * Retorna uma NOVA lista ordenada, sem alterar a original
 * Se o critério for 'distancia-asc', é necessário passar as coordenadas do usuário.
 * (importante porque o array vem de locaisMock / do estado do React).
 */
export function ordenarLocais(
  locais: Local[],
  criterio: CriterioOrdenacao,
  coordenadasUsuario?: CoordenadasUsuario | null
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

    case "distancia-asc":
      // Se não tiver coordenadas, mantém a ordem alfabética como fallback
      if (!coordenadasUsuario) {
        return copia.sort(compararNomes);
      }

      return copia.sort((a, b) => {
        const distA = calcularDistanciaHaversine(
          coordenadasUsuario.latitude,
          coordenadasUsuario.longitude,
          a.latitude,
          a.longitude
        );
        const distB = calcularDistanciaHaversine(
          coordenadasUsuario.latitude,
          coordenadasUsuario.longitude,
          b.latitude,
          b.longitude
        );
        return distA - distB;
      });

    case "nome-asc":
    default:
      return copia.sort(compararNomes);
  }
}
