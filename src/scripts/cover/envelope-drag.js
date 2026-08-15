import { clamp } from "../shared/math.js";
import { getMotionDuration } from "../shared/motion.js";
import { PAGE_STATES } from "./states.js";

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
  const binaryCharacterDelay = getMotionDuration("--duration-binary-character");
  const binaryCompleteDelay = getMotionDuration("--duration-binary-complete");
  const binaryEmptyDelay = getMotionDuration("--duration-binary-empty");
  let currentOffset = 0;
  let dragStartY = 0;
  let dragStartOffset = 0;
  let isDragging = false;
  let isDeployed = false;
  let binarySequenceIndex = 0;
  let binaryCharacterIndex = 0;
  let binaryTimer;
  let visibilityObserver;
  let pageStateObserver;

  const isEnvelopeInViewport = () => {
    const bounds = envelope.getBoundingClientRect();

    return bounds.bottom > 0 && bounds.top < window.innerHeight;
  };

  const isBinaryAnimationActive = () =>
    isEnvelopeInViewport() &&
    !document.hidden &&
    [
      PAGE_STATES.dragging,
      PAGE_STATES.sealReady,
      PAGE_STATES.writing,
      PAGE_STATES.open,
    ].includes(document.body.dataset.pageState);

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
        binaryCharacterDelay,
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
        binaryEmptyDelay,
      );
    }, binaryCompleteDelay);
  };

  const startBinaryAnimation = () => {
    if (!binaryPostcode || binaryTimer || !isBinaryAnimationActive()) return;

    writeNextBinaryCharacter();
  };

  const syncBinaryAnimation = () => {
    if (isBinaryAnimationActive()) {
      startBinaryAnimation();
      return;
    }

    stopBinaryAnimation();
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
    envelope.dataset.deployed = "true";
    envelope.removeAttribute("tabindex");
    onComplete();
  };

  const beginDrag = (event) => {
    if (event.button !== 0 || isDeployed) return;

    event.preventDefault();
    isDragging = true;
    dragStartY = event.clientY;
    dragStartOffset = currentOffset;
    envelope.setPointerCapture?.(event.pointerId);
    onStateChange(PAGE_STATES.dragging);
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
    onStateChange(PAGE_STATES.sealed);
    stopBinaryAnimation();
  };

  const deployFromKeyboard = (event) => {
    if (isDeployed || !["Enter", " "].includes(event.key)) return;

    event.preventDefault();
    startBinaryAnimation();
    completeDeployment();
  };

  const syncInitialPosition = () => {
    if (isDeployed || isDragging) return;

    setOffset(getInitialOffset());
  };

  const initialize = () => {
    if (binaryPostcode) binaryPostcode.textContent = "[]";
    syncInitialPosition();
    visibilityObserver = new IntersectionObserver(syncBinaryAnimation);
    visibilityObserver.observe(envelope);
    pageStateObserver = new MutationObserver(syncBinaryAnimation);
    pageStateObserver.observe(document.body, {
      attributeFilter: ["data-page-state"],
    });
    envelope.addEventListener("pointerdown", beginDrag);
    window.addEventListener("pointermove", continueDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    envelope.addEventListener("keydown", deployFromKeyboard);
    window.addEventListener("resize", syncInitialPosition);
    window.addEventListener("scroll", syncBinaryAnimation, { passive: true });
    document.addEventListener("visibilitychange", syncBinaryAnimation);
  };

  return { initialize };
};
