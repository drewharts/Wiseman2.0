/**
 * Turns content/profile.ts into the files agents and crawlers fetch.
 * Wording lives in profile.ts. This file only formats it.
 */
import { AI_CRAWLERS, profile, SITE, type Interest } from "./profile.ts";

const FORBIDDEN = [/palantir/i, /warp\s*speed/i, /forward[- ]deployed/i];
const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

export function assertPublicSafe(text: string): void {
  for (const pattern of FORBIDDEN) {
    if (pattern.test(text)) {
      throw new Error(`Profile text contains a forbidden phrase: ${pattern}`);
    }
  }
  const email = EMAIL.exec(text);
  if (email) {
    throw new Error(`Profile text contains an email address: ${email[0]}`);
  }
}

function linkItem(title: string, url: string, note?: string): string {
  return note ? `- [${title}](${url}): ${note}` : `- [${title}](${url})`;
}

function paragraphs(lines: readonly string[]): string {
  return lines.join("\n\n");
}

export function interestsMatching(topic?: string): Interest[] {
  const query = topic?.trim().toLowerCase();
  if (!query) return [...profile.interests];
  return profile.interests.filter((item) => {
    const haystack = [item.id, item.title, item.summary, ...item.topics]
      .join("\n")
      .toLowerCase();
    return haystack.includes(query);
  });
}

export function renderInterestsMarkdown(topic?: string): string {
  const query = topic?.trim();
  const matches = interestsMatching(query);
  const heading = query
    ? `# Interests matching “${query}”`
    : "# Interests";
  if (matches.length === 0) {
    const available = profile.interests.map((item) => item.title).join(", ");
    return [
      heading,
      "",
      `Nothing in the draft profile matched “${query}”.`,
      "",
      `Available interests: ${available}.`,
      "",
    ].join("\n");
  }
  const body = matches.map((item) => {
    const extra =
      "links" in item && item.links
        ? `\n\n${item.links.map((link) => linkItem(link.title, link.url, link.note)).join("\n")}`
        : "";
    return `## ${item.title}\n\n${item.summary}${extra}`;
  });
  return [heading, "", body.join("\n\n"), ""].join("\n");
}

export function renderProjectsMarkdown(): string {
  const projects = profile.projects
    .map((item) => `## [${item.name}](${item.url})\n\n${item.summary}`)
    .join("\n\n");
  const documents = profile.documents
    .map((item) => linkItem(item.name, item.url, item.summary))
    .join("\n");
  return [
    "# Projects",
    "",
    projects,
    "",
    "## Also linked from the site",
    "",
    documents,
    "",
  ].join("\n");
}

export function renderContactMarkdown(): string {
  const links = profile.contact
    .map((item) => linkItem(item.title, item.url, item.note))
    .join("\n");
  return [
    "# How to contact Drew Hartsfield",
    "",
    profile.draftNote,
    "",
    profile.communication,
    "",
    "There is no email address and no phone number in this profile. These are the public profiles already linked on the site. Nothing here promises he reads every message.",
    "",
    links,
    "",
    paragraphs(profile.forAgents),
    "",
  ].join("\n");
}

