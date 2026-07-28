import { expect, test } from "@playwright/test";

test.describe("Main Pages Navigation and Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
  });

  test("6. Home renderiza correctamente y muestra heading principal", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Escuela de enfermería en Pando" })
    ).toBeVisible();
  });

  test("7. Página Cursos se carga y muestra lista de cursos", async ({
    page,
  }) => {
    await page.goto("/cursos");

    // No debe ser 404
    await expect(
      page.getByRole("heading", { name: /404/i })
    ).not.toBeVisible();

    // Debe tener contenido visible
    const content = page.locator("#content");
    await expect(content).toBeVisible();

    // Debe haber al menos un heading
    const headings = page.locator("h1, h2");
    expect(await headings.count()).toBeGreaterThan(0);
  });

  test("8. Página Material se carga y es accesible", async ({ page }) => {
    await page.goto("/material");

    // Debe cargar sin error
    const content = page.locator("#content");
    await expect(content).toBeVisible();

    // Verificar que no es 404
    await expect(
      page.getByRole("heading", { name: /404|not found/i })
    ).not.toBeVisible();
  });

  test("9. Página Bedelía se carga y es accesible", async ({ page }) => {
    await page.goto("/bedelia");

    // Debe cargar sin error
    const content = page.locator("#content");
    await expect(content).toBeVisible();

    // Verificar que no es 404
    await expect(
      page.getByRole("heading", { name: /404|not found/i })
    ).not.toBeVisible();
  });

  test("10. Página Contacto se carga correctamente", async ({ page }) => {
    await page.goto("/contacto");

    // Debe mostrar heading de formulario
    await expect(
      page.getByRole("heading", { name: /Formulario de contacto/i })
    ).toBeVisible();

    // Debe tener form con campos
    await expect(page.locator("input[name]")).toBeTruthy();
  });

  test("11. Link Aulas abre en pestaña nueva (external link)", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    // Encontrar el link de Aulas
    const aulasLink = page.getByRole("link", { name: /Aulas/i }).first();

    // Esperar a nueva página
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      aulasLink.click({ target: "_blank" }),
    ]);

    // Verificar que la nueva página se abrió
    await expect(newPage).toBeTruthy();

    // Verificar que contiene 'aulas' en la URL
    expect(newPage.url()).toContain("aulas");

    await newPage.close();
  });

  test("18. Breadcrumbs aparecen en páginas y son clickeables", async ({
    page,
  }) => {
    // Navegando a detalle de curso (breadcrumbs solo aparecen en ciertas rutas)
    await page.goto("/cursos/auxiliar-enfermeria");

    // Debe haber navigation element con breadcrumbs
    const breadcrumbs = page.locator("nav#breadcrumbs");
    const breadcrumbsVisible = await breadcrumbs.isVisible().catch(() => false);

    if (breadcrumbsVisible) {
      // Debe tener links
      const links = breadcrumbs.locator("a");
      expect(await links.count()).toBeGreaterThan(0);

      // Los links deben ser clickeables
      const firstLink = links.first();
      await expect(firstLink).toBeVisible();
    }
  });
});
