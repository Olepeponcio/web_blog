import { expect, test } from "@playwright/test";
import { reachPresent, selectors } from "./helpers/epistle.js";

test.describe("HITO 4 — señal y sol", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await reachPresent(page);
  });

  test("Y01 — Always permuta la señal y muestra su mensaje", async ({ page }) => {
    await page.locator(selectors.presentAlways).hover();

    await expect(page.locator(selectors.presentSignImage)).toHaveAttribute(
      "src",
      /img__road_sing_02\.png$/,
    );
    await expect(page.locator('[data-present-message="always"]')).toHaveClass(
      /present__message--visible/,
    );
  });

  test("Y00 — la señal permuta sin mostrar mensajes", async ({ page }) => {
    await expect
      .poll(() => page.locator(selectors.presentSignImage).getAttribute("src"), {
        timeout: 3_500,
      })
      .toMatch(/img__road_sing_02\.png$/);
    await expect(page.locator(".present__message--visible")).toHaveCount(0);
  });

  test("Y02 — Forward permuta la señal y restaura el reposo al salir", async ({ page }) => {
    const trigger = page.locator(selectors.presentForward);
    await trigger.hover();
    await expect(page.locator(selectors.presentSignImage)).toHaveAttribute(
      "src",
      /img__road_sing_03\.png$/,
    );

    await page.mouse.move(1, 1);
    await expect(page.locator(selectors.presentSignImage)).toHaveAttribute(
      "src",
      /img__road_sing_01\.png$/,
    );
  });

  test("Z01 — el sol muestra el mensaje dentro de la carretera", async ({ page }) => {
    await page.locator(selectors.presentSun).hover();
    await expect(page.locator('[data-present-message="sun"]')).toHaveClass(
      /present__message--visible/,
    );
  });

  test("AA01 — las zonas responden al foco de teclado", async ({ page }) => {
    await page.locator(selectors.presentAlways).focus();
    await expect(page.locator(selectors.present)).toHaveAttribute(
      "data-present-interaction",
      "always",
    );
    await page.locator(selectors.presentForward).focus();
    await expect(page.locator(selectors.present)).toHaveAttribute(
      "data-present-interaction",
      "forward",
    );
    await page.locator(selectors.presentSun).focus();
    await expect(page.locator(selectors.present)).toHaveAttribute(
      "data-present-interaction",
      "sun",
    );
  });

  test("AA02 — un toque activa y desactiva el mensaje", async ({ page }) => {
    const trigger = page.locator(selectors.presentAlways);

    await trigger.dispatchEvent("pointerdown", { pointerType: "touch" });
    await trigger.dispatchEvent("click");
    await expect(page.locator(selectors.present)).toHaveAttribute(
      "data-present-interaction",
      "always",
    );

    await trigger.dispatchEvent("pointerdown", { pointerType: "touch" });
    await trigger.dispatchEvent("click");
    await expect(page.locator(selectors.present)).toHaveAttribute(
      "data-present-interaction",
      "none",
    );
  });
});
