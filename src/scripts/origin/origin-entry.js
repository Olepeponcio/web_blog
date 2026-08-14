import { scrollToElement } from "../shared/motion.js";

const REQUIRED_VISIBILITY = 0.6;

export const createOriginEntry = ({ page, origin, jarTrigger }) => {
  let observer;

  const centerAndLockOrigin = async () => {
    origin.dataset.originState = "centering";
    observer.unobserve(origin);

    await scrollToElement(origin, "--duration-origin-centering");

    page.dataset.originScrollLocked = "true";
    origin.dataset.originState = "ready";
    jarTrigger.disabled = false;
  };

  const handleIntersection = (entries) => {
    const entry = entries[0];

    if (
      page.dataset.pageState !== "open" ||
      origin.dataset.originState !== "idle" ||
      entry.intersectionRatio < REQUIRED_VISIBILITY
    ) {
      return;
    }

    centerAndLockOrigin();
  };

  const initialize = () => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: [REQUIRED_VISIBILITY],
    });
    observer.observe(origin);
  };

  return { initialize };
};
