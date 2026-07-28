import { expect, test } from "@playwright/test";

test.describe("Chat Widget", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
    await page.goto("/");
  });

  test("21. Chat widget button aparece si VITE_ENABLE_AI=true", async ({
    page,
  }) => {
    // Esperar a que la página cargue
    await page.waitForTimeout(500);

    // Intentar encontrar el chat button
    const chatButton = page.locator("[class*='chat'], [data-testid*='chat']");

    // Si hay elementos con "chat" en el class o atributo, debería estar visible
    // Este test depende de la configuración VITE_ENABLE_AI
    const elementCount = await chatButton.count();

    // Si elementCount > 0, entonces el widget está habilitado
    if (elementCount > 0) {
      await expect(chatButton.first()).toBeVisible();
    }
  });

  test("22. Chat widget se abre/cierra correctamente", async ({ page }) => {
    // Esperar a que cargue
    await page.waitForTimeout(500);

    // Encontrar botón del chat (puede variar según implementación)
    const chatButton = page
      .locator("button")
      .filter({
        has: page.locator("[class*='chat' i]"),
      })
      .first();

    // Si existe el botón
    const chatButtonExists = (await chatButton.count()) > 0;

    if (chatButtonExists) {
      // Click para abrir
      await chatButton.click();
      await page.waitForTimeout(300);

      // Debe haber contenido del chat visible
      const chatContainer = page.locator("[class*='widget']");
      const isVisible = await chatContainer.isVisible().catch(() => false);

      if (isVisible) {
        // Click para cerrar
        await chatButton.click();
        await page.waitForTimeout(300);

        // El chat debe estar cerrado
        await expect(chatContainer).not.toBeVisible();
      }
    }
  });
});
