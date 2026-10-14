# QA da lista de locais — issue #61

## Identificação

- Responsável: Oto (@otomendes).
- Data: 14/10/2026.
- Issue: https://github.com/1TDSPO-26/portal-locais-acessiveis/issues/61
- Versão testada no navegador: develop, commit 4ca5712.
- Branch: feature/61-qa-busca-filtros.
- Ambiente: macOS, navegador lateral do Codex, site em http://localhost:5173/locais e JSON Server na porta 3001.
- PR: https://github.com/1TDSPO-26/portal-locais-acessiveis/pull/129

## O que foi testado

Busca por nome e endereço, filtros individuais e combinados, lista sem resultados, paginação, teclado e tela pequena. Usamos os 7 locais do db.json, sem alterar os dados. Cadastro, exclusão e favoritos ficaram fora deste ciclo.

## Como repetir os testes manuais

Depois de instalar as dependências com npm ci, rode npm run api e npm run dev em terminais separados. Abra /locais, apague a busca e deixe os filtros desmarcados.

| Teste | O que fazer | Resultado esperado e observado |
| --- | --- | --- |
| Busca por nome | Digitar biblioteca | Apenas Biblioteca Mário de Andrade. Passou. |
| Busca por endereço | Digitar Paulista | Apenas Museu de Arte de São Paulo. Passou. |
| Busca sem resultado | Digitar local-inexistente-qa61 | Contador 0 e mensagem Nenhum local encontrado. Ao apagar o termo, os 7 locais voltam. Passou. |
| Entrada com rampa | Ativar somente esse filtro | 6 locais, sem a unidade de saúde. Passou. |
| Banheiro acessível | Ativar somente esse filtro | Biblioteca, museu, parque e shopping: 4 locais. Passou. |
| Vagas reservadas | Ativar somente esse filtro | Museu e shopping: 2 locais. Passou. |
| Circulação | Ativar somente esse filtro | Igreja, museu, parque e shopping: 4 locais. Passou. |
| Elevador | Ativar somente esse filtro | Biblioteca, estação, museu e shopping: 4 locais. Passou. |
| Combinar filtros | Ativar banheiro e elevador | Biblioteca, museu e shopping: 3 locais. Passou. |
| Busca com filtros | Com banheiro e elevador ativos, buscar biblioteca | Apenas a biblioteca. Adicionar vagas reservadas deixa a lista vazia. Passou. |
| Limpar filtros | Na combinação anterior, clicar em Limpar filtros | A busca biblioteca permanece e o resultado volta. Passou. |
| Selecionar todos | Marcar e desmarcar Selecionar todos | Marcado: museu e shopping. Desmarcado: os 7 locais voltam. Passou. |
| Limites das páginas | Trocar entre páginas 1 e 2 | Página 1 mostra 4 locais e Anterior desativado. Página 2 mostra 3 e Próxima desativado. Passou. |
| Busca na página 2 | Buscar biblioteca e depois apagar o termo | Resultado correto e retorno à página 1. Passou. |
| Filtro na página 2 | Ativar Entrada com rampa | Retorno à página 1, com 6 locais em 2 páginas. Passou. |
| Teclado | Usar Tab, Enter e Espaço nos controles | Tab passa para o próximo controle. Enter troca a página e limpa filtros; Espaço ativa filtro. Passou. |
| Tela pequena | Repetir busca, filtro sem resultado, limpeza e página 2 | Controles utilizáveis, mensagem visível e sem conteúdo ultrapassando a largura. Passou. |

A tela pequena foi simulada no navegador, não em aparelho físico. Foi solicitada uma área de 390 × 844; durante a medição, a janela informou largura interna de 354 pixels e conteúdo de 341 pixels.

## Testes automatizados

Arquivo: src/routes/Locais/Locais.test.tsx.

Foram adicionados 10 testes com Vitest e Testing Library. Eles usam a tela e os componentes reais, com a resposta do serviço simulada a partir dos 7 locais de exemplo. Isso verifica os resultados na interface, mas não testa a comunicação real com o servidor. Os testes foram executados com o estado online simulado. Funcionamento offline, falha de API e cache não foram avaliados neste ciclo.

Para executar apenas os testes relacionados a Locais:

~~~bash
npm run test:unit -- Locais
~~~

Essa seleção passou com 16 testes: os 10 novos e os 6 já existentes de ordenação.

## Verificações finais

| Verificação | Resultado |
| --- | --- |
| npm test | Passou: 92 testes do Vitest e 22 testes da camada de API/dados. |
| npm run lint | Passou: 0 erros e 0 avisos. |
| npm run build | Passou: TypeScript e Vite concluíram sem erros. |

## Capturas

As 13 capturas estão anexadas na descrição do PR #129. Os arquivos foram salvos com estes nomes:

- issue61-busca-nome.png
- issue61-busca-endereco.png
- issue61-busca-sem-resultados.png
- issue61-filtros-combinados.png
- issue61-busca-filtros-vazio.png
- issue61-todos-filtros.png
- issue61-pagina2.png
- issue61-filtro-teclado.png
- issue61-celular-lista.png
- issue61-celular-sem-resultados.png
- issue61-celular-pagina2.png
- issue61-vitest-vs.png
- issue61-validacao-final-vs.png

## Conclusão

Não encontramos falhas funcionais nos cenários manuais listados. Os 10 testes novos passaram. Testes, lint e build passaram. As capturas acompanham a entrega no PR, que deve ser revisado por outra pessoa.
