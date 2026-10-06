// Testes do cliente base da API (src/services/api.ts).
// O fetch é substituído por um mock, então os testes não dependem do JSON Server.
import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

import { API_URL, ApiError, apiGet } from "../src/services/api.ts";

afterEach(() => {
  mock.restoreAll();
});

describe("apiGet", () => {
  it("usa http://localhost:3001 como URL padrão", () => {
    assert.equal(API_URL, "http://localhost:3001");
  });

  it("monta a URL com o caminho e devolve o JSON da resposta", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () =>
      Response.json([{ id: "1" }])
    );

    const dados = await apiGet<{ id: string }[]>("/locais");

    assert.deepEqual(dados, [{ id: "1" }]);
    assert.equal(fetchMock.mock.callCount(), 1);
    assert.equal(fetchMock.mock.calls[0].arguments[0], "http://localhost:3001/locais");
  });

  it("lança ApiError com o status quando a API responde com erro", async () => {
    mock.method(globalThis, "fetch", async () => new Response("Not Found", { status: 404 }));

    await assert.rejects(apiGet("/nao-existe"), (erro: unknown) => {
      assert.ok(erro instanceof ApiError);
      assert.equal(erro.status, 404);
      return true;
    });
  });

  it("lança ApiError com status 0 quando não consegue conectar", async () => {
    mock.method(globalThis, "fetch", async () => {
      throw new TypeError("fetch failed");
    });

    await assert.rejects(apiGet("/locais"), (erro: unknown) => {
      assert.ok(erro instanceof ApiError);
      assert.equal(erro.status, 0);
      assert.match(erro.message, /npm run api/);
      return true;
    });
  });

  it("repassa o cancelamento sem transformar em ApiError", async () => {
    const controle = new AbortController();
    controle.abort();
    mock.method(globalThis, "fetch", async () => {
      throw new DOMException("This operation was aborted", "AbortError");
    });

    await assert.rejects(apiGet("/locais", controle.signal), (erro: unknown) => {
      assert.ok(!(erro instanceof ApiError));
      assert.equal((erro as Error).name, "AbortError");
      return true;
    });
  });
});
