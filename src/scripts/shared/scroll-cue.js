import { PAGE_STATES } from "../cover/states.js";

export const initializeScrollCue = () => {
  const page = document.body;
  const cue = document.querySelector("[data-scroll-cue]");
  const regions = [...document.querySelectorAll(".cover, .narrative > section")];
  let frame;

  if (!cue || regions.length === 0) return;

  const sync = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => {
      const viewportCenter = window.innerHeight / 2;
      const centeredRegion = regions.some((region) => {
        const bounds = region.getBoundingClientRect();
        return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter;
      });
      const scrollAvailable =
        page.dataset.pageState === PAGE_STATES.open &&
        page.dataset.originScrollLocked !== "true" &&
        page.dataset.memoryScrollLocked !== "true";

      cue.hidden = !centeredRegion || !scrollAvailable;
    });
  };

  new MutationObserver(sync).observe(page, {
    attributes: true,
    attributeFilter: [
      "data-page-state",
      "data-origin-scroll-locked",
      "data-memory-scroll-locked",
    ],
  });
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
};
