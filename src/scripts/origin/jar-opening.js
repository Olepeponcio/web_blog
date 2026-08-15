import { animateCorkFlight } from "./cork-flight.js";
import { ORIGIN_STATES } from "./states.js";
import openedJarSource from "../../assets/images/02-origin/img__ink-jar--open.webp";

export const preloadOpenedJar = () => {
  const openedJarImage = new Image();
  openedJarImage.src = openedJarSource;
};

export const openJar = async ({ origin, jarTrigger, jarImage, cork }) => {
  origin.dataset.originState = ORIGIN_STATES.opening;
  jarTrigger.disabled = true;
  jarImage.src = openedJarSource;

  cork.hidden = false;
  cork.classList.add("origin__cork--ejecting");
  await animateCorkFlight(cork);

  cork.classList.remove("origin__cork--ejecting");
  cork.hidden = true;
  origin.dataset.originState = ORIGIN_STATES.openedReady;
  jarTrigger.disabled = false;
  jarTrigger.setAttribute("aria-label", "Usar el bote de tinta");
};
