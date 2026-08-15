import { expect, test } from "@playwright/test";
import {
  reachPresent,
  selectors,
  setPresentProgress,
} from "./helpers/epistle.js";

const visibleCharacterCount = (page) =>
  page.locator(".present__character--visible").count();

test.describe("HITO 4 — progreso reversible", () => {
  test.beforeEach(async ({ page }) => page.goto("/"));

  test("U01 — Presente no bloquea el scroll", async ({ page }) => {
    await reachPresent(page, 0.1);
    await expect(page.locator(selectors.body)).not.toHaveAttribute(
      "data-present-scroll-locked",
      "true",
    );
  });

  test("V01 — la escritura aumenta al avanzar", async ({ page }) => {
    await reachPresent(page, 0.12);
    await setPresentProgress(page, 0.12, "writing");
    const firstCount = await visibleCharacterCount(page);
    await setPresentProgress(page, 0.3);
    const secondCount = await visibleCharacterCount(page);

    expect(firstCount).toBeGreaterThan(0);
    expect(secondCount).toBeGreaterThan(firstCount);
  });

  test("V02 — completa el texto antes de dibujar la carretera", async ({ page }) => {
    await reachPresent(page);
    await setPresentProgress(page, 1, "writing");
    const counts = await page.evaluate(() => ({
      all: document.querySelectorAll(".present__character").length,
      visible: document.querySelectorAll(".present__character--visible").length,
      road: Number.parseFloat(
        getComputedStyle(document.querySelector("[data-present]")).getPropertyValue(
          "--present-road-progress",
        ),
      ),
    }));

    expect(counts.visible).toBe(counts.all);
    expect(counts.road).toBe(0);
  });

  test("W01 — rebobina escritura y carretera al retroceder", async ({ page }) => {
    await reachPresent(page, 0.7);
    const advancedCharacters = await visibleCharacterCount(page);
    const advancedRoad = await page.locator(selectors.present).evaluate((element) =>
      Number.parseFloat(element.style.getPropertyValue("--present-road-progress")),
    );

    await setPresentProgress(page, 0.2, "writing");
    const rewoundCharacters = await visibleCharacterCount(page);
    const rewoundRoad = await page.locator(selectors.present).evaluate((element) =>
      Number.parseFloat(element.style.getPropertyValue("--present-road-progress")),
    );

    expect(rewoundCharacters).toBeLessThan(advancedCharacters);
    expect(rewoundRoad).toBeLessThan(advancedRoad);
  });

  test("X01 — la carretera alcanza el estado interactivo", async ({ page }) => {
    await reachPresent(page, 0.9);

    await expect(page.locator(selectors.present)).toHaveAttribute(
      "data-present-state",
      "interactive",
    );
    await expect(page.locator(selectors.presentAlways)).toBeEnabled();
    await expect(page.locator(selectors.presentForward)).toBeEnabled();
    await expect(page.locator(selectors.presentSun)).toBeEnabled();
  });
});
