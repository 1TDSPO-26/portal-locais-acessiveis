// Service de locais: concentra as chamadas ao recurso /locais do JSON Server.
// As telas usam estas funções e não precisam saber a URL nem usar fetch direto.
import { locaisMock , type Local } from "../types/locais.ts";
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

const API_URL = typeof import.meta.env !== 'undefined' ? import.meta.env.VITE_API_URL : undefined;
const CHAVE_CACHE = "locais_cache";

export interface ResultadoLocais {
  locais: Local[];
  origem: "api" | "cache" | "local";
}

export async function buscarLocais(): Promise<ResultadoLocais> {
  try {
    if (!API_URL) throw new Error("API não configurada");

    const resp = await fetch(`${API_URL}/locais`);
    if (!resp.ok) throw new Error("Erro ao buscar locais");

    const locais: Local[] = await resp.json() as Local[];
    localStorage.setItem(CHAVE_CACHE, JSON.stringify(locais));
    return { locais, origem: "api" };
  } catch (erro) {
    // 🔍 Isto vai mostrar o erro real no F12 do navegador!
    console.error("❌ O FETCH DA API FALHOU POR ESTE MOTIVO:", erro);

    try {
      const cache = localStorage.getItem(CHAVE_CACHE);
      if (cache) return { locais: JSON.parse(cache), origem: "cache" };
    } catch {
      // cache indisponível
    }
    return { locais: locaisMock, origem: "local" };
  }
}
