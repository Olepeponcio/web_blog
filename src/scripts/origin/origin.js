import { createOriginEntry } from "./origin-entry.js";
import { openJar, preloadOpenedJar } from "./jar-opening.js";
import { createJarPointer } from "./jar-pointer.js";
import { createOriginWordReveal } from "./word-reveal.js";
import { createOriginExit } from "./origin-exit.js";

const getOriginElements = () => ({
  page: document.body,
  origin: document.querySelector("[data-origin]"),
  originEyebrow: document.querySelector("[data-origin-eyebrow]"),
  originHeading: document.querySelector("[data-origin-heading]"),
  jarTrigger: document.querySelector("[data-origin-jar-trigger]"),
  jarImage: document.querySelector("[data-origin-jar-closed]"),
  cork: document.querySelector("[data-origin-cork]"),
  floatingJar: document.querySelector("[data-origin-floating-jar]"),
  originText: document.querySelector("[data-origin-text]"),
  hotspot: document.querySelector("[data-origin-ink-hotspot]"),
  continueButton: document.querySelector("[data-origin-continue]"),
  memory: document.querySelector("#memory"),
});

export const initializeOrigin = () => {
  const elements = getOriginElements();

  if (!Object.values(elements).every(Boolean)) return;

  const originEntry = createOriginEntry(elements);
  const originExit = createOriginExit(elements);
  let jarPointer;
  const wordReveal = createOriginWordReveal({
    ...elements,
    onComplete: () => {
      jarPointer.deactivate();
      elements.origin.dataset.originState = "complete";
      originExit.enable();
    },
  });
  jarPointer = createJarPointer({
    ...elements,
    onMove: wordReveal.checkCollisions,
  });

  const handleJarClick = async (event) => {
    const state = elements.origin.dataset.originState;

    if (state === "ready") {
      await openJar(elements);
      return;
    }

    if (state === "opened-ready") jarPointer.activate(event);
  };

  preloadOpenedJar(elements.jarImage);
  wordReveal.initialize();
  originEntry.initialize();
  originExit.initialize();
  elements.jarTrigger.addEventListener("click", handleJarClick);
};
