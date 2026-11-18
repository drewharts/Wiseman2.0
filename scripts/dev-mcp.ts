/**
 * Local Streamable HTTP server for the profile MCP.
 *   node --experimental-strip-types scripts/dev-mcp.ts
 * Then POST JSON-RPC to http://127.0.0.1:8787/api/mcp
 */
import { createServer } from "node:http";
import handler from "../frontend/api/mcp.ts";

const port = Number(process.env.PORT ?? 8787);
const server = createServer((req, res) => {
  void handler(req, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`MCP listening on http://127.0.0.1:${port}/api/mcp`);
});
