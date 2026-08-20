import { expect, test } from "@playwright/test";
import {
  getEnvelopeOffset,
  getVisibleEnvelopePoint,
  openOriginJar,
  selectors,
} from "./helpers/epistle.js";
import { createTouchDriver } from "./helpers/touch.js";

test.describe("Interacciones táctiles", () => {
  test("TC01 — arrastra el sobre y libera el gesto vertical", async ({ page }) => {
    await page.goto("/");
    const touch = await createTouchDriver(page);
    const envelope = page.locator(selectors.envelope);
    const initialOffset = await getEnvelopeOffset(page);
    const start = await getVisibleEnvelopePoint(page);

    await expect(envelope).toHaveCSS("touch-action", "none");
    await touch.drag({
      from: start,
      to: { x: start.x, y: start.y - initialOffset + 20 },
    });

    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "seal-ready",
    );
    await expect(envelope).toHaveCSS("touch-action", "pan-y");

    await page.locator(selectors.seal).click();
    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "open",
      { timeout: 15_000 },
    );
    await page.evaluate(() => window.scrollTo({ top: 0 }));

    const deployedBox = await envelope.boundingBox();
    expect(deployedBox).not.toBeNull();
    const swipeStart = {
      x: deployedBox.x + deployedBox.width / 2,
      y: Math.min(deployedBox.y + deployedBox.height - 20, 620),
    };

    await touch.drag({
      from: swipeStart,
      to: { x: swipeStart.x, y: Math.max(swipeStart.y - 140, 1) },
    });

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
  });

  test("TC02 — un toque sobre el bote revela el texto en móvil", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({ width: 440, height: 956 });
    await openOriginJar(page);

    const touch = await createTouchDriver(page);
    const jar = page.locator(selectors.originJar);
    const jarBox = await jar.boundingBox();

    expect(jarBox).not.toBeNull();
    await touch.tap({
      x: jarBox.x + jarBox.width / 2,
      y: jarBox.y + jarBox.height / 2,
    });

    await expect(page.locator(selectors.origin)).toHaveAttribute(
      "data-origin-state",
      "completed",
      { timeout: 8_000 },
    );
    await expect(page.locator(selectors.body)).not.toHaveAttribute(
      "data-origin-scroll-locked",
      "true",
    );
  });

  test("TC03 — un click táctil tardío no intenta recapturar el puntero", async ({
    page,
  }) => {
    await page.goto("/");
    await openOriginJar(page);

    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.locator(selectors.originJar).evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      element.dispatchEvent(
        new PointerEvent("click", {
          bubbles: true,
          clientX: bounds.left + bounds.width / 2,
          clientY: bounds.top + bounds.height / 2,
          detail: 1,
          pointerId: 1,
          pointerType: "touch",
        }),
      );
    });

    await expect(page.locator(selectors.origin)).toHaveAttribute(
      "data-origin-state",
      /active|completed/,
    );
    expect(errors).toEqual([]);
  });
});
