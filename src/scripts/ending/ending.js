import { createEndingCannon } from "./ending-cannon.js";
import { createEndingPhysics } from "./ending-physics.js";

export const initializeEnding = () => {
  const ending = document.querySelector("[data-ending]");
  const elements = {
    scene: ending?.querySelector("[data-ending-scene]"),
    supplies: ending?.querySelector("[data-ending-supplies]"),
    cannon: ending?.querySelector("[data-ending-cannon]"),
    trigger: ending?.querySelector("[data-ending-cannon-trigger]"),
    muzzle: ending?.querySelector("[data-ending-cannon-muzzle]"),
  };

  if (!ending || Object.values(elements).some((element) => !element)) return;

  const physics = createEndingPhysics(elements);
  const cannon = createEndingCannon(elements, physics);
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) cannon.reset();
    },
    { threshold: 0 },
  );

  cannon.initialize();
  observer.observe(ending);
};
