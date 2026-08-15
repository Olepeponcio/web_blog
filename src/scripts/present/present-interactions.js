const signSources = {
  idle: new URL(
    "../../assets/images/04-present/img__road_sing_01.png",
    import.meta.url,
  ).href,
  always: new URL(
    "../../assets/images/04-present/img__road_sing_02.png",
    import.meta.url,
  ).href,
  forward: new URL(
    "../../assets/images/04-present/img__road_sing_03.png",
    import.meta.url,
  ).href,
};

const ATTENTION_SEQUENCE = ["idle", "always", "idle", "forward"];
const ATTENTION_INTERVAL_MS = 1_400;

export const createPresentInteractions = ({
  present,
  signImage,
  triggers,
  messages,
}) => {
  let interactive = false;
  let active = "none";
  let lastPointerType = "";
  let attentionIndex = 0;
  let attentionTimer;

  const showSign = (state) => {
    signImage.src = signSources[state] ?? signSources.idle;
  };

  const stopAttentionCycle = () => {
    window.clearInterval(attentionTimer);
    attentionTimer = undefined;
  };

  const advanceAttentionCycle = () => {
    showSign(ATTENTION_SEQUENCE[attentionIndex]);
    attentionIndex = (attentionIndex + 1) % ATTENTION_SEQUENCE.length;
  };

  const startAttentionCycle = () => {
    stopAttentionCycle();

    if (
      !interactive ||
      active !== "none" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      showSign("idle");
      return;
    }

    attentionIndex = 0;
    advanceAttentionCycle();
    attentionTimer = window.setInterval(
      advanceAttentionCycle,
      ATTENTION_INTERVAL_MS,
    );
  };

  const setActive = (nextActive) => {
    active = interactive ? nextActive : "none";
    present.dataset.presentInteraction = active;
    stopAttentionCycle();
    showSign(active);

    messages.forEach((message) => {
      message.classList.toggle(
        "present__message--visible",
        message.dataset.presentMessage === active,
      );
    });

    if (active === "none") startAttentionCycle();
  };

  const enableInteractions = ({ detail }) => {
    interactive = detail.interactive;
    triggers.forEach((trigger) => {
      trigger.disabled = !interactive;
    });
    if (!interactive) setActive("none");
    else startAttentionCycle();
  };

  const initializeTrigger = (trigger) => {
    const name = trigger.dataset.presentTrigger;

    trigger.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") setActive(name);
    });
    trigger.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse" && document.activeElement !== trigger) {
        setActive("none");
      }
    });
    trigger.addEventListener("focus", () => setActive(name));
    trigger.addEventListener("blur", () => setActive("none"));
    trigger.addEventListener("pointerdown", (event) => {
      lastPointerType = event.pointerType;
    });
    trigger.addEventListener("click", () => {
      if (lastPointerType === "touch" || lastPointerType === "pen") {
        setActive(active === name ? "none" : name);
      }
      lastPointerType = "";
    });
  };

  const initialize = () => {
    Object.values(signSources).forEach((source) => {
      const image = new Image();
      image.src = source;
    });
    triggers.forEach(initializeTrigger);
    present.addEventListener(
      "present:interactive-change",
      enableInteractions,
    );
    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", startAttentionCycle);
    setActive("none");
  };

  return { initialize };
};
