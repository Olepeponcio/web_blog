import { createMemoryEntry } from "./memory-entry.js";
import { createMemoryControls } from "./memory-controls.js";
import { createMemoryPostcard } from "./postcard.js";

const getMemoryElements = () => ({
  page: document.body,
  memory: document.querySelector("[data-memory]"),
  scene: document.querySelector("[data-memory-scene]"),
  board: document.querySelector("[data-memory-board]"),
  switchTrigger: document.querySelector("[data-memory-switch]"),
  sparks: document.querySelector("[data-memory-sparks]"),
  instrumentTrigger: document.querySelector("[data-memory-instrument]"),
  instrumentHalo: document.querySelector("[data-memory-instrument-halo]"),
  postcard: document.querySelector("[data-memory-postcard]"),
  postcardCard: document.querySelector("[data-memory-postcard-card]"),
});

export const initializeMemory = () => {
  const elements = getMemoryElements();

  if (!Object.values(elements).every(Boolean)) return;

  const controls = createMemoryControls(elements);
  const postcard = createMemoryPostcard(elements);
  createMemoryEntry(elements).initialize();
  controls.initialize();
  postcard.initialize();
};
