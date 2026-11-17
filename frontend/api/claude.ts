/**
 * Vercel serverless proxy for Claude API.
 * The Anthropic API key is stored as a Vercel environment variable (ANTHROPIC_API_KEY)
 * and never exposed to the browser.
 */

type ApiRequest = {
  method?: string;
  body?: {
    messages?: unknown;
    max_tokens?: number;
    model?: string;
  };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const body = req.body;

    if (!body?.messages || !Array.isArray(body.messages)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const maxTokens = Math.min(body.max_tokens ?? 500, 1000);

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: body.model ?? 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        messages: body.messages,
      }),
    });

    const data = await upstream.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(upstream.status).json(data);
  } catch {
    return res.status(502).json({ error: 'Claude API proxy failed' });
  }
}
