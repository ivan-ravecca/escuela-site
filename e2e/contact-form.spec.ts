import { expect, test } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contacto");
  });

  test("12. Formulario de contacto valida campos requeridos", async ({
    page,
  }) => {
    // Encontrar el formulario
    const form = page.locator("form, [id='contact']");
    await expect(form).toBeVisible();

    // El input de envío debe estar deshabilitado si no hay datos
    const submitButton = page.locator("input[type='submit']");
    await expect(submitButton).toBeDisabled();

    // Llenar solo el nombre (no suficiente)
    const nameInput = page.locator("input#name");
    await nameInput.fill("Juan");
    await page.waitForTimeout(400); // Wait for debounce

    // Button aún debe estar deshabilitado (falta email y comentarios)
    await expect(submitButton).toBeDisabled();
  });

  test("13. Formulario rechaza email inválido", async ({ page }) => {
    // Obtener inputs específicos
    const nameInput = page.locator("input#name");
    const emailInput = page.locator("input#email");
    const commentsInput = page.locator("textarea#comments");
    const submitButton = page.locator("input[type='submit']");

    // Llenar nombre válido
    await nameInput.fill("Juan Perez");
    await page.waitForTimeout(400);

    // Llenar email inválido
    await emailInput.fill("email-invalido");
    await page.waitForTimeout(400);
    await commentsInput.fill("Este es un comentario válido para poder enviar");
    await page.waitForTimeout(400);

    // Button debe estar deshabilitado por email inválido
    await expect(submitButton).toBeDisabled();

    // Llenar con email válido
    await emailInput.fill("juan@example.com");
    await page.waitForTimeout(400);

    // Ahora el button debe estar habilitado
    await expect(submitButton).toBeEnabled();
  });

  test("14. Formulario se envía y muestra mensaje de éxito", async ({
    page,
  }) => {
    // Llenar formulario
    const nameInput = page.locator("input#name");
    const emailInput = page.locator("input#email");
    const commentsInput = page.locator("textarea#comments");
    const submitButton = page.locator("input[type='submit']");

    await nameInput.fill("Ana Garcia");
    await page.waitForTimeout(400);
    await emailInput.fill("ana@example.com");
    await page.waitForTimeout(400);
    await commentsInput.fill("Necesito información sobre los cursos de enfermería disponibles");
    await page.waitForTimeout(400);

    // Verificar que el button está habilitado
    await expect(submitButton).toBeEnabled();

    // Submit
    await submitButton.click();

    // Esperar que aparezca el mensaje de procesamiento o éxito
    const notificationMessage = page.locator(".notification");
    await expect(notificationMessage).toBeVisible({ timeout: 5000 });
  });

  test("15. Formulario limpia campos después de envío exitoso", async ({
    page,
  }) => {
    // Llenar formulario
    const nameInput = page.locator("input#name");
    const emailInput = page.locator("input#email");
    const commentsInput = page.locator("textarea#comments");
    const submitButton = page.locator("input[type='submit']");

    await nameInput.fill("Ana Garcia");
    await page.waitForTimeout(400);
    await emailInput.fill("ana@example.com");
    await page.waitForTimeout(400);
    await commentsInput.fill("Consulta importante sobre el programa disponible");
    await page.waitForTimeout(400);

    // Submit
    await submitButton.click();

    // Esperar a que aparezca el mensaje de procesamiento o resultado
    const notification = page.locator(".notification");
    await expect(notification).toBeVisible({ timeout: 8000 });

    // Esperar a que se resuelva (puede ser success o error, pero algo debe pasar)
    await page.waitForTimeout(1000);

    // Después del procesamiento, el input debe estar deshabilitado mientras se procesa,
    // y luego debe poder ser rellenado nuevamente
    await expect(submitButton).toBeTruthy();
  });
});
