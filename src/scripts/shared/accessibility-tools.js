export const initializeAccessibilityTools = () => {
  const toggle = document.querySelector('[data-accessibility-tools-toggle]');
  const tools = document.querySelector('[data-accessibility-tools]');

  if (!toggle || !tools) return;

  const setExpanded = (expanded) => {
    tools.hidden = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute(
      'aria-label',
      expanded
        ? 'Ocultar herramientas de accesibilidad'
        : 'Mostrar herramientas de accesibilidad',
    );

    if (!expanded) {
      document.dispatchEvent(new CustomEvent('accessibility-tools:collapse'));
    }
  };

  setExpanded(false);
  toggle.addEventListener('click', () => {
    setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
  });
};
