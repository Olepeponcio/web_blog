import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const stylesDirectory = fileURLToPath(
  new URL("../src/styles/", import.meta.url),
);

const collectCssFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = `${directory}/${entry.name}`;

      if (entry.isDirectory()) return collectCssFiles(path);
      return entry.name.endsWith(".css") ? [path] : [];
    }),
  );

  return files.flat();
};

test.describe("Convención tipográfica", () => {
  test("U01 — font-size no utiliza píxeles", async () => {
    const files = await collectCssFiles(stylesDirectory);

    for (const file of files) {
      const css = await readFile(file, "utf8");
      expect(css, file).not.toMatch(/font-size\s*:[^;]*\b\d*\.?\d+px\b/i);
    }
  });

  test("U02 — el texto responde al tamaño raíz del usuario", async ({ page }) => {
    await page.goto("/");

    const selectors = [
      ".cover__sender",
      ".cover__letter",
      "[data-origin-heading]",
      ".origin__text p",
      ".memory__note",
      "#present h2",
      ".response-form__field span",
      ".site-footer__social-link .fa-brands",
    ];

    const readFontSizes = () =>
      page.evaluate((targets) =>
        targets.map((selector) =>
          Number.parseFloat(
            getComputedStyle(document.querySelector(selector)).fontSize,
          ),
        ),
      selectors);

    const initialSizes = await readFontSizes();

    await page.evaluate(() => {
      document.body.dataset.pageState = "open";
      document.documentElement.style.fontSize = "200%";
    });

    const enlargedSizes = await readFontSizes();

    enlargedSizes.forEach((size, index) => {
      expect(size, selectors[index]).toBeGreaterThan(initialSizes[index]);
    });

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
