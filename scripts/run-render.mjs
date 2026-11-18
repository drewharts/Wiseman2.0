import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const script = resolve(dirname(fileURLToPath(import.meta.url)), "render-profile.ts");
const probe = spawnSync(process.execPath, ["--experimental-strip-types", "-e", ""], {
  encoding: "utf8",
});
const args = probe.status === 0 ? ["--experimental-strip-types", script] : [script];
const result = spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(result.status ?? 1);
