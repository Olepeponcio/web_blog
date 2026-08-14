import { expect, test } from "@playwright/test";
import { revealOriginText, selectors } from "./helpers/epistle.js";

test.describe("HITO 2 — salida hacia Memoria", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("J01 — conserva el bloqueo hasta pulsar la flecha", async ({ page }) => {
    await revealOriginText(page);
    await expect(page.locator(selectors.body)).toHaveAttribute("data-origin-scroll-locked", "true");
    await expect(page.locator(selectors.originContinue)).toBeVisible();
  });

  test("J02 — la flecha lleva a Memoria y restaura el scroll", async ({ page }) => {
    await revealOriginText(page);
    await page.locator(selectors.originContinue).click({ force: true });
    await expect(page.locator(selectors.origin)).toHaveAttribute("data-origin-state", "completed", { timeout: 8_000 });
    await expect(page.locator(selectors.body)).not.toHaveAttribute("data-origin-scroll-locked", "true");
    await expect(page.locator(selectors.originContinue)).toBeHidden();
    await expect.poll(() => page.locator(selectors.memory).evaluate((element) => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(2);
  });
});
