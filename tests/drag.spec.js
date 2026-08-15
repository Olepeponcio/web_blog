import { expect, test } from "@playwright/test";

const envelopeSelector = "[data-envelope]";

const getEnvelopeOffset = (page) =>
  page.locator(envelopeSelector).evaluate((element) =>
    Number.parseFloat(
      element.style.getPropertyValue("--envelope-offset-y"),
    ),
  );

const getDragStart = async (page) => {
  const box = await page.locator(envelopeSelector).boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();

  return {
    x: Math.min(Math.max(box.x + box.width / 2, 1), viewport.width - 1),
    y: Math.min(Math.max(box.y + box.height - 20, 1), viewport.height - 1),
  };
};

const beginDrag = async (page) => {
  const start = await getDragStart(page);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down({ button: "left" });
  return start;
};

const completeDrag = async (page) => {
  const initialOffset = await getEnvelopeOffset(page);
  const start = await beginDrag(page);

  await page.mouse.move(start.x, start.y - initialOffset + 20, { steps: 10 });
  await page.mouse.up();
};

test.describe("Arrastre del sobre", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("muestra el remitente y escribe bloques binarios entre corchetes", async ({
    page,
  }) => {
    const sender = page.locator(".cover__sender");
    const binaryPostcode = sender.locator("[data-binary-postcode]");

    await expect(sender).toContainText("José Lobato");
    await expect(sender).toContainText("Calle de la escueta epístola");
    await expect(sender).toContainText("CP");
    await expect(sender).toContainText("(Hado)");
    await expect(sender).toContainText("Camino");

    await beginDrag(page);
    await expect(binaryPostcode).toHaveText(/^\[0+\]$/);
    await expect(binaryPostcode).toHaveText("[01001101]", {
      timeout: 2_000,
    });
    await expect(binaryPostcode).toHaveText(/^\[0+\]$/, {
      timeout: 2_000,
    });
    await page.mouse.up();
  });

  test("B01 — el botón izquierdo inicia el arrastre", async ({ page }) => {
    await beginDrag(page);

    await expect(page.locator("body")).toHaveAttribute(
      "data-page-state",
      "dragging",
    );

    await page.mouse.up();
  });

  test("B02 — el movimiento horizontal no altera la posición", async ({ page }) => {
    const initialOffset = await getEnvelopeOffset(page);
    const start = await beginDrag(page);

    await page.mouse.move(start.x + 60, start.y, { steps: 5 });

    expect(await getEnvelopeOffset(page)).toBeCloseTo(initialOffset, 4);
    await page.mouse.up();
  });

  test("B03 — conserva la posición después de un arrastre parcial", async ({ page }) => {
    const initialOffset = await getEnvelopeOffset(page);
    const start = await beginDrag(page);

    await page.mouse.move(start.x, start.y + Math.min(-initialOffset / 3, 80), {
      steps: 5,
    });
    await page.mouse.up();

    const partialOffset = await getEnvelopeOffset(page);
    expect(partialOffset).toBeGreaterThan(initialOffset);
    expect(partialOffset).toBeLessThan(0);
    await expect(page.locator("body")).toHaveAttribute(
      "data-page-state",
      "sealed",
    );
  });

  test("B04 — reanuda desde la posición conservada", async ({ page }) => {
    const initialOffset = await getEnvelopeOffset(page);
    let start = await beginDrag(page);
    const partialDistance = Math.min(-initialOffset / 4, 60);

    await page.mouse.move(start.x, start.y + partialDistance, { steps: 5 });
    await page.mouse.up();
    const firstOffset = await getEnvelopeOffset(page);

    start = await beginDrag(page);
    await page.mouse.move(start.x, start.y + partialDistance, { steps: 5 });
    await page.mouse.up();

    expect(await getEnvelopeOffset(page)).toBeGreaterThan(firstOffset);
  });

  test("B05 — no supera el límite inicial", async ({ page }) => {
    const initialOffset = await getEnvelopeOffset(page);
    const start = await beginDrag(page);

    await page.mouse.move(start.x, 0, { steps: 5 });

    expect(await getEnvelopeOffset(page)).toBeCloseTo(initialOffset, 4);
    await page.mouse.up();
  });

  test("B06 — no supera la posición final", async ({ page }) => {
    const initialOffset = await getEnvelopeOffset(page);
    const start = await beginDrag(page);

    await page.mouse.move(start.x, start.y - initialOffset + 200, { steps: 10 });

    expect(await getEnvelopeOffset(page)).toBe(0);
    await page.mouse.up();
  });

  test("B07 — el despliegue completo habilita el sello", async ({ page }) => {
    await completeDrag(page);

    await expect(page.locator("body")).toHaveAttribute(
      "data-page-state",
      "seal-ready",
    );
    await expect(page.locator("[data-seal]")).toBeEnabled();
  });

  test("B08 — el sobre desplegado permanece inmóvil", async ({ page }) => {
    await completeDrag(page);
    const start = await getDragStart(page);

    await page.mouse.move(start.x, start.y);
    await page.mouse.down({ button: "left" });
    await page.mouse.move(start.x, Math.max(start.y - 100, 0), { steps: 5 });
    await page.mouse.up();

    expect(await getEnvelopeOffset(page)).toBe(0);
    await expect(page.locator("body")).toHaveAttribute(
      "data-page-state",
      "seal-ready",
    );
  });

  test("B09 — el teclado despliega el sobre", async ({ page }) => {
    const envelope = page.locator(envelopeSelector);

    await envelope.focus();
    await envelope.press("Enter");

    await expect(page.locator("body")).toHaveAttribute(
      "data-page-state",
      "seal-ready",
    );
    await expect(page.locator("[data-seal]")).toBeEnabled();
  });
});
