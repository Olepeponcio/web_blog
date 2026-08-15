import { getMotionDuration, wait } from "../shared/motion.js";
import openedSealSource from "../../assets/images/01-cover/img__wax_seal_broken.webp";

export const preloadOpenedSeal = () => {
  const openedSealImage = new Image();
  openedSealImage.src = openedSealSource;
};

export const breakSeal = async (seal, sealImage) => {
  seal.disabled = true;
  seal.classList.add("cover__seal--breaking");

  const duration = getMotionDuration("--duration-seal-break");
  await wait(duration * 0.5);
  sealImage.src = openedSealSource;
  await wait(duration * 0.5);

  seal.classList.remove("cover__seal--breaking");
};
