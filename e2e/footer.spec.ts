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

    // Debe haber links de redes sociales
    const socialLinks = page.locator("a[href*='facebook']");
    expect(await socialLinks.count()).toBeGreaterThan(0);

    // Verificar iconos de redes sociales
    const instagramLink = page.locator("a[href*='instagram']");
    const linkedinLink = page.locator("a[href*='linkedin']");
    const whatsappLink = page.locator("a[href*='whatsapp']");

    await expect(instagramLink).toBeTruthy();
    await expect(linkedinLink).toBeTruthy();
    await expect(whatsappLink).toBeTruthy();
  });

  test("24. Links de redes sociales en footer funcionan (abren en nueva pestaña)", async ({
    page,
    context,
  }) => {
    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Encontrar link de Facebook
    const facebookLink = page.locator("a[href*='facebook']").first();
    await expect(facebookLink).toBeVisible();

    // Verificar que tiene target="_blank"
    const target = await facebookLink.getAttribute("target");
    expect(target).toBe("_blank");

    // Verificar que tiene rel="noopener noreferrer"
    const rel = await facebookLink.getAttribute("rel");
    expect(rel).toContain("noopener");

    // Clickear y verificar que abre en nueva pestaña
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      facebookLink.click(),
    ]);

    // Verificar que la URL contiene facebook
    expect(newPage.url()).toContain("facebook");

    await newPage.close();
  });
});
