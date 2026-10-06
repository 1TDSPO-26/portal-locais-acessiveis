import { test, expect } from '@playwright/test';

// TESTE PARA SAIR DA PAG 404 PELO TECLADO
test('volta da página 404 ao início usando teclado', async ({ page }) => {
  await page.goto('/pagina-inexistente');

  await expect(
    page.getByRole('heading', { name: 'Página não encontrada' })
  ).toBeVisible();

  await page.keyboard.press('Tab');

  await expect(
    page.getByRole('link', { name: 'Voltar para o início' })
  ).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page).toHaveURL('http://localhost:5173/');
});

// TESTE PARA ABRIR LOCAIS PELO MENU USANDO O TECLADO
test('abre Locais pelo menu usando teclado', async ({ page }) => {
  await page.goto('/');

  const linkLocais = page
    .getByRole('navigation')
    .getByRole('link', { name: 'Locais', exact: true })
    .first();

  // Procura o link navegando com Tab.
  for (let tentativa = 0; tentativa < 20; tentativa++) {
    await page.keyboard.press('Tab');

    const recebeuFoco = await linkLocais.evaluate(
      elemento => elemento === document.activeElement
    );

    if (recebeuFoco) break;
  }

  await expect(linkLocais).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/locais$/);

  await expect(
    page.getByRole('heading', {
      name: 'Locais acessíveis',
      exact: true,
    })
  ).toBeVisible();
});

// TESTE PARA MENU MOBILE E ACESSO A LOCAIS
test('abre menu mobile e acessa Locais pelo teclado', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const botaoMenu = page.getByRole('button', { name: 'Abrir menu' });

  for (let tentativa = 0; tentativa < 20; tentativa++) {
    await page.keyboard.press('Tab');

    const recebeuFoco = await botaoMenu.evaluate(
      elemento => elemento === document.activeElement
    );

    if (recebeuFoco) break;
  }

  await expect(botaoMenu).toBeFocused();
  await page.keyboard.press('Enter');

  const botaoFechar = page.getByRole('button', { name: 'Fechar menu' });
  await expect(botaoFechar).toHaveAttribute('aria-expanded', 'true');

  const linkLocais = page
    .locator('#mobile-menu-panel')
    .getByRole('link', { name: 'Locais', exact: true });

  for (let tentativa = 0; tentativa < 20; tentativa++) {
    await page.keyboard.press('Tab');

    const recebeuFoco = await linkLocais.evaluate(
      elemento => elemento === document.activeElement
    );

    if (recebeuFoco) break;
  }

  await expect(linkLocais).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/locais$/);
  await expect(
    page.getByRole('heading', { name: 'Locais acessíveis', exact: true })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Abrir menu' })
  ).toHaveAttribute('aria-expanded', 'false');
});

// TESTA LOCAL INEXISTENTE E RETORNO A LISTA PELO TECLADO
test('retorna à lista quando o local não existe', async ({ page }) => {
  await page.goto('/locais/id-inexistente');

  await expect(
    page.getByRole('heading', {
      name: 'Local não encontrado',
      exact: true,
    })
  ).toBeVisible();

  const linkVoltar = page.getByRole('link', {
    name: 'Voltar para locais',
  });

  for (let tentativa = 0; tentativa < 30; tentativa++) {
    await page.keyboard.press('Tab');

    const recebeuFoco = await linkVoltar.evaluate(
      elemento => elemento === document.activeElement
    );

    if (recebeuFoco) break;
  }

  await expect(linkVoltar).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/locais$/);
  await expect(
    page.getByRole('heading', {
      name: 'Locais acessíveis',
      exact: true,
    })
  ).toBeVisible();
});

// TESTE PARA ABRIR DETALHE DE LOCAL PELO TECLADO
test('abre detalhes de um local pelo teclado', async ({ page }) => {
  await page.goto('/locais');

  const primeiroCard = page.getByRole('article').first();
  const nomeLocal = await primeiroCard.getByRole('heading').innerText();
  const linkDetalhes = primeiroCard.getByRole('link', {
    name: 'Ver detalhes',
  });

  for (let tentativa = 0; tentativa < 40; tentativa++) {
    await page.keyboard.press('Tab');

    const recebeuFoco = await linkDetalhes.evaluate(
      elemento => elemento === document.activeElement
    );

    if (recebeuFoco) break;
  }

  await expect(linkDetalhes).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/locais\/[^/]+$/);
  await expect(
    page.getByRole('heading', {
      name: nomeLocal,
      exact: true,
      level: 1,
    })
  ).toBeVisible();

  // Confere se o detalhe continua acessível após atualizar a página.
  await page.reload();

  await expect(
    page.getByRole('heading', {
      name: nomeLocal,
      exact: true,
      level: 1,
    })
  ).toBeVisible();
});