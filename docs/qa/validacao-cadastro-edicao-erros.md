# Plano e relatório de validação — cadastro, edição e mensagens de erro

## Identificação

- Turma: 1TDSPO
- CP: CP2
- QA responsável: Arthur Carvalho Brito Martins — RM 572325
- Issue de QA: #62 — Validar cadastro, edição e mensagens de erro
- Data da execução: 06/10/2026
- Branch do QA: `feature/62-validacao-cadastro-edicao-erros`
- Versão analisada: `develop` — commit `5c9be20`
- Ambiente: aplicação local executada no Google Chrome
- Viewports testados: desktop e móvel com 375 × 667 pixels
- Pull Requests relacionadas: nenhuma PR específica de cadastro ou edição foi utilizada nesta execução

## Objetivo

Validar os fluxos disponíveis de cadastro e edição de locais, além das mensagens e situações de erro. Registrar o que funciona, o que falha e o que ainda não está implementado, sem desenvolver ou corrigir as funcionalidades avaliadas.

## Escopo

Este ciclo verificou:

- abertura do formulário de cadastro;
- cadastro de um local com dados válidos;
- confirmação e cancelamento do envio;
- persistência do local cadastrado;
- possibilidade de continuar utilizando o sistema depois do cadastro;
- disponibilidade do fluxo de edição;
- validações de campos obrigatórios;
- preenchimento somente com espaços;
- envio de informações incompletas;
- regras de formato, quando existentes;
- clareza das mensagens de erro;
- comportamento do foco depois de um erro;
- indisponibilidade da API, quando aplicável;
- acesso a um local inexistente;
- navegação por teclado;
- responsividade em tela móvel.

## Pré-condições

- Projeto executado a partir da versão identificada neste documento.
- Dependências instaladas com `npm ci`.
- Aplicação disponível em ambiente local.
- Navegador e tamanho de tela registrados durante a execução.
- Dados fictícios utilizados nos testes.
- Nenhum dado pessoal, senha ou token utilizado nas evidências.

## Cenários executados

| ID | Cenário | Passos executados | Resultado esperado | Resultado encontrado | Situação | Evidência |
| --- | ------- | ----------------- | ------------------- | -------------------- | -------- | --------- |
| CAD-01 | Abrir o cadastro | Acessada a rota `/cadastrar`. | O formulário deve abrir e apresentar os campos necessários. | O formulário abriu com os campos de nome, tipo, endereço, recursos, observações e botão de envio. | Aprovado | `cad-01-formulario-aberto.png` |
| CAD-02 | Enviar cadastro válido | Preenchidos os campos obrigatórios com dados válidos e selecionado “Enviar informações”. | O envio deve ser aceito e apresentar uma confirmação clara. | Foi apresentado modal com a pergunta de confirmação e as opções “Cancelar” e “Confirmar”. | Aprovado | `cad-02-cadastro-valido-confirmacao.png` |
| CAD-03 | Confirmar o envio | Selecionada a opção “Confirmar” no modal. | A confirmação deve ser concluída e o usuário deve conseguir prosseguir. | O modal fechou, os campos foram limpos e a página continuou utilizável, mas nenhuma mensagem final de sucesso foi apresentada. | Aprovado com ressalva | `cad-03-apos-confirmar-envio.png` |
| CAD-04 | Verificar persistência | Procurado o local “Local Teste QA” na listagem antes e depois de atualizar a página. | O local deve continuar disponível com os dados informados. | A busca apresentou “0 locais encontrados” e “Nenhum local encontrado”. O cadastro não foi persistido. | Reprovado | `cad-04-verificacao-persistencia.png` |
| CAD-05 | Cancelar a confirmação | Preenchido o formulário, aberta a confirmação e selecionada a opção “Cancelar”. | O modal deve fechar sem enviar e os dados preenchidos devem permanecer disponíveis para revisão. | O modal fechou e todos os dados preenchidos permaneceram no formulário. | Aprovado | `cad-05-cancelamento-preserva-dados.png` |
| EDI-01 | Acessar a edição | Aberta a página de detalhes de um local existente e procurada uma opção de edição. | A funcionalidade de edição deve estar disponível quando implementada. | Não existe botão, link ou rota visível para edição na versão testada. | Bloqueado | `edi-01-edicao-indisponivel.png` |
| EDI-02 | Editar e salvar | Não executado porque a funcionalidade de edição não está disponível. | A alteração deve ser aceita e apresentar uma confirmação clara. | Não foi possível alterar ou salvar informações de um local. | Bloqueado | Mesma limitação demonstrada em `edi-01-edicao-indisponivel.png` |
| EDI-03 | Verificar persistência da edição | Não executado porque a funcionalidade de edição não está disponível. | A informação alterada deve permanecer atualizada. | Não foi possível verificar a persistência de uma edição. | Bloqueado | Mesma limitação demonstrada em `edi-01-edicao-indisponivel.png` |
| ERR-01 | Campos obrigatórios vazios | Enviado o formulário com todos os campos obrigatórios vazios. | O envio deve ser impedido e cada pendência deve ser explicada claramente. | O envio foi impedido e foram apresentados erros para nome, tipo, endereço e recursos de acessibilidade. | Aprovado | `err-01-campos-obrigatorios-vazios.png` |
| ERR-02 | Campos somente com espaços | Nome e endereço foram preenchidos somente com espaços; os demais campos foram preenchidos. | Os espaços devem ser tratados como conteúdo vazio e o envio deve ser impedido. | Os espaços foram tratados como conteúdo vazio e foram apresentados erros para nome e endereço. | Aprovado | `err-02-campos-somente-espacos.png` |
| ERR-03 | Informações incompletas | Preenchidos nome, tipo e recurso, mantendo somente o endereço vazio. | O envio deve ser impedido e os campos pendentes devem ser identificados. | O envio foi impedido, somente o endereço foi marcado como pendente e os demais dados permaneceram preenchidos. | Aprovado | `err-03-informacoes-incompletas.png` |
| ERR-04 | Dados com formato inválido | Inspecionados os campos disponíveis e suas regras de validação. | O sistema deve rejeitar formatos inválidos quando existir uma regra de formato. | Não foram identificadas regras específicas de formato nos campos disponíveis. | Não aplicável | Limitação registrada neste relatório |
| ERR-05 | Clareza das mensagens | Analisadas as mensagens produzidas pelos cenários ERR-01, ERR-02 e ERR-03. | As mensagens devem identificar o problema e orientar a correção. | As mensagens identificaram diretamente cada campo pendente e indicaram a correção necessária. | Aprovado | Evidências de `ERR-01`, `ERR-02` e `ERR-03` |
| ERR-06 | Foco depois do erro | Enviado o formulário com campos obrigatórios vazios e observada a posição do foco. | O foco deve ser levado ao primeiro erro ou permitir que ele seja encontrado facilmente pelo teclado. | O foco não foi direcionado automaticamente ao primeiro campo com erro. | Reprovado | `err-01-campos-obrigatorios-vazios.png` |
| ERR-07 | Falha do serviço ou API | Verificada a existência de integração do cadastro e da edição com serviço ou API. | O sistema deve informar uma falha do serviço sem indicar sucesso. | A versão testada não possui integração de cadastro ou edição com API, portanto a indisponibilidade não pôde ser simulada. | Não aplicável | Limitação registrada neste relatório |
| ERR-08 | Local inexistente | Acessada diretamente a rota `/locais/999999`. | O sistema deve informar que o local não foi encontrado e oferecer uma forma de continuar. | Foi apresentada mensagem clara de local não encontrado e botão para voltar à listagem. | Aprovado | `err-08-local-inexistente.png` |
| ACE-01 | Navegação por teclado | Percorrido o formulário com Tab e Shift+Tab; testados os controles do modal e a tecla Esc. | Os controles devem seguir uma ordem compreensível e apresentar foco visível. | A ordem foi lógica, o foco permaneceu visível e os controles do modal responderam ao teclado. | Aprovado | `ace-01-navegacao-teclado.png` |
| RES-01 | Responsividade | Testado o formulário em viewport móvel de 375 × 667 pixels. | O formulário deve permanecer legível e utilizável, sem rolagem horizontal indevida. | O formulário permaneceu legível, utilizável e sem rolagem horizontal indevida. | Aprovado | `res-01-formulario-mobile.png` |

