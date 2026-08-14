import { expect, test } from "@playwright/test";
import { reachMemory, selectors } from "./helpers/epistle.js";

test.describe("HITO 3 — accesibilidad y movimiento", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("S01 — completa el flujo con movimiento reducido", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await reachMemory(page);
    await page.locator(selectors.memorySwitch).click();
    await page.locator(selectors.memoryInstrument).click();
    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "postal-ready");
    await page.locator(selectors.memoryPostcard).click();

    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "complete");
    await expect(page.locator(selectors.body)).not.toHaveAttribute("data-memory-scroll-locked", "true");
  });

  test("S02 — los controles exponen nombres accesibles", async ({ page }) => {
    await reachMemory(page);
    await expect(page.getByRole("button", { name: "Encender la escena" })).toBeEnabled();
    await page.getByRole("button", { name: "Encender la escena" }).click();
    await expect(page.getByRole("button", { name: "Activar el instrumento luminoso" })).toBeEnabled();
  });

  test("S03 — el flujo principal puede accionarse mediante teclado", async ({ page }) => {
    await reachMemory(page);
    await page.locator(selectors.memorySwitch).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(selectors.memoryInstrument)).toBeEnabled();
    await page.locator(selectors.memoryInstrument).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "postal-ready", { timeout: 8_000 });
    await page.locator(selectors.memoryPostcard).focus();
    await page.keyboard.press("Enter");

    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "complete", { timeout: 8_000 });
  });
});
