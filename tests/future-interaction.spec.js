import { expect, test } from '@playwright/test';

test('la CPU activa la placa y comienza el mensaje del futuro', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?debugSection=future');

  const future = page.locator('[data-future]');
  const trigger = page.getByRole('button', {
    name: 'Activar mensaje del futuro',
  });

  await expect(trigger).toBeVisible();
  await trigger.click();

  await expect(future).toHaveClass(/future--activated/);
  await expect(trigger).toBeDisabled();
  await expect(page.locator('.future__motherbase-image--base')).toHaveCSS(
    'opacity',
    '0',
  );
  await expect(page.locator('.future__motherbase-image--active')).toHaveCSS(
    'opacity',
    '1',
  );
  await expect(page.locator('[data-future-terminal-line]')).toContainText(
    'El futuro nunca llega completamente terminado.',
  );
});

test('el terminal conserva una tipografía legible dentro del panel', async ({
  page,
}) => {
  await page.goto('/?debugSection=future');

  const panel = page.locator('[data-future-panel]');
  const terminal = page.locator('[data-future-terminal]');

  await expect(panel).toBeVisible();
  await expect(terminal).toBeVisible();

  const fontSize = await terminal.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  const panelBox = await panel.boundingBox();
  const terminalBox = await terminal.boundingBox();

  expect(fontSize).toBeGreaterThanOrEqual(9.2);
  expect(panelBox).not.toBeNull();
  expect(terminalBox).not.toBeNull();

  expect(terminalBox.x).toBeGreaterThanOrEqual(panelBox.x);
  expect(terminalBox.y).toBeGreaterThanOrEqual(panelBox.y);
  expect(terminalBox.x + terminalBox.width).toBeLessThanOrEqual(
    panelBox.x + panelBox.width,
  );
  expect(terminalBox.y + terminalBox.height).toBeLessThanOrEqual(
    panelBox.y + panelBox.height,
  );
});
