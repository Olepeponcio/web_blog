import { flipPostcard } from "./postcard-flip.js";
import { movePostcard } from "./postcard-motion.js";
import { NARRATIVE_EVENTS } from "../shared/narrative-events.js";

export const createMemoryPostcard = (elements) => {
  let movementStarted = false;

  const handleInstrumentTriggered = () => {
    if (movementStarted) return;
    movementStarted = true;
    movePostcard(elements);
  };

  const initialize = () => {
    elements.memory.addEventListener(
      NARRATIVE_EVENTS.memoryInstrumentTriggered,
      handleInstrumentTriggered,
    );
    elements.postcard.addEventListener("click", () => flipPostcard(elements));
  };

  return { initialize };
};
