import { expect, test } from "@playwright/test";

test.describe("Footer and Social Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1024 });
    await page.goto("/");

    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  });

  test("23. Footer muestra redes sociales", async ({ page }) => {
    // Esperar a que footer cargue
    const footer = page.locator("footer, [class*='footer']");
    await expect(footer).toBeVisible();

    // El footer actual expone vías de contacto directas y widget de Facebook.
    const whatsappLink = footer.locator("a[href*='wa.me']");
    const emailLink = footer.locator("a[href^='mailto:']");
    const phoneLink = footer.locator("a[href^='tel:']");
    const mapsLink = footer.locator("a[href*='google.com/maps']");
    const facebookWidget = footer.locator("iframe[src*='facebook.com/plugins']");

    expect(await whatsappLink.count()).toBeGreaterThan(0);
    expect(await emailLink.count()).toBeGreaterThan(0);
    expect(await phoneLink.count()).toBeGreaterThan(0);
    expect(await mapsLink.count()).toBeGreaterThan(0);
    await expect(facebookWidget.first()).toBeVisible();
  });

  test("24. Links de redes sociales en footer funcionan (abren en nueva pestaña)", async ({
    page,
    context,
  }) => {
    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Usamos un enlace externo del footer que abre en nueva pestaña.
    const externalLink = page
      .locator("footer a[target='_blank'][rel*='noopener']")
      .first();
    await expect(externalLink).toBeVisible();

    // Verificar que tiene target="_blank"
    const target = await externalLink.getAttribute("target");
    expect(target).toBe("_blank");

    // Verificar que tiene rel="noopener noreferrer"
    const rel = await externalLink.getAttribute("rel");
    expect(rel).toContain("noopener");

    // Clickear y verificar que abre en nueva pestaña con URL externa
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      externalLink.click(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toMatch(/^https?:\/\//);

    await newPage.close();
  });
});
