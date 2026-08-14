import { getMotionDuration } from "../shared/motion.js";

const FINAL_WIDTH_RATIO = 0.58;

const getDuration = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : getMotionDuration("--duration-memory-postcard-move");

export const movePostcard = async ({ memory, scene, postcard }) => {
  const start = postcard.getBoundingClientRect();
  const sceneBounds = scene.getBoundingClientRect();
  const finalWidth = sceneBounds.width * FINAL_WIDTH_RATIO;
  const startCenterX = start.left + start.width / 2;
  const startCenterY = start.top + start.height / 2;
  const targetCenterX = sceneBounds.left + sceneBounds.width / 2;
  const targetCenterY = sceneBounds.top + sceneBounds.height / 2;
  const movementX = targetCenterX - startCenterX;
  const movementY = targetCenterY - startCenterY;
  const scale = finalWidth / start.width;

  memory.dataset.memoryState = "postal-moving";
  postcard.disabled = true;
  postcard.classList.add("memory__postcard--moving");
  postcard.style.setProperty("inset-inline-start", `${start.left}px`);
  postcard.style.setProperty("inset-block-start", `${start.top}px`);
  postcard.style.setProperty("inline-size", `${start.width}px`);

  const movement = postcard.animate(
    [
      { transform: "translate(0, 0) rotate(4deg) scale(1)" },
      {
        offset: 0.56,
        transform: `translate(${movementX}px, ${movementY}px) rotate(0deg) scale(1)`,
      },
      {
        offset: 0.72,
        transform: `translate(${movementX}px, ${movementY}px) rotate(0deg) scale(0.82)`,
      },
      {
        transform: `translate(${movementX}px, ${movementY}px) rotate(0deg) scale(${scale})`,
      },
    ],
    {
      duration: getDuration(),
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    },
  );

  await movement.finished.catch(() => undefined);
  movement.cancel();
  postcard.classList.remove("memory__postcard--moving");
  postcard.classList.add("memory__postcard--centered");
  postcard.style.removeProperty("inset-inline-start");
  postcard.style.removeProperty("inset-block-start");
  postcard.style.removeProperty("inline-size");
  postcard.disabled = false;
  postcard.setAttribute("aria-label", "Girar la postal para leer el reverso");
  memory.dataset.memoryState = "postal-ready";
};
