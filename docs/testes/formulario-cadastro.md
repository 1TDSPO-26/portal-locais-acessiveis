# Plano e resultados dos testes do formulário de cadastro

## Issue relacionada

Issue #84 — Criar testes do formulário de cadastro.

## Objetivo

Criar testes que verificam se o formulário de cadastro funciona como esperado.

## Ferramentas utilizadas

- Vitest
- React Testing Library
- user-event
- jest-dom
- jsdom

## Como usamos o Vitest

O Vitest roda os testes. Eles preenchem o formulário, clicam nos botões e verificam o resultado. Assim, podemos conferir se uma mudança no código afetou o cadastro.

Usamos a React Testing Library para encontrar os campos e botões, o user-event para simular as ações e o jest-dom para conferir o resultado. O jsdom simula o navegador durante os testes.

Para executar somente os testes do Cadastro:

```bash
npm test -- Cadastro
```

Esse comando roda os testes de Cadastro. Os dois testes do Oto (CAD-T05 e CAD-T06) passaram em 07/10/2026.

## Arquivo principal dos testes

`src/routes/Cadastro/Cadastro.test.tsx`

## Divisão das atividades

| Responsável | O que vai testar |
| --- | --- |
| @arthurmartinss | Título, campos, botão e nomes dos campos para leitores de tela |
| @MuriloSCruzz | Campos vazios, preenchidos só com espaços ou incompletos |
| @otomendes | Cancelar e confirmar no modal de confirmação |

## Cenários planejados

| ID | Cenário | Responsável | Situação |
| --- | --- | --- | --- |
| CAD-T01 | Conferir se o título, os campos e o botão aparecem | @arthurmartinss | Passou |
| CAD-T02 | Conferir os rótulos e os nomes dos campos para leitores de tela | @arthurmartinss | Passou |
| CAD-T03 | Conferir os erros ao tentar enviar campos obrigatórios vazios | @MuriloSCruzz | Pendente |
| CAD-T04 | Conferir se campos só com espaços ou incompletos são rejeitados | @MuriloSCruzz | Pendente |
| CAD-T05 | Cancelar fecha o modal e mantém os dados preenchidos | @otomendes | Passou |
| CAD-T06 | Confirmar limpa o formulário e mostra a mensagem de sucesso | @otomendes | Passou |

## Estratégia de commits

Cada integrante deve salvar seu trabalho em pelo menos dois commits, cada um com uma parte dos testes.

| Responsável | Primeiro commit | Segundo commit |
| --- | --- | --- |
| @arthurmartinss | Renderização inicial do formulário | Rótulos e acessibilidade |
| @MuriloSCruzz | Campos obrigatórios | Espaços e dados incompletos |
| @otomendes | Abertura e cancelamento do modal | Confirmação e mensagem de sucesso |

Vamos preencher a tabela de commits depois de salvar cada parte.

## Como executar

```bash
npm test
npm run lint
npm run build
```

## Resultados da execução

A tabela mostra o que já foi verificado.

| Verificação | Resultado |
| --- | --- |
| Testes automatizados | Os 7 testes de Cadastro passaram: 5 do Arthur e 2 do Oto. Os testes do Murilo ainda estão pendentes. |
| Lint | Passou: 0 erros e 0 avisos em 07/10/2026 |
| Build | Passou em 07/10/2026 |

## Evidências

As capturas serão enviadas pelo Teams ao Arthur, que vai anexá-las ao PR.

Pasta local:

`C:\Fiap\front-end\projeto-qa\evidencias-dev-84`

## Registro dos commits

| Responsável | Descrição | Commit |
| --- | --- | --- |
| @arthurmartinss | Renderização inicial do formulário | A preencher |
| @arthurmartinss | Rótulos e acessibilidade | A preencher |
| @MuriloSCruzz | Formulário não permite deixar os campos obrigatórios vazios e mostra mensagem de erro de validação |
| @MuriloSCruzz | Formulário não permite preencher o input com espaços |
| @otomendes | Abertura e cancelamento do modal | 36d0301 |
| @otomendes | Confirmação e mensagem de sucesso | Commit que adiciona o teste CAD-T06 e atualiza este documento |

## Resultado final

Oto - Minha parte passou. Abaixo deixo um relatório.

## Resultados de Oto (@otomendes) — 07/10/2026

- Preenchemos o formulário e abrimos o modal. Ao clicar em Cancelar, o modal fecha e os dados continuam preenchidos. Nada é enviado e nenhuma mensagem de sucesso aparece. Também conseguimos abrir o modal de novo.
- Ao clicar em Confirmar, o modal fecha, o formulário fica vazio e a mensagem de sucesso aparece. Também verificamos se o botão de fechar remove essa mensagem.
- O envio ainda é simulado: os dados aparecem no console. O teste confere isso, mas não comprova que foram salvos em um servidor.
- No terminal do VS Code, rodamos os testes de Cadastro, o lint e o build. Todos passaram.