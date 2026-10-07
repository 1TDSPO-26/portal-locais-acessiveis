import { locaisMock, type Local } from "../types/locais";

const API_URL = import.meta.env.VITE_API_URL as string | undefined;
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

    const locais: Local[] = await resp.json();
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