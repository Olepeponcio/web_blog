import { expect, test } from "@playwright/test";
import {
  beginOpening,
  reachOrigin,
  selectors,
} from "./helpers/epistle.js";

const expectBuiltImage = async (image) => {
  await expect(image).toBeVisible();

  const resource = await image.evaluate((element) => ({
    complete: element.complete,
    currentSource: element.currentSrc,
    naturalWidth: element.naturalWidth,
  }));

  expect(resource.complete).toBe(true);
  expect(resource.naturalWidth).toBeGreaterThan(0);
  expect(resource.currentSource).toContain("/assets/");
  expect(resource.currentSource).not.toContain("/src/assets/");
};

test.describe("Compilación de producción", () => {
  test("P01 — carga los recursos iniciales compilados", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await page.waitForLoadState("load");

    await expectBuiltImage(page.locator(".cover__envelope-image"));
    await expectBuiltImage(page.locator(selectors.sealImage));
    expect(errors).toEqual([]);
  });

  test("P02 — resuelve el sello roto desde el bundle", async ({ page }) => {
    await page.goto("/");
    await beginOpening(page);

    const sealImage = page.locator(selectors.sealImage);
    await expect(sealImage).toHaveAttribute(
      "src",
      /\/assets\/img__wax_seal_broken-[\w-]+\.webp$/,
      { timeout: 3_000 },
    );
    await expectBuiltImage(sealImage);
  });

  test("P03 — resuelve el frasco abierto desde el bundle", async ({ page }) => {
    await page.goto("/");
    await reachOrigin(page);
    await page.locator(selectors.originJar).click();

    await expect(page.locator(selectors.origin)).toHaveAttribute(
      "data-origin-state",
      "opened-ready",
      { timeout: 8_000 },
    );

    const jarImage = page.locator(selectors.originJarImage);
    await expect(jarImage).toHaveAttribute(
      "src",
      /\/assets\/img__ink-jar--open-[\w-]+\.webp$/,
    );
    await expectBuiltImage(jarImage);
  });
});
