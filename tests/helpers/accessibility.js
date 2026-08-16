import AxeBuilder from '@axe-core/playwright';

const WCAG_LEVEL_A_TAGS = ['wcag2a', 'wcag21a', 'wcag22a'];

export const analyzeWcagLevelA = (page) =>
  new AxeBuilder({ page }).withTags(WCAG_LEVEL_A_TAGS).analyze();
