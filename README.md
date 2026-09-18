# Acesso+ | Portal de Locais Acessíveis ♿

> **Status do Projeto:** 🚧 Em Desenvolvimento 🚧

Projeto acadêmico desenvolvido pela turma **1TDSPO** da **FIAP**. O **Acesso+** é uma plataforma web responsiva projetada para catalogar, visualizar e adicionar locais e serviços públicos focados na acessibilidade para pessoas com deficiência ou mobilidade reduzida.

O design do sistema (visível na prototipação) contempla jornadas completas tanto para Desktop quanto para Mobile, priorizando usabilidade e boas práticas de acessibilidade digital (WCAG).

---

## 💻 Tecnologias e Ferramentas

Este projeto utiliza um ecossistema moderno para desenvolvimento frontend:

*   **[React](https://react.dev/):** Biblioteca principal para construção da interface.
*   **[Vite](https://vitejs.dev/):** Bundler extremamente rápido para ambiente de desenvolvimento.
*   **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para maior segurança e previsibilidade do código.
*   **[Tailwind CSS](https://tailwindcss.com/):** Framework utilitário para estilização ágil e padronizada.
*   **Versionamento:** Git, Git Flow e GitHub Actions (para CI/CD contínuo).

---

## 🌟 Funcionalidades (Atuais e Planejadas)

*   **Exploração de Locais:** Listagem interativa de locais com indicativos claros dos recursos disponíveis (rampas, piso tátil, libras, etc).
*   **Páginas de Detalhes:** Visualização aprofundada de um local específico com fotos, descrições e mapa.
*   **Cadastro de Novos Locais:** Formulário com validação de dados e feedback visual (Modal de Confirmação) para crowdsourcing de acessibilidade.
*   **Painel de Acessibilidade Embutido:** Controles globais para redimensionamento de texto (A-, A, A+) e otimização para leitores de tela na raiz do projeto.
*   **Design Responsivo:** Adaptação fluida garantida para smartphones, tablets e monitores (Desktop/Mobile First).

---

## ⚙️ Como Executar o Projeto Localmente

**Pré-requisitos:**
*   [Node.js](https://nodejs.org/) (versão 18+ recomendada)
*   NPM 

**Passo a passo:**

1. Clone o repositório:
```bash
git clone https://github.com/1TDSPO-26/portal-locais-acessiveis.git

npm install

npm run dev
```