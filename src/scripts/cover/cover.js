import { createEnvelopeDrag } from "./envelope-drag.js";
import { breakSeal, preloadOpenedSeal } from "./seal-opening.js";
import { prepareOpeningText, revealOpeningWords } from "./text-reveal.js";
import { scrollToElement, waitForNextFrame } from "../shared/motion.js";

const getCoverElements = () => {
  const envelope = document.querySelector("[data-envelope]");

  return {
    page: document.body,
    envelope,
    envelopeFlap: envelope?.querySelector(".cover__flap"),
    seal: document.querySelector("[data-seal]"),
    sealImage: document.querySelector("[data-seal-image]"),
    openingText: document.querySelector("[data-opening-text]"),
    scrollCue: document.querySelector("[data-scroll-cue]"),
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
    scrollCue,
  } = elements;

  const setPageState = (state) => {
    page.dataset.pageState = state;
  };

  const dismissScrollCue = () => {
    scrollCue.hidden = true;
  };

  const openSeal = async () => {
    if (page.dataset.pageState !== "seal-ready") return;

    await breakSeal(seal, sealImage);
    setPageState("writing");

    const words = prepareOpeningText(openingText);
    await waitForNextFrame();
    await scrollToElement(openingText, "--duration-opening-scroll");
    await revealOpeningWords(openingText, words);

    setPageState("open");
    scrollCue.hidden = false;
  };

  const envelopeDrag = createEnvelopeDrag({
    envelope,
    envelopeFlap,
    onStateChange: setPageState,
    onComplete: () => {
      setPageState("seal-ready");
      seal.disabled = false;
    },
  });

  preloadOpenedSeal(sealImage);
  envelopeDrag.initialize();
  seal.addEventListener("click", openSeal);
  window.addEventListener("wheel", dismissScrollCue, { passive: true });
  window.addEventListener("scroll", dismissScrollCue, { passive: true });
};
