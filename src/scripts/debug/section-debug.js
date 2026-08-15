import { PAGE_STATES } from "../cover/states.js";
import { ORIGIN_STATES } from "../origin/states.js";

const DEBUG_SECTIONS = new Set(["cover", "origin", "memory", "present"]);

export const createSectionDebug = () => {
  const sectionName = new URLSearchParams(window.location.search).get(
    "debugSection",
  );

  if (!DEBUG_SECTIONS.has(sectionName)) return null;

  const page = document.body;
  const target = document.getElementById(sectionName);

  if (!target) return null;

  const prepare = () => {
    if (sectionName !== "cover") {
      page.dataset.pageState = PAGE_STATES.open;
    }

    if (sectionName === "memory") {
      const origin = document.querySelector("[data-origin]");
      if (origin) origin.dataset.originState = ORIGIN_STATES.completed;
    }

    delete page.dataset.originScrollLocked;
    delete page.dataset.memoryScrollLocked;
  };

  const focus = () => {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });
  };

  return {
    focus,
    prepare,
    shouldInitialize: (candidate) => candidate === sectionName,
  };
};
