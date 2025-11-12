import { test, expect } from '@playwright/test';

test('Por defecto debe ir al login', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Iniciar sesión')).toBeVisible();
});
