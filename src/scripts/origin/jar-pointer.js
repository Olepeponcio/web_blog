import { clamp } from "../shared/math.js";

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
    const minimumY = Math.max(originBounds.top, 0);
    const maximumY = Math.min(originBounds.bottom, window.innerHeight);
    const x = clamp(event.clientX, originBounds.left, originBounds.right);
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
    origin.dataset.originState = "active";
    updatePosition(event);
    window.addEventListener("mousemove", updatePosition);
  };

  const deactivate = () => {
    if (!isActive) return;

    isActive = false;
    window.removeEventListener("mousemove", updatePosition);
    floatingJar.hidden = true;
    floatingJar.style.removeProperty("--origin-pointer-x");
    floatingJar.style.removeProperty("--origin-pointer-y");
  };

  return { activate, deactivate };
};
