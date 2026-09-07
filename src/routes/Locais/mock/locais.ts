import type { Local } from "../types";

/**
 * Dados falsos usados enquanto a API não existe.
 *
 * A lista foi montada de propósito com casos que costumam quebrar layout,
 * porque o QA precisa deles para testar o comportamento visual:
 *
 *  1. Parque Ibirapuera        -> caso "bonito", tudo preenchido
 *  2. Museu de Arte de SP      -> nome médio, sem contato
 *  3. Biblioteca Mário de A.   -> NOME LONGO, precisa truncar sem quebrar o card
 *  4. Shopping Center Norte    -> categoria diferente (Shopping)
 *  5. Estação da Luz           -> tem recurso indisponível (x vermelho)
 *  6. Igreja da Sé             -> SEM imagem, cai no placeholder
 *  7. Unidade Básica de Saúde  -> quase tudo "não informado", card mais vazio
 *
 * Quando a API entrar, só troca a origem dos dados. O resto do código continua igual.
 */
export const locaisMock: Local[] = [
  {
    id: "1",
    nome: "Parque Ibirapuera",
    categoria: "Parque",
    cidade: "São Paulo, SP",
    endereco: "Av. Pedro Álvares Cabral, s/n",
    contato: "(11) 5574-5045",
    descricao:
      "Um dos principais parques urbanos de São Paulo, com áreas de lazer, cultura e convivência. Use as informações abaixo para avaliar se o local atende às suas necessidades.",
    imagemUrl: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=800",
    recursos: [
      { id: "entrada", rotulo: "Entrada com rampa", status: "disponivel", detalhe: "Acesso em nível e rampa" },
      { id: "banheiro", rotulo: "Banheiro acessível", status: "disponivel", detalhe: "Disponível" },
      { id: "circulacao", rotulo: "Circulação", status: "disponivel", detalhe: "Espaço adequado para circulação" },
      { id: "vagas", rotulo: "Vagas reservadas", status: "naoInformado", detalhe: "Não informado" },
      { id: "elevador", rotulo: "Elevador", status: "naoSeAplica", detalhe: "Não se aplica neste local" },
    ],
  },
  {
    id: "2",
    nome: "Museu de Arte de São Paulo",
    categoria: "Cultura",
    cidade: "São Paulo, SP",
    endereco: "Av. Paulista, 1578",
    descricao:
      "Museu com acervo de arte europeia e brasileira, em um dos endereços mais movimentados da cidade.",
    imagemUrl: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800",
    recursos: [
      { id: "entrada", rotulo: "Entrada com rampa", status: "disponivel", detalhe: "Acesso em nível" },
      { id: "banheiro", rotulo: "Banheiro acessível", status: "disponivel", detalhe: "Disponível" },
      { id: "circulacao", rotulo: "Circulação", status: "disponivel", detalhe: "Espaço adequado" },
      { id: "vagas", rotulo: "Vagas reservadas", status: "disponivel", detalhe: "Duas vagas sinalizadas" },
      { id: "elevador", rotulo: "Elevador", status: "disponivel", detalhe: "Atende todos os andares" },
    ],
  },
  {
    id: "3",
    nome: "Biblioteca Mário de Andrade",
    categoria: "Cultura",
    cidade: "São Paulo, SP",
    endereco: "Rua da Consolação, 94",
    contato: "(11) 3775-0002",
    descricao:
      "Biblioteca pública com espaços de leitura, estudo e exposições abertas ao público.",
    imagemUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    recursos: [
      { id: "entrada", rotulo: "Entrada com rampa", status: "disponivel", detalhe: "Rampa lateral" },
      { id: "banheiro", rotulo: "Banheiro acessível", status: "disponivel", detalhe: "Disponível" },
      { id: "circulacao", rotulo: "Circulação", status: "naoInformado", detalhe: "Não informado" },
      { id: "vagas", rotulo: "Vagas reservadas", status: "naoSeAplica", detalhe: "Não se aplica neste local" },
      { id: "elevador", rotulo: "Elevador", status: "disponivel", detalhe: "Disponível" },
    ],
  },
  {
    id: "4",
    nome: "Shopping Center Norte",
    categoria: "Shopping",
    cidade: "São Paulo, SP",
    endereco: "Travessa Casalbuono, 120",
    contato: "(11) 2224-5555",
    descricao:
      "Centro de compras com estacionamento próprio, praça de alimentação e cinema.",
    imagemUrl: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800",
    recursos: [
      { id: "entrada", rotulo: "Entrada com rampa", status: "disponivel", detalhe: "Acesso em nível" },
      { id: "banheiro", rotulo: "Banheiro acessível", status: "disponivel", detalhe: "Em todos os pisos" },
      { id: "circulacao", rotulo: "Circulação", status: "disponivel", detalhe: "Corredores largos" },
      { id: "vagas", rotulo: "Vagas reservadas", status: "disponivel", detalhe: "Vagas próximas à entrada" },
      { id: "elevador", rotulo: "Elevador", status: "disponivel", detalhe: "Disponível" },
    ],
  },
  {
    id: "5",
    nome: "Estação da Luz",
    categoria: "Cultura",
    cidade: "São Paulo, SP",
    endereco: "Praça da Luz, s/n",
    descricao:
      "Estação histórica que também abriga espaços culturais e conexões de transporte público.",
    imagemUrl: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800",
    recursos: [
      { id: "entrada", rotulo: "Entrada com rampa", status: "disponivel", detalhe: "Rampa na entrada principal" },
      { id: "banheiro", rotulo: "Banheiro acessível", status: "indisponivel", detalhe: "Não disponível" },
      { id: "circulacao", rotulo: "Circulação", status: "naoInformado", detalhe: "Não informado" },
      { id: "vagas", rotulo: "Vagas reservadas", status: "indisponivel", detalhe: "Não disponível" },
      { id: "elevador", rotulo: "Elevador", status: "disponivel", detalhe: "Disponível" },
    ],
  },
  {
    id: "6",
    nome: "Igreja da Sé",
    categoria: "Cultura",
    cidade: "São Paulo, SP",
    endereco: "Praça da Sé, s/n",
    descricao:
      "Catedral no centro da cidade, aberta à visitação durante o dia.",
    recursos: [
      { id: "entrada", rotulo: "Entrada com rampa", status: "disponivel", detalhe: "Acesso em nível pela lateral" },
      { id: "banheiro", rotulo: "Banheiro acessível", status: "naoInformado", detalhe: "Não informado" },
      { id: "circulacao", rotulo: "Circulação", status: "disponivel", detalhe: "Espaço adequado" },
      { id: "vagas", rotulo: "Vagas reservadas", status: "naoSeAplica", detalhe: "Não se aplica neste local" },
      { id: "elevador", rotulo: "Elevador", status: "naoSeAplica", detalhe: "Não se aplica neste local" },
    ],
  },
  {
    id: "7",
    nome: "Unidade Básica de Saúde Jardim São Luís",
    categoria: "Serviço",
    cidade: "São Paulo, SP",
    endereco: "Rua Nossa Senhora do Bom Conselho, 1200",
    descricao:
      "Unidade de atendimento em saúde. As informações de acessibilidade ainda estão sendo levantadas.",
    recursos: [
      { id: "entrada", rotulo: "Entrada com rampa", status: "naoInformado", detalhe: "Não informado" },
      { id: "banheiro", rotulo: "Banheiro acessível", status: "naoInformado", detalhe: "Não informado" },
      { id: "circulacao", rotulo: "Circulação", status: "naoInformado", detalhe: "Não informado" },
      { id: "vagas", rotulo: "Vagas reservadas", status: "naoInformado", detalhe: "Não informado" },
      { id: "elevador", rotulo: "Elevador", status: "naoInformado", detalhe: "Não informado" },
    ],
  },
];

/** Busca um local pelo id da URL. Usado na tela de detalhes. */
export function buscarLocalPorId(id: string): Local | undefined {
  return locaisMock.find((local) => local.id === id);
}
