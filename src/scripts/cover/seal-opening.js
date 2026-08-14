import { getMotionDuration, wait } from "../shared/motion.js";

export const preloadOpenedSeal = (sealImage) => {
  const openedSealImage = new Image();
  openedSealImage.src = sealImage.dataset.openedSrc;
};

export const breakSeal = async (seal, sealImage) => {
  seal.disabled = true;
  seal.classList.add("cover__seal--breaking");

  const duration = getMotionDuration("--duration-seal-break");
  await wait(duration * 0.5);
  sealImage.src = sealImage.dataset.openedSrc;
  await wait(duration * 0.5);

  seal.classList.remove("cover__seal--breaking");
};
