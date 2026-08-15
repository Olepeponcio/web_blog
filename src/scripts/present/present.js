import { createPresentInteractions } from "./present-interactions.js";
import { createPresentProgress } from "./present-progress.js";

const getPresentElements = () => ({
  present: document.querySelector("[data-present]"),
  writingRunway: document.querySelector("[data-present-writing-runway]"),
  writing: document.querySelector("[data-present-writing]"),
  roadRunway: document.querySelector("[data-present-road-runway]"),
  roadScene: document.querySelector("[data-present-road-scene]"),
  sign: document.querySelector("[data-present-sign]"),
  signImage: document.querySelector("[data-present-sign-image]"),
  triggers: [...document.querySelectorAll("[data-present-trigger]")],
  messages: [...document.querySelectorAll("[data-present-message]")],
});

export const initializePresent = () => {
  const elements = getPresentElements();

  if (
    !elements.present ||
    !elements.writingRunway ||
    !elements.writing ||
    !elements.roadRunway ||
    !elements.roadScene ||
    !elements.sign ||
    !elements.signImage ||
    elements.triggers.length !== 3 ||
    elements.messages.length !== 3
  ) {
    return;
  }

  createPresentProgress(elements).initialize();
  createPresentInteractions(elements).initialize();
};
