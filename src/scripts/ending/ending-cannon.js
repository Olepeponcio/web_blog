export const createEndingCannon = ({ cannon, trigger }, physics) => {
  let resetTimer = 0;

  const fire = () => {
    cannon.classList.add("ending__cannon--firing");
    physics.spawn();

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      cannon.classList.remove("ending__cannon--firing");
    }, getMotionDuration("--duration-ending-cannon-active"));
  };

  const reset = () => {
    window.clearTimeout(resetTimer);
    cannon.classList.remove("ending__cannon--firing");
    physics.reset();
  };

  const initialize = () => trigger.addEventListener("click", fire);

  return { initialize, reset };
};
import { getMotionDuration } from "../shared/motion.js";
