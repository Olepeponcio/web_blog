const IDLE_SOURCE = new URL(
  "../../assets/images/05-future/img__canion_02.png",
  import.meta.url,
).href;
const FIRING_SOURCE = new URL(
  "../../assets/images/05-future/img__canion_01.png",
  import.meta.url,
).href;

export const createFutureCannon = (elements, physics) => {
  let resetTimer = 0;

  const fire = () => {
    elements.cannonImage.src = FIRING_SOURCE;
    physics.spawn();
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      elements.cannonImage.src = IDLE_SOURCE;
    }, 280);
  };

  const activate = () => {
    elements.cannonTrigger.disabled = false;
    physics.activate();
  };

  const reset = () => {
    window.clearTimeout(resetTimer);
    elements.cannonImage.src = IDLE_SOURCE;
    elements.cannonTrigger.disabled = true;
    physics.reset();
  };

  const initialize = () => {
    elements.cannonTrigger.disabled = true;
    elements.cannonTrigger.addEventListener("click", fire);
  };

  return { activate, initialize, reset };
};
