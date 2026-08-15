import { expect, test } from "@playwright/test";
import {
  beginOpening,
  deployEnvelope,
  openEpistle,
  selectors,
} from "./helpers/epistle.js";

test.describe("Sello y apertura", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("C01 — el sello no actúa antes del despliegue", async ({ page }) => {
    const seal = page.locator(selectors.seal);

    await expect(seal).toBeDisabled();
    await seal.evaluate((element) => element.click());

    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "sealed",
    );
  });

  test("C02 — el sello habilitado inicia la apertura", async ({ page }) => {
    await deployEnvelope(page);
    await page.locator(selectors.seal).click();

    await expect(page.locator(selectors.seal)).toBeDisabled();
    await expect(page.locator(selectors.seal)).toHaveClass(/breaking/);
  });

  test("C03 — la transición termina con el sello roto", async ({ page }) => {
    await beginOpening(page);
    const sealImage = page.locator(selectors.sealImage);
    const openedSource = await sealImage.getAttribute("data-opened-src");

    await expect(sealImage).toHaveAttribute("src", openedSource, {
      timeout: 3_000,
    });
  });

  test("C04 — una segunda pulsación no reinicia la secuencia", async ({ page }) => {
    await beginOpening(page);
    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "writing",
      { timeout: 3_000 },
    );
    const textBefore = await page.locator(".reveal-word--visible").count();

    await page.locator(selectors.seal).click({ force: true });
    await page.waitForTimeout(200);

    expect(await page.locator(".reveal-word--visible").count()).toBeGreaterThanOrEqual(
      textBefore,
    );
    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "writing",
    );
  });

  test("C05 — la apertura alcanza el estado writing", async ({ page }) => {
    await beginOpening(page);

    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "writing",
      { timeout: 3_000 },
    );
  });

  test("C06 — el sobre y el sello roto permanecen visibles", async ({ page }) => {
    await openEpistle(page);

    await expect(page.locator(selectors.envelope)).toBeVisible();
    await expect(page.locator(".cover__flap")).toBeVisible();
    await expect(page.locator(selectors.seal)).toBeVisible();
  });
});
