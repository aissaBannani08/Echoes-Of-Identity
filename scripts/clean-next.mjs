import { rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", ".next");
try {
  rmSync(root, { recursive: true, force: true });
  console.log("[clean-next] Removed .next");
} catch (e) {
  if (/** @type {NodeJS.ErrnoException} */ (e).code !== "ENOENT") throw e;
}
