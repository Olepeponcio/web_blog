import { scrollToElement } from "../shared/motion.js";
import { NARRATIVE_EVENTS } from "../shared/narrative-events.js";
import { MEMORY_STATES } from "./states.js";

const activeBoardSource = new URL(
  "../../assets/images/03-memory/img__board_2.webp",
  import.meta.url,
).href;

export const createMemoryControls = ({
  page,
  memory,
  board,
  switchTrigger,
  instrumentTrigger,
}) => {
  const activeBoard = new Image();
  let stateObserver;
  activeBoard.src = activeBoardSource;

  const enableSwitch = () => {
    if (memory.dataset.memoryState === MEMORY_STATES.boardReady) {
      switchTrigger.disabled = false;
      stateObserver?.disconnect();
    }
  };

  const activateSwitch = async () => {
    if (memory.dataset.memoryState !== MEMORY_STATES.boardReady) return;

    switchTrigger.disabled = true;
    memory.dataset.memoryState = MEMORY_STATES.centering;
    page.dataset.memoryScrollLocked = "true";
    await activeBoard.decode().catch(() => undefined);
    await scrollToElement(memory, "--duration-memory-centering");
    memory.dataset.memoryState = MEMORY_STATES.signal;
    board.src = activeBoardSource;
    instrumentTrigger.disabled = false;
  };

  const activateInstrument = () => {
    if (memory.dataset.memoryState !== MEMORY_STATES.signal) return;

    instrumentTrigger.disabled = true;
    memory.dataset.memoryState = MEMORY_STATES.triggered;
    memory.dispatchEvent(
      new CustomEvent(NARRATIVE_EVENTS.memoryInstrumentTriggered),
    );
  };

  const initialize = () => {
    stateObserver = new MutationObserver(enableSwitch);
    stateObserver.observe(memory, {
      attributeFilter: ["data-memory-state"],
    });
    switchTrigger.addEventListener("click", activateSwitch);
    instrumentTrigger.addEventListener("click", activateInstrument);
    enableSwitch();
  };

  return { initialize };
};
