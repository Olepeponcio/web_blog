import { waitForNextFrame } from "../shared/motion.js";
import { PAGE_STATES } from "../cover/states.js";
import { MEMORY_STATES } from "./states.js";

const REQUIRED_VISIBILITY = 0.6;

export const createMemoryEntry = ({ page, memory, scene, board }) => {
  let observer;
  let entryStarted = false;
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

  const handleIntersection = ([entry]) => {
    if (
      entryStarted ||
      page.dataset.pageState !== PAGE_STATES.open ||
      entry.intersectionRatio < REQUIRED_VISIBILITY
    ) {
      return;
    }

    enterMemory();
  };

  const initialize = () => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: [REQUIRED_VISIBILITY],
    });
    observer.observe(memory);
  };

  return { initialize };
};
