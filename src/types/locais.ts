interface RecursoAcessibilidade {
  id: string;
  rotulo: string;
  status: "disponivel" | "indisponivel" | "naoInformado" | "naoSeAplica";
  detalhe: string;
}

export interface Local {
  id: string;
  nome: string;
  categoria: "Parque" | "Cultura" | "Shopping" | "Serviço" | "Outro";
  cidade: string;
  endereco: string;
  contato?: string;
  descricao: string;
  imagemUrl?: string;
  recursos: RecursoAcessibilidade[];
}