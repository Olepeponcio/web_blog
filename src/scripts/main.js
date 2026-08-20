import { initializeCover } from './cover/cover.js';
import { initializeOrigin } from './origin/origin.js';
import { initializeMemory } from './memory/memory.js';
import { initializePresent } from './present/present.js';
import { initializeFuture } from './future/future.js';
import { initializeEnding } from './ending/ending.js';
import { initializeAccessibilityTools } from './shared/accessibility-tools.js';
import { initializeContextualHelp } from './shared/contextual-help.js';
import { initializeHelpGuide } from './shared/help-guide.js';
import { initializeScrollCue } from './shared/scroll-cue.js';

const resetInitialNavigation = () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  window.scrollTo(0, 0);
};

resetInitialNavigation();
window.addEventListener('pageshow', resetInitialNavigation);

const sectionInitializers = {
  cover: initializeCover,
  origin: initializeOrigin,
  memory: initializeMemory,
  present: initializePresent,
  future: initializeFuture,
  ending: initializeEnding,
};

const initializeApp = async () => {
  const debugSession = import.meta.env.DEV
    ? (await import('./debug/section-debug.js')).createSectionDebug()
    : null;

  debugSession?.prepare();

  Object.entries(sectionInitializers).forEach(([sectionName, initialize]) => {
    if (!debugSession || debugSession.shouldInitialize(sectionName))
      initialize();
  });

  initializeScrollCue();
  initializeAccessibilityTools();
  initializeContextualHelp();
  initializeHelpGuide();
  debugSession?.focus();
};

initializeApp();
