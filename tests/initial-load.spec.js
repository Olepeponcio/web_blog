import { expect, test } from "@playwright/test";
import { beginOpening } from "./helpers/epistle.js";

test.describe("Carga inicial", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("A01 — carga sin errores JavaScript críticos", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.reload();
    await page.waitForLoadState("load");

    expect(errors).toEqual([]);
  });

  test("A02 — comienza en estado sealed", async ({ page }) => {
    await expect(page.locator("body")).toHaveAttribute(
      "data-page-state",
      "sealed",
    );
  });

  test("A03 — mantiene bloqueado el scroll inicial", async ({ page }) => {
    const initialScrollY = await page.evaluate(() => window.scrollY);

    await page.mouse.wheel(0, 800);

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBe(initialScrollY);
  });

  test("A04 — muestra una porción del sobre en el viewport", async ({ page }) => {
    const envelope = page.locator("[data-envelope]");
    const box = await envelope.boundingBox();
    const viewport = page.viewportSize();

    expect(box).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(box.x + box.width).toBeGreaterThan(0);
    expect(box.x).toBeLessThan(viewport.width);
    expect(box.y + box.height).toBeGreaterThan(0);
    expect(box.y).toBeLessThan(viewport.height);
  });

  test("A05 — muestra el sello intacto y deshabilitado", async ({ page }) => {
    const seal = page.locator("[data-seal]");
    const sealImage = page.locator("[data-seal-image]");

    await expect(seal).toBeDisabled();
    await expect(sealImage).toHaveAttribute(
      "src",
      /img__wax_seal(?:-[\w-]+)?\.webp(?:\?.*)?$/,
    );
  });

  test("A06 — una recarga desde la narración vuelve al inicio", async ({ page }) => {
    await beginOpening(page);
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight * 0.65);
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.reload();
    await page.waitForLoadState("load");

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator("body")).toHaveAttribute(
      "data-page-state",
      "sealed",
    );
    await expect(page.locator("[data-present]")).toHaveAttribute(
      "data-present-state",
      "idle",
    );
  });
});
