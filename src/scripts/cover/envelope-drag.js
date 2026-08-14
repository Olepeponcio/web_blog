import { clamp } from "../shared/math.js";

export const createEnvelopeDrag = ({
  envelope,
  envelopeFlap,
  onStateChange,
  onComplete,
}) => {
  const binaryPostcode = envelope.querySelector("[data-binary-postcode]");
  const binarySequence = [
    "01001101",
    "01100001",
    "01101011",
    "01110100",
    "01110101",
    "01100010",
  ];
  const BINARY_CHARACTER_DELAY = 140;
  const BINARY_COMPLETE_DELAY = 650;
  const BINARY_EMPTY_DELAY = 180;
  let currentOffset = 0;
  let dragStartY = 0;
  let dragStartOffset = 0;
  let isDragging = false;
  let isDeployed = false;
  let binarySequenceIndex = 0;
  let binaryCharacterIndex = 0;
  let binaryTimer;

  const isBinaryAnimationActive = () =>
    ["dragging", "deployed", "seal-ready"].includes(
      document.body.dataset.pageState,
    );

  const stopBinaryAnimation = () => {
    window.clearTimeout(binaryTimer);
    binaryTimer = undefined;
  };

  const writeNextBinaryCharacter = () => {
    if (!binaryPostcode || !isBinaryAnimationActive()) {
      stopBinaryAnimation();
      return;
    }

    const binaryBlock = binarySequence[binarySequenceIndex];
    binaryCharacterIndex += 1;
    binaryPostcode.textContent = `[${binaryBlock.slice(0, binaryCharacterIndex)}]`;

    if (binaryCharacterIndex < binaryBlock.length) {
      binaryTimer = window.setTimeout(
        writeNextBinaryCharacter,
        BINARY_CHARACTER_DELAY,
      );
      return;
    }

    binaryTimer = window.setTimeout(() => {
      binaryPostcode.textContent = "[]";
      binaryCharacterIndex = 0;
      binarySequenceIndex =
        (binarySequenceIndex + 1) % binarySequence.length;
      binaryTimer = window.setTimeout(
        writeNextBinaryCharacter,
        BINARY_EMPTY_DELAY,
      );
    }, BINARY_COMPLETE_DELAY);
  };

  const startBinaryAnimation = () => {
    if (!binaryPostcode || binaryTimer) return;

    binaryPostcode.textContent = "[]";
    binaryCharacterIndex = 0;
    writeNextBinaryCharacter();
  };

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
    startBinaryAnimation();
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
    stopBinaryAnimation();
  };

  const syncInitialPosition = () => {
    if (isDeployed || isDragging) return;

    setOffset(getInitialOffset());
  };

  const initialize = () => {
    if (binaryPostcode) binaryPostcode.textContent = "[]";
    syncInitialPosition();
    envelope.addEventListener("mousedown", beginDrag);
    window.addEventListener("mousemove", continueDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("resize", syncInitialPosition);
  };

  return { initialize };
};
