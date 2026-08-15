import { readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";
import { chromium } from "@playwright/test";

const sources = process.argv.slice(2);

if (sources.length === 0) {
  throw new Error("Indica al menos una imagen PNG.");
}

const browser = await chromium.launch();
const page = await browser.newPage();

for (const source of sources) {
  if (extname(source).toLowerCase() !== ".png") continue;

  const input = await readFile(source);
  const output = await page.evaluate(async (base64) => {
    const image = new Image();
    image.src = `data:image/png;base64,${base64}`;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d").drawImage(image, 0, 0);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.9),
    );

    return new Uint8Array(await blob.arrayBuffer());
  }, input.toString("base64"));

  await writeFile(source.replace(/\.png$/i, ".webp"), output);
}

await browser.close();
