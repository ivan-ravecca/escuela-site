import { expect, test } from "@playwright/test";

const integrationOnly = process.env.RUN_INTEGRATION_E2E !== "true";

test.describe("Assistant integration flow", () => {
  test.skip(integrationOnly, "Runs only against the dockerized integration stack");

  test("loads the backend welcome message and submits lead capture through the UI", async ({
    page,
  }) => {
    test.setTimeout(90_000);

    await page.goto("/");

    const openChatButton = page.getByRole("button", {
      name: /abrir asistente virtual|abrir chat/i,
    });
    await expect(openChatButton).toBeVisible();
    await openChatButton.click();

    await expect(
      page.getByRole("heading", { name: /asistente virtual/i })
    ).toBeVisible();

    await expect(
      page.getByText(/soy tu asistente virtual/i).first()
    ).toBeVisible({ timeout: 20_000 });

    const assistantInput = page.getByLabel(/mensaje para el asistente/i);
    await assistantInput.fill(
      "Tengo 28 años, secundaria completa, no tengo experiencia en salud, puedo estudiar 20 horas por semana, prefiero presencial y busco conseguir trabajo rápido. Recomendame hasta 3 cursos concretos del catálogo."
    );
    await page.getByRole("button", { name: /enviar mensaje/i }).click();

    const contactButton = page.getByRole("button", {
      name: /me interesa que me contacten/i,
    });

    if ((await contactButton.count()) === 0) {
      await assistantInput.fill(
        "Con esos datos, por favor recomendame cursos concretos del catálogo y no solo preguntas."
      );
      await page.getByRole("button", { name: /enviar mensaje/i }).click();
    }

    await expect(contactButton.first()).toBeVisible({ timeout: 30_000 });
    await contactButton.first().click();

    await expect(
      page.getByRole("heading", {
        name: /bien, deja tus datos y nos contactamos/i,
      })
    ).toBeVisible();

    await page.getByLabel(/nombre completo/i).fill("Ana Integracion");
    await page.getByLabel(/teléfono/i).fill("099123456");
    await page.getByLabel(/email/i).fill("ana.integration@example.com");
    await page.getByLabel(/acepto que me contacten por whatsapp/i).check();

    await page.getByRole("button", { name: /enviar información/i }).click();

    await expect(page.getByText(/¡gracias!/i)).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByText(/nos contactaremos contigo pronto vía whatsapp/i)
    ).toBeVisible();
  });
});