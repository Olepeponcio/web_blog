import { createOriginEntry } from "./origin-entry.js";
import { openJar, preloadOpenedJar } from "./jar-opening.js";
import { createJarPointer } from "./jar-pointer.js";
import { createOriginWordReveal } from "./word-reveal.js";
import { createOriginExit } from "./origin-exit.js";
import { ORIGIN_STATES } from "./states.js";

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
});

export const initializeOrigin = () => {
  const elements = getOriginElements();

  if (!Object.values(elements).every(Boolean)) return;

  const originEntry = createOriginEntry(elements);
  const originExit = createOriginExit(elements);
  let suppressTouchClick = false;
  let suppressTouchClickTimer = 0;
  let jarPointer;
  const wordReveal = createOriginWordReveal({
    ...elements,
    onComplete: () => {
      jarPointer.deactivate();
      elements.origin.dataset.originState = ORIGIN_STATES.complete;
      originExit.complete();
    },
  });
  jarPointer = createJarPointer({
    ...elements,
    onMove: wordReveal.checkCollisions,
  });

  const handleJarClick = async (event) => {
    if (suppressTouchClick) return;

    const state = elements.origin.dataset.originState;

    if (state === ORIGIN_STATES.ready) {
      await openJar(elements);
      return;
    }

    if (state !== ORIGIN_STATES.openedReady) return;

    if (
      event.detail === 0 ||
      window.matchMedia("(max-width: 48rem)").matches
    ) {
      elements.origin.dataset.originState = ORIGIN_STATES.active;
      wordReveal.revealAll();
      return;
    }

    jarPointer.activate(event);
  };

  const handleJarPointerDown = (event) => {
    if (
      window.matchMedia("(max-width: 48rem)").matches ||
      elements.origin.dataset.originState !== ORIGIN_STATES.openedReady ||
      !["touch", "pen"].includes(event.pointerType)
    ) {
      return;
    }

    event.preventDefault();
    suppressTouchClick = true;
    window.clearTimeout(suppressTouchClickTimer);
    suppressTouchClickTimer = window.setTimeout(() => {
      suppressTouchClick = false;
    }, 800);
    jarPointer.activate(event);
  };

  preloadOpenedJar();
  wordReveal.initialize();
  originEntry.initialize();
  elements.jarTrigger.addEventListener("pointerdown", handleJarPointerDown);
  elements.jarTrigger.addEventListener("click", handleJarClick);
};
