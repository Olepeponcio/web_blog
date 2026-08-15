import { expect, test } from "@playwright/test";
import { revealOriginText, selectors } from "./helpers/epistle.js";

test.describe("HITO 2 — salida hacia Memoria", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("J01 — finaliza Origen sin desplazar automáticamente", async ({ page }) => {
    await revealOriginText(page);
    await expect(page.locator(selectors.origin)).toHaveAttribute(
      "data-origin-state",
      "completed",
    );
    await expect(page.locator(selectors.body)).not.toHaveAttribute(
      "data-origin-scroll-locked",
      "true",
    );
    await expect(page.locator(selectors.memory)).not.toBeInViewport();
    await expect(page.locator(selectors.scrollCue)).toBeVisible();
  });

  test("J02 — permite regresar hacia Cover con la rueda", async ({ page }) => {
    await revealOriginText(page);
    const originPosition = await page.evaluate(() => window.scrollY);

    await page.mouse.wheel(0, -600);

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(
      originPosition,
    );
  });
});
