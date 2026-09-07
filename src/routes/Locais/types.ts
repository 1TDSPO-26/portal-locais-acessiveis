/**
 * Contrato de dados da feature Locais.
 *
 * Este arquivo é o "molde" que todo mundo do Grupo 5 usa.
 * Se precisar mudar alguma coisa aqui, fala no grupo ANTES de editar,
 * porque mexer neste arquivo quebra o código dos outros quatro.
 *
 * Todos os campos abaixo saíram das telas do Figma (Locais, Detalhes e Cadastro).
 * Não adicione campo que não aparece no design.
 */

/** Tag de categoria que aparece no canto do card. Figma: Section / Tag */
export type CategoriaLocal = "Parque" | "Cultura" | "Shopping" | "Serviço" | "Outro";

/**
 * Os quatro estados possíveis de um recurso de acessibilidade.
 * Figma: Section / Accessibility Item.
 *
 * O design é explícito: "Status sempre comunicado por ícone + texto.
 * Sem selo genérico de 'local acessível'." Ou seja, nunca resuma isso
 * num selo só. Cada recurso mostra o próprio status.
 *
 *  disponivel     -> check verde
 *  indisponivel   -> x vermelho
 *  naoInformado   -> ? azul
 *  naoSeAplica    -> traço cinza
 */
export type StatusRecurso =
  | "disponivel"
  | "indisponivel"
  | "naoInformado"
  | "naoSeAplica";

/** Os cinco recursos previstos no formulário de cadastro do Figma. */
export type RecursoId =
  | "entrada"
  | "banheiro"
  | "vagas"
  | "circulacao"
  | "elevador";

export interface RecursoAcessibilidade {
  id: RecursoId;
  /** Título curto. Ex.: "Entrada com rampa" */
  rotulo: string;
  status: StatusRecurso;
  /** Linha de apoio abaixo do rótulo. Ex.: "Acesso em nível e rampa" */
  detalhe: string;
}

export interface Local {
  id: string;
  /** Ex.: "Parque Ibirapuera" */
  nome: string;
  categoria: CategoriaLocal;
  /** Ex.: "São Paulo, SP" — é o que aparece no card */
  cidade: string;
  /** Ex.: "Av. Pedro Álvares Cabral, s/n" — aparece só na tela de detalhes */
  endereco: string;
  /** Pode não existir. O Figma mostra "Contato não informado" nesse caso. */
  contato?: string;
  /** Texto do bloco "Sobre o local", na tela de detalhes */
  descricao: string;
  /** Pode não existir. Sem ela, o card mostra o placeholder "Imagem do local". */
  imagemUrl?: string;
  recursos: RecursoAcessibilidade[];
}
