// news-image-20261123
// Writes the pre-rendered front page for Monday 23 November 2026
// (COP31 collapse, Nvidia/Huang, Ukraine warship, Kyiv strikes,
// Delta outage) to the output directory, byte for byte.
//
// Node 22, standard library only. No network, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const bytes = readFileSync(source);

// PNG signature: 89 50 4E 47 0D 0A 1A 0A
if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) {
  throw new Error("entry.png is not a PNG file");
}
if (bytes.length > 1024 * 1024) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, bytes);
console.log(`wrote ${bytes.length} bytes to ${outPath}`);
