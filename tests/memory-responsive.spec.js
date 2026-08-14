import { expect, test } from "@playwright/test";
import { completeMemory, prepareMemoryPostcard, reachMemory, selectors } from "./helpers/epistle.js";

const SUBPIXEL_TOLERANCE = 0.5;

const expectInsideViewport = async (page, selector) => {
  const box = await page.locator(selector).boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(-SUBPIXEL_TOLERANCE);
  expect(box.y).toBeGreaterThanOrEqual(-SUBPIXEL_TOLERANCE);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + SUBPIXEL_TOLERANCE);
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + SUBPIXEL_TOLERANCE);
};

test.describe("HITO 3 — responsive", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("R01 — escena y controles permanecen dentro del viewport", async ({ page }) => {
    await reachMemory(page);
    await expectInsideViewport(page, selectors.memoryScene);
    await expectInsideViewport(page, selectors.memorySwitch);

    await page.locator(selectors.memorySwitch).click();
    await expectInsideViewport(page, selectors.memoryInstrument);
  });

  test("R02 — la postal centrada queda contenida", async ({ page }) => {
    await prepareMemoryPostcard(page);
    await expectInsideViewport(page, selectors.memoryPostcard);

    const scene = await page.locator(selectors.memoryScene).boundingBox();
    const postcard = await page
      .locator(selectors.memoryPostcard)
      .boundingBox();

    expect(scene).not.toBeNull();
    expect(postcard).not.toBeNull();
    expect(postcard.width).toBeGreaterThan(scene.width * 0.6);
  });

  test("R03 — el reverso permanece contenido al completar el flujo", async ({ page }) => {
    await completeMemory(page);
    await expectInsideViewport(page, selectors.memoryPostcard);
    await expect(page.locator(selectors.body)).not.toHaveAttribute("data-memory-scroll-locked", "true");
  });
});
