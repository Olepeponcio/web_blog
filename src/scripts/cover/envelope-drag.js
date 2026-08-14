import { clamp } from "../shared/math.js";

export const createEnvelopeDrag = ({
  envelope,
  envelopeFlap,
  onStateChange,
  onComplete,
}) => {
  let currentOffset = 0;
  let dragStartY = 0;
  let dragStartOffset = 0;
  let isDragging = false;
  let isDeployed = false;

  const getVisibleEdge = () => {
    const rootFontSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );

    if (window.matchMedia("(max-width: 48rem)").matches) {
      return clamp(
        window.innerHeight * 0.18,
        rootFontSize * 7,
        rootFontSize * 10,
      );
    }

    return clamp(window.innerHeight * 0.1, rootFontSize * 3.5, rootFontSize * 7);
  };

  const getInitialOffset = () =>
    Math.min(-(envelopeFlap.offsetHeight - getVisibleEdge()), 0);

  const setOffset = (offset) => {
    currentOffset = offset;
    envelope.style.setProperty("--envelope-offset-y", `${offset}px`);
  };

  const completeDeployment = () => {
    isDeployed = true;
    isDragging = false;
    setOffset(0);
    onComplete();
  };

  const beginDrag = (event) => {
    if (event.button !== 0 || isDeployed) return;

    event.preventDefault();
    isDragging = true;
    dragStartY = event.clientY;
    dragStartOffset = currentOffset;
    onStateChange("dragging");
  };

  const continueDrag = (event) => {
    if (!isDragging) return;

    const nextOffset = dragStartOffset + (event.clientY - dragStartY);
    setOffset(clamp(nextOffset, getInitialOffset(), 0));

    if (currentOffset === 0) completeDeployment();
  };

  const endDrag = () => {
    if (!isDragging) return;

    isDragging = false;
    onStateChange("sealed");
  };

  const syncInitialPosition = () => {
    if (isDeployed || isDragging) return;

    setOffset(getInitialOffset());
  };

  const initialize = () => {
    syncInitialPosition();
    envelope.addEventListener("mousedown", beginDrag);
    window.addEventListener("mousemove", continueDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("resize", syncInitialPosition);
  };

  return { initialize };
};
