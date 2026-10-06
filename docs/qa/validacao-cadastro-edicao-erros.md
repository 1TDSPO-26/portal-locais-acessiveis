# Plano e relatório de validação — cadastro, edição e mensagens de erro

## Identificação

- Turma: 1TDSPO
- CP: CP2
- QA responsável: Arthur Carvalho Brito Martins — RM 572325
- Issue de QA: #62 — Validar cadastro, edição e mensagens de erro
- Data de criação do plano: 06/10/2026
- Branch do QA: `feature/62-validacao-cadastro-edicao-erros`
- Versão inicial analisada: `develop` — commit `5c9be20`
- Ambiente planejado: local
- Pull Requests relacionadas: a definir quando as PRs de cadastro e edição forem abertas

## Objetivo

Validar os fluxos disponíveis de cadastro e edição de locais, além das mensagens e situações de erro. Registrar o que funciona, o que falha e o que ainda não está implementado, sem desenvolver as funcionalidades avaliadas.

## Escopo

Este ciclo verificará:

- cadastro de um local com dados válidos;
- confirmação do envio;
- persistência do local cadastrado;
- possibilidade de continuar utilizando o sistema depois do cadastro;
- edição e persistência das alterações, quando a funcionalidade estiver disponível;
- validações de campos obrigatórios;
- preenchimento somente com espaços;
- dados inválidos, quando existirem regras de formato;
- envio de informações incompletas;
- falha no cadastro ou na edição;
- indisponibilidade da API, quando aplicável;
- acesso a um local inexistente;
- clareza das mensagens de erro;
- comportamento do foco depois de um erro;
- navegação por teclado e responsividade, quando aplicáveis.

## Pré-condições

- Projeto executado a partir da versão identificada neste documento.
- Dependências instaladas.
- Aplicação disponível no ambiente local.
- Navegador e tamanho de tela registrados durante a execução.
- Para testes diretamente em PRs, revisão técnica concluída e CI aprovado.
- Dados pessoais, senhas e tokens não serão utilizados nas evidências.

## Cenários planejados

