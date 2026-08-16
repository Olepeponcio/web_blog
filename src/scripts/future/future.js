import { createFutureCannon } from "./future-cannon.js";
import { createFutureEntry } from "./future-entry.js";
import { createFuturePhysics } from "./future-physics.js";

const getFutureElements = () => ({
  future: document.querySelector("[data-future]"),
  scene: document.querySelector("[data-future-scene]"),
  title: document.querySelector("[data-future-title]"),
  cards: [...document.querySelectorAll("[data-future-card]")],
  line: document.querySelector("[data-future-light-line]"),
  point: document.querySelector("[data-future-light-point]"),
  cannon: document.querySelector("[data-future-cannon]"),
  cannonImage: document.querySelector("[data-future-cannon-image]"),
  cannonTrigger: document.querySelector("[data-future-cannon-trigger]"),
  muzzle: document.querySelector("[data-future-cannon-muzzle]"),
  supplies: document.querySelector("[data-future-supplies]"),
});

export const initializeFuture = () => {
  const elements = getFutureElements();
  if (
    !Object.entries(elements).every(([key, value]) =>
      key === "cards" ? value.length === 2 : Boolean(value),
    )
  ) {
    return;
  }

  const physics = createFuturePhysics(elements);
  const cannon = createFutureCannon(elements, physics);
  const entry = createFutureEntry(elements, {
    activate: cannon.activate,
    reset: cannon.reset,
  });

  cannon.initialize();
  entry.initialize();
};
