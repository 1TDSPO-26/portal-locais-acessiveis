// Persistência das edições de locais no navegador (localStorage).
// Enquanto a API não permite salvar alterações, os locais editados ficam
// guardados aqui e sobrepõem os dados do mock com o mesmo id.
import { locaisMock, type Local } from "../types/locais";

export const CHAVE_LOCAIS_EDITADOS = "portalLocaisEditados";

type LocaisEditados = Record<string, Local>;

function lerEdicoes(): LocaisEditados {
    try {
        const salvos = localStorage.getItem(CHAVE_LOCAIS_EDITADOS);
        if (!salvos) return {};

        const dados: unknown = JSON.parse(salvos);
        if (dados && typeof dados === "object" && !Array.isArray(dados)) {
            return dados as LocaisEditados;
        }
        return {};
    } catch {
        // JSON inválido ou localStorage indisponível: usa somente os dados originais.
        return {};
    }
}

/** Lista todos os locais, já com as edições salvas aplicadas. */
export function obterLocais(): Local[] {
    const edicoes = lerEdicoes();
    return locaisMock.map((local) => edicoes[local.id] ?? local);
}

/** Busca um local pelo id, considerando as edições salvas. */
export function obterLocalPorId(id: string): Local | undefined {
    return obterLocais().find((local) => local.id === id);
}

/**
 * Salva as alterações de um local existente.
 * Lança erro se o local não existir ou se não for possível gravar.
 */
export function salvarLocal(localAtualizado: Local): Local {
    const existe = locaisMock.some((local) => local.id === localAtualizado.id);
    if (!existe) {
        throw new Error("Local não encontrado para edição.");
    }

    const edicoes = lerEdicoes();
    edicoes[localAtualizado.id] = localAtualizado;
    localStorage.setItem(CHAVE_LOCAIS_EDITADOS, JSON.stringify(edicoes));

    return localAtualizado;
}