import { expect, test } from "@playwright/test";

test.describe("Error Handling", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
  });

  test("25. Página 404 aparece para rutas no existentes", async ({ page }) => {
    // Navegar a ruta que no existe
    await page.goto("/ruta-que-no-existe-12345");

    // Debe mostrar página 404
    await expect(
      page.getByRole("heading", { name: /404|no encontrada|not found/i })
    ).toBeVisible();

    // O debe haber un mensaje de error
    const content = page.locator("#content");
    await expect(content).toBeVisible();
  });
});
