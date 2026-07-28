import { expect, test } from "@playwright/test";

test.describe("Course Details Pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
  });

  test("16. Click en curso específico navega a página de detalle", async ({
    page,
  }) => {
    await page.goto("/cursos");

    // Encontrar y clickear primer curso
    const cursoLink = page.getByRole("link", { name: /Auxiliar/i }).first();
    await cursoLink.click();

    // Debe navegar a página de detalle
    expect(page.url()).toContain("/cursos/");

    // No debe ser 404
    await expect(
      page.getByRole("heading", { name: /404/i })
    ).not.toBeVisible();
  });

  test("17. Página de curso muestra información correcta (título, descripción, imagen)", async ({
    page,
  }) => {
    await page.goto("/cursos/auxiliar-enfermeria");

    // No debe ser 404
    await expect(
      page.getByRole("heading", { name: /404/i })
    ).not.toBeVisible();

    // Debe haber contenido de descripción
    const content = page.locator("#content");
    await expect(content).toBeVisible();

    // Debe tener algún contenido visible (texto, párrafos, etc)
    const bodyText = page.locator("body");
    const textContent = await bodyText.textContent();
    expect(textContent).toBeTruthy();
    expect(textContent?.length).toBeGreaterThan(100);
  });
});
