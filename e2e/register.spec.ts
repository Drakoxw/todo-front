import { test, expect } from '@playwright/test';

test.describe('Registro de usuario', () => {
  test.beforeEach(async ({ page }) => {
    // Abre la página de registro
    await page.goto('/auth/register');
  });

  // test('debería registrar un usuario exitosamente', async ({ page }) => {
  //   const email = `user${Date.now()}@example.com`;

  //   await page.getByTestId('register-name').fill('Juan Pérez');
  //   await page.getByTestId('register-email').fill(email);
  //   await page.locator('[data-testid="register-password"] input').fill('123456789');
  //   await page.locator('[data-testid="register-confirm"] input').fill('123456789');

  //   // Interceptar la petición de registro (opcional)
  //   await page.route('**/api/auth/register', route =>
  //     route.fulfill({
  //       status: 201,
  //       contentType: 'application/json',
  //       body: JSON.stringify({ message: 'Registro exitoso', success: true })
  //     })
  //   );

  //   await page.getByTestId('register-submit').click();

  //   // Verificar redirección o mensaje de éxito
  //   await expect(page).toHaveURL(/home/);
  // });

  test('debería mostrar error si las contraseñas no coinciden', async ({ page }) => {
    const email = `error${Date.now()}@example.com`;

    await page.getByTestId('register-name').fill('Error User');
    await page.getByTestId('register-email').fill(email);
    await page.locator('[data-testid="register-password"] input').fill('123456789');
    await page.locator('[data-testid="register-confirm"] input').fill('9878654321');

    await page.getByTestId('register-submit').click();

    // Esperar mensaje de error en pantalla
    await expect(page.getByText(/contraseñas no coinciden/i)).toBeVisible();
  });
});
