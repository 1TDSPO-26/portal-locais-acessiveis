export interface RecursoAcessibilidade {
  id: string;
  rotulo: string;
  status: "disponivel" | "indisponivel" | "naoInformado" | "naoSeAplica";
  detalhe: string;
}