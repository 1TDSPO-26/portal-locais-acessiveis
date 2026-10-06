// Service de locais: concentra as chamadas ao recurso /locais do JSON Server.
// As telas usam estas funções e não precisam saber a URL nem usar fetch direto.
import type { Local } from "../types/locais.ts";
import { ApiError, apiGet } from "./api.ts";

const RECURSO_LOCAIS = "/locais";

/**
 * Lista todos os locais cadastrados (GET /locais).
 * @param signal permite cancelar a requisição (usado no useEffect)
 */
export async function listarLocais(signal?: AbortSignal): Promise<Local[]> {
  const locais = await apiGet<Local[]>(RECURSO_LOCAIS, signal);

  // O JSON Server devolve um array. Se vier outra coisa, algo está errado no db.json.
  if (!Array.isArray(locais)) {
    throw new ApiError("A API devolveu um formato inesperado para a lista de locais.", 200);
  }

  return locais;
}
