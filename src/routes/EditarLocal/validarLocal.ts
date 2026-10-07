import type { Local } from "../../types/locais";

export type Categoria = Local["categoria"];
export type CampoTexto = "nome" | "categoria" | "cidade" | "endereco" | "contato" | "descricao";
export type Erros = Partial<Record<CampoTexto, string>>;
export type DadosFormulario = Pick<Local, "nome" | "categoria" | "cidade" | "endereco" | "descricao"> & {
    contato: string;
};

export const CATEGORIAS: Categoria[] = ["Parque", "Cultura", "Shopping", "Serviço", "Outro"];

// Ordem dos campos na tela, usada para levar o foco ao primeiro erro.
export const ORDEM_CAMPOS: CampoTexto[] = ["nome", "categoria", "cidade", "endereco", "contato", "descricao"];

/** Telefone opcional: se preenchido, precisa ter DDD (10 ou 11 dígitos). */
export function telefoneValido(valor: string): boolean {
    if (!/^[\d\s()+-]+$/.test(valor)) return false;
    const digitos = valor.replace(/\D/g, "");
    return digitos.length >= 10 && digitos.length <= 11;
}

/** Valida os dados do formulário de edição. Espaços em branco contam como vazio. */
export function validarLocal(dados: DadosFormulario): Erros {
    const erros: Erros = {};

    if (!dados.nome.trim()) erros.nome = "Informe o nome do local";
    else if (dados.nome.trim().length < 3) erros.nome = "O nome deve ter pelo menos 3 caracteres";

    if (!CATEGORIAS.includes(dados.categoria)) erros.categoria = "Selecione a categoria do local";
    if (!dados.cidade.trim()) erros.cidade = "Informe a cidade";
    if (!dados.endereco.trim()) erros.endereco = "Informe o endereço";

    if (dados.contato.trim() && !telefoneValido(dados.contato.trim())) {
        erros.contato = "Informe um telefone válido com DDD. Exemplo: (11) 3333-4444";
    }

    if (!dados.descricao.trim()) erros.descricao = "Informe uma descrição do local";

    return erros;
}