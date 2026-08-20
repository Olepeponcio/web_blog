const createTouchPoint = (x, y) => ({
  x,
  y,
  radiusX: 4,
  radiusY: 4,
  force: 1,
  id: 1,
});

export const createTouchDriver = async (page) => {
  const session = await page.context().newCDPSession(page);

  const dispatch = (type, touchPoints) =>
    session.send("Input.dispatchTouchEvent", { type, touchPoints });

  const drag = async ({ from, to, steps = 8, hold = false }) => {
    await dispatch("touchStart", [createTouchPoint(from.x, from.y)]);

    for (let step = 1; step <= steps; step += 1) {
      const progress = step / steps;
      await dispatch("touchMove", [
        createTouchPoint(
          from.x + (to.x - from.x) * progress,
          from.y + (to.y - from.y) * progress,
        ),
      ]);
      await page.waitForTimeout(16);
    }

    if (!hold) await dispatch("touchEnd", []);
  };

  const tap = async ({ x, y }) => {
    await dispatch("touchStart", [createTouchPoint(x, y)]);
    await dispatch("touchEnd", []);
  };

  const end = () => dispatch("touchEnd", []);

  return { drag, end, tap };
};
