import { expect, test } from "@playwright/test";

const structuralSelectors = [
  "[data-envelope]",
  "[data-seal]",
  ".narrative-section__content",
  ".site-footer__content",
];

test.describe("Responsive estructural", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.body.dataset.pageState = "open";
    });
  });

  test("F01 — no existe scroll horizontal involuntario", async ({ page }) => {
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });

  test("F02 — los elementos estructurales respetan el ancho disponible", async ({
    page,
  }) => {
    const viewport = page.viewportSize();

    for (const selector of structuralSelectors) {
      const elements = page.locator(selector);

      for (let index = 0; index < (await elements.count()); index += 1) {
        const box = await elements.nth(index).boundingBox();
        expect(box, `${selector} debe tener geometría visible`).not.toBeNull();
        expect(box.x, `${selector} rebasa el borde izquierdo`).toBeGreaterThanOrEqual(
          -1,
        );
        expect(
          box.x + box.width,
          `${selector} rebasa el borde derecho`,
        ).toBeLessThanOrEqual(viewport.width + 1);
      }
    }
  });

  test("F03 — el sello permanece contenido y accionable", async ({ page }) => {
    const seal = page.locator("[data-seal]");
    const box = await seal.boundingBox();
    const viewport = page.viewportSize();

    expect(box).not.toBeNull();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
    expect(box.width).toBeLessThanOrEqual(viewport.width * 0.18);
  });

  test("F04 — el remitente aumenta en resoluciones amplias", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileSize = await page
      .locator(".cover__sender")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

    await page.setViewportSize({ width: 1440, height: 900 });
    const desktopSize = await page
      .locator(".cover__sender")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

    expect(desktopSize).toBeGreaterThan(mobileSize);
  });

  test("F05 — el sobre conserva una escala reducida y fluida", async ({ page }) => {
    const envelope = page.locator("[data-envelope]");
    const box = await envelope.boundingBox();
    const viewport = page.viewportSize();
    const rootFontSize = await page.evaluate(() =>
      Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
    );
    const expectedMaximum = Math.min(viewport.width * 0.92, rootFontSize * 60);

    expect(box).not.toBeNull();
    expect(box.width).toBeLessThanOrEqual(expectedMaximum + 1);
    expect(box.width).toBeLessThan(viewport.width);
  });

  test("F06 — la barra de accesibilidad se adapta al alcance táctil", async ({
    page,
  }) => {
    const toolbar = page.locator(".accessibility-toolbar");
    const viewport = page.viewportSize();
    const direction = await toolbar.evaluate(
      (element) => getComputedStyle(element).flexDirection,
    );
    const position = await toolbar.evaluate(
      (element) => getComputedStyle(element).position,
    );

    if (viewport.width < 600) {
      await expect(page.locator("footer > .accessibility-toolbar")).toHaveCount(1);
      expect(position).toBe("static");
      expect(direction).toBe("row");

      await page.locator("footer").scrollIntoViewIfNeeded();
      await expect(toolbar).toBeVisible();
      return;
    }

    if (viewport.width <= 768) {
      const scrollCue = page.locator("[data-scroll-cue]");
      const box = await toolbar.boundingBox();

      await expect(scrollCue).toBeVisible();
      const scrollCueBox = await scrollCue.boundingBox();

      expect(box).not.toBeNull();
      expect(scrollCueBox).not.toBeNull();
      expect(position).toBe("fixed");
      expect(direction).toBe("row");
      expect(Math.abs(box.x + box.width / 2 - viewport.width / 2)).toBeLessThanOrEqual(1);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
      expect(scrollCueBox.y - (box.y + box.height)).toBeGreaterThanOrEqual(11);
      return;
    }

    expect(position).toBe("fixed");
    expect(direction).toBe("column");
  });

  test("F07 — la barra cambia de footer a flotante en 600 píxeles", async ({
    page,
  }) => {
    const toolbar = page.locator(".accessibility-toolbar");

    await page.setViewportSize({ width: 599, height: 800 });
    await expect(toolbar).toHaveCSS("position", "static");

    await page.setViewportSize({ width: 600, height: 800 });
    await expect(toolbar).toHaveCSS("position", "fixed");
  });
});
