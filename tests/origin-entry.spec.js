import { expect, test } from "@playwright/test";
import { reachOrigin, selectors } from "./helpers/epistle.js";

test.describe("HITO 2 — entrada en Origen", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("G01 — comienza inactivo y con el bote deshabilitado", async ({ page }) => {
    await expect(page.locator(selectors.origin)).toHaveAttribute("data-origin-state", "idle");
    await expect(page.locator(selectors.originJar)).toBeDisabled();
  });

  test("G02 — centra Origen antes de bloquear y habilitar el bote", async ({ page }) => {
    await reachOrigin(page);
    await expect(page.locator(selectors.body)).not.toHaveAttribute(
      "data-origin-scroll-locked",
      "true",
    );
    await expect(page.locator(selectors.originJar)).toBeEnabled();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test("G03 — revela Origen antes de escribir el título", async ({ page }) => {
    await page.evaluate(() => {
      document.body.dataset.pageState = "open";
      document.querySelector("[data-origin]").scrollIntoView();
    });

    await expect(page.locator(selectors.originEyebrow)).toHaveClass(
      /origin__eyebrow--visible/,
    );
    await expect(page.locator(selectors.originHeading)).toBeEmpty();
    await page.waitForTimeout(700);
    await expect(page.locator(selectors.originHeading)).toBeEmpty();
    await expect(page.locator(selectors.originHeading)).toHaveText(
      "Por qué escribo",
      { timeout: 8_000 },
    );
  });
});
