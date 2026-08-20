const FUTURE_MESSAGES = [
  'El futuro nunca llega completamente terminado.\n\nSe construye con pequeñas decisiones tomadas en el presente.',
  'Una línea de código. Una idea descartada. Una conversación.\n\nUna pregunta que todavía no tiene respuesta.',
  'Quizá dentro de algunos años, incluso ya, esta página parezca antigua.\n\nEso significará que seguimos avanzando.',
  'Pero hay algo que debería permanecer:\n\nla voluntad de construir tecnología que no compita con las personas, sino que trabaje con ellas.',
  'Herramientas más claras. Interfaces más humanas.\n\nSistemas que sepan desaparecer cuando ya no son necesarios.',
  'Ese es el futuro al que enviamos esta carta.',
];

const wait = (duration) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

export const initializeFuture = () => {
  const future = document.querySelector('[data-future]');
  const trigger = future?.querySelector('[data-future-cpu-trigger]');
  const terminalLine = future?.querySelector('[data-future-terminal-line]');

  if (!future || !trigger || !terminalLine) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const typeMessage = async (message) => {
    terminalLine.textContent = '';

    if (reducedMotion.matches) {
      terminalLine.textContent = message;
      return;
    }

    for (const character of message) {
      terminalLine.textContent += character;
      await wait(character === '\n' ? 180 : 32);
    }
  };

  const showMessage = async (message, isFirst) => {
    if (!isFirst && !reducedMotion.matches) {
      terminalLine.classList.add('future__terminal-line--leaving');
      await wait(240);
    }

    terminalLine.classList.remove('future__terminal-line--leaving');
    await typeMessage(message);
  };

  const activate = async () => {
    trigger.disabled = true;
    future.classList.add('future--activated');

    for (const [index, message] of FUTURE_MESSAGES.entries()) {
      await showMessage(message, index === 0);
      if (index < FUTURE_MESSAGES.length - 1) {
        await wait(reducedMotion.matches ? 1200 : 2600);
      }
    }
  };

  trigger.addEventListener('click', activate, { once: true });
};
