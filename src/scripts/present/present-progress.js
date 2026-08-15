import { clamp } from "../shared/math.js";

const ROAD_DRAWING_END = 0.75;

const collectCharacters = (container) => {
  const textNodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    if (walker.currentNode.textContent.trim()) textNodes.push(walker.currentNode);
  }

  return textNodes.flatMap((textNode) => {
    const fragment = document.createDocumentFragment();
    const characters = [...textNode.textContent.trim()].map((character) => {
      const span = document.createElement("span");
      span.className = "present__character";
      span.textContent = character;
      fragment.append(span);
      return span;
    });

    textNode.replaceWith(fragment);
    return characters;
  });
};

const getRunwayProgress = (runway) => {
  const bounds = runway.getBoundingClientRect();
  const travel = Math.max(runway.offsetHeight - window.innerHeight, 1);

  return {
    progress: clamp(-bounds.top / travel, 0, 1),
    visible: bounds.top < window.innerHeight && bounds.bottom > 0,
  };
};

export const createPresentProgress = ({
  present,
  writingRunway,
  writing,
  roadRunway,
}) => {
  const characters = collectCharacters(writing);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame;
  let previousVisibleCount = -1;
  let previousInteractive;

  const setVisibleCharacters = (count) => {
    if (count === previousVisibleCount) return;

    characters.forEach((character, index) => {
      character.classList.toggle("present__character--visible", index < count);
    });
    previousVisibleCount = count;
  };

  const setInteractive = (interactive) => {
    if (interactive === previousInteractive) return;
    previousInteractive = interactive;
    present.dispatchEvent(
      new CustomEvent("present:interactive-change", {
        detail: { interactive },
      }),
    );
  };

  const render = () => {
    frame = undefined;
    const writingState = getRunwayProgress(writingRunway);
    const roadState = getRunwayProgress(roadRunway);
    const writingProgress = writingState.progress;
    const roadProgress = clamp(roadState.progress / ROAD_DRAWING_END, 0, 1);
    const isReduced = reducedMotion.matches;
    const visibleCount = isReduced
      ? characters.length
      : Math.ceil(writingProgress * characters.length);
    const effectiveRoadProgress = isReduced && roadState.visible ? 1 : roadProgress;
    const interactive = roadState.visible && (isReduced || roadProgress >= 1);

    setVisibleCharacters(visibleCount);
    present.style.setProperty("--present-road-progress", effectiveRoadProgress);
    present.dataset.presentState =
      interactive
        ? "interactive"
        : roadProgress > 0
          ? "drawing"
          : writingProgress <= 0
        ? "idle"
        : writingProgress < 1
          ? "writing"
          : "written";
    setInteractive(interactive);
  };

  const requestRender = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(render);
  };

  const initialize = () => {
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    reducedMotion.addEventListener("change", requestRender);
    requestRender();
  };

  return { initialize };
};
