# Relatório de QA — Issue #60

## Identificação

- Projeto: 1TDSPO-26/portal-locais-acessiveis
- Issue: #60 — Executar ciclo de testes de rotas e navegação por teclado
- PR: #101
- Responsável: Ana Clara Gama Mendes — @AnaMendes-25
- Data: 06/10/2026
- Branch: test/60-rotas-teclado

## Ambiente

- Sistema operacional: Windows
- Node.js: v24.21.0
- Automação: Playwright com Chromium
- Desktop automatizado: 1280 × 720
- Mobile automatizado: 390 × 844
- Execução local com Vite

## Objetivo

Verificar rotas e navegação por teclado, registrar evidências
reproduzíveis e identificar problemas que afetem o uso do portal.

## Testes automatizados

Comando executado:

    npx playwright test --headed

| Cenário | Resultado esperado | Resultado |
| --- | --- | --- |
| Página 404 | Exibir a página de erro e permitir voltar ao início com Tab e Enter | Passou |
| Menu desktop | Permitir acessar Locais com Tab e Enter e exibir a lista | Passou |
| Menu mobile | Permitir abrir o menu, acessar Locais pelo teclado e fechar o menu após a navegação | Passou |
| Local inexistente | Exibir Local não encontrado e permitir retornar à lista pelo teclado | Passou |
| Detalhe de local existente | Permitir abrir o detalhe pelo teclado e manter o conteúdo após recarregar a página | Passou |

Resultado: 5 testes aprovados, 0 falhas.
Tempo da execução informada: 12,0 segundos.

Arquivo: tests/e2e/rotas.spec.ts

## Verificações manuais

| Cenário | Resultado observado | Status |
| --- | --- | --- |
| Menu desktop com Tab e Shift+Tab | Foco visível nos links pelo contorno padrão do navegador | Passou |
| Menu mobile fechado | Tab passou apenas por elementos visíveis na tela | Passou |
| Menu mobile aberto | Links acessíveis com Tab e Shift+Tab, com foco visível | Passou |
| Cadastro pelo teclado | Foi possível alcançar todos os campos e o botão de envio, preencher textos, selecionar o tipo e marcar recursos com Espaço | Passou |
| Foco inicial do modal | O foco foi observado no botão Confirmar | Observação |
| Navegação dentro do modal | Tab permitiu alcançar elementos atrás do modal | Falhou |
| Fechamento do modal com Escape | Escape não fechou o modal | Falhou |

## Defeitos encontrados

### 1. Foco sai do modal aberto

Passos para reproduzir:

1. Acessar /cadastrar.
2. Preencher os campos obrigatórios.
3. Acionar Enviar informações pelo teclado.
4. Com o modal aberto, pressionar Tab repetidamente.

Resultado esperado:

A navegação com Tab e Shift+Tab deve permanecer dentro do modal
enquanto ele estiver aberto.

Resultado observado:

Foi possível alcançar elementos da página atrás do modal.

Impacto:

O usuário pode perder a referência da confirmação e interagir
com conteúdo que está visualmente encoberto.

### 2. Escape não fecha o modal

Passos para reproduzir:

1. Acessar /cadastrar.
2. Preencher os campos obrigatórios.
3. Acionar Enviar informações pelo teclado.
4. Pressionar Escape.

Resultado esperado:

Escape deve fechar o modal e devolver o foco ao botão
que iniciou a confirmação.

Resultado observado:

O modal permaneceu aberto.

Impacto:

O atalho de fechamento esperado para o modal não está disponível.

Registro dos defeitos no GitHub: pendente.
Reteste após correção: pendente.

## Build e lint

### Build

Comando:

    npm run build

Resultado: aprovado, conforme execução local informada.

### Lint

Comando:

    npm run lint

Resultado: bloqueado antes da análise do código.

O Windows impediu o carregamento do arquivo nativo do Oxlint:

    An Application Control policy has blocked this file.

Não foi possível concluir o lint localmente. Esse resultado
não representa uma falha de lint identificada no código.

## Evidências

### Testes automatizados

![Relatório do Playwright com cinco testes aprovados](image.png)

### Verificações manuais

Os resultados estão descritos neste relatório.

Capturas ou vídeo reproduzindo os defeitos do modal:
pendentes de anexação.

Logs completos de build e lint:
pendentes de anexação ao PR.

## Limites do ciclo

- Os testes automatizados cobrem cinco cenários específicos.
- A largura mobile foi usada para testar a navegação do menu;
  isso não comprova a responsividade completa do portal.
- Nem todas as rotas foram verificadas.
- Não foram concluídas verificações de leitores de tela,
  contraste, textos alternativos e rótulos de toda a aplicação.
- O retorno do foco após fechar o modal não foi verificado.
- Os defeitos do modal foram encontrados manualmente e
  ainda não estão cobertos pelos testes automatizados.
- As evidências foram obtidas no ambiente local.

## Conclusão do ciclo

Os cinco cenários automatizados passaram.

A verificação manual identificou duas falhas no modal:
o foco alcança elementos atrás dele e Escape não o fecha.

O ciclo permanece parcial, com registro dos defeitos,
correções, reteste e demais verificações pendentes.
A aprovação dos testes automatizados não representa
aprovação completa da issue #60.