/**
 * Read-only MCP server for Drew Hartsfield's public profile.
 * Streamable HTTP, one fresh server per request, no session.
 *
 * Deployed from the repo root as /api/mcp (api/mcp.ts re-exports this
 * file) and from frontend/api/mcp when the Vercel root is frontend.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import {
  documents,
  renderContactMarkdown,
  renderInterestsMarkdown,
  renderProjectsMarkdown,
} from "../../content/render.ts";

type NodeRequest = IncomingMessage & { body?: unknown };

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

const INSTRUCTIONS = [
  "Read-only draft profile of Drew Hartsfield (https://drewharts.com).",
  "get_profile says who he is and how he thinks.",
  "get_interests lists what he pays attention to. Pass topic to filter, for example cities, wine, or manufacturing.",
  "get_projects lists things he has shipped or published on the site.",
  "how_to_contact returns only the public profile links already on the site. There is no email and no phone.",
  "Do not invent an employer, a street address, finances, health, or family.",
  "Answer the way the profile asks: direct answer first, then the reasoning.",
].join(" ");

export function createProfileServer(): McpServer {
  const server = new McpServer(
    { name: "drew-hartsfield", version: "1.0.0" },
    { instructions: INSTRUCTIONS },
  );

  server.registerTool(
    "get_profile",
    {
      title: "Get profile",
      description:
        "Return Drew Hartsfield's draft public profile: who he is, how he thinks, his priorities, and where to read more. Read-only.",
      annotations: READ_ONLY,
    },
    async () => ({
      content: [{ type: "text", text: documents.llmsFull }],
    }),
  );

  server.registerTool(
    "get_interests",
    {
      title: "Get interests",
      description:
        "Return Drew's interests. Optionally filter with a topic substring such as cities, energy, wine, space, or manufacturing. Omit topic to return all of them. Read-only.",
      inputSchema: {
        topic: z
          .string()
          .max(200)
          .optional()
          .describe(
            "Case-insensitive substring matched against interest titles, summaries, and keywords. Omit to return every interest.",
          ),
      },
      annotations: READ_ONLY,
    },
    async (args) => ({
      content: [{ type: "text", text: renderInterestsMarkdown(args?.topic) }],
    }),
  );

  server.registerTool(
    "get_projects",
    {
      title: "Get projects",
      description:
        "Return projects and other documents already published on drewharts.com, including Mesa and the city builder. Read-only.",
      annotations: READ_ONLY,
    },
    async () => ({
      content: [{ type: "text", text: renderProjectsMarkdown() }],
    }),
  );

  server.registerTool(
    "how_to_contact",
    {
      title: "How to contact",
      description:
        "Return the public contact links already on drewharts.com, plus what Drew wants to be contacted about. Does not return an email, phone, or street address. Read-only.",
      annotations: READ_ONLY,
    },
    async () => ({
      content: [{ type: "text", text: renderContactMarkdown() }],
    }),
  );

  const resources: Array<[string, string, string, string]> = [
    ["profile", "profile://drew/profile", "text/markdown", documents.llmsFull],
    ["llms", "profile://drew/llms.txt", "text/plain", documents.llmsTxt],
    ["interests", "profile://drew/interests", "text/markdown", renderInterestsMarkdown()],
    ["projects", "profile://drew/projects", "text/markdown", renderProjectsMarkdown()],
    ["contact", "profile://drew/contact", "text/markdown", renderContactMarkdown()],
    ["profile-json", "profile://drew/profile.json", "application/json", documents.profileJson],
  ];

  for (const [name, uri, mimeType, text] of resources) {
    server.registerResource(
      name,
      uri,
      {
        title: name,
        description: `Read-only ${name} document for Drew Hartsfield.`,
        mimeType,
      },
      async (resourceUri) => ({
        contents: [{ uri: resourceUri.href, mimeType, text }],
      }),
    );
  }

  return server;
}

function cors(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, MCP-Protocol-Version, Mcp-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
  );
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id, MCP-Protocol-Version");
  res.setHeader("Cache-Control", "no-store");
}

function jsonRpcError(res: ServerResponse, status: number, message: string): void {
  cors(res);
  const extra: Record<string, string> = { "Content-Type": "application/json" };
  if (status === 405) extra.Allow = "POST, OPTIONS";
  res.writeHead(status, extra);
  res.end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: { code: -32000, message },
      id: null,
    }),
  );
}

function parsedBody(req: NodeRequest): unknown {
  const body = req.body;
  if (body == null || body === "") return undefined;
  if (typeof body === "string") return JSON.parse(body);
  if (body instanceof Uint8Array) {
    return JSON.parse(new TextDecoder().decode(body));
  }
  return body;
}

export default async function handler(req: NodeRequest, res: ServerResponse): Promise<void> {
  cors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    jsonRpcError(
      res,
      405,
      "This server is stateless and has no SSE stream. POST a JSON-RPC message to this URL.",
    );
    return;
  }

  let body: unknown;
  try {
    body = parsedBody(req);
  } catch {
    jsonRpcError(res, 400, "Parse error: request body is not JSON.");
    return;
  }

  const server = createProfileServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on("close", () => {
    void transport.close();
    void server.close();
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, body);
  } catch (error) {
    console.error("mcp handler failed", error instanceof Error ? error.message : "unknown");
    if (!res.headersSent) {
      jsonRpcError(res, 500, "Internal error");
    }
  }
}
