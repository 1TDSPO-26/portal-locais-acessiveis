
import type { Local } from "../types/locais";

export interface Coordenadas {
  latitude: number;
  longitude: number;
}

/**
 * Calcula a distância em quilômetros entre duas coordenadas.
 * Utiliza a fórmula de Haversine.
 */
export function calcularDistancia(
  origem: Coordenadas,
  destino: Coordenadas,
): number {
  const raioTerraKm = 6371;
  const grausParaRadianos = (graus: number) => (graus * Math.PI) / 180;

  const diferencaLatitude = grausParaRadianos(
    destino.latitude - origem.latitude,
  );

  const diferencaLongitude = grausParaRadianos(
    destino.longitude - origem.longitude,
  );

  const latitudeOrigem = grausParaRadianos(origem.latitude);
  const latitudeDestino = grausParaRadianos(destino.latitude);

  const a =
    Math.sin(diferencaLatitude / 2) ** 2 +
    Math.cos(latitudeOrigem) *
      Math.cos(latitudeDestino) *
      Math.sin(diferencaLongitude / 2) ** 2;

  const anguloCentral = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return raioTerraKm * anguloCentral;
}

/** Calcula a distância entre o usuário e um estabelecimento. */
export function distanciaDoLocal(
  local: Local,
  usuario: Coordenadas,
): number | null {
  if (local.latitude == null || local.longitude == null) {
    return null;
  }

  return calcularDistancia(usuario, {
    latitude: local.latitude,
    longitude: local.longitude,
  });
}

/** Formata a distância para exibição na interface. */
export function formatarDistancia(distanciaKm: number): string {
  if (distanciaKm < 1) {
    return `${Math.round(distanciaKm * 1000)} m`;
  }

  return `${distanciaKm.toFixed(1).replace(".", ",")} km`;
}
