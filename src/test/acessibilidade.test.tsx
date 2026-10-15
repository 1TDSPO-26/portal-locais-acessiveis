// Auditoria automatizada de acessibilidade (issue #63).
// Roda o axe-core nas páginas que não dependem da API e falha se aparecer
// alguma violação WCAG 2.1 A/AA. O contraste de cores não é verificado aqui,
// porque o jsdom não calcula estilos; ele foi auditado no navegador
// (veja docs/testes/auditoria-acessibilidade.md).
import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Sobre from '../routes/Sobre/index';
import Acessibilidade from '../routes/Acessibilidade/index';
import Cadastro from '../routes/Cadastro/index';
import NotFound from '../routes/NotFound/index';

afterEach(() => {
  cleanup();
});

function renderPagina(pagina: ReactElement) {
  return render(<MemoryRouter>{pagina}</MemoryRouter>);
}

async function violacoes(container: HTMLElement) {
  const resultado = await axe.run(container, {
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    rules: {
      // jsdom não calcula cores; contraste foi auditado no navegador.
      'color-contrast': { enabled: false },
    },
  });

  return resultado.violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`
  );
}

const PAGINAS: [string, () => ReactElement][] = [
  ['Sobre', () => <Sobre />],
  ['Acessibilidade', () => <Acessibilidade />],
  ['Cadastro', () => <Cadastro />],
  ['Página não encontrada', () => <NotFound />],
];

describe('auditoria de acessibilidade (axe-core)', () => {
  it.each(PAGINAS)(
    'a página %s não tem violações WCAG 2.1 A/AA',
    async (_nome, pagina) => {
      const { container } = renderPagina(pagina());

      expect(await violacoes(container)).toEqual([]);
    }
  );

  it.each(PAGINAS)(
    'a página %s tem exatamente um título principal (h1)',
    (_nome, pagina) => {
      renderPagina(pagina());

      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    }
  );

  it('o Cadastro continua sem violações depois de exibir os erros de validação', async () => {
    const user = userEvent.setup();
    const { container } = renderPagina(<Cadastro />);

    await user.click(
      screen.getByRole('button', { name: 'Enviar informações' })
    );

    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('textbox', { name: 'Nome do local' })
    ).toHaveAttribute('aria-invalid', 'true');
    expect(await violacoes(container)).toEqual([]);
  });
});
