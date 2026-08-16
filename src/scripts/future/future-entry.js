import { createFutureLightPath } from "./future-light-path.js";

const wait = (duration) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));
const randomBetween = (minimum, maximum) =>
  minimum + Math.random() * (maximum - minimum);

export const createFutureEntry = (elements, { activate, reset }) => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const lightPath = createFutureLightPath(elements);
  let observer = null;
  let sequenceId = 0;
  let active = false;
  let activeCardIndex = 0;

  const setActiveCard = (cardIndex) => {
    elements.cards.forEach((card, index) => {
      card.classList.toggle("future__card--active", index === cardIndex);
    });
    elements.future.classList.toggle("future--activated", cardIndex !== null);
  };

  const runLightCycle = async (currentSequence) => {
    while (active && sequenceId === currentSequence) {
      await wait(randomBetween(3000, 6000));
      if (!active || sequenceId !== currentSequence) return;

      const nextCardIndex = activeCardIndex === 0 ? 1 : 0;
      setActiveCard(null);
      const completed = await lightPath.playExcursion({
        fromCard: elements.cards[activeCardIndex],
        toCard: elements.cards[nextCardIndex],
        duration: randomBetween(3500, 5000),
      });
      if (!completed || !active || sequenceId !== currentSequence) return;
      activeCardIndex = nextCardIndex;
      setActiveCard(activeCardIndex);
    }
  };

  const enter = async () => {
    if (active) return;
    active = true;
    const currentSequence = ++sequenceId;
    elements.future.classList.add("future--entering");

    if (reducedMotion.matches) {
      activeCardIndex = 0;
      setActiveCard(activeCardIndex);
      activate();
      return;
    }

    await wait(2800);
    if (!active || sequenceId !== currentSequence) return;
    activeCardIndex = 0;
    await lightPath.play({ duration: 3000, targetCard: elements.cards[0] });
    if (!active || sequenceId !== currentSequence) return;

    setActiveCard(activeCardIndex);
    activate();
    void runLightCycle(currentSequence);
  };

  const leave = () => {
    if (!active) return;
    active = false;
    sequenceId += 1;
    lightPath.reset();
    setActiveCard(null);
    elements.future.classList.remove("future--entering");
    reset();
  };

  const initialize = () => {
    const updateInitialPath = () => lightPath.updatePath(elements.cards[0]);
    updateInitialPath();
    window.addEventListener("resize", updateInitialPath);
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) enter();
        if (!entry.isIntersecting || entry.intersectionRatio <= 0.05) leave();
      },
      { threshold: [0, 0.05, 0.5] },
    );
    observer.observe(elements.future);
  };

  return { initialize, leave };
};
