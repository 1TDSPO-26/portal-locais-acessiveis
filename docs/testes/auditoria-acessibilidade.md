# Relatório do QA: auditoria de acessibilidade

## Identificação

- Turma: 1TDSPO
- CP: CP2
- QA responsável: @abrantes1 (Lucas Almeida Abrantes)
- Data: 14/10/2026
- Issue testada: #63 — Executar auditoria de acessibilidade e registrar evidências
- Versão ou commit: `develop` em `9bba7ce` (merge do PR #114)
- Ambiente: local, `npm run api` (JSON Server na porta 3001) + `npm run dev`
- Navegador: Chromium, desktop (1280px) e mobile emulado (375 × 812)

## Escopo do teste

Auditoria de acessibilidade de todas as rotas do portal, com base nas WCAG 2.1 níveis A e AA:

| Rota                  | Página                                         |
| --------------------- | ---------------------------------------------- |
| `/`                   | Início                                         |
| `/locais`             | Lista de locais (busca, filtros e paginação)   |
| `/locais/2`           | Detalhe de um local                            |
| `/cadastrar`          | Formulário de cadastro e modal de confirmação  |
| `/sobre`              | Sobre                                          |
| `/acessibilidade`     | Acessibilidade (controles de tamanho do texto) |
| `/pagina-inexistente` | Página não encontrada (404)                    |

Ficou fora deste ciclo: teste com leitor de tela real (NVDA, VoiceOver) e zoom de 400%.

## Método

1. **Verificação automática no navegador** com o axe-core 4.10.2, regras `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` e `best-practice`, nos temas claro e escuro.
2. **Teclado:** navegação com Tab, Shift+Tab, Enter e Esc, conferindo ordem e foco visível.
3. **Responsividade:** largura de 375px em todas as rotas, conferindo se há rolagem horizontal.
4. **Verificação automatizada no projeto:** `src/test/acessibilidade.test.tsx` roda o axe-core no Vitest a cada `npm run test` (veja "Automação").

### Como reproduzir

```bash
npm ci
npm run api
npm run dev
```

Em cada rota, no console do navegador (F12):

```js
const s = document.createElement('script');
s.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';
document.head.appendChild(s);
// depois que carregar:
axe
  .run(document, {
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  })
  .then((r) =>
    console.table(
      r.violations.map((v) => ({
        regra: v.id,
        impacto: v.impact,
        ocorrencias: v.nodes.length,
      }))
    )
  );
```

## Resultado do axe-core (tema claro)

| Rota                  | Violações | Regras                                                                                               |
| --------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `/`                   | 4         | `color-contrast` (1) + `landmark-main-is-top-level`, `landmark-no-duplicate-main`, `landmark-unique` |
| `/locais`             | 4         | `color-contrast` (1) + mesmas 3 regras de landmark                                                   |
| `/locais/2`           | 4         | `color-contrast` (5) + mesmas 3 regras de landmark                                                   |
| `/cadastrar`          | 4         | `color-contrast` (1) + mesmas 3 regras de landmark                                                   |
| `/sobre`              | 0 (WCAG)  | apenas as regras de landmark de boas práticas                                                        |
| `/acessibilidade`     | 0 (WCAG)  | apenas as regras de landmark de boas práticas                                                        |
| `/pagina-inexistente` | 2         | `landmark-one-main`, `region`                                                                        |

## Cenários verificados

| Cenário                                | Resultado esperado                                | Resultado encontrado                                                                                                                         | Situação  |
| -------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Idioma da página                       | `lang` definido em português                      | `<html lang="pt-br">`                                                                                                                        | Aprovado  |
| Título da aba                          | Cada rota tem um título próprio                   | Todas as rotas têm título (ex.: "LOCAIS \| ACESSO+", nome do local no detalhe)                                                               | Aprovado  |
| Título principal                       | Um `h1` por página                                | Um `h1` em todas as rotas                                                                                                                    | Aprovado  |
| Imagens                                | Todas com texto alternativo                       | Nenhuma violação de `image-alt`                                                                                                              | Aprovado  |
| Rótulos de formulário                  | Todo campo com nome acessível                     | Campos da busca, do filtro e do cadastro com rótulo                                                                                          | Aprovado  |
| Erros de validação                     | Erro anunciado e ligado ao campo                  | `role="alert"`, `aria-invalid` e `aria-describedby` no Cadastro                                                                              | Aprovado  |
| Navegação por Tab no cabeçalho         | Ordem lógica e foco visível                       | Logo → Início → Locais → Sobre → Acessibilidade → Adicionar local → tema → busca, todos com contorno de foco                                 | Aprovado  |
| Modal de confirmação                   | Foco entra no modal, fica preso e volta ao fechar | `role="dialog"` + `aria-modal`, o foco vai para "Cancelar", o Tab fica dentro do modal, o Esc fecha e o foco volta para "Enviar informações" | Aprovado  |
| Menu mobile                            | Abre pelo teclado e informa o estado              | `aria-expanded` muda de `false` para `true`, o rótulo vira "Fechar menu" e o Esc fecha                                                       | Aprovado  |
| Controles de tamanho do texto          | A−, A e A+ funcionam e têm nome                   | Os 3 botões têm `aria-label` e mudam o tamanho do texto                                                                                      | Aprovado  |
| Responsividade (375px)                 | Sem rolagem horizontal                            | Largura do documento = 375px em todas as rotas                                                                                               | Aprovado  |
| Link "Pular para o conteúdo"           | Existe para pular o menu (WCAG 2.4.1)             | Não existe; o primeiro Tab vai para o logo                                                                                                   | Reprovado |
| Landmarks                              | Um único `<main>` por página                      | Dois `<main>` aninhados em 4 rotas e nenhum na 404                                                                                           | Reprovado |
| Contraste no detalhe (claro)           | Mínimo de 4,5:1 para texto pequeno                | Texto verde dos recursos com 3,21:1                                                                                                          | Reprovado |
| Contraste de textos auxiliares (claro) | Mínimo de 4,5:1                                   | "Imagem do local" com 2,4:1 e aviso do Cadastro com 2,63:1                                                                                   | Reprovado |
| Contraste no detalhe (escuro)          | Mínimo de 4,5:1                                   | Item atual do breadcrumb com 1,13:1 e links azuis com 3,84:1                                                                                 | Reprovado |

## Defeitos encontrados

| #       | Gravidade | Resumo                                                                                                                                                                        | Onde                                                                                 | Critério WCAG                |
| ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| A11Y-01 | Média     | `<main>` duplicado e aninhado: o `MainLayout` já tem `<main>` e as rotas Home, Locais, LocalDetalhe e Cadastro criam outro. O leitor de tela anuncia duas regiões principais. | `src/layouts/MainLayout`, `src/routes/{Home,Locais,LocalDetalhe,Cadastro}/index.tsx` | 1.3.1 Informações e relações |
| A11Y-02 | Média     | Não existe link "Pular para o conteúdo". Quem usa teclado precisa passar por todo o menu em cada página.                                                                      | Cabeçalho (`Header`)                                                                 | 2.4.1 Ignorar blocos         |
| A11Y-03 | Média     | Texto verde dos detalhes dos recursos (`text-green-600`, 10,5px) com contraste de 3,21:1 sobre branco.                                                                        | `src/routes/LocalDetalhe/index.tsx`                                                  | 1.4.3 Contraste mínimo       |
| A11Y-04 | Baixa     | Tema escuro: item atual do breadcrumb (`#101828` sobre `#020618`, 1,13:1) quase invisível, e links azuis do breadcrumb com 3,84:1.                                            | `src/routes/LocalDetalhe/index.tsx`                                                  | 1.4.3 Contraste mínimo       |
| A11Y-05 | Baixa     | A página 404 fica fora do layout e não tem nenhum landmark (`main`).                                                                                                          | `src/routes/NotFound/index.tsx`                                                      | 1.3.1 Informações e relações |
| A11Y-06 | Baixa     | Textos em `text-slate-400` abaixo do contraste mínimo: "Imagem do local" nos cards sem foto (2,4:1, Início e Locais) e o aviso abaixo do formulário de Cadastro (2,63:1).     | `src/components/LocalCard`, `src/routes/Cadastro/index.tsx`                          | 1.4.3 Contraste mínimo       |

### Observação fora do escopo de acessibilidade

- O campo "Buscar locais" da página Início não faz nada ao pressionar Enter (não leva para `/locais` com a busca).

## Automação

Arquivo: `src/test/acessibilidade.test.tsx` (9 testes, rodam com `npm run test`).

- Roda o axe-core (WCAG 2.1 A/AA) nas páginas Sobre, Acessibilidade, Cadastro e 404 e falha se encontrar qualquer violação.
- Confere se cada uma dessas páginas tem exatamente um `h1`.
- Envia o Cadastro vazio e confere que, com os erros na tela, os campos ficam com `aria-invalid` e continua sem violações.
- O contraste não é verificado no teste porque o jsdom não calcula cores; ele foi auditado no navegador.
- Conferência do teste: ao adicionar uma `<img>` sem `alt` na página Sobre, o teste falhou com `image-alt`, ou seja, ele detecta regressões.

## Evidências

```text
npm run lint
Sem erros e sem avisos.

npm run build
✓ built

npm run test
Test Files  8 passed (8)
Tests       91 passed (91)
API         22 passed, 0 failed
```

## Decisão

- [ ] Aprovado
- [x] Aprovado com ressalva
- [ ] Reprovado
- [ ] Bloqueado

## Justificativa da decisão

O portal atende à maior parte dos critérios auditados: idioma, títulos, textos alternativos, rótulos, mensagens de erro, modal, menu mobile, navegação por teclado e responsividade. Os defeitos A11Y-01 a A11Y-06 não impedem o uso, mas precisam ser corrigidos em novas issues de DEV para o portal atender integralmente às WCAG 2.1 AA.

## Declaração do QA

- [x] Testei a versão identificada neste relatório.
- [x] Não criei requisito novo para reprovar a demanda.
- [x] Registrei os defeitos de forma reproduzível.
- [x] Não incluí dado pessoal, senha ou token nas evidências.
