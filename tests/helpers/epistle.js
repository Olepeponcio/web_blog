import { expect } from "@playwright/test";

export const selectors = {
  body: "body",
  envelope: "[data-envelope]",
  openingText: "[data-opening-text]",
  scrollCue: "[data-scroll-cue]",
  seal: "[data-seal]",
  sealImage: "[data-seal-image]",
  origin: "[data-origin]",
  originEyebrow: "[data-origin-eyebrow]",
  originHeading: "[data-origin-heading]",
  originText: "[data-origin-text]",
  originJar: "[data-origin-jar-trigger]",
  originJarImage: "[data-origin-jar-closed]",
  originCork: "[data-origin-cork]",
  originFloatingJar: "[data-origin-floating-jar]",
  originHotspot: "[data-origin-ink-hotspot]",
  memory: "#memory",
  memoryScene: "[data-memory-scene]",
  memoryBoard: "[data-memory-board]",
  memorySwitch: "[data-memory-switch]",
  memorySparks: "[data-memory-sparks]",
  memoryInstrument: "[data-memory-instrument]",
  memoryInstrumentHalo: "[data-memory-instrument-halo]",
  memoryPostcard: "[data-memory-postcard]",
  memoryPostcardCard: "[data-memory-postcard-card]",
  present: "[data-present]",
  presentWriting: "[data-present-writing]",
  presentSequenceRunway: "[data-present-sequence-runway]",
  presentRoadScene: "[data-present-road-scene]",
  presentRoad: "[data-present-road]",
  presentSign: "[data-present-sign]",
  presentSignImage: "[data-present-sign-image]",
  presentAlways: '[data-present-trigger="always"]',
  presentForward: '[data-present-trigger="forward"]',
  presentSun: '[data-present-trigger="sun"]',
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

export const reachOrigin = async (page) => {
  await page.evaluate(() => {
    document.body.dataset.pageState = "open";
    document.querySelector("[data-origin]").scrollIntoView();
  });

  await expect(page.locator(selectors.origin)).toHaveAttribute(
    "data-origin-state",
    "ready",
    { timeout: 8_000 },
  );
};

export const openOriginJar = async (page) => {
  await reachOrigin(page);
  await page.locator(selectors.originJar).click();
  await expect(page.locator(selectors.origin)).toHaveAttribute(
    "data-origin-state",
    "opened-ready",
    { timeout: 8_000 },
  );
};

export const activateOriginInk = async (page) => {
  await openOriginJar(page);
  await page.locator(selectors.originJar).click();
  await expect(page.locator(selectors.origin)).toHaveAttribute(
    "data-origin-state",
    "active",
  );
};

export const revealOriginText = async (page) => {
  await activateOriginInk(page);
  const words = page.locator(".origin-word");

  for (let index = 0; index < (await words.count()); index += 1) {
    const box = await words.nth(index).boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  }

  await expect(page.locator(selectors.origin)).toHaveAttribute(
    "data-origin-state",
    "completed",
    { timeout: 8_000 },
  );
};

export const reachMemory = async (page) => {
  await page.evaluate(() => {
    document.body.dataset.pageState = "open";
    document.querySelector("[data-memory]").scrollIntoView();
  });

  await expect(page.locator(selectors.memory)).toHaveAttribute(
    "data-memory-state",
    "board-ready",
    { timeout: 8_000 },
  );
};

export const prepareMemoryPostcard = async (page) => {
  await reachMemory(page);
  await page.locator(selectors.memorySwitch).click();
  await expect(page.locator(selectors.memory)).toHaveAttribute(
    "data-memory-state",
    "signal",
  );
  await page.locator(selectors.memoryInstrument).click();
  await expect(page.locator(selectors.memory)).toHaveAttribute(
    "data-memory-state",
    "postal-ready",
    { timeout: 8_000 },
  );
};

export const completeMemory = async (page) => {
  await prepareMemoryPostcard(page);
  await page.locator(selectors.memoryPostcard).click();
  await expect(page.locator(selectors.memory)).toHaveAttribute(
    "data-memory-state",
    "complete",
    { timeout: 8_000 },
  );
};

export const setPresentProgress = async (page, progress) => {
  await page.evaluate((nextProgress) => {
    const runway = document.querySelector("[data-present-sequence-runway]");
    const travel = runway.offsetHeight - window.innerHeight;
    const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, runwayTop + travel * nextProgress);
  }, progress);
  await page.waitForTimeout(50);
};

export const reachPresent = async (page, progress = 0.9) => {
  await page.evaluate(() => {
    document.body.dataset.pageState = "open";
    document.querySelector("[data-origin]").dataset.originState = "completed";
    document.querySelector("[data-memory]").dataset.memoryState = "complete";
    delete document.body.dataset.originScrollLocked;
    delete document.body.dataset.memoryScrollLocked;
  });
  await setPresentProgress(page, progress);
};
