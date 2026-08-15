import { exec } from "node:child_process";
import { promisify } from "node:util";
import { expect, test } from "@playwright/test";

const execAsync = promisify(exec);

test.describe("Recursos, enlaces y compilación", () => {
  test("G01 — los recursos locales de portada responden", async ({ request }) => {
    const resources = [
      "/src/assets/images/01-cover/img__envelop.webp",
      "/src/assets/images/01-cover/img__wax_seal.webp",
      "/src/assets/images/01-cover/img__wax_seal_broken.webp",
      "/src/assets/images/global/img__texture_background.webp",
    ];

    for (const resource of resources) {
      const response = await request.get(resource);
      expect(response.ok(), resource).toBe(true);
    }
  });

  test("G02 — carga Font Awesome y la fuente de marcas", async ({ request }) => {
    const fontAwesomeUrl =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/fontawesome.min.css";
    const brandsUrl =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/brands.min.css";
    const fontAwesomeResponse = await request.get(fontAwesomeUrl);
    const brandsResponse = await request.get(brandsUrl);

    expect(fontAwesomeResponse.ok()).toBe(true);
    expect(brandsResponse.ok()).toBe(true);

    const brandsCss = await brandsResponse.text();
    const fontPath = brandsCss.match(/url\(([^)]+\.woff2)\)/)?.[1];
    expect(fontPath).toBeTruthy();

    const fontUrl = new URL(fontPath.replace(/["']/g, ""), brandsUrl).href;
    expect((await request.get(fontUrl)).ok()).toBe(true);
  });

  test("G03 — LinkedIn utiliza la URL documentada", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByLabel("LinkedIn")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/feed/",
    );
  });

  test("G04 — Instagram está deshabilitado y no tiene enlace", async ({ page }) => {
    await page.goto("/");
    const instagram = page.getByLabel("Instagram, enlace pendiente");

    await expect(instagram).toHaveAttribute("aria-disabled", "true");
    await expect(instagram).not.toHaveAttribute("href", /.+/);
  });

  test("G05 — Vite genera la compilación sin errores", async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-lg", "Una ejecución es suficiente");

    const { stdout } = await execAsync("pnpm build", {
      cwd: process.cwd(),
      timeout: 30_000,
    });

    expect(stdout).toContain("built in");
  });

  test("T01 — los recursos locales de Memoria responden", async ({ request }) => {
    const resources = [
      "/src/assets/images/03-memory/img__board_1.webp",
      "/src/assets/images/03-memory/img__board_2.webp",
      "/src/assets/images/03-memory/img__postal_front.webp",
      "/src/assets/images/03-memory/img__postal_back_02.webp",
    ];

    for (const resource of resources) {
      const response = await request.get(resource);
      expect(response.ok(), resource).toBe(true);
    }
  });
});
