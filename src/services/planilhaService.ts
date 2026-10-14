

/** Nome da aba da planilha onde os cadastros são gravados. */
export const ABA_PLANILHA = "Locais";

/** Erro com mensagem pronta para mostrar na tela. `status` 0 = sem resposta. */
export class ErroPlanilha extends Error {
  status: number;

  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.name = "ErroPlanilha";
    this.status = status;
  }
}

/** Aceita o link completo da planilha ou só o ID e devolve o ID. */
export function extrairIdPlanilha(linkOuId: string): string {
  const texto = linkOuId.trim();
  const encontrado = texto.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return encontrado ? encontrado[1] : texto;
}

function mensagemDeErro(status: number): string {
  if (status === 401 || status === 403) {
    return `A planilha recusou a gravação (erro ${status}). Verifique a API key e a permissão da planilha.`;
  }
  if (status === 404) {
    return "Planilha não encontrada (erro 404). Confira o link no arquivo .env.";
  }
  if (status >= 500) {
    return "O Google Planilhas está indisponível no momento. Tente novamente mais tarde.";
  }
  return `Não foi possível gravar na planilha (erro ${status}).`;
}

/**
 * Adiciona linhas ao final da aba da planilha.
 * @param values lista de linhas; cada linha é a lista de valores das colunas
 */
export async function gravarNaPlanilha(values: (string | number)[][]): Promise<void> {
  const spreadsheetId = extrairIdPlanilha(import.meta.env.VITE_PLANILHA_URL ?? "");
  const apiKey = (import.meta.env.VITE_GOOGLE_API_KEY ?? "").trim();

  if (!spreadsheetId || !apiKey) {
    throw new ErroPlanilha("A planilha não está configurada. Preencha o arquivo .env.", 0);
  }

  const intervalo = encodeURIComponent(`${ABA_PLANILHA}!A1`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${intervalo}:append?valueInputOption=RAW&key=${apiKey}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });
  } catch {
    throw new ErroPlanilha("Não foi possível conectar ao Google Planilhas. Verifique sua internet.", 0);
  }

  if (!response.ok) {
    throw new ErroPlanilha(mensagemDeErro(response.status), response.status);
  }
}
