import { getMotionDuration, wait } from "../shared/motion.js";
import { PAGE_STATES } from "../cover/states.js";
import { ORIGIN_STATES } from "./states.js";

const REQUIRED_VISIBILITY = 0.6;
export const createOriginEntry = ({
  page,
  origin,
  jarTrigger,
  originEyebrow,
  originHeading,
}) => {
  let observer;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const writeHeading = async () => {
    const heading = originHeading.dataset.originHeadingText;

    if (prefersReducedMotion) {
      originHeading.textContent = heading;
      return;
    }

    for (const character of heading) {
      originHeading.textContent += character;
      await wait(getMotionDuration("--duration-origin-heading-character"));
    }
  };

  const prepareOrigin = async () => {
    origin.dataset.originState = ORIGIN_STATES.centering;
    observer.unobserve(origin);
    originEyebrow.classList.add("origin__eyebrow--visible");

    await wait(
      prefersReducedMotion
        ? 0
        : getMotionDuration("--duration-origin-eyebrow"),
    );

    await writeHeading();

    origin.dataset.originState = ORIGIN_STATES.ready;
    jarTrigger.disabled = false;
  };

  const handleIntersection = (entries) => {
    const entry = entries[0];

    if (
      page.dataset.pageState !== PAGE_STATES.open ||
      origin.dataset.originState !== ORIGIN_STATES.idle ||
      entry.intersectionRatio < REQUIRED_VISIBILITY
    ) {
      return;
    }

    prepareOrigin();
  };

  const initialize = () => {
    originHeading.setAttribute(
      "aria-label",
      originHeading.dataset.originHeadingText,
    );
    originHeading.textContent = "";
    observer = new IntersectionObserver(handleIntersection, {
      threshold: [REQUIRED_VISIBILITY],
    });
    observer.observe(origin);
  };

  return { initialize };
};
