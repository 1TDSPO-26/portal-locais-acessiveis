/// <reference types="vite/client" />

// Camada base de comunicação com a API (JSON Server).
// Toda requisição do front passa por aqui, assim a URL e o tratamento
// de erros ficam em um lugar só.

const URL_PADRAO = "http://localhost:3001";

// No navegador, o Vite preenche import.meta.env com as variáveis do .env.
// Nos testes (Node), import.meta.env não existe, então usamos a URL padrão.
export const API_URL: string = (import.meta.env?.VITE_API_URL ?? URL_PADRAO).replace(/\/+$/, "");

/** Erro lançado quando a API não responde ou responde com status de erro. */
export class ApiError extends Error {
  status: number;

  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Faz um GET na API e devolve o JSON já convertido.
 * @param caminho rota do JSON Server, por exemplo "/locais"
 * @param signal permite cancelar a requisição (usado no useEffect)
 */
export async function apiGet<T>(caminho: string, signal?: AbortSignal): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${API_URL}${caminho}`, { signal });
  } catch (erro) {
    // Se a requisição foi cancelada de propósito, repassa o erro original.
    if (signal?.aborted) throw erro;

    throw new ApiError(
      "Não foi possível conectar à API. Verifique se o JSON Server está rodando (npm run api).",
      0
    );
  }

  if (!resposta.ok) {
    throw new ApiError(`A API respondeu com erro ${resposta.status} ao acessar ${caminho}.`, resposta.status);
  }

  return (await resposta.json()) as T;
}
