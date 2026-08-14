import { expect } from "@playwright/test";

export const selectors = {
  body: "body",
  envelope: "[data-envelope]",
  openingText: "[data-opening-text]",
  scrollCue: "[data-scroll-cue]",
  seal: "[data-seal]",
  sealImage: "[data-seal-image]",
};

export const getEnvelopeOffset = (page) =>
  page.locator(selectors.envelope).evaluate((element) =>
    Number.parseFloat(
      element.style.getPropertyValue("--envelope-offset-y"),
    ),
  );

export const getVisibleEnvelopePoint = async (page) => {
  const box = await page.locator(selectors.envelope).boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();

  return {
    x: Math.min(Math.max(box.x + box.width / 2, 1), viewport.width - 1),
    y: Math.min(Math.max(box.y + box.height - 20, 1), viewport.height - 1),
  };
};

export const deployEnvelope = async (page) => {
  const initialOffset = await getEnvelopeOffset(page);
  const start = await getVisibleEnvelopePoint(page);

  await page.mouse.move(start.x, start.y);
  await page.mouse.down({ button: "left" });
  await page.mouse.move(start.x, start.y - initialOffset + 20, { steps: 10 });
  await page.mouse.up();

  await expect(page.locator(selectors.body)).toHaveAttribute(
    "data-page-state",
    "seal-ready",
  );
};

export const beginOpening = async (page) => {
  await deployEnvelope(page);
  await page.locator(selectors.seal).click();
};

export const openEpistle = async (page) => {
  await beginOpening(page);
  await expect(page.locator(selectors.body)).toHaveAttribute(
    "data-page-state",
    "open",
    { timeout: 15_000 },
  );
};
