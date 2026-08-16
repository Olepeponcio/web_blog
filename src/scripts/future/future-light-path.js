const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

export const createFutureLightPath = ({ scene, title, cards, line, point }) => {
  let animationFrame = 0;
  let lineAnimation = null;
  let resolveActiveAnimation = null;

  const updatePath = (targetCard = cards[0]) => {
    const sceneRect = scene.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();
    const toX = (value) => ((value - sceneRect.left) / sceneRect.width) * 1000;
    const toY = (value) => ((value - sceneRect.top) / sceneRect.height) * 1000;
    const startX = clamp(toX(titleRect.left), 80, 930);
    const startY = clamp(toY(titleRect.bottom), 70, 250);
    const endX = clamp(toX(cardRect.right - cardRect.width * 0.1), 250, 850);
    const endY = clamp(toY(cardRect.top + cardRect.height * 0.24), 180, 650);
    const turnOneX = clamp(startX - 95, endX + 210, 900);
    const turnOneY = clamp(startY + 135, 150, 430);
    const turnTwoX = clamp(turnOneX - 125, endX + 100, 820);
    const turnTwoY = clamp(endY - 85, 120, 560);

    line.setAttribute(
      "d",
      `M ${startX} ${startY} H ${turnOneX} V ${turnOneY} H ${turnTwoX} V ${turnTwoY} H ${endX} V ${endY}`,
    );
    point.setAttribute("cx", startX);
    point.setAttribute("cy", startY);
  };

  const reset = () => {
    cancelAnimationFrame(animationFrame);
    lineAnimation?.cancel();
    lineAnimation = null;
    resolveActiveAnimation?.(false);
    resolveActiveAnimation = null;
    line.style.opacity = "0";
    line.style.strokeDasharray = "";
    line.style.strokeDashoffset = "";
    point.style.opacity = "0";
  };

  const animateCurrentPath = ({ duration }) =>
    new Promise((resolve) => {
      reset();
      resolveActiveAnimation = resolve;

      const length = line.getTotalLength();
      line.style.opacity = "1";
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
      point.style.opacity = "1";

      lineAnimation = line.animate(
        [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
        {
          duration,
          easing: "cubic-bezier(0.45, 0, 0.25, 1)",
          fill: "forwards",
        },
      );

      const startedAt = performance.now();
      const movePoint = (now) => {
        const elapsed = clamp((now - startedAt) / duration, 0, 1);
        const progress = elapsed * elapsed * (3 - 2 * elapsed);
        const position = line.getPointAtLength(length * progress);
        point.setAttribute("cx", position.x);
        point.setAttribute("cy", position.y);

        if (elapsed < 1) {
          animationFrame = requestAnimationFrame(movePoint);
          return;
        }

        point.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 220,
          fill: "forwards",
        });
        line.animate([{ opacity: 1 }, { opacity: 0 }], {
          delay: 100,
          duration: 420,
          fill: "forwards",
        });
        resolveActiveAnimation = null;
        resolve(true);
      };

      animationFrame = requestAnimationFrame(movePoint);
    });

  const play = ({ duration = 3000, targetCard = cards[0] } = {}) => {
    updatePath(targetCard);
    return animateCurrentPath({ duration });
  };

  const playExcursion = ({ fromCard, toCard, duration = 4200 }) => {
    const sceneRect = scene.getBoundingClientRect();
    const toX = (value) => ((value - sceneRect.left) / sceneRect.width) * 1000;
    const toY = (value) => ((value - sceneRect.top) / sceneRect.height) * 1000;
    const getCardBox = (cardElement) => {
      const cardRect = cardElement.getBoundingClientRect();
      return {
        left: clamp(toX(cardRect.left), 30, 900),
        right: clamp(toX(cardRect.right), 100, 970),
        top: clamp(toY(cardRect.top), 30, 900),
        bottom: clamp(toY(cardRect.bottom), 100, 970),
      };
    };
    const fromBox = getCardBox(fromCard);
    const toBox = getCardBox(toCard);
    const sides = ["top", "right", "bottom", "left"];
    const exitSide = sides[Math.floor(Math.random() * sides.length)];
    const entryChoices = sides.filter((side) => side !== exitSide);
    const entrySide = entryChoices[Math.floor(Math.random() * entryChoices.length)];
    const pointOnSide = (box, side) => {
      const horizontal =
        box.left + (box.right - box.left) * (0.2 + Math.random() * 0.6);
      const vertical =
        box.top + (box.bottom - box.top) * (0.2 + Math.random() * 0.6);

      if (side === "top") return { x: horizontal, y: box.top };
      if (side === "right") return { x: box.right, y: vertical };
      if (side === "bottom") return { x: horizontal, y: box.bottom };
      return { x: box.left, y: vertical };
    };
    const start = pointOnSide(fromBox, exitSide);
    const end = pointOnSide(toBox, entrySide);
    const outerRight = Math.max(fromBox.right, toBox.right);
    const outerLeft = Math.min(fromBox.left, toBox.left);
    const useRightCorridor = Math.random() >= 0.35;
    const roamX = useRightCorridor
      ? clamp(
          outerRight + 70 + Math.random() * Math.max(80, 890 - outerRight),
          80,
          940,
        )
      : clamp(outerLeft - 70 - Math.random() * 120, 60, 920);
    const roamY = clamp(100 + Math.random() * 800, 80, 920);
    const secondX = clamp(
      useRightCorridor ? roamX - 90 - Math.random() * 160 : roamX + 90 + Math.random() * 160,
      70,
      930,
    );

    line.setAttribute(
      "d",
      `M ${start.x} ${start.y} H ${roamX} V ${roamY} H ${secondX} V ${end.y} H ${end.x}`,
    );
    point.setAttribute("cx", start.x);
    point.setAttribute("cy", start.y);
    return animateCurrentPath({ duration });
  };

  return { play, playExcursion, reset, updatePath };
};
