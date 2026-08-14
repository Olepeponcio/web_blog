import { clamp } from "../shared/math.js";
import { getMotionDuration, wait } from "../shared/motion.js";

const intersectsCircle = (wordBounds, circleBounds) => {
  const centerX = circleBounds.left + circleBounds.width / 2;
  const centerY = circleBounds.top + circleBounds.height / 2;
  const radius = circleBounds.width / 2;
  const closestX = clamp(centerX, wordBounds.left, wordBounds.right);
  const closestY = clamp(centerY, wordBounds.top, wordBounds.bottom);
  const distanceX = centerX - closestX;
  const distanceY = centerY - closestY;

  return distanceX ** 2 + distanceY ** 2 <= radius ** 2;
};

const createWordElements = (originText) => {
  const words = [];
  const walker = document.createTreeWalker(originText, NodeFilter.SHOW_TEXT);
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
      word.className = "origin-word";
      word.textContent = part;
      fragment.append(word);
      words.push(word);
    });

    textNode.replaceWith(fragment);
  });

  return words;
};

export const createOriginWordReveal = ({
  origin,
  originText,
  hotspot,
  onComplete,
}) => {
  const revealedWords = new Set();
  const revealingWords = new Set();
  let words = [];
  let activeAnimations = 0;
  let completionReported = false;

  const checkCompletion = () => {
    if (
      completionReported ||
      revealedWords.size !== words.length ||
      activeAnimations !== 0
    ) {
      return;
    }

    completionReported = true;
    origin.dataset.originRevealComplete = "true";
    originText.setAttribute("aria-busy", "false");
    onComplete();
  };

  const revealWord = async (word) => {
    if (revealedWords.has(word) || revealingWords.has(word)) return;

    revealingWords.add(word);
    activeAnimations += 1;
    word.classList.add("origin-word--revealing");

    await wait(getMotionDuration("--duration-origin-word"));

    word.classList.remove("origin-word--revealing");
    word.classList.add("origin-word--revealed");
    revealingWords.delete(word);
    revealedWords.add(word);
    activeAnimations -= 1;
    checkCompletion();
  };

  const checkCollisions = () => {
    if (origin.dataset.originState !== "active") return;

    const circleBounds = hotspot.getBoundingClientRect();

    words.forEach((word) => {
      if (revealedWords.has(word) || revealingWords.has(word)) return;

      if (intersectsCircle(word.getBoundingClientRect(), circleBounds)) {
        revealWord(word);
      }
    });
  };

  const initialize = () => {
    words = createWordElements(originText);
    originText.setAttribute("aria-busy", "true");
  };

  return { checkCollisions, initialize };
};
