import { expect, test } from "@playwright/test";
import { openOriginJar, reachOrigin, selectors } from "./helpers/epistle.js";

test.describe("HITO 2 — responsive", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("K01 — Origen y el bote permanecen dentro del viewport", async ({ page }) => {
    await reachOrigin(page);
    const viewport = page.viewportSize();
    const jar = await page.locator(selectors.originJar).boundingBox();
    expect(jar).not.toBeNull();
    expect(jar.x).toBeGreaterThanOrEqual(0);
    expect(jar.x + jar.width).toBeLessThanOrEqual(viewport.width);
    expect(jar.y).toBeGreaterThanOrEqual(0);
    expect(jar.y + jar.height).toBeLessThanOrEqual(viewport.height);
  });

  test("K02 — la apertura no genera desbordamiento horizontal", async ({ page }) => {
    await openOriginJar(page);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
});
