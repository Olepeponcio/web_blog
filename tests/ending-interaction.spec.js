import { expect, test } from "@playwright/test";

test.describe("Cañón de suministros", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?debugSection=ending");
  });

  test("activa el estado rojo y genera un cuerpo físico", async ({ page }) => {
    const ending = page.locator("[data-ending]");
    const cannon = page.locator("[data-ending-cannon]");
    const trigger = page.getByRole("button", {
      name: "Disparar un suministro",
    });
    const supply = page.locator(".ending__supply");

    await expect(ending).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(trigger).toBeVisible();
    await expect(trigger).not.toHaveCSS("background-image", "none");
    await expect(trigger).toHaveCSS("border-style", "solid");
    const cannonBox = await cannon.boundingBox();
    const triggerBox = await trigger.boundingBox();

    expect(cannonBox).not.toBeNull();
    expect(triggerBox).not.toBeNull();

    const relativeCenterX =
      (triggerBox.x + triggerBox.width / 2 - cannonBox.x) / cannonBox.width;
    const relativeCenterY =
      (triggerBox.y + triggerBox.height / 2 - cannonBox.y) / cannonBox.height;

    expect(relativeCenterX).toBeGreaterThan(0.8);
    expect(relativeCenterX).toBeLessThan(0.83);
    expect(relativeCenterY).toBeGreaterThan(0.67);
    expect(relativeCenterY).toBeLessThan(0.7);

    await page.mouse.click(
      triggerBox.x + triggerBox.width / 2,
      triggerBox.y + triggerBox.height / 2,
    );

    await expect(cannon).toHaveClass(/ending__cannon--firing/);
    await expect(page.locator(".ending__cannon-image--firing")).toHaveCSS(
      "opacity",
      "1",
    );
    await expect(supply).toHaveCount(1);
    await expect(supply).toHaveAttribute("src", /\/06-ending\/img__/);
  });

  test("reduce ligeramente el cañón en resoluciones de smartphone", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const cannonBox = await page.locator("[data-ending-cannon]").boundingBox();

    expect(cannonBox).not.toBeNull();
    expect(cannonBox.width).toBeLessThanOrEqual(375 * 0.56);
  });

  test("mantiene los suministros dentro de los límites laterales y del suelo", async ({
    page,
  }) => {
    const scene = page.locator("[data-ending-scene]");
    const supply = page.locator(".ending__supply");

    await page.getByRole("button", { name: "Disparar un suministro" }).click();

    await expect
      .poll(
        async () => {
          const sceneBox = await scene.boundingBox();
          const supplyBox = await supply.boundingBox();

          if (!sceneBox || !supplyBox) return false;

          return (
            supplyBox.x >= sceneBox.x - 1 &&
            supplyBox.x + supplyBox.width <= sceneBox.x + sceneBox.width + 1 &&
            supplyBox.y + supplyBox.height <= sceneBox.y + sceneBox.height + 1
          );
        },
        { timeout: 5_000 },
      )
      .toBe(true);
  });
});
