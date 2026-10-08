# Plano e resultados dos testes do formulário de cadastro

## Issue relacionada

Issue #84 — Criar testes do formulário de cadastro.

## Objetivo

Automatizar os principais comportamentos do formulário de cadastro utilizando as ferramentas de teste já configuradas no projeto.

## Ferramentas utilizadas

- Vitest
- React Testing Library
- user-event
- jest-dom
- jsdom

## Arquivo principal dos testes

`src/routes/Cadastro/Cadastro.test.tsx`

## Divisão das atividades

| Responsável | Escopo |
| --- | --- |
| @arthurmartinss | Renderização inicial, rótulos e acessibilidade dos campos |
| @MuriloSCruzz | Campos obrigatórios, espaços e preenchimento incompleto |
| @otomendes | Modal de confirmação, cancelamento, confirmação e mensagem de sucesso |

## Cenários planejados

| ID | Cenário | Responsável | Situação |
| --- | --- | --- | --- |
| CAD-T01 | Renderizar título, campos e botão do formulário | @arthurmartinss | Pendente |
| CAD-T02 | Verificar rótulos e nomes acessíveis dos campos | @arthurmartinss | Pendente |
| CAD-T03 | Exibir erros ao enviar os campos obrigatórios vazios | @MuriloSCruzz | Pendente |
| CAD-T04 | Rejeitar espaços e identificar preenchimento incompleto | @MuriloSCruzz | Pendente |
| CAD-T05 | Abrir o modal e cancelar mantendo os dados | @otomendes | Pendente |
| CAD-T06 | Confirmar o envio, limpar os campos e exibir o toast | @otomendes | Pendente |

## Estratégia de commits

Cada integrante realizará pelo menos dois commits autorais e relevantes.

| Responsável | Primeiro commit | Segundo commit |
| --- | --- | --- |
| @arthurmartinss | Renderização inicial do formulário | Rótulos e acessibilidade |
| @MuriloSCruzz | Campos obrigatórios | Espaços e dados incompletos |
| @otomendes | Abertura e cancelamento do modal | Confirmação e mensagem de sucesso |

Os identificadores dos commits serão registrados após a conclusão de cada etapa.

## Como executar

```bash
npm test
npm run lint
npm run build
```

## Resultados da execução

Os resultados serão preenchidos conforme cada grupo de testes for implementado.

| Verificação | Resultado |
| --- | --- |
| Testes automatizados | Pendente |
| Lint | Pendente |
| Build | Pendente |

## Evidências

As evidências serão armazenadas fora do repositório e anexadas à Pull Request.

Pasta local:

`C:\Fiap\front-end\projeto-qa\evidencias-dev-84`

## Registro dos commits

| Responsável | Descrição | Commit |
| --- | --- | --- |
| @arthurmartinss | Renderização inicial do formulário | A preencher |
| @arthurmartinss | Rótulos e acessibilidade | A preencher |
| @MuriloSCruzz | Formulário não permite deixar os campos obrigatórios vazios e mostra mensagem de erro de validação |
| @MuriloSCruzz | Espaços e dados incompletos | A preencher |
| @otomendes | Abertura e cancelamento do modal | A preencher |
| @otomendes | Confirmação e mensagem de sucesso | A preencher |

## Resultado final

A preencher depois da execução completa dos testes, do lint e do build.