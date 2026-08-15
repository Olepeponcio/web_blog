import { initializeCover } from "./cover/cover.js";
import { initializeOrigin } from "./origin/origin.js";
import { initializeMemory } from "./memory/memory.js";
import { initializePresent } from "./present/present.js";
import { initializeContextualHelp } from "./shared/contextual-help.js";
import { initializeHelpGuide } from "./shared/help-guide.js";
import { initializeScrollCue } from "./shared/scroll-cue.js";

const sectionInitializers = {
  cover: initializeCover,
  origin: initializeOrigin,
  memory: initializeMemory,
  present: initializePresent,
};

const initializeApp = async () => {
  const debugSession = import.meta.env.DEV
    ? (await import("./debug/section-debug.js")).createSectionDebug()
    : null;

  debugSession?.prepare();

  Object.entries(sectionInitializers).forEach(([sectionName, initialize]) => {
    if (!debugSession || debugSession.shouldInitialize(sectionName)) initialize();
  });

  initializeScrollCue();
  initializeContextualHelp();
  initializeHelpGuide();
  debugSession?.focus();
};

initializeApp();
