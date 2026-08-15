import { NARRATIVE_EVENTS } from "../shared/narrative-events.js";
import { ORIGIN_STATES } from "./states.js";

export const createOriginExit = ({ page, origin }) => {
  const complete = () => {
    if (origin.dataset.originState !== ORIGIN_STATES.complete) return;

    delete page.dataset.originScrollLocked;
    origin.dataset.originState = ORIGIN_STATES.completed;
    origin.dispatchEvent(new CustomEvent(NARRATIVE_EVENTS.originComplete));
  };

  return { complete };
};
