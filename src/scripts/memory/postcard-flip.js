import { getMotionDuration } from "../shared/motion.js";

const getDuration = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : getMotionDuration("--duration-memory-postcard-flip");

export const flipPostcard = async ({
  page,
  memory,
  postcard,
  postcardCard,
}) => {
  if (memory.dataset.memoryState !== "postal-ready") return;

  memory.dataset.memoryState = "flipping";
  postcard.disabled = true;

  const flip = postcardCard.animate(
    [
      { transform: "rotateY(0deg)" },
      { transform: "rotateY(180deg)" },
    ],
    {
      duration: getDuration(),
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards",
    },
  );

  await flip.finished.catch(() => undefined);
  postcardCard.classList.add("memory__postcard-card--flipped");
  flip.cancel();
  postcard.setAttribute("aria-label", "Reverso de la postal");
  postcard.setAttribute("aria-disabled", "true");
  delete page.dataset.memoryScrollLocked;
  memory.dataset.memoryState = "complete";
  memory.dispatchEvent(new CustomEvent("memory:complete"));
};
