import { describe, expect, it } from "vitest";

import { locaisMock, type Local } from "../types/locais";
import { contarRecursosDisponiveis, ordenarLocais } from "./ordenarLocais";

const nomes = (locais: Local[]) => locais.map((local) => local.nome);

describe("ordenarLocais", () => {
  it("ordena por nome de A a Z ignorando acentos", () => {
    const resultado = nomes(ordenarLocais(locaisMock, "nome-asc"));

    expect(resultado[0]).toBe("Biblioteca Mário de Andrade");
    // "Estação da Luz" deve vir antes de "Igreja da Sé"
    expect(resultado.indexOf("Estação da Luz")).toBeLessThan(
      resultado.indexOf("Igreja da Sé"),
    );
    expect(resultado.at(-1)).toBe("Unidade Básica de Saúde Jardim São Luís");
  });

  it("ordena por nome de Z a A", () => {
    const resultado = nomes(ordenarLocais(locaisMock, "nome-desc"));

    expect(resultado[0]).toBe("Unidade Básica de Saúde Jardim São Luís");
    expect(resultado.at(-1)).toBe("Biblioteca Mário de Andrade");
  });

  it("ordena por quantidade de recursos disponíveis, do maior para o menor", () => {
    const resultado = ordenarLocais(locaisMock, "mais-recursos");
    const contagens = resultado.map(contarRecursosDisponiveis);

    expect(contagens).toEqual([...contagens].sort((a, b) => b - a));
    expect(resultado[0].nome).toBe("Museu de Arte de São Paulo"); // 5 recursos
    expect(resultado.at(-1)?.nome).toBe(
      "Unidade Básica de Saúde Jardim São Luís",
    ); // 0 recursos
  });

  it("desempata por nome quando a quantidade de recursos é igual", () => {
    const resultado = nomes(ordenarLocais(locaisMock, "mais-recursos"));

    // Museu (5) e Shopping (5) empatam: Museu vem antes por ordem alfabética
    expect(resultado.indexOf("Museu de Arte de São Paulo")).toBeLessThan(
      resultado.indexOf("Shopping Center Norte"),
    );
  });

  it("não altera a lista original", () => {
    const antes = nomes(locaisMock);
    ordenarLocais(locaisMock, "nome-desc");

    expect(nomes(locaisMock)).toEqual(antes);
  });

  it("retorna lista vazia quando não há locais", () => {
    expect(ordenarLocais([], "nome-asc")).toEqual([]);
  });
});
