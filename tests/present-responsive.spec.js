import { expect, test } from "@playwright/test";
import { reachPresent, selectors } from "./helpers/epistle.js";

const TOLERANCE = 0.5;

const expectInsideViewport = async (page, selector) => {
  const box = await page.locator(selector).boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(-TOLERANCE);
  expect(box.y).toBeGreaterThanOrEqual(-TOLERANCE);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + TOLERANCE);
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + TOLERANCE);
};

test.describe("HITO 4 — responsive", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await reachPresent(page);
  });

  test("AB01 — carretera y señal permanecen contenidas", async ({ page }) => {
    await expectInsideViewport(page, selectors.presentRoadScene);
    await expectInsideViewport(page, selectors.presentSign);
  });

  test("AB02 — los tres hotspots permanecen accionables", async ({ page }) => {
    await expectInsideViewport(page, selectors.presentAlways);
    await expectInsideViewport(page, selectors.presentForward);
    await expectInsideViewport(page, selectors.presentSun);
  });

  test("AB03 — la sección no genera desbordamiento horizontal", async ({ page }) => {
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  });
});
