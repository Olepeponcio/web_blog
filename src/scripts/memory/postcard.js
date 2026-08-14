import { flipPostcard } from "./postcard-flip.js";
import { movePostcard } from "./postcard-motion.js";

export const createMemoryPostcard = (elements) => {
  let movementStarted = false;

  const handleInstrumentTriggered = () => {
    if (movementStarted) return;
    movementStarted = true;
    movePostcard(elements);
  };

  const initialize = () => {
    elements.memory.addEventListener(
      "memory:instrument-triggered",
      handleInstrumentTriggered,
    );
    elements.postcard.addEventListener("click", () => flipPostcard(elements));
  };

  return { initialize };
};
