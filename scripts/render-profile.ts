/**
 * Writes the public agent files from content/profile.ts.
 * Run from the repo root: node scripts/run-render.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { profile } from "../content/profile.ts";
import { documents } from "../content/render.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "frontend/public");
const wellKnown = resolve(publicDir, ".well-known");
const indexPath = resolve(root, "frontend/index.html");

const START = "<!-- profile-head:start -->";
const END = "<!-- profile-head:end -->";

function escapeAttr(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

mkdirSync(wellKnown, { recursive: true });

const files: Array<[string, string]> = [
  [resolve(publicDir, "llms.txt"), documents.llmsTxt],
  [resolve(publicDir, "llms-full.txt"), documents.llmsFull],
  [resolve(publicDir, "robots.txt"), documents.robots],
  [resolve(publicDir, "sitemap.xml"), documents.sitemap],
  [resolve(wellKnown, "profile.json"), documents.profileJson],
  [resolve(wellKnown, "mcp.json"), documents.mcpJson],
];

for (const [path, contents] of files) {
  writeFileSync(path, contents);
}

const index = readFileSync(indexPath, "utf8");
const start = index.indexOf(START);
const end = index.indexOf(END);
if (start === -1 || end === -1 || end < start) {
  throw new Error(`frontend/index.html is missing ${START} ... ${END}`);
}

const head = [
  START,
  "    <title>Drew Hartsfield</title>",
  `    <meta name="description" content="${escapeAttr(profile.metaDescription)}" />`,
  '    <link rel="describedby" href="/llms.txt" />',
  '    <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Profile for agents" />',
  '    <script type="application/ld+json">',
  documents.jsonLdText.trim().replaceAll("<", "\\u003c"),
  "    </script>",
  `    ${END}`,
].join("\n");

const next = index.slice(0, start) + head + index.slice(end + END.length);
writeFileSync(indexPath, next);

for (const [path] of files) {
  console.log(path);
}
console.log(indexPath);
