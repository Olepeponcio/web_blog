import { expect, test } from "@playwright/test";
import {
  completeMemory,
  prepareMemoryPostcard,
  reachMemory,
  selectors,
} from "./helpers/epistle.js";

test.describe("HITO 3 — interacción de Memoria", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("L01 — comienza inactiva y con sus controles deshabilitados", async ({ page }) => {
    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "idle");
    await expect(page.locator(selectors.memorySwitch)).toBeDisabled();
    await expect(page.locator(selectors.memoryInstrument)).toBeDisabled();
    await expect(page.locator(selectors.memoryPostcard)).toBeDisabled();
  });

  test("L02 — centra la sección antes de bloquear el scroll", async ({ page }) => {
    await reachMemory(page);
    await expect(page.locator(selectors.body)).toHaveAttribute("data-memory-scroll-locked", "true");
    await expect(page.locator(selectors.memorySwitch)).toBeEnabled();
    await expect.poll(() => page.locator(selectors.memory).evaluate((element) => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(2);
  });

  test("M01 — el interruptor cambia el tablero y habilita el instrumento", async ({ page }) => {
    await reachMemory(page);
    await page.locator(selectors.memorySwitch).click();

    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "signal");
    await expect(page.locator(selectors.memoryBoard)).toHaveAttribute("src", /img__board_2\.png$/);
    await expect(page.locator(selectors.memorySwitch)).toBeDisabled();
    await expect(page.locator(selectors.memoryInstrument)).toBeEnabled();
  });

  test("M02 — no permite activar el instrumento antes del interruptor", async ({ page }) => {
    await reachMemory(page);
    await page.locator(selectors.memoryInstrument).click({ force: true });

    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "board-ready");
    await expect(page.locator(selectors.memoryPostcard)).toBeDisabled();
  });

  test("N01 — el instrumento inicia una sola vez el movimiento", async ({ page }) => {
    await reachMemory(page);
    await page.locator(selectors.memorySwitch).click();
    await page.locator(selectors.memoryInstrument).click();

    await expect(page.locator(selectors.memoryInstrument)).toBeDisabled();
    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "postal-ready", { timeout: 8_000 });
    await expect(page.locator(selectors.memoryPostcard)).toBeEnabled();
    await expect(page.locator(selectors.memoryPostcard)).toHaveClass(/memory__postcard--centered/);
  });

  test("P01 — la postal muestra el reverso y desbloquea la página", async ({ page }) => {
    await completeMemory(page);

    await expect(page.locator(selectors.memoryPostcardCard)).toHaveClass(/memory__postcard-card--flipped/);
    await expect(page.locator(selectors.memoryPostcard)).toHaveAttribute("aria-label", "Reverso de la postal");
    await expect(page.locator(selectors.body)).not.toHaveAttribute("data-memory-scroll-locked", "true");
  });

  test("Q01 — conserva el estado final al salir y regresar", async ({ page }) => {
    await completeMemory(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator(selectors.memory).scrollIntoViewIfNeeded();

    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "complete");
    await expect(page.locator(selectors.memoryPostcardCard)).toHaveClass(/memory__postcard-card--flipped/);
  });

  test("P02 — ignora clics sobre la postal antes de estar preparada", async ({ page }) => {
    await reachMemory(page);
    await page.locator(selectors.memoryPostcard).click({ force: true });

    await expect(page.locator(selectors.memory)).toHaveAttribute("data-memory-state", "board-ready");
    await expect(page.locator(selectors.memoryPostcardCard)).not.toHaveClass(/memory__postcard-card--flipped/);
  });

  test("O01 — centra la postal respecto de la escena", async ({ page }) => {
    await prepareMemoryPostcard(page);
    const centers = await page.evaluate(({ sceneSelector, postcardSelector }) => {
      const scene = document.querySelector(sceneSelector).getBoundingClientRect();
      const postcard = document.querySelector(postcardSelector).getBoundingClientRect();
      return {
        sceneX: scene.left + scene.width / 2,
        sceneY: scene.top + scene.height / 2,
        postcardX: postcard.left + postcard.width / 2,
        postcardY: postcard.top + postcard.height / 2,
      };
    }, { sceneSelector: selectors.memoryScene, postcardSelector: selectors.memoryPostcard });

    expect(Math.abs(centers.sceneX - centers.postcardX)).toBeLessThanOrEqual(1);
    expect(Math.abs(centers.sceneY - centers.postcardY)).toBeLessThanOrEqual(1);
  });

  test("O02 — aumenta su escala al quedar centrada", async ({ page }) => {
    await reachMemory(page);
    await page.locator(selectors.memorySwitch).click();
    const initialWidth = (await page.locator(selectors.memoryPostcard).boundingBox()).width;

    await page.locator(selectors.memoryInstrument).click();
    await expect(page.locator(selectors.memory)).toHaveAttribute(
      "data-memory-state",
      "postal-ready",
      { timeout: 8_000 },
    );
    const centeredWidth = (await page.locator(selectors.memoryPostcard).boundingBox()).width;

    expect(centeredWidth).toBeGreaterThan(initialWidth);
  });

  test("Q02 — el reverso permanece visible y no interactuable al regresar", async ({ page }) => {
    await completeMemory(page);
    await page.locator("#present").scrollIntoViewIfNeeded();
    await page.locator(selectors.memory).scrollIntoViewIfNeeded();

    await expect(page.locator(selectors.memoryPostcard)).toBeVisible();
    await expect(page.locator(selectors.memoryPostcard)).toBeDisabled();
    await expect(page.locator(selectors.memoryPostcard)).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await expect(page.locator(selectors.memoryPostcardCard)).toHaveClass(
      /memory__postcard-card--flipped/,
    );
  });
});
