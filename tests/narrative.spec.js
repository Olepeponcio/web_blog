import { expect, test } from "@playwright/test";
import { openEpistle, selectors } from "./helpers/epistle.js";

test.describe("Recorrido y contenido", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("E01 — habilita el desplazamiento después de la escritura", async ({ page }) => {
    await openEpistle(page);
    const initialScrollY = await page.evaluate(() => window.scrollY);

    await page.mouse.wheel(0, 600);

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(initialScrollY);
  });

  test("E02 — muestra el indicador al finalizar el texto", async ({ page }) => {
    await openEpistle(page);

    await expect(page.locator(selectors.scrollCue)).toBeVisible();
  });

  test("E03 — mantiene el indicador en las secciones narrativas", async ({ page }) => {
    await openEpistle(page);
    await page.mouse.wheel(0, 100);

    await expect(page.locator(selectors.scrollCue)).toBeVisible();
  });

  test("E04 — conserva el orden narrativo de las secciones", async ({ page }) => {
    const sectionIds = await page
      .locator("main > section")
      .evaluateAll((sections) => sections.map((section) => section.id));

    expect(sectionIds).toEqual([
      "origin",
      "memory",
      "present",
      "future",
      "recipient",
      "response",
    ]);
  });

  test("E05 — permite alcanzar el formulario y el footer", async ({ page }) => {
    await openEpistle(page);

    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("form.response-form")).toBeVisible();
    await expect(page.locator("footer.site-footer")).toBeVisible();
  });
});
