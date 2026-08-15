import { clamp } from "../shared/math.js";
import { ORIGIN_STATES } from "./states.js";

export const createJarPointer = ({
  origin,
  jarTrigger,
  floatingJar,
  onMove,
}) => {
  let isActive = false;

  const updatePosition = (event) => {
    if (!isActive) return;

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
    jarTrigger.hidden = true;
    floatingJar.hidden = false;
    origin.dataset.originState = ORIGIN_STATES.active;
    updatePosition(event);
    window.addEventListener("pointermove", updatePosition);
  };

  const deactivate = () => {
    if (!isActive) return;

    isActive = false;
    window.removeEventListener("pointermove", updatePosition);
    floatingJar.hidden = true;
    floatingJar.style.removeProperty("--origin-pointer-x");
    floatingJar.style.removeProperty("--origin-pointer-y");
  };

  return { activate, deactivate };
};
