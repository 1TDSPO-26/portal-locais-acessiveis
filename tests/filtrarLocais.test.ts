// Testes das regras de busca e filtro da listagem (src/utils/filtrarLocais.ts).
// Usa os mesmos dados do db.json que o JSON Server entrega.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import type { Local } from "../src/types/locais.ts";
import { filtrarLocais } from "../src/utils/filtrarLocais.ts";

const locais: Local[] = JSON.parse(
  readFileSync(new URL("../db.json", import.meta.url), "utf-8")
).locais;

const nomes = (lista: Local[]) => lista.map((local) => local.nome);

describe("filtrarLocais", () => {
  it("sem busca e sem filtros devolve todos os locais", () => {
    assert.equal(filtrarLocais(locais, "", []).length, locais.length);
  });

  it("busca pelo nome sem diferenciar maiúsculas e ignorando espaços nas pontas", () => {
    assert.deepEqual(nomes(filtrarLocais(locais, "  IBIRAPUERA ", [])), ["Parque Ibirapuera"]);
  });

  it("busca pelo endereço", () => {
    assert.deepEqual(nomes(filtrarLocais(locais, "paulista", [])), ["Museu de Arte de São Paulo"]);
  });

  it("filtra por recurso disponível", () => {
    // Estação da Luz e Igreja da Sé não têm banheiro "disponivel"; a UBS não tem nada informado
    const resultado = nomes(filtrarLocais(locais, "", ["banheiro"]));
    assert.deepEqual(resultado, [
      "Parque Ibirapuera",
      "Museu de Arte de São Paulo",
      "Biblioteca Mário de Andrade",
      "Shopping Center Norte",
    ]);
  });

  it("com vários filtros exige que todos estejam disponíveis", () => {
    const resultado = nomes(filtrarLocais(locais, "", ["vagas", "elevador"]));
    assert.deepEqual(resultado, ["Museu de Arte de São Paulo", "Shopping Center Norte"]);
  });

  it("combina busca e filtro", () => {
    assert.deepEqual(nomes(filtrarLocais(locais, "shopping", ["elevador"])), ["Shopping Center Norte"]);
    assert.deepEqual(filtrarLocais(locais, "igreja", ["elevador"]), []);
  });

  it("devolve lista vazia quando nada corresponde", () => {
    assert.deepEqual(filtrarLocais(locais, "xyz inexistente", []), []);
  });

  it("não altera a lista original", () => {
    const copia = structuredClone(locais);
    filtrarLocais(locais, "parque", ["banheiro"]);
    assert.deepEqual(locais, copia);
  });
});
