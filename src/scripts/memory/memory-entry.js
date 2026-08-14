import { scrollToElement, waitForNextFrame } from "../shared/motion.js";

const REQUIRED_VISIBILITY = 0.6;
const WAIT_FOR_ORIGIN_MS = 50;
const LOCKED_MEMORY_STATES = new Set([
  "locked",
  "board-ready",
  "signal",
  "triggered",
  "postal-moving",
  "postal-ready",
  "flipping",
]);

export const createMemoryEntry = ({ page, memory, origin, scene, board }) => {
  let observer;
  let entryStarted = false;
  let resizeFrame;

  const keepMemoryInFrame = () => {
    const state = memory.dataset.memoryState;

    if (!LOCKED_MEMORY_STATES.has(state)) return;

    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      const targetPosition = memory.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, targetPosition);
    });
  };

  const centerAndLockMemory = async () => {
    if (entryStarted) return;
    entryStarted = true;
    memory.dataset.memoryState = "centering";
    observer.unobserve(memory);

    await board.decode().catch(() => undefined);
    await scrollToElement(memory, "--duration-memory-centering");

    memory.dataset.memoryState = "entering";
    await waitForNextFrame();

    const entryAnimations = scene.getAnimations();
    await Promise.allSettled(
      entryAnimations.map((animation) => animation.finished),
    );

    page.dataset.memoryScrollLocked = "true";
    memory.dataset.memoryState = "locked";
    await waitForNextFrame();
    memory.dataset.memoryState = "board-ready";
  };

  const waitForOriginCompletion = () => {
    if (origin.dataset.originState === "completed") {
      centerAndLockMemory();
      return;
    }

    window.setTimeout(waitForOriginCompletion, WAIT_FOR_ORIGIN_MS);
  };

  const handleIntersection = ([entry]) => {
    if (
      entryStarted ||
      page.dataset.pageState !== "open" ||
      entry.intersectionRatio < REQUIRED_VISIBILITY
    ) {
      return;
    }

    waitForOriginCompletion();
  };

  const initialize = () => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: [REQUIRED_VISIBILITY],
    });
    observer.observe(memory);
    window.addEventListener("resize", keepMemoryInFrame);
  };

  return { initialize };
};
