import { createMemoryEntry } from "./memory-entry.js";

const getMemoryElements = () => ({
  page: document.body,
  memory: document.querySelector("[data-memory]"),
  origin: document.querySelector("[data-origin]"),
  scene: document.querySelector("[data-memory-scene]"),
  board: document.querySelector("[data-memory-board]"),
  postcard: document.querySelector("[data-memory-postcard]"),
});

export const initializeMemory = () => {
  const elements = getMemoryElements();

  if (!Object.values(elements).every(Boolean)) return;

  createMemoryEntry(elements).initialize();
};
