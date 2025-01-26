import { expect, Locator, test } from '@playwright/test';
import { productsMock } from './products.mock';

test('add products to cart', async ({ page }) => {
  await page.route('https://63c10327716562671870f959.mockapi.io/products', async route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(productsMock),
    });
  });

  await page.goto('http://localhost:5173/products');

  // Wait for the request to complete
  const response = await page.waitForResponse('https://63c10327716562671870f959.mockapi.io/products');
  expect(response.status()).toBe(200);

  await expect(page).toHaveTitle(/ShoppingList/);

  const firstItemInput = page.locator('[data-testid="amount-control"]').first();
  await firstItemInput.fill('5');

  const firstSubmitButton = page.locator('[data-testid="submit"]').first();
  await firstSubmitButton.click();

  const productCards = page.locator('[data-testid="product-card"]').first();
  await expect(productCards.first()).toContainText('Minimum order is 10.');

  const thirdItemInput = page.locator('[data-testid="amount-control"]').nth(2);
  await thirdItemInput.fill('9');

  const thirdSubmitButton = page.locator('[data-testid="submit"]').nth(2);
  await thirdSubmitButton.click();

  const sixthItemInput = page.locator('[data-testid="amount-control"]').nth(6);
  await sixthItemInput.fill('2');

  const sixthSubmitButton = page.locator('[data-testid="submit"]').nth(6);
  await sixthSubmitButton.click();
});
