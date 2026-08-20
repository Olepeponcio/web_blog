import Matter from "matter-js";

const { Bodies, Body, Composite, Engine } = Matter;

const SUPPLIES = [
  {
    source: new URL(
      "../../assets/images/06-ending/img__book.png",
      import.meta.url,
    ).href,
    aspectRatio: 0.88,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__compass.png",
      import.meta.url,
    ).href,
    aspectRatio: 1,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__dice.png",
      import.meta.url,
    ).href,
    aspectRatio: 1,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__gamepad.png",
      import.meta.url,
    ).href,
    aspectRatio: 1.18,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__gears.png",
      import.meta.url,
    ).href,
    aspectRatio: 1,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__hammer.png",
      import.meta.url,
    ).href,
    aspectRatio: 0.9,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__joycon.png",
      import.meta.url,
    ).href,
    aspectRatio: 0.82,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__light_bulbs.png",
      import.meta.url,
    ).href,
    aspectRatio: 0.78,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__magnifying_glass.png",
      import.meta.url,
    ).href,
    aspectRatio: 1,
  },
  {
    source: new URL(
      "../../assets/images/06-ending/img__puzzle.png",
      import.meta.url,
    ).href,
    aspectRatio: 1,
  },
];

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

export const createEndingPhysics = ({ scene, supplies, muzzle }) => {
  const engine = Engine.create({ enableSleeping: true });
  engine.gravity = { x: 0, y: 1, scale: 0.0017 };

  const renderedBodies = [];
  let boundaries = [];
  let animationFrame = 0;
  let lastTime = 0;
  let running = false;

  const createBoundaries = () => {
    boundaries.forEach((body) => Composite.remove(engine.world, body));

    const width = scene.clientWidth;
    const height = scene.clientHeight;
    const thickness = 80;
    const options = { isStatic: true, friction: 0.85, restitution: 0.12 };

    boundaries = [
      Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, options),
      Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, options),
      Bodies.rectangle(
        width + thickness / 2,
        height / 2,
        thickness,
        height * 2,
        options,
      ),
    ];
    Composite.add(engine.world, boundaries);
  };

  const render = (time) => {
    if (!running) return;

    const delta = lastTime ? clamp(time - lastTime, 8, 1000 / 60) : 1000 / 60;
    lastTime = time;
    Engine.update(engine, delta);

    renderedBodies.forEach(({ body, element, width, height }) => {
      element.style.transform = `translate3d(${body.position.x - width / 2}px, ${
        body.position.y - height / 2
      }px, 0) rotate(${body.angle}rad)`;
    });

    animationFrame = window.requestAnimationFrame(render);
  };

  const activate = () => {
    if (running) return;

    running = true;
    lastTime = 0;
    createBoundaries();
    animationFrame = window.requestAnimationFrame(render);
  };

  const spawn = () => {
    activate();

    const sceneRect = scene.getBoundingClientRect();
    const muzzleRect = muzzle.getBoundingClientRect();
    const supply = SUPPLIES[Math.floor(Math.random() * SUPPLIES.length)];
    const baseSize = clamp(scene.clientWidth * 0.065, 42, 88);
    const width =
      supply.aspectRatio >= 1 ? baseSize : baseSize * supply.aspectRatio;
    const height =
      supply.aspectRatio >= 1 ? baseSize / supply.aspectRatio : baseSize;
    const x = muzzleRect.left - sceneRect.left + muzzleRect.width / 2;
    const y = muzzleRect.top - sceneRect.top + muzzleRect.height / 2;
    const element = document.createElement("img");

    element.className = "ending__supply";
    element.src = supply.source;
    element.alt = "";
    element.width = Math.round(width);
    element.height = Math.round(height);
    element.style.inlineSize = `${width}px`;
    element.style.blockSize = `${height}px`;
    supplies.append(element);

    const body = Bodies.rectangle(x, y, width * 0.82, height * 0.82, {
      restitution: 0.38,
      friction: 0.72,
      frictionAir: 0.006,
      density: 0.0015,
      chamfer: { radius: Math.min(width, height) * 0.14 },
    });

    Body.setVelocity(body, {
      x: 8 + Math.random() * 4,
      y: -(9 + Math.random() * 4),
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.22);
    Composite.add(engine.world, body);
    renderedBodies.push({ body, element, width, height });
  };

  const reset = () => {
    running = false;
    window.cancelAnimationFrame(animationFrame);
    Composite.clear(engine.world, false, true);
    boundaries = [];
    renderedBodies.splice(0);
    supplies.replaceChildren();
    Engine.clear(engine);
  };

  const resize = () => {
    if (!running) return;

    createBoundaries();
    const width = scene.clientWidth;
    const height = scene.clientHeight;

    renderedBodies.forEach(({ body }) => {
      Body.setPosition(body, {
        x: clamp(body.position.x, 0, width),
        y: clamp(body.position.y, 0, height),
      });
    });
  };

  window.addEventListener("resize", resize);

  return { reset, spawn };
};
