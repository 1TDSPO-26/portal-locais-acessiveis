import type { Local } from "../types/locais";

const URL = "http://localhost:3001/locais";

function verificarResposta(resposta: Response): void {
    if (!resposta.ok){
        if (resposta.status == 404){
            throw new Error("Local não encontrado!");
        } throw new Error(`A operação falhou! Erro: ${resposta.status}`);
        }
    }

export async function listarLocais(limit?: number, signal?: AbortSignal): Promise<Local[]> {

    if (limit) {
        const resposta = await fetch(`${URL}?_page=1&_per_page=${limit}`, { signal });
        verificarResposta(resposta);
        const paginado = await resposta.json();
        return paginado.data;
    }

    const resposta = await fetch(URL, { signal });
    verificarResposta(resposta);
    return resposta.json();
}

export async function buscarLocal(id: string, signal?: AbortSignal): Promise<Local> {
    const resposta = await fetch(`${URL}/${encodeURIComponent(id)}`, { signal });
    verificarResposta(resposta);
    return resposta.json();
}