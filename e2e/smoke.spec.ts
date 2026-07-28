import { expect, test } from "@playwright/test";

test("home page renders primary heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Escuela de enfermería en Pando" })
  ).toBeVisible();
});