| ID     | Cenário                          | Passos planejados                                                                                   | Resultado esperado                                                                                      | Resultado encontrado | Situação | Evidência ou defeito |
| ------ | -------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------- | -------- | -------------------- |
| CAD-01 | Abrir o cadastro                 | Acessar a rota `/cadastrar`.                                                                        | O formulário deve abrir e apresentar os campos necessários.                                             | A executar.          | Pendente | A coletar.           |
| CAD-02 | Enviar cadastro válido           | Preencher corretamente todos os campos obrigatórios e enviar o formulário.                          | O envio deve ser aceito e apresentar uma confirmação clara.                                             | A executar.          | Pendente | A coletar.           |
| CAD-03 | Confirmar o envio                | Após preencher o formulário, abrir a confirmação e confirmar o envio.                               | A confirmação deve ser concluída e o usuário deve conseguir prosseguir.                                 | A executar.          | Pendente | A coletar.           |
| CAD-04 | Verificar persistência           | Depois de confirmar o envio, procurar o novo local na aplicação e atualizar ou reabrir a página.    | O local deve continuar disponível com os dados informados.                                              | A executar.          | Pendente | A coletar.           |
| CAD-05 | Cancelar a confirmação           | Preencher o formulário, abrir a confirmação e selecionar “Cancelar”.                                | O modal deve fechar sem enviar e os dados digitados devem permanecer disponíveis para revisão.          | A executar.          | Pendente | A coletar.           |
| EDI-01 | Acessar a edição                 | Abrir um local existente e procurar a opção de edição.                                              | A funcionalidade de edição deve estar disponível quando implementada.                                   | A executar.          | Pendente | A coletar.           |
| EDI-02 | Editar e salvar                  | Alterar pelo menos uma informação de um local e salvar.                                             | A alteração deve ser aceita e apresentar uma confirmação clara.                                         | A executar.          | Pendente | A coletar.           |
| EDI-03 | Verificar persistência da edição | Reabrir ou atualizar o local editado.                                                               | A informação alterada deve permanecer atualizada.                                                       | A executar.          | Pendente | A coletar.           |
| ERR-01 | Campos obrigatórios vazios       | Enviar o formulário sem preencher os campos obrigatórios.                                           | O envio deve ser impedido e cada pendência deve ser explicada claramente.                               | A executar.          | Pendente | A coletar.           |
| ERR-02 | Campos somente com espaços       | Preencher os campos de texto obrigatórios somente com espaços e enviar.                             | Os espaços devem ser tratados como conteúdo vazio e o envio deve ser impedido.                          | A executar.          | Pendente | A coletar.           |
| ERR-03 | Informações incompletas          | Preencher apenas parte dos campos obrigatórios e enviar.                                            | O envio deve ser impedido e os campos pendentes devem ser identificados.                                | A executar.          | Pendente | A coletar.           |
| ERR-04 | Dados com formato inválido       | Informar dados inválidos nos campos que possuírem uma regra de formato.                             | O sistema deve rejeitar o formato inválido e explicar como corrigir.                                    | A executar.          | Pendente | A coletar.           |
| ERR-05 | Clareza das mensagens            | Provocar erros no formulário e analisar os textos apresentados.                                     | As mensagens devem identificar o problema e orientar a correção.                                        | A executar.          | Pendente | A coletar.           |
| ERR-06 | Foco depois do erro              | Enviar o formulário com erro e observar a posição do foco.                                          | O foco deve ser levado ao primeiro erro ou permitir que ele seja encontrado facilmente pelo teclado.    | A executar.          | Pendente | A coletar.           |
| ERR-07 | Falha do serviço ou API          | Simular ou observar uma falha da API durante cadastro ou edição, quando houver integração.          | O sistema deve informar a falha sem indicar sucesso e sem perder dados indevidamente.                   | A executar.          | Pendente | A coletar.           |
| ERR-08 | Local inexistente                | Acessar diretamente um identificador de local que não exista.                                       | O sistema deve informar que o local não foi encontrado e oferecer uma forma de continuar.               | A executar.          | Pendente | A coletar.           |
| ACE-01 | Navegação por teclado            | Percorrer formulário, modal e mensagens utilizando Tab, Shift+Tab, Enter e Escape quando aplicável. | Os controles devem ser acessíveis em ordem compreensível e apresentar foco visível.                     | A executar.          | Pendente | A coletar.           |
| RES-01 | Responsividade                   | Executar os fluxos em tamanhos de tela móvel e desktop.                                             | Formulário, mensagens e modal devem permanecer legíveis e utilizáveis, sem rolagem horizontal indevida. | A executar.          | Pendente | A coletar.           |

## Automação

Na inspeção inicial da versão `develop` identificada neste plano, não foi encontrado um comando de testes automatizados no `package.json`. Essa condição será conferida novamente antes da conclusão e também nas PRs relacionadas.

Se uma estrutura de testes estiver disponível, será criado pelo menos um teste automatizado relacionado à Issue #62. Se ela continuar indisponível, a limitação será registrada e os cenários serão executados manualmente com evidências reproduzíveis.

## Registro das evidências

Cada cenário executado deverá conter:

- resultado encontrado;
- situação: aprovado, reprovado, bloqueado ou não aplicável;
- print, vídeo, log ou outra evidência reproduzível;
- versão ou commit testado;
- descrição e link do defeito, quando existir.

Os resultados serão preenchidos somente depois da execução real dos testes.

## Defeitos encontrados

| Issue do defeito              | Severidade | Cenário relacionado | Resumo                    | Situação |
| ----------------------------- | ---------- | ------------------- | ------------------------- | -------- |
| Nenhum registrado nesta etapa | —          | —                   | Plano ainda não executado | —        |

## Retestes

Os retestes serão registrados depois de eventuais correções, informando o novo commit testado, os cenários repetidos e as novas evidências.

## Decisão final

- [ ] Aprovado
- [ ] Aprovado com ressalva
- [ ] Reprovado
- [ ] Bloqueado
- [x] Ainda não avaliado

A decisão será marcada somente após a execução dos cenários disponíveis.
