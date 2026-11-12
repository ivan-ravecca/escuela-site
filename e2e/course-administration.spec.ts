import { createHmac } from "node:crypto";
import { execFileSync } from "node:child_process";
import { unlinkSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("Administración de cursos con API aislada", () => {
  test.skip(
    process.env.COURSES_E2E_MUTATIONS !== "1" ||
      process.env.VITE_API_URL !== "http://127.0.0.1:31317" ||
      process.env.VITE_WORKSPACE_DOMAIN !== "example.test" ||
      process.env.VITE_TOKEN_STORAGE_KEY !== "course_test_auth",
    "Requiere la API y base de datos aisladas de integración",
  );

  test("todos los cursos migrados conservan su ruta y contenido", async ({ page, request }) => {
    const response = await request.get("http://127.0.0.1:31317/site-courses");
    expect(response.ok()).toBeTruthy();
    const { courses } = await response.json() as { courses: Array<{
      id: string; path: string; title: string; term: string;
      images: Array<{ src: string; alt: string }>;
    }> };
    expect(courses).toHaveLength(18);
    for (const course of courses) {
      expect(course.path).toBe(`/cursos/${course.id}`);
      await page.goto(course.path);
      await expect(page.locator("#content .product-info h3")).toHaveText(course.title);
      await expect(page).toHaveTitle(new RegExp(course.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      if (course.term) await expect(page.locator("#content .product-info .price")).toHaveText(course.term);
      if (course.images.length) await expect(page.locator("#content .slides img").first()).toHaveAttribute("src", course.images[0].src);
    }
  });

  test("crear, editar, redirigir, despublicar y restaurar", async ({ page }) => {
    let uploadedFilename: string | undefined;
    const imagesDirectory = process.env.COURSES_TEST_IMAGES_DIR;
    if (!imagesDirectory || !path.isAbsolute(imagesDirectory)) throw new Error("Falta la carpeta de imágenes de prueba");
    const slug = `zz-e2e-${Date.now()}`;
    const title = `Curso de prueba ${slug}`;
    const encoded = (data: object) => Buffer.from(JSON.stringify(data)).toString("base64url");
    const unsigned = `${encoded({ alg: "HS256", typ: "JWT" })}.${encoded({
      sub: "test", email: "admin@example.test", name: "Test", exp: Math.floor(Date.now() / 1000) + 3600,
    })}`;
    const token = `${unsigned}.${createHmac("sha256", "course-test-secret").update(unsigned).digest("base64url")}`;

    try {
      await page.addInitScript((value) => localStorage.setItem("course_test_auth", value), token);
      await page.goto("/administracion/cursos");
      await page.getByRole("button", { name: "Nuevo curso" }).click();
      await page.getByLabel("Nombre", { exact: true }).fill(title);
      await page.getByLabel("ID de la URL").fill(slug);
      await page.getByLabel("Información (HTML básico)").fill("<p>Información del curso de prueba</p>");
      await page.getByLabel("Inscripciones (HTML básico)").fill("<p>Inscripciones <strong>abiertas</strong></p><script>alert(1)</script>");
      await page.getByLabel("Los más buscados").check();
      const uploadResponse = page.waitForResponse((response) =>
        response.url().endsWith("/site-courses/images") && response.request().method() === "POST",
      );
      await page.getByLabel("Subir imagen JPEG, PNG o WebP (máximo 8 MB)").setInputFiles("public/images/shop/enfermeria_01.jpeg");
      const upload = await uploadResponse;
      expect(upload.status()).toBe(201);
      const image = page.getByRole("group", { name: "Imágenes" }).locator("img");
      await expect(image).toHaveAttribute("src", /^\/images\/shop\/[a-f0-9-]+\.jpg$/);
      uploadedFilename = path.basename((await image.getAttribute("src"))!);
      await page.getByLabel("Texto alternativo").fill("Imagen de prueba");
      const createdResponse = page.waitForResponse((response) =>
        response.url().endsWith("/site-courses") && response.request().method() === "POST",
      );
      await page.getByRole("button", { name: "Guardar" }).click();
      const created = await createdResponse;
      expect(created.status()).toBe(201);
      const row = page.locator("#content li").filter({ hasText: title });
      await expect(row).toBeVisible();
      await row.getByRole("button", { name: "Editar" }).click();
      await page.getByLabel("ID de la URL").fill(`${slug}-nuevo`);
      await page.getByRole("button", { name: "Guardar" }).click();
      await expect(page.getByText(`/cursos/${slug}-nuevo`, { exact: false })).toBeVisible();

      await page.goto(`/cursos/${slug}`);
      await page.waitForURL(`**/cursos/${slug}-nuevo`);
      await expect(page.getByText("Información del curso de prueba")).toBeVisible();
      await page.getByRole("link", { name: "Inscripciones" }).click();
      await expect(page.locator("#tab2")).toContainText("Inscripciones abiertas");
      await expect(page.locator("#tab2 script")).toHaveCount(0);
      await page.goto("/administracion/cursos");
      page.once("dialog", (dialog) => dialog.accept());
      await page.locator("#content li").filter({ hasText: title }).getByRole("button", { name: "Despublicar" }).click();
      await expect(page.locator("#content li").filter({ hasText: title })).toContainText("Despublicado");
      page.once("dialog", (dialog) => dialog.accept());
      await page.locator("#content li").filter({ hasText: title }).getByRole("button", { name: "Restaurar" }).click();
      await expect(page.locator("#content li").filter({ hasText: title })).toContainText("Publicado");
    } finally {
      execFileSync("docker", [
        "exec", "escuela-courses-migration-test", "mariadb", "-uroot", "-ptemporary-test-only",
        "escuela_test", "-e",
        `DELETE FROM site_courses WHERE title='${title}' AND migration_key IS NULL; UPDATE site_catalog_state SET revision=revision+1 WHERE id=1;`,
      ]);
      if (uploadedFilename) {
        unlinkSync(path.join(imagesDirectory, uploadedFilename));
      }
    }
  });
});
