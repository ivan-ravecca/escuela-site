import { expect, test } from "@playwright/test";

test("el interruptor controla la visibilidad del asistente", async ({ page }) => {
  await page.route("**/site-courses", (route) => route.fulfill({ json: { courses: [] } }));
  await page.goto("/");
  const button = page.getByRole("button", { name: "Abrir asistente virtual" });
  if (process.env.VITE_ENABLE_AI === "true") {
    await expect(button).toBeVisible();
  } else {
    await expect(button).toHaveCount(0);
  }
});

test("chat muestra aviso, curso recomendado, contacto y error recuperable", async ({ page }) => {
  test.skip(process.env.VITE_ENABLE_AI !== "true", "Requiere VITE_ENABLE_AI=true");
  let chats = 0;
  await page.route("**/site-courses", (route) => route.fulfill({ json: { courses: [] } }));
  await page.route(/\/assistant\/(csrf-token|welcome|interest|chat)$/, async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith("/csrf-token")) return route.fulfill({ json: { csrfToken: "test-token" } });
    if (url.pathname.endsWith("/welcome")) return route.fulfill({ json: { message: "Hola, ¿en qué te ayudo?" } });
    if (url.pathname.endsWith("/interest")) {
      expect(route.request().postDataJSON()).toMatchObject({ course_id: "curso", course_name: "Curso de prueba" });
      return route.fulfill({ json: { success: true, message: "Gracias" } });
    }
    if (url.pathname.endsWith("/chat")) {
      chats++;
      const request = route.request().postDataJSON();
      expect(request.conversation_history.filter((item: { content: string }) => item.content === request.message)).toHaveLength(0);
      if (chats > 1) return route.fulfill({ status: 503, json: { code: "CATALOG_UNAVAILABLE", error: "El catálogo no está disponible." } });
      return route.fulfill({ json: {
        response: "Te recomiendo Curso de prueba",
        catalog_stale: true,
        recommended_courses: [{ id: "curso", name: "Curso de prueba", url: "http://localhost/cursos/curso" }],
      } });
    }
    return route.abort();
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir asistente virtual" }).click();
  await expect(page.getByText("Hola, ¿en qué te ayudo?")).toBeVisible();
  await page.getByLabel("Mensaje para el asistente").fill("Recomendame un curso");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.getByText("La información de los cursos podría estar desactualizada.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: /Me interesa/ }).click();
  await page.getByPlaceholder("Ej: Juan Pérez").fill("Usuario Prueba");
  await page.getByPlaceholder("099 123 456").fill("099123456");
  await page.getByPlaceholder("tu@email.com").fill("usuario@example.test");
  await page.getByLabel(/Acepto que me contacten/).check();
  await page.getByRole("button", { name: "Enviar información" }).click();
  await expect(page.getByText(/Hemos recibido tu información/)).toBeVisible();
  await page.getByLabel("Mensaje para el asistente").fill("Otra consulta");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.getByRole("alert")).toContainText("El catálogo no está disponible.");
  expect(chats).toBe(2);
});
