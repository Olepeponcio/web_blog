import { expect, test } from "@playwright/test";

const structuralSelectors = [
  "[data-envelope]",
  "[data-seal]",
  ".narrative-section__content",
  ".response-form input",
  ".response-form textarea",
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
  });
});
