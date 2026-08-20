import { expect, test } from "@playwright/test";
import { openOriginJar, reachOrigin, selectors } from "./helpers/epistle.js";

const SUBPIXEL_TOLERANCE = 0.5;

test.describe("HITO 2 — responsive", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("K01 — Origen y el bote permanecen dentro del viewport", async ({ page }) => {
    await reachOrigin(page);
    const viewport = page.viewportSize();
    const jar = await page.locator(selectors.originJar).boundingBox();
    expect(viewport).not.toBeNull();
    expect(jar).not.toBeNull();
    expect(jar.x).toBeGreaterThanOrEqual(0);
    expect(jar.x + jar.width).toBeLessThanOrEqual(viewport.width);
    expect(jar.y).toBeGreaterThanOrEqual(0);
    expect(jar.y + jar.height).toBeLessThanOrEqual(viewport.height);

    const jarCenter = jar.x + jar.width / 2;
    if (viewport.width <= 480) {
      expect(Math.abs(jarCenter - viewport.width / 2)).toBeLessThanOrEqual(2);
    } else {
      expect(jarCenter).toBeLessThan(viewport.width / 2);
    }
  });

  test("K02 — la apertura no genera desbordamiento horizontal", async ({ page }) => {
    await openOriginJar(page);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });

  test("K03 — el frasco flotante respeta los cuatro bordes", async ({
    page,
  }) => {
    await openOriginJar(page);
    await page.locator(selectors.originJar).click();

    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();

    if (viewport.width <= 768) {
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
      return;
    }

    for (const [x, y] of [
      [0, 0],
      [viewport.width - 1, 0],
      [viewport.width - 1, viewport.height - 1],
      [0, viewport.height - 1],
    ]) {
      await page.mouse.move(x, y);
      const jar = await page.locator(selectors.originFloatingJar).boundingBox();

      expect(jar).not.toBeNull();
      expect(jar.x).toBeGreaterThanOrEqual(-SUBPIXEL_TOLERANCE);
      expect(jar.y).toBeGreaterThanOrEqual(-SUBPIXEL_TOLERANCE);
      expect(jar.x + jar.width).toBeLessThanOrEqual(
        viewport.width + SUBPIXEL_TOLERANCE,
      );
      expect(jar.y + jar.height).toBeLessThanOrEqual(
        viewport.height + SUBPIXEL_TOLERANCE,
      );
    }
  });

  test("K04 — un viewport extremo no queda bloqueado", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await reachOrigin(page);

    await expect(page.locator(selectors.body)).not.toHaveAttribute(
      "data-origin-scroll-locked",
      "true",
    );
  });

  test("K05 — conserva la composición al redimensionar el inspector", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await reachOrigin(page);
    await page.setViewportSize({ width: 1298, height: 808 });

    const viewport = page.viewportSize();
    const origin = await page.locator(selectors.origin).boundingBox();
    const jar = await page.locator(selectors.originJar).boundingBox();

    expect(viewport).not.toBeNull();
    expect(origin).not.toBeNull();
    expect(jar).not.toBeNull();
    expect(origin.y).toBeGreaterThanOrEqual(-1);
    expect(jar.x).toBeGreaterThanOrEqual(0);
    expect(jar.y).toBeGreaterThanOrEqual(0);
    expect(jar.x + jar.width).toBeLessThanOrEqual(viewport.width);
    expect(jar.y + jar.height).toBeLessThanOrEqual(viewport.height);
  });

  test("K06 — no desplaza ni bloquea Origin en smartphone", async ({ page }) => {
    await page.setViewportSize({ width: 440, height: 956 });
    const initialScrollY = await page.evaluate(() => {
      document.body.dataset.pageState = "open";
      const origin = document.querySelector("[data-origin]");
      window.scrollTo(0, origin.offsetTop - window.innerHeight * 0.3);
      return window.scrollY;
    });

    await expect(page.locator(selectors.origin)).toHaveAttribute(
      "data-origin-state",
      "ready",
      { timeout: 8_000 },
    );

    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBeCloseTo(initialScrollY, 0);
    await expect(page.locator(selectors.body)).not.toHaveAttribute(
      "data-origin-scroll-locked",
      "true",
    );
  });
});
