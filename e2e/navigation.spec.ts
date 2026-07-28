import { expect, test } from "@playwright/test";

test.describe("Navigation - Mobile Menu (Hamburger)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    await page.goto("/");
  });

  test("1. Mobile menu (hamburger) se despliega correctamente al hacer click", async ({
    page,
  }) => {
    // El menu hamburger debe estar visible en mobile
    const hamburgerButton = page.locator(".bm-burger-button");
    await expect(hamburgerButton).toBeVisible();

    // Click para abrir el menu
    await hamburgerButton.click();

    // Esperar a que el menu se abra
    const menuContainer = page.locator(".bm-menu");
    await expect(menuContainer).toBeVisible();
  });

  test("2. Mobile menu muestra todos los items correctos", async ({ page }) => {
    // Abrir menu
    await page.locator(".bm-burger-button").click();
    await page.waitForTimeout(500); // Esperar animación

    // Verificar items principales del menu
    const menuItems = page.locator(".bm-menu");
    await expect(menuItems).toBeVisible();

    // Verificar que hay links
    const links = menuItems.locator("a");
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(5); // Al menos los 6 links principales
  });

  test("3. Mobile menu cierra al clickear un item", async ({ page }) => {
    // Abrir menu
    await page.locator(".bm-burger-button").click();
    await page.waitForTimeout(300);

    // Click en "Cursos"
    await page.getByRole("link", { name: /Cursos/i }).first().click();
    await page.waitForTimeout(300);

    // Verificar que el menu se cerró (menu container no debe estar visible)
    const menuContainer = page.locator(".bm-menu");
    // El menu debe estar closed (no visible o con clase que lo oculte)
    await expect(menuContainer).not.toHaveClass(/bm-open/);
  });
});

test.describe("Navigation - Desktop Menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 }); // Desktop viewport
    await page.goto("/");
  });

  test("4. Desktop menu (navbar) muestra navbar completa en pantallas grandes", async ({
    page,
  }) => {
    // El header/nav debe estar visible en desktop
    const header = page.locator("header, [class*='header'], [class*='nav']");
    await expect(header.first()).toBeVisible();

    // Debe haber al menos algunos links visibles
    const navLinks = page.locator("a[href]");
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(5);
  });

  test("5. Desktop menu 'Cursos' despliega dropdown con subcategorías", async ({
    page,
  }) => {
    // Hover en "Cursos"
    const cursosLink = page.getByRole("link", { name: /Cursos/i }).first();
    await cursosLink.hover();

    // Esperar a que aparezca el dropdown
    await page.waitForTimeout(200);

    // Verificar que aparecen subcategorías
    await expect(page.getByText("Auxiliar de Enfermería")).toBeVisible();
    await expect(
      page.getByText(/Auxiliar de Servicio, Ayudante de cocina/)
    ).toBeVisible();
    await expect(
      page.getByText("Auxiliar de Farmacia Hospitalaria")
    ).toBeVisible();

    // Verificar headers del dropdown
    await expect(page.getByText("Los más buscados")).toBeVisible();
    await expect(page.getByText("Cursos cortos")).toBeVisible();
  });
});
