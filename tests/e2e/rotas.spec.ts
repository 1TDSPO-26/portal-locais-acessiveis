import { test, expect } from '@playwright/test';

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