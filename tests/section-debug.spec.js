import { expect, test } from "@playwright/test";
import { selectors } from "./helpers/epistle.js";

test.describe("Acceso directo de depuración", () => {
  test("D01 — conserva el recorrido normal sin parámetro", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "sealed",
    );
  });

  test("D02 — abre Present sin inicializar las secciones anteriores", async ({
    page,
  }) => {
    await page.goto("/?debugSection=present");

    await expect(page.locator(selectors.body)).toHaveAttribute(
      "data-page-state",
      "open",
    );
    await expect(page.locator(selectors.origin)).toHaveAttribute(
      "data-origin-state",
      "idle",
    );
    await expect(page.locator(selectors.memory)).toHaveAttribute(
      "data-memory-state",
      "idle",
    );
    await expect
      .poll(() =>
        page
          .locator(selectors.present)
          .evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
      )
      .toBeLessThan(2);
    await expect
      .poll(() =>
        page.locator(selectors.present).evaluate((element) =>
          element.style.getPropertyValue("--present-road-progress"),
        ),
      )
      .not.toBe("");
  });

  test("D03 — abre Memory mediante su inicializador real", async ({ page }) => {
    await page.goto("/?debugSection=memory");

    await expect(page.locator(selectors.origin)).toHaveAttribute(
      "data-origin-state",
      "completed",
    );
    await expect(page.locator(selectors.memory)).toHaveAttribute(
      "data-memory-state",
      "board-ready",
      { timeout: 8_000 },
    );
    await expect(page.locator(selectors.memorySwitch)).toBeEnabled();
  });
});
