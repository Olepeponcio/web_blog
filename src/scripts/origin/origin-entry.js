import { scrollToElement, wait } from "../shared/motion.js";

const REQUIRED_VISIBILITY = 0.6;
const EYEBROW_REVEAL_DURATION = 700;
const HEADING_CHARACTER_DELAY = 90;

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
      await wait(HEADING_CHARACTER_DELAY);
    }
  };

  const originFitsViewport = () => {
    const bounds = origin.getBoundingClientRect();
    return bounds.height <= window.innerHeight + 1;
  };

  const syncOriginAfterResize = () => {
    if (["idle", "leaving", "completed"].includes(origin.dataset.originState)) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (originFitsViewport()) {
        page.dataset.originScrollLocked = "true";
        origin.scrollIntoView({ block: "start" });
      } else {
        delete page.dataset.originScrollLocked;
      }
    });
  };

  const centerAndLockOrigin = async () => {
    origin.dataset.originState = "centering";
    observer.unobserve(origin);
    originEyebrow.classList.add("origin__eyebrow--visible");

    await Promise.all([
      scrollToElement(origin, "--duration-origin-centering"),
      wait(prefersReducedMotion ? 0 : EYEBROW_REVEAL_DURATION),
    ]);

    if (originFitsViewport()) {
      page.dataset.originScrollLocked = "true";
    } else {
      delete page.dataset.originScrollLocked;
    }

    await writeHeading();
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
    originHeading.setAttribute(
      "aria-label",
      originHeading.dataset.originHeadingText,
    );
    originHeading.textContent = "";
    observer = new IntersectionObserver(handleIntersection, {
      threshold: [REQUIRED_VISIBILITY],
    });
    observer.observe(origin);
    window.addEventListener("resize", syncOriginAfterResize);
  };

  return { initialize };
};
