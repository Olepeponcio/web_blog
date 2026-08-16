import { expect, test } from '@playwright/test';
import { analyzeWcagLevelA } from './helpers/accessibility.js';
import {
  reachMemory,
  reachOrigin,
  reachPresent,
  selectors,
} from './helpers/epistle.js';

const expectNoWcagLevelAViolations = async (page) => {
  const results = await analyzeWcagLevelA(page);

  expect(results.violations).toEqual([]);
};

test.describe('WCAG 2.2 — nivel A automatizable', () => {
  test.beforeEach(async ({ page }) => page.goto('/'));

  test('AX01 — analiza la portada inicial', async ({ page }) => {
    await expectNoWcagLevelAViolations(page);
  });

  test('AX02 — analiza la guía de teclado abierta', async ({ page }) => {
    const openGuide = page.getByRole('button', {
      name: 'Abrir guía de navegación',
    });

    await expect(openGuide).toBeEnabled();
    await openGuide.click();
    await expect(page.getByRole('dialog', { name: 'Guía de navegación' })).toBeVisible();
    await expectNoWcagLevelAViolations(page);
  });

  test('AX03 — analiza las ayudas contextuales activadas', async ({ page }) => {
    const contextualHelp = page.locator('[data-contextual-help-toggle]');

    await expect(contextualHelp).toBeEnabled();
    await contextualHelp.click();
    await expect(contextualHelp).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[role="tooltip"]')).toHaveCount(1);
    await expectNoWcagLevelAViolations(page);
  });

  test('AX04 — analiza la sección Origin preparada', async ({ page }) => {
    await reachOrigin(page);
    await expectNoWcagLevelAViolations(page);
  });

  test('AX05 — analiza la sección Memory preparada', async ({ page }) => {
    await reachMemory(page);
    await expectNoWcagLevelAViolations(page);
  });

  test('AX06 — analiza la sección Present interactiva', async ({ page }) => {
    await reachPresent(page, 0.9);
    await expect(page.locator(selectors.present)).toHaveAttribute(
      'data-present-state',
      'interactive',
    );
    await expectNoWcagLevelAViolations(page);
  });

  test('AX07 — analiza el formulario y el pie de página', async ({ page }) => {
    await page.evaluate(() => {
      document.body.dataset.pageState = 'open';
      document.querySelector('#response').scrollIntoView();
    });

    await expect(page.locator('.response-form')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expectNoWcagLevelAViolations(page);
  });

  test('AX08 — conserva regiones y relaciones semánticas', async ({ page }) => {
    await expect(page.locator('body > header')).toHaveCount(1);
    await expect(page.locator('body > main')).toHaveCount(1);
    await expect(page.locator('body > footer')).toHaveCount(1);
    await expect(
      page.locator('body > aside[aria-label="Recursos de accesibilidad"]'),
    ).toHaveCount(1);

    const unlabelledSections = await page
      .locator('main > section')
      .evaluateAll((sections) =>
        sections.filter(
          (section) =>
            !section.querySelector('h1, h2, h3, h4, h5, h6') &&
            !section.hasAttribute('aria-label') &&
            !section.hasAttribute('aria-labelledby'),
        ).length,
      );

    expect(unlabelledSections).toBe(0);

    const formControls = page.locator('.response-form input, .response-form textarea');

    for (let index = 0; index < (await formControls.count()); index += 1) {
      const controlId = await formControls.nth(index).getAttribute('id');

      expect(controlId).toBeTruthy();
      await expect(
        page.locator(`.response-form label[for="${controlId}"]`),
      ).toHaveCount(1);
    }

    await expect(page.locator('#help-guide')).toHaveAttribute(
      'aria-labelledby',
      'help-guide-title',
    );
  });
});
