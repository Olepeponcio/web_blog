import { expect, test } from '@playwright/test';
import { reachPresent, selectors } from './helpers/epistle.js';

test.describe('HITO 4 — accesibilidad', () => {
  test.beforeEach(async ({ page }) => page.goto('/'));

  test('AC01 — movimiento reducido expone contenido e interacciones', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await reachPresent(page, 0.1);

    await expect(page.locator(selectors.present)).toHaveAttribute(
      'data-present-state',
      'interactive',
    );
    await expect(page.locator(selectors.presentAlways)).toBeEnabled();
    await expect(page.locator('.present__character--visible')).toHaveCount(
      await page.locator('.present__character').count(),
    );
  });

  test('AC02 — conserva el texto narrativo semántico', async ({ page }) => {
    await reachPresent(page, 0.1);
    const semanticText = await page
      .locator('.present__writing-semantic')
      .innerText();

    await expect(page.locator('.present__label')).toHaveText(
      'Hoy ya no escribimos únicamente sobre el papel',
    );
    expect(semanticText).toContain('Construimos interfaces.');
    expect(semanticText).toContain('Generar un propósito.');
  });

  test('AC03 — movimiento reducido mantiene la señal en reposo', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await reachPresent(page, 0.1);
    await page.waitForTimeout(1_600);

    await expect(page.locator(selectors.presentSignImage)).toHaveAttribute(
      'src',
      /img__road_sing_01\.png$/,
    );
  });
});
