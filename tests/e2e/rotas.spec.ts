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