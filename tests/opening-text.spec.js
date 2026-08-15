import { expect, test } from "@playwright/test";
import {
  beginOpening,
  openEpistle,
  selectors,
} from "./helpers/epistle.js";

test.describe("Texto de apertura", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("D01 — el autoscroll termina situado sobre el texto", async ({ page }) => {
    await openEpistle(page);
    const box = await page.locator(selectors.openingText).boundingBox();
    const viewport = page.viewportSize();

    expect(box).not.toBeNull();
    expect(box.y).toBeLessThan(viewport.height);
    expect(box.y + box.height).toBeGreaterThan(0);
  });

  test("D02 — el scroll permanece bloqueado durante writing", async ({ page }) => {
    await beginOpening(page);
    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "writing",
      { timeout: 3_000 },
    );

    await expect(page.locator(selectors.body)).toHaveCSS("overflow", "hidden");
    await expect(page.locator("html")).toHaveCSS(
      "background-color",
      "rgb(212, 205, 189)",
    );
    await expect(page.locator("html")).toHaveCSS(
      "background-image",
      /img__texture_background\.webp/,
    );
    await expect(page.locator(selectors.body)).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
    await expect(page.locator(selectors.body)).toHaveCSS(
      "background-image",
      "none",
    );
    await expect(page.locator(selectors.openingText)).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
    await expect(page.locator(selectors.openingText)).toHaveCSS(
      "background-image",
      "none",
    );
    await expect(page.locator(".cover__flap")).toBeHidden();
  });

  test("D03 — las palabras conservan el orden del texto fuente", async ({ page }) => {
    const sourceText = await page.locator(selectors.openingText).innerText();
    await openEpistle(page);
    const revealedText = await page.locator(selectors.openingText).innerText();

    expect(revealedText.replace(/\s+/g, " ").trim()).toBe(
      sourceText.replace(/\s+/g, " ").trim(),
    );
  });

  test("D04 — conserva párrafos y saltos documentales", async ({ page }) => {
    await openEpistle(page);

    await expect(page.locator(`${selectors.openingText} p`)).toHaveCount(5);
    await expect(page.locator(`${selectors.openingText} h1`)).toHaveCount(1);
    await expect(page.locator(`${selectors.openingText} br`)).toHaveCount(1);
  });

  test("D05 — finaliza con la frase prevista", async ({ page }) => {
    await openEpistle(page);

    await expect(page.locator("[data-reveal-final]")).toHaveText(
      "Por eso decidí escribir.",
    );
  });

  test("D06 — la última palabra cambia el estado a open", async ({ page }) => {
    await openEpistle(page);

    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "open",
    );
  });
});