export function renderLlmsTxt(): string {
  const projectLinks = profile.projects.map((item) =>
    linkItem(item.name, item.url, item.blurb),
  );
  const documentLinks = profile.documents.map((item) =>
    linkItem(item.name, item.url, item.blurb),
  );
  const contactLinks = profile.contact.map((item) =>
    linkItem(item.title, item.url, item.note),
  );
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.blockquote}`,
    "",
    profile.draftNote,
    "",
    profile.who[0],
    "",
    profile.thinks[0],
    "",
    profile.priorities[0],
    "",
    `For agents. ${profile.forAgents[0]} ${profile.forAgents[2]}`,
    "",
    "## Profile",
    "",
    linkItem("Full profile", `${SITE}/llms-full.txt`, "Longer draft from the same source, with interests, projects, and how to talk to him."),
    linkItem("Profile JSON", `${SITE}/.well-known/profile.json`, "The same facts as machine-readable JSON."),
    linkItem("MCP server card", `${SITE}/.well-known/mcp.json`, `Read-only Model Context Protocol endpoint at ${profile.mcp.url}. Streamable HTTP, no login. Tools: ${profile.mcp.tools.join(", ")}.`),
    "",
    "## Projects",
    "",
    [...projectLinks, ...documentLinks].join("\n"),
    "",
    "## Contact",
    "",
    contactLinks.join("\n"),
    "",
    "## Optional",
    "",
    linkItem("Homepage", SITE, "The site."),
    linkItem("City builder", `${SITE}/grid`, "Site assessment and city-building tool."),
    linkItem("First principles essay", profile.projects[3].url, "Linked from the About page."),
    "",
  ].join("\n");
}

export function renderLlmsFull(): string {
  const interestBlocks = profile.interests.map((item) => {
    const extra =
      "links" in item && item.links
        ? `\n\n${item.links.map((link) => linkItem(link.title, link.url, link.note)).join("\n")}`
        : "";
    return `### ${item.title}\n\n${item.summary}${extra}`;
  });
  const projectBlocks = profile.projects.map(
    (item) => `### [${item.name}](${item.url})\n\n${item.summary}`,
  );
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.blockquote}`,
    "",
    profile.draftNote,
    "",
    "Edit the wording in `content/profile.ts`, then run `node scripts/run-render.mjs` from the repository root.",
    "",
    "## Who he is",
    "",
    paragraphs(profile.who),
    "",
    `The location above is a neighborhood, not a street address.`,
    "",
    "## How he thinks",
    "",
    paragraphs(profile.thinks),
    "",
    "## Priorities",
    "",
    paragraphs(profile.priorities),
    "",
    "## Interests",
    "",
    interestBlocks.join("\n\n"),
    "",
    "## Projects",
    "",
    projectBlocks.join("\n\n"),
    "",
    "## Also published on the site",
    "",
    profile.documents.map((item) => linkItem(item.name, item.url, item.summary)).join("\n"),
    "",
    "## Contact",
    "",
    "Public profiles already linked from the homepage or the About page. No email. No phone.",
    "",
    profile.contact.map((item) => linkItem(item.title, item.url, item.note)).join("\n"),
    "",
    "## For agents",
    "",
    paragraphs(profile.forAgents),
    "",
    `Machine-readable copy: ${SITE}/.well-known/profile.json`,
    "",
    `Read-only MCP server (Streamable HTTP, stateless): ${profile.mcp.url}`,
    "",
    `Discovery card: ${profile.mcp.discovery}`,
    "",
    "Clients should POST JSON-RPC with `Content-Type: application/json` and `Accept: application/json, text/event-stream`. No session id. The server answers with a single JSON body.",
    "",
    `Tools: ${profile.mcp.tools.join(", ")}. The same text is also exposed as MCP resources.`,
    "",
    "## Where this came from",
    "",
    "The school, Spanish, skating, the Isaacson and Sapiens lines, the first-principles essay, Mesa, the city builder, GitHub, Medium, the resume PDF, and the social profiles are already on drewharts.com.",
    "",
    "The interest list beyond the About page was supplied for this draft. Drew has not edited it. The About page also names an employer. That name is omitted here on purpose.",
    "",
  ].join("\n");
}

export function renderProfileJson(): Record<string, unknown> {
  return {
    draft: profile.draft,
    draftNote: profile.draftNote,
    updated: profile.updated,
    name: profile.name,
    url: profile.site,
    jobTitle: profile.jobTitle,
    description: profile.metaDescription,
    image: profile.image,
    location: profile.location,
    education: profile.education,
    knowsLanguage: profile.languages,
    communication: profile.communication,
    who: profile.who,
    thinks: profile.thinks,
    priorities: profile.priorities,
    forAgents: profile.forAgents,
    knowsAbout: profile.knowsAbout,
    interests: profile.interests,
    projects: profile.projects,
    documents: profile.documents,
    contact: profile.contact,
    sameAs: profile.contact.map((item) => item.url),
    mcp: profile.mcp,
    source: "content/profile.ts",
  };
}

export function renderJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/#drew`,
    name: profile.name,
    url: profile.site,
    jobTitle: profile.jobTitle,
    description: `Draft. ${profile.metaDescription}`,
    image: profile.image,
    homeLocation: {
      "@type": "Place",
      name: profile.location.label,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location.locality,
        addressRegion: profile.location.region,
        addressCountry: profile.location.country,
      },
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
    knowsLanguage: profile.languages,
    sameAs: profile.contact.map((item) => item.url),
    knowsAbout: profile.knowsAbout,
    subjectOf: profile.projects.slice(0, 2).map((item) => ({
      "@type": item.name === "Mesa" ? "SoftwareApplication" : "WebApplication",
      name: item.name,
      url: item.url,
      description: item.summary,
      ...(item.name === "Mesa" ? { operatingSystem: "iOS" } : {}),
    })),
  };
}

export function renderMcpJson(): Record<string, unknown> {
  return {
    name: "drew-hartsfield",
    description:
      "Read-only public profile of Drew Hartsfield: who he is, what he is interested in, what he has built, and which public links are already on drewharts.com. Draft wording. No login.",
    version: "1.0.0",
    remotes: [
      {
        type: "streamable-http",
        url: profile.mcp.url,
      },
    ],
    transport: {
      type: "streamable-http",
      url: profile.mcp.url,
    },
    authentication: { required: false },
    tools: profile.mcp.tools,
    instructions:
      "POST JSON-RPC to the remote URL. Send Content-Type: application/json and Accept: application/json, text/event-stream. The server is stateless: no Mcp-Session-Id. Responses are a single JSON body. Tools are read-only.",
  };
}

export function renderRobots(): string {
  const groups = [
    "User-agent: *",
    "Allow: /",
    "",
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", ""]),
    `Sitemap: ${SITE}/sitemap.xml`,
    "",
  ];
  return [
    "# Drew Hartsfield — https://drewharts.com",
    "# AI crawlers are welcome. A profile for agents is at /llms.txt",
    "# Generated from content/profile.ts",
    "",
    ...groups,
  ].join("\n");
}

export function renderSitemap(): string {
  const urls = [
    `${SITE}/`,
    `${SITE}/grid`,
    `${SITE}/llms.txt`,
    `${SITE}/llms-full.txt`,
    `${SITE}/.well-known/profile.json`,
    `${SITE}/.well-known/mcp.json`,
  ];
  const body = urls
    .map(
      (loc) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${profile.updated}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function json(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export const documents = {
  llmsTxt: renderLlmsTxt(),
  llmsFull: renderLlmsFull(),
  profileJson: json(renderProfileJson()),
  jsonLd: renderJsonLd(),
  jsonLdText: json(renderJsonLd()),
  mcpJson: json(renderMcpJson()),
  robots: renderRobots(),
  sitemap: renderSitemap(),
};

assertPublicSafe(
  [
    documents.llmsTxt,
    documents.llmsFull,
    documents.profileJson,
    documents.jsonLdText,
    documents.mcpJson,
    documents.robots,
    documents.sitemap,
    renderInterestsMarkdown(),
    renderProjectsMarkdown(),
    renderContactMarkdown(),
  ].join("\n"),
);
