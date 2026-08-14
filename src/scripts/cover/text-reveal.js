import { getMotionDuration, wait } from "../shared/motion.js";

const collectRevealWords = (openingText) => {
  const words = [];
  const textElements = openingText.querySelectorAll("[data-reveal-text]");

  textElements.forEach((element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      const parts = textNode.textContent.split(/(\s+)/);

      parts.forEach((part) => {
        if (!part) return;

        if (/^\s+$/.test(part)) {
          fragment.append(document.createTextNode(part));
          return;
        }

        const word = document.createElement("span");
        word.className = "reveal-word";
        word.textContent = part;
        fragment.append(word);
        words.push(word);
      });

      textNode.replaceWith(fragment);
    });
  });

  return words;
};

export const prepareOpeningText = (openingText) => {
  const words = collectRevealWords(openingText);
  openingText.setAttribute("aria-busy", "true");
  openingText.hidden = false;

  return words;
};

export const revealOpeningWords = async (openingText, words) => {
  const interval = getMotionDuration("--duration-word-reveal-step");

  for (const word of words) {
    word.classList.add("reveal-word--visible");
    await wait(interval);
  }

  openingText.setAttribute("aria-busy", "false");
};