## Automação

Na versão testada não foi encontrado comando ou estrutura de testes automatizados no `package.json`.

Conforme a orientação recebida, não foi configurado um ambiente de automação do zero. Os cenários foram executados manualmente com passos e evidências reproduzíveis.

## Validações técnicas

- `npm ci`: dependências instaladas com sucesso. O comando informou uma vulnerabilidade de alta severidade nas dependências.
- `npm run lint`: concluído com 0 erros e 0 avisos.
- `npm run build`: concluído com sucesso.
- Nenhuma correção automática de dependências foi aplicada, pois isso alteraria arquivos fora do escopo da atividade de QA.

Evidências:

- `01-lint-sem-erros.png`
- `02-build-sem-erros.png`

## Registro das evidências

Cada cenário executado contém:

- cenário testado;
- passos executados;
- resultado esperado;
- resultado encontrado;
- situação;
- evidência ou limitação;
- descrição do defeito, quando aplicável.

As imagens foram armazenadas localmente na pasta:

`C:\Fiap\front-end\projeto-qa\evidencias-qa-62`

A pasta está fora do repositório e não altera o código do projeto. As imagens serão anexadas individualmente à Pull Request da entrega.

## Defeitos encontrados

| ID | Severidade | Cenário relacionado | Descrição | Situação |
| -- | ---------- | ------------------- | --------- | -------- |
| DEF-01 | Alta | CAD-04 | O cadastro confirmado não é persistido nem apresentado na listagem de locais. | Identificado |
| DEF-02 | Média | ERR-06 | O foco não é direcionado ao primeiro campo inválido depois do envio com erros. | Identificado |
| DEF-03 | Baixa | CAD-03 | Nenhuma mensagem final de sucesso é apresentada depois da confirmação do envio. | Identificado |

## Limitações

- A funcionalidade de edição ainda não está disponível.
- O cadastro não utiliza API ou serviço de persistência na versão testada.
- Não existem regras específicas de formato nos campos disponíveis.
- O projeto não possui estrutura configurada de testes automatizados.
- As evidências estão armazenadas fora do repositório e serão anexadas à Pull Request.

## Retestes

Nenhum reteste foi executado nesta etapa. Os defeitos permanecem aguardando correção.

Depois de eventuais correções, os cenários afetados deverão ser repetidos, informando o novo commit testado e anexando novas evidências.

## Decisão final

- [ ] Aprovado
- [ ] Aprovado com ressalva
- [x] Reprovado
- [ ] Bloqueado
- [ ] Ainda não avaliado

A versão testada foi reprovada porque o cadastro confirmado não foi persistido. Também foi identificado que o foco não é direcionado ao primeiro campo inválido.

A funcionalidade de edição não pôde ser validada porque ainda não está disponível. Essa limitação deverá ser informada ao Tech Lead, conforme a orientação recebida.