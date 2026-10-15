// Converte os dados do formulário de cadastro em uma linha da planilha.
// Colunas da aba "Locais": Data | Nome | Tipo | Endereço | Recursos | Observações
export interface DadosCadastro {
  nome: string;
  tipo: string;
  endereco: string;
  recursos: string[];
  observacoes: string;
}

// Textos legíveis para os valores usados no SeletorTipoLocal e nos Checkboxes.
const TIPOS: Record<string, string> = {
  restaurante: "Restaurante",
  hospital: "Hospital",
  escola: "Escola",
  outro: "Outro",
};

const RECURSOS: Record<string, string> = {
  rampa: "Entrada com rampa ou acesso em nível",
  banheiro: "Banheiro acessível",
  vaga: "Vaga reservada",
  circulacao: "Espaço interno para circulação",
  elevador: "Elevador quando necessário",
};

function formatarData(data: Date): string {
  return data.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function montarLinhaCadastro(dados: DadosCadastro, agora: Date = new Date()): string[] {
  return [
    formatarData(agora),
    dados.nome.trim(),
    TIPOS[dados.tipo] ?? dados.tipo,
    dados.endereco.trim(),
    dados.recursos.map((recurso) => RECURSOS[recurso] ?? recurso).join(", "),
    dados.observacoes.trim(),
  ];
}