import { animateCorkFlight } from "./cork-flight.js";
import { ORIGIN_STATES } from "./states.js";

export const preloadOpenedJar = (jarImage) => {
  const openedJarImage = new Image();
  openedJarImage.src = jarImage.dataset.openedSrc;
};

export const openJar = async ({ origin, jarTrigger, jarImage, cork }) => {
  origin.dataset.originState = ORIGIN_STATES.opening;
  jarTrigger.disabled = true;
  jarImage.src = jarImage.dataset.openedSrc;

  cork.hidden = false;
  cork.classList.add("origin__cork--ejecting");
  await animateCorkFlight(cork);

  cork.classList.remove("origin__cork--ejecting");
  cork.hidden = true;
  origin.dataset.originState = ORIGIN_STATES.openedReady;
  jarTrigger.disabled = false;
  jarTrigger.setAttribute("aria-label", "Usar el bote de tinta");
};
