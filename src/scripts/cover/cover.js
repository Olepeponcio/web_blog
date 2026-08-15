import { createEnvelopeDrag } from "./envelope-drag.js";
import { breakSeal, preloadOpenedSeal } from "./seal-opening.js";
import { prepareOpeningText, revealOpeningWords } from "./text-reveal.js";
import { scrollToElement, waitForNextFrame } from "../shared/motion.js";
import { PAGE_STATES } from "./states.js";

const getCoverElements = () => {
  const envelope = document.querySelector("[data-envelope]");

  return {
    page: document.body,
    envelope,
    envelopeFlap: envelope?.querySelector(".cover__flap"),
    seal: document.querySelector("[data-seal]"),
    sealImage: document.querySelector("[data-seal-image]"),
    openingText: document.querySelector("[data-opening-text]"),
  };
};

const hasRequiredElements = (elements) =>
  Object.values(elements).every(Boolean);

export const initializeCover = () => {
  const elements = getCoverElements();

  if (!hasRequiredElements(elements)) return;

  const {
    page,
    envelope,
    envelopeFlap,
    seal,
    sealImage,
    openingText,
  } = elements;

  const setPageState = (state) => {
    page.dataset.pageState = state;
  };

  const openSeal = async () => {
    if (page.dataset.pageState !== PAGE_STATES.sealReady) return;

    await breakSeal(seal, sealImage);
    setPageState(PAGE_STATES.writing);

    const words = prepareOpeningText(openingText);
    await waitForNextFrame();
    await scrollToElement(openingText, "--duration-opening-scroll");
    await revealOpeningWords(openingText, words);

    setPageState(PAGE_STATES.open);
  };

  const envelopeDrag = createEnvelopeDrag({
    envelope,
    envelopeFlap,
    onStateChange: setPageState,
    onComplete: () => {
      setPageState(PAGE_STATES.sealReady);
      seal.disabled = false;
    },
  });

  preloadOpenedSeal(sealImage);
  envelopeDrag.initialize();
  seal.addEventListener("click", openSeal);
};
