import { expect, test } from "@playwright/test";
import { activateOriginInk, revealOriginText, selectors } from "./helpers/epistle.js";

test.describe("HITO 2 — revelado con tinta", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("I01 — el hotspot revela palabras completas durante el movimiento", async ({ page }) => {
    await activateOriginInk(page);
    const word = page.locator(".origin-word").first();
    const box = await word.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect(word).toHaveClass(/origin-word--revealed/, { timeout: 3_000 });
  });

  test("I02 — la finalización espera a todas las palabras y animaciones", async ({ page }) => {
    await revealOriginText(page);
    await expect(page.locator(selectors.origin)).toHaveAttribute("data-origin-reveal-complete", "true");
    await expect(page.locator(".origin-word--revealed")).toHaveCount(await page.locator(".origin-word").count());
    await expect(page.locator(".origin-word--revealing")).toHaveCount(0);
    await expect(page.locator(selectors.originFloatingJar)).toBeHidden();
    await expect(page.locator(selectors.originContinue)).toBeEnabled();
  });
});
