import { clamp } from "./math.js";

export const wait = (duration) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

export const waitForNextFrame = () =>
  new Promise((resolve) => window.requestAnimationFrame(resolve));

export const getMotionDuration = (propertyName) => {
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

export const scrollToElement = (element, durationProperty) =>
  new Promise((resolve) => {
    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = getMotionDuration(durationProperty);
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
