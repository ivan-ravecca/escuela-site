import { expect, test } from "@playwright/test";

test.describe("Authentication and Protected Routes", () => {
  test.beforeEach(async ({ page, context }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
    // Clear any stored auth tokens
    await context.clearCookies();
  });

  test("19. Sin login, acceder a /administracion redirige a /login", async ({
    page,
  }) => {
    // Intentar acceder a página protegida
    await page.goto("/administracion");

    // Debe redirigir a login
    expect(page.url()).toContain("/login");

    // Login page debe estar visible
    const loginContent = page.locator("#content");
    await expect(loginContent).toBeVisible();
  });

  test("20. Login renderiza correctamente", async ({ page }) => {
    await page.goto("/login");

    // Debe mostrar contenido de login
    const content = page.locator("#content");
    await expect(content).toBeVisible();

    // Debe haber un botón o elemento relacionado con Google Auth
    // (react-oauth/google)
    const buttons = page.locator("button, [role='button']");
    expect(await buttons.count()).toBeGreaterThan(0);

    // No debe ser 404
    await expect(
      page.getByRole("heading", { name: /404/i })
    ).not.toBeVisible();
  });
});
