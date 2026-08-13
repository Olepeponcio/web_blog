const page = document.body;
const envelope = document.querySelector("[data-envelope]");
const envelopeFlap = envelope?.querySelector(".cover__flap");
const seal = document.querySelector("[data-seal]");
const sealImage = document.querySelector("[data-seal-image]");
const openingText = document.querySelector("[data-opening-text]");
const scrollCue = document.querySelector("[data-scroll-cue]");

const requiredElements = [
  envelope,
  envelopeFlap,
  seal,
  sealImage,
  openingText,
  scrollCue,
];

if (requiredElements.every(Boolean)) {
  let currentOffset = 0;
  let dragStartY = 0;
  let dragStartOffset = 0;
  let isDragging = false;
  let isDeployed = false;

  const clamp = (value, minimum, maximum) =>
    Math.min(Math.max(value, minimum), maximum);

  const getVisibleEdge = () => {
    const rootFontSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );

    if (window.matchMedia("(max-width: 48rem)").matches) {
      return clamp(
        window.innerHeight * 0.18,
        rootFontSize * 7,
        rootFontSize * 10,
      );
    }

    return clamp(window.innerHeight * 0.1, rootFontSize * 3.5, rootFontSize * 7);
  };

  const getInitialOffset = () =>
    Math.min(-(envelopeFlap.offsetHeight - getVisibleEdge()), 0);

  const setEnvelopeOffset = (offset) => {
    currentOffset = offset;
    envelope.style.setProperty("--envelope-offset-y", `${offset}px`);
  };

  const setPageState = (state) => {
    page.dataset.pageState = state;
  };

  const completeDeployment = () => {
    isDeployed = true;
    isDragging = false;
    setEnvelopeOffset(0);
    setPageState("seal-ready");
    seal.disabled = false;
  };

  const beginDrag = (event) => {
    if (event.button !== 0 || isDeployed) return;

    event.preventDefault();
    isDragging = true;
    dragStartY = event.clientY;
    dragStartOffset = currentOffset;
    setPageState("dragging");
  };

  const continueDrag = (event) => {
    if (!isDragging) return;

    const nextOffset = dragStartOffset + (event.clientY - dragStartY);
    setEnvelopeOffset(clamp(nextOffset, getInitialOffset(), 0));

    if (currentOffset === 0) completeDeployment();
  };

  const endDrag = () => {
    if (!isDragging) return;

    isDragging = false;
    setPageState("sealed");
  };

  const prepareWords = () => {
    const words = [];
    const textElements = openingText.querySelectorAll("[data-reveal-text]");

    textElements.forEach((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const textNodes = [];

      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach((textNode) => {
        const fragment = document.createDocumentFragment();
        const parts = textNode.textContent.split(/(\s+)/);

        parts.forEach((part) => {
          if (!part) return;

          if (/^\s+$/.test(part)) {
            fragment.append(document.createTextNode(part));
            return;
          }

          const word = document.createElement("span");
          word.className = "reveal-word";
          word.textContent = part;
          fragment.append(word);
          words.push(word);
        });

        textNode.replaceWith(fragment);
      });
    });

    return words;
  };

  const wait = (duration) =>
    new Promise((resolve) => window.setTimeout(resolve, duration));

  const getMotionDuration = (propertyName) => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();
    const duration = Number.parseFloat(value);

    return value.endsWith("s") && !value.endsWith("ms")
      ? duration * 1000
      : duration;
  };

  const easeInOutCubic = (progress) =>
    progress < 0.5
      ? 4 * progress ** 3
      : 1 - (-2 * progress + 2) ** 3 / 2;

  const scrollToOpeningText = () =>
    new Promise((resolve) => {
      const startPosition = window.scrollY;
      const targetPosition =
        openingText.getBoundingClientRect().top + window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = getMotionDuration("--duration-opening-scroll");
      const startTime = performance.now();

      const updateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration, 0, 1);

        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

        if (progress < 1) {
          window.requestAnimationFrame(updateScroll);
          return;
        }

        resolve();
      };

      window.requestAnimationFrame(updateScroll);
    });

  const revealOpeningText = async () => {
    const words = prepareWords();
    openingText.setAttribute("aria-busy", "true");
    openingText.hidden = false;

    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    await scrollToOpeningText();

    for (const word of words) {
      word.classList.add("reveal-word--visible");
      await wait(75);
    }

    openingText.setAttribute("aria-busy", "false");
    setPageState("open");
    scrollCue.hidden = false;
  };

  const dismissScrollCue = () => {
    scrollCue.hidden = true;
  };

  const openSeal = async () => {
    if (page.dataset.pageState !== "seal-ready") return;

    seal.disabled = true;
    seal.classList.add("cover__seal--breaking");

    const sealBreakDuration = getMotionDuration("--duration-seal-break");
    await wait(sealBreakDuration * 0.5);
    sealImage.src = sealImage.dataset.openedSrc;
    await wait(sealBreakDuration * 0.5);

    seal.classList.remove("cover__seal--breaking");
    setPageState("writing");
    await revealOpeningText();
  };

  const syncInitialPosition = () => {
    if (isDeployed || isDragging) return;

    setEnvelopeOffset(getInitialOffset());
  };

  const initialize = () => {
    const openedSealImage = new Image();
    openedSealImage.src = sealImage.dataset.openedSrc;

    syncInitialPosition();
    envelope.addEventListener("mousedown", beginDrag);
    window.addEventListener("mousemove", continueDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("resize", syncInitialPosition);
    window.addEventListener("wheel", dismissScrollCue, { passive: true });
    window.addEventListener("scroll", dismissScrollCue, { passive: true });
    seal.addEventListener("click", openSeal);
  };

  initialize();
}
