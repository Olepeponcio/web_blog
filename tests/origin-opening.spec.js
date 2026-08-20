import { expect, test } from "@playwright/test";
import { openOriginJar, reachOrigin, selectors } from "./helpers/epistle.js";

test.describe("HITO 2 — apertura del bote", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("H01 — cambia de imagen, bloquea repeticiones y anima el corcho", async ({ page }) => {
    await reachOrigin(page);
    await page.locator(selectors.originJar).click();

    await expect(page.locator(selectors.origin)).toHaveAttribute("data-origin-state", "opening");
    await expect(page.locator(selectors.originJar)).toBeDisabled();
    await expect(page.locator(selectors.originCork)).toBeVisible();
    await expect(page.locator(selectors.originJarImage)).toHaveAttribute(
      "src",
      /img__ink-jar--open(?:-[\w-]+)?\.webp(?:\?.*)?$/,
    );

    await expect(page.locator(selectors.origin)).toHaveAttribute("data-origin-state", "opened-ready", { timeout: 8_000 });
    await expect(page.locator(selectors.originCork)).toBeHidden();
    await expect(page.locator(selectors.originJar)).toBeEnabled();
  });

  test("H02 — el segundo clic adapta la interacción al viewport", async ({ page }) => {
    await openOriginJar(page);
    await page.locator(selectors.originJar).click();

    if (page.viewportSize().width <= 768) {
      await expect(page.locator(selectors.origin)).toHaveAttribute(
        "data-origin-state",
        "completed",
        { timeout: 8_000 },
      );
      await expect(page.locator(selectors.originFloatingJar)).toBeHidden();
      await expect(page.locator(selectors.body)).not.toHaveAttribute(
        "data-origin-scroll-locked",
        "true",
      );
    } else {
      await expect(page.locator(selectors.origin)).toHaveAttribute("data-origin-state", "active");
      await expect(page.locator(selectors.originJar)).toBeHidden();
      await expect(page.locator(selectors.originFloatingJar)).toBeVisible();
    }
  });
});
