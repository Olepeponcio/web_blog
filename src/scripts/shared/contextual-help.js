const CONFLICTING_PAGE_STATES = new Set(["dragging", "writing"]);
const CONFLICTING_ORIGIN_STATES = new Set([
  "centering",
  "opening",
  "complete",
]);
const CONFLICTING_MEMORY_STATES = new Set([
  "entering",
  "centering",
  "postal-moving",
  "flipping",
]);

const TOOLTIP_GAP = 10;
const VIEWPORT_GAP = 8;

const isInViewport = (bounds) =>
  bounds.bottom > 0 &&
  bounds.right > 0 &&
  bounds.top < window.innerHeight &&
  bounds.left < window.innerWidth;

const isRendered = (element) => {
  const bounds = element.getBoundingClientRect();
  let currentElement = element;

  while (currentElement && currentElement !== document.documentElement) {
    const style = getComputedStyle(currentElement);

    if (
      currentElement.hidden ||
      style.display === "none" ||
      style.visibility === "hidden" ||
      Number.parseFloat(style.opacity) === 0
    ) {
      return false;
    }

    currentElement = currentElement.parentElement;
  }

  return isInViewport(bounds);
};

const rectsOverlap = (first, second) =>
  first.left < second.right &&
  first.right > second.left &&
  first.top < second.bottom &&
  first.bottom > second.top;

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const getPlacementCandidates = (anchor, tooltip) => [
  {
    left: anchor.left,
    top: anchor.bottom + TOOLTIP_GAP,
  },
  {
    left: anchor.left,
    top: anchor.top - tooltip.height - TOOLTIP_GAP,
  },
  {
    left: anchor.right + TOOLTIP_GAP,
    top: anchor.top + (anchor.height - tooltip.height) / 2,
  },
  {
    left: anchor.left - tooltip.width - TOOLTIP_GAP,
    top: anchor.top + (anchor.height - tooltip.height) / 2,
  },
];

const placeTooltip = (target, tooltip, occupied) => {
  const anchor = target.getBoundingClientRect();
  const tooltipBounds = tooltip.getBoundingClientRect();
  const maxLeft = Math.max(
    VIEWPORT_GAP,
    window.innerWidth - tooltipBounds.width - VIEWPORT_GAP,
  );
  const maxTop = Math.max(
    VIEWPORT_GAP,
    window.innerHeight - tooltipBounds.height - VIEWPORT_GAP,
  );

  const candidates = getPlacementCandidates(anchor, tooltipBounds).map(
    ({ left, top }) => {
      const position = {
        left: clamp(left, VIEWPORT_GAP, maxLeft),
        top: clamp(top, VIEWPORT_GAP, maxTop),
      };
      const bounds = {
        ...position,
        right: position.left + tooltipBounds.width,
        bottom: position.top + tooltipBounds.height,
      };
      const overlaps = occupied.filter((rect) =>
        rectsOverlap(bounds, rect),
      ).length;

      return { bounds, overlaps };
    },
  );

  const placement = candidates.reduce((best, candidate) =>
    candidate.overlaps < best.overlaps ? candidate : best,
  );

  tooltip.style.translate = `${placement.bounds.left}px ${placement.bounds.top}px`;
  occupied.push(placement.bounds);
};

export const initializeContextualHelp = () => {
  const page = document.body;
  const toggle = document.querySelector("[data-contextual-help-toggle]");
  const targets = [...document.querySelectorAll("[data-contextual-help]")];
  const seal = document.querySelector("[data-seal]");
  const origin = document.querySelector("[data-origin]");
  const memory = document.querySelector("[data-memory]");
  const toolbar = document.querySelector(".accessibility-toolbar");

  if (!toggle || targets.length === 0) return;

  let active = false;
  let updateFrame;
  const tooltips = new Map();
  const previousDescriptions = new Map();

  const hasConflictingInteraction = () =>
    page.dataset.helpGuideOpen === "true" ||
    CONFLICTING_PAGE_STATES.has(page.dataset.pageState) ||
    seal?.classList.contains("cover__seal--breaking") ||
    CONFLICTING_ORIGIN_STATES.has(origin?.dataset.originState) ||
    CONFLICTING_MEMORY_STATES.has(memory?.dataset.memoryState);

  const targetIsAvailable = (target) => {
    if (target.matches("[data-envelope]")) {
      return ["sealed", "dragging"].includes(page.dataset.pageState);
    }

    return !target.matches(":disabled") && isRendered(target);
  };

  const removeTooltip = (target) => {
    const tooltip = tooltips.get(target);
    if (!tooltip) return;

    tooltip.remove();
    tooltips.delete(target);

    const previousDescription = previousDescriptions.get(target);
    if (previousDescription) {
      target.setAttribute("aria-describedby", previousDescription);
    } else {
      target.removeAttribute("aria-describedby");
    }
    previousDescriptions.delete(target);
  };

  const createTooltip = (target, index) => {
    const tooltip = document.createElement("span");
    const id = `contextual-help-${index + 1}`;
    const previousDescription = target.getAttribute("aria-describedby");

    tooltip.className = "contextual-help__tooltip";
    tooltip.id = id;
    tooltip.setAttribute("role", "tooltip");
    tooltip.textContent = target.dataset.contextualHelp;
    document.body.append(tooltip);

    previousDescriptions.set(target, previousDescription);
    target.setAttribute(
      "aria-describedby",
      [previousDescription, id].filter(Boolean).join(" "),
    );
    tooltips.set(target, tooltip);
  };

  const render = () => {
    updateFrame = undefined;
    if (!active) return;

    targets.forEach((target, index) => {
      if (targetIsAvailable(target)) {
        if (!tooltips.has(target)) createTooltip(target, index);
      } else {
        removeTooltip(target);
      }
    });

    const occupied = toolbar
      ? [toolbar.getBoundingClientRect()]
      : [];
    tooltips.forEach((tooltip, target) =>
      placeTooltip(target, tooltip, occupied),
    );
  };

  const requestRender = () => {
    if (!active || updateFrame) return;
    updateFrame = window.requestAnimationFrame(render);
  };

  const setActive = (nextActive, { restoreFocus = false } = {}) => {
    active = nextActive;
    page.dataset.contextualHelp = active ? "visible" : "hidden";
    toggle.setAttribute("aria-pressed", String(active));
    toggle.setAttribute(
      "aria-label",
      active ? "Ocultar ayudas contextuales" : "Mostrar ayudas contextuales",
    );

    if (active) {
      requestRender();
    } else {
      tooltips.forEach((_, target) => removeTooltip(target));
      if (restoreFocus) toggle.focus({ preventScroll: true });
    }
  };

  const syncAvailability = () => {
    const unavailable = hasConflictingInteraction();
    toggle.disabled = unavailable;
    toggle.setAttribute("aria-disabled", String(unavailable));
    if (unavailable && active) setActive(false);
    if (!unavailable) requestRender();
  };

  const stateObserver = new MutationObserver(syncAvailability);
  stateObserver.observe(page, {
    attributes: true,
    subtree: true,
    attributeFilter: [
      "class",
      "disabled",
      "hidden",
      "data-page-state",
      "data-origin-state",
      "data-memory-state",
      "data-present-state",
      "data-help-guide-open",
    ],
  });

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(requestRender);
    targets.forEach((target) => resizeObserver.observe(target));
  }

  toggle.addEventListener("click", () => setActive(!active));
  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !active) return;
    event.preventDefault();
    setActive(false, { restoreFocus: true });
  });

  page.dataset.contextualHelp = "hidden";
  syncAvailability();
};
