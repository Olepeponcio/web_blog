import { clamp } from "../shared/math.js";
import { ORIGIN_STATES } from "./states.js";

export const createJarPointer = ({
  origin,
  jarTrigger,
  floatingJar,
  onMove,
}) => {
  let isActive = false;
  let activePointerId = null;

  const isDirectPointer = (event) =>
    ["touch", "pen"].includes(event.pointerType);

  const capturePointer = (event) => {
    if (event.type !== "pointerdown" || !isDirectPointer(event)) return;

    activePointerId = event.pointerId;
    origin.setPointerCapture?.(activePointerId);
  };

  const updatePosition = (event) => {
    if (
      !isActive ||
      (activePointerId !== null && event.pointerId !== activePointerId)
    ) {
      return;
    }

    if (event.cancelable) event.preventDefault();

    const originBounds = origin.getBoundingClientRect();
    const jarBounds = floatingJar.getBoundingClientRect();
    const halfJarWidth = jarBounds.width / 2;
    const pointerOffsetY = jarBounds.height * 0.05;
    const minimumX = Math.max(originBounds.left, halfJarWidth);
    const maximumX = Math.min(
      originBounds.right,
      window.innerWidth - halfJarWidth,
    );
    const minimumY = Math.max(originBounds.top, pointerOffsetY);
    const maximumY = Math.min(
      originBounds.bottom,
      window.innerHeight - jarBounds.height + pointerOffsetY,
    );
    const x = clamp(event.clientX, minimumX, maximumX);
    const y = clamp(event.clientY, minimumY, maximumY);

    floatingJar.style.setProperty("--origin-pointer-x", `${x}px`);
    floatingJar.style.setProperty("--origin-pointer-y", `${y}px`);
    onMove();
  };

  const activate = (event) => {
    if (isActive) return;

    isActive = true;
    capturePointer(event);
    jarTrigger.hidden = true;
    floatingJar.hidden = false;
    origin.dataset.originState = ORIGIN_STATES.active;
    updatePosition(event);
    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    origin.addEventListener("pointerdown", resumeDirectPointer);
  };

  function resumeDirectPointer(event) {
    if (!isActive || !isDirectPointer(event)) return;

    event.preventDefault();
    capturePointer(event);
    updatePosition(event);
  }

  function releasePointer(event) {
    if (event.pointerId !== activePointerId) return;

    if (origin.hasPointerCapture?.(activePointerId)) {
      origin.releasePointerCapture(activePointerId);
    }
    activePointerId = null;
  }

  const deactivate = () => {
    if (!isActive) return;

    isActive = false;
    window.removeEventListener("pointermove", updatePosition);
    window.removeEventListener("pointerup", releasePointer);
    window.removeEventListener("pointercancel", releasePointer);
    origin.removeEventListener("pointerdown", resumeDirectPointer);
    activePointerId = null;
    floatingJar.hidden = true;
    floatingJar.style.removeProperty("--origin-pointer-x");
    floatingJar.style.removeProperty("--origin-pointer-y");
  };

  return { activate, deactivate };
};
