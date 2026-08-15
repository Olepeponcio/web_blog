import { createPresentInteractions } from "./present-interactions.js";
import { createPresentProgress } from "./present-progress.js";

const getPresentElements = () => ({
  present: document.querySelector("[data-present]"),
  sequenceRunway: document.querySelector("[data-present-sequence-runway]"),
  writing: document.querySelector("[data-present-writing]"),
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
    !elements.sequenceRunway ||
    !elements.writing ||
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
