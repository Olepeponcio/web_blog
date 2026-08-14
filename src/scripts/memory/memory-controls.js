const activeBoardSource = new URL(
  "../../assets/images/03-memory/img__board_2.png",
  import.meta.url,
).href;

export const createMemoryControls = ({
  memory,
  board,
  switchTrigger,
  instrumentTrigger,
}) => {
  const activeBoard = new Image();
  let stateObserver;
  activeBoard.src = activeBoardSource;

  const enableSwitch = () => {
    if (memory.dataset.memoryState === "board-ready") {
      switchTrigger.disabled = false;
      stateObserver?.disconnect();
    }
  };

  const activateSwitch = async () => {
    if (memory.dataset.memoryState !== "board-ready") return;

    switchTrigger.disabled = true;
    await activeBoard.decode().catch(() => undefined);
    memory.dataset.memoryState = "signal";
    board.src = activeBoardSource;
    instrumentTrigger.disabled = false;
  };

  const activateInstrument = () => {
    if (memory.dataset.memoryState !== "signal") return;

    instrumentTrigger.disabled = true;
    memory.dataset.memoryState = "triggered";
    memory.dispatchEvent(new CustomEvent("memory:instrument-triggered"));
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
