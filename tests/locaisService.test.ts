// Testes do service de locais (src/services/locaisService.ts).
// O fetch é simulado com os próprios dados do db.json.
import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { ApiError } from "../src/services/api.ts";
import { listarLocais } from "../src/services/locaisService.ts";

const db = JSON.parse(readFileSync(new URL("../db.json", import.meta.url), "utf-8"));

afterEach(() => {
  mock.restoreAll();
});

describe("listarLocais", () => {
  it("faz GET em /locais e devolve todos os locais", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => Response.json(db.locais));

    const locais = await listarLocais();

    assert.equal(fetchMock.mock.callCount(), 1);
    assert.equal(fetchMock.mock.calls[0].arguments[0], "/api/locais");
    assert.equal(locais.length, db.locais.length);
    assert.equal(locais[0].nome, "Parque Ibirapuera");
  });

  it("devolve lista vazia quando não há locais cadastrados", async () => {
    mock.method(globalThis, "fetch", async () => Response.json([]));

    assert.deepEqual(await listarLocais(), []);
  });

  it("repassa o signal para o fetch", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => Response.json([]));
    const controle = new AbortController();

    await listarLocais(controle.signal);

    const opcoes = fetchMock.mock.calls[0].arguments[1] as RequestInit;
    assert.equal(opcoes.signal, controle.signal);
  });

  it("lança ApiError quando a resposta não é uma lista", async () => {
    mock.method(globalThis, "fetch", async () => Response.json({ erro: "formato errado" }));

    await assert.rejects(listarLocais(), ApiError);
  });

  it("lança ApiError quando a API responde com erro", async () => {
    mock.method(globalThis, "fetch", async () => new Response("erro", { status: 500 }));

    await assert.rejects(listarLocais(), (erro: unknown) => {
      assert.ok(erro instanceof ApiError);
      assert.equal(erro.status, 500);
      return true;
    });
  });
});
