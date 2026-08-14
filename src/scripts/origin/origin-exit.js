import { scrollToElement } from "../shared/motion.js";

export const createOriginExit = ({
  page,
  origin,
  continueButton,
  memory,
}) => {
  const enable = () => {
    continueButton.hidden = false;
    continueButton.disabled = false;
  };

  const continueToMemory = async () => {
    if (origin.dataset.originState !== "complete") return;

    origin.dataset.originState = "leaving";
    continueButton.disabled = true;

    await scrollToElement(memory, "--duration-origin-exit-scroll");

    delete page.dataset.originScrollLocked;
    origin.dataset.originState = "completed";
    continueButton.hidden = true;
  };

  const initialize = () => {
    continueButton.addEventListener("click", continueToMemory);
  };

  return { enable, initialize };
};
