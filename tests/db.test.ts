// Testes dos dados iniciais do JSON Server (db.json).
// Garantem que a coleção "locais" existe e segue o formato da interface Local.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const db = JSON.parse(readFileSync(new URL("../db.json", import.meta.url), "utf-8"));

const CATEGORIAS = ["Parque", "Cultura", "Shopping", "Serviço", "Outro"];
const STATUS = ["disponivel", "indisponivel", "naoInformado", "naoSeAplica"];

describe("db.json", () => {
  it("possui a coleção locais com pelo menos um item", () => {
    assert.ok(Array.isArray(db.locais), "db.locais deveria ser um array");
    assert.ok(db.locais.length > 0, "db.locais não deveria estar vazio");
  });

  it("não possui ids repetidos", () => {
    const ids = db.locais.map((local: { id: string }) => local.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("cada local tem os campos obrigatórios da interface Local", () => {
    for (const local of db.locais) {
      for (const campo of ["id", "nome", "cidade", "endereco", "descricao"]) {
        assert.equal(typeof local[campo], "string", `local ${local.id}: campo ${campo}`);
        assert.ok(local[campo].trim() !== "", `local ${local.id}: campo ${campo} vazio`);
      }
      assert.ok(CATEGORIAS.includes(local.categoria), `local ${local.id}: categoria inválida`);
      assert.ok(Array.isArray(local.recursos), `local ${local.id}: recursos deveria ser array`);
    }
  });

  it("cada recurso de acessibilidade tem um status válido", () => {
    for (const local of db.locais) {
      for (const recurso of local.recursos) {
        assert.equal(typeof recurso.id, "string");
        assert.equal(typeof recurso.rotulo, "string");
        assert.equal(typeof recurso.detalhe, "string");
        assert.ok(STATUS.includes(recurso.status), `local ${local.id}: status ${recurso.status} inválido`);
      }
    }
  });
});
