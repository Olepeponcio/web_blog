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

const getElements = () => ({
  page: document.body,
  openButton: document.querySelector("[data-help-guide-open]"),
  closeButton: document.querySelector("[data-help-guide-close]"),
  dialog: document.querySelector("[data-help-guide]"),
  title: document.querySelector("#help-guide-title"),
  seal: document.querySelector("[data-seal]"),
  origin: document.querySelector("[data-origin]"),
  memory: document.querySelector("[data-memory]"),
});

const hasRequiredElements = ({
  page,
  openButton,
  closeButton,
  dialog,
  title,
}) => Boolean(page && openButton && closeButton && dialog && title);

export const initializeHelpGuide = () => {
  const elements = getElements();
  if (!hasRequiredElements(elements)) return;

  const {
    page,
    openButton,
    closeButton,
    dialog,
    title,
    seal,
    origin,
    memory,
  } = elements;

  const hasConflictingInteraction = () =>
    CONFLICTING_PAGE_STATES.has(page.dataset.pageState) ||
    seal?.classList.contains("cover__seal--breaking") ||
    CONFLICTING_ORIGIN_STATES.has(origin?.dataset.originState) ||
    CONFLICTING_MEMORY_STATES.has(memory?.dataset.memoryState);

  const syncAvailability = () => {
    const unavailable = hasConflictingInteraction();
    openButton.disabled = unavailable;
    openButton.setAttribute("aria-disabled", String(unavailable));
  };

  const openGuide = () => {
    if (openButton.disabled || dialog.open) return;

    page.dataset.helpGuideOpen = "true";
    openButton.setAttribute("aria-expanded", "true");
    dialog.showModal();
    title.focus();
  };

  const closeGuide = () => {
    if (!dialog.open) return;
    dialog.close();
  };

  const restorePage = () => {
    delete page.dataset.helpGuideOpen;
    openButton.setAttribute("aria-expanded", "false");
    openButton.focus({ preventScroll: true });
    syncAvailability();
  };

  const stateObserver = new MutationObserver(syncAvailability);
  stateObserver.observe(page, {
    attributes: true,
    attributeFilter: ["data-page-state"],
  });

  if (seal) {
    stateObserver.observe(seal, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  [origin, memory].filter(Boolean).forEach((section) => {
    stateObserver.observe(section, {
      attributes: true,
      attributeFilter: ["data-origin-state", "data-memory-state"],
    });
  });

  openButton.addEventListener("click", openGuide);
  closeButton.addEventListener("click", closeGuide);
  dialog.addEventListener("close", restorePage);
  syncAvailability();
};
