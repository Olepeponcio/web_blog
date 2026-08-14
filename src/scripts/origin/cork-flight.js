import { clamp } from "../shared/math.js";
import { getMotionDuration } from "../shared/motion.js";

export const animateCorkFlight = (cork) =>
  new Promise((resolve) => {
    const duration = getMotionDuration("--duration-origin-cork");
    const horizontalDistance = clamp(window.innerWidth * 0.18, 72, 280);
    const arcHeight = clamp(window.innerHeight * 0.35, 180, 360);
    const corkHeight = cork.getBoundingClientRect().height;
    const fallDistance = window.innerHeight + corkHeight;
    const totalRotation = 900;
    const startTime = performance.now();

    const updatePosition = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const x = horizontalDistance * progress;
      const y =
        -4 * arcHeight * progress +
        (4 * arcHeight + fallDistance) * progress ** 2;
      const rotation = totalRotation * progress;

      cork.style.transform = [
        "translate(-50%, -38%)",
        `translate3d(${x}px, ${y}px, 0)`,
        `rotate(${rotation}deg)`,
      ].join(" ");

      if (progress < 1) {
        window.requestAnimationFrame(updatePosition);
        return;
      }

      cork.style.removeProperty("transform");
      resolve();
    };

    window.requestAnimationFrame(updatePosition);
  });
