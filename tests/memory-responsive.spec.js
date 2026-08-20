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
  });

  test("R04 — la postal centrada se recalcula al cambiar el viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await prepareMemoryPostcard(page);
    const desktop = await page.locator(selectors.memoryPostcard).boundingBox();

    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator(selectors.memory).scrollIntoViewIfNeeded();
    await expectInsideViewport(page, selectors.memoryPostcard);
    const mobile = await page.locator(selectors.memoryPostcard).boundingBox();
    const scene = await page.locator(selectors.memoryScene).boundingBox();

    expect(desktop).not.toBeNull();
    expect(mobile).not.toBeNull();
    expect(scene).not.toBeNull();
    expect(mobile.width).toBeLessThan(desktop.width);
    expect(mobile.width / scene.width).toBeCloseTo(0.86, 1);
  });

  test("R05 — activa Memory sin desplazar ni bloquear en smartphone", async ({ page }) => {
    await page.setViewportSize({ width: 440, height: 956 });
    await reachMemory(page);
    const initialScrollY = await page.evaluate(() => window.scrollY);

    await page.locator(selectors.memorySwitch).click();
    await expect(page.locator(selectors.memory)).toHaveAttribute(
      "data-memory-state",
      "signal",
    );

    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBeCloseTo(initialScrollY, 0);
    await expectInsideViewport(page, selectors.memoryScene);
    await expect(page.locator(selectors.body)).not.toHaveAttribute(
      "data-memory-scroll-locked",
      "true",
    );
  });
});
