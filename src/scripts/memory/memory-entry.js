import { waitForNextFrame } from "../shared/motion.js";
import { NARRATIVE_EVENTS } from "../shared/narrative-events.js";
import { PAGE_STATES } from "../cover/states.js";
import { ORIGIN_STATES } from "../origin/states.js";
import { MEMORY_STATES } from "./states.js";

const REQUIRED_VISIBILITY = 0.6;

export const createMemoryEntry = ({ page, memory, origin, scene, board }) => {
  let observer;
  let entryStarted = false;
  let memoryVisible = false;
  let originComplete = false;
  const enterMemory = async () => {
    if (entryStarted) return;
    entryStarted = true;
    memory.dataset.memoryState = MEMORY_STATES.entering;
    observer.unobserve(memory);

    await board.decode().catch(() => undefined);
    await waitForNextFrame();

    const entryAnimations = scene.getAnimations();
    await Promise.allSettled(
      entryAnimations.map((animation) => animation.finished),
    );

    memory.dataset.memoryState = MEMORY_STATES.boardReady;
  };

  const tryEnterMemory = () => {
    if (memoryVisible && originComplete) enterMemory();
  };

  const handleOriginComplete = () => {
    originComplete = true;
    tryEnterMemory();
  };

  const handleIntersection = ([entry]) => {
    if (
      entryStarted ||
      page.dataset.pageState !== PAGE_STATES.open ||
      entry.intersectionRatio < REQUIRED_VISIBILITY
    ) {
      return;
    }

    memoryVisible = true;
    tryEnterMemory();
  };

  const initialize = () => {
    originComplete = origin.dataset.originState === ORIGIN_STATES.completed;
    observer = new IntersectionObserver(handleIntersection, {
      threshold: [REQUIRED_VISIBILITY],
    });
    observer.observe(memory);
    origin.addEventListener(
      NARRATIVE_EVENTS.originComplete,
      handleOriginComplete,
    );
  };

  return { initialize };
};
