import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel serverless proxy for Claude API.
 * The Anthropic API key is stored as a Vercel environment variable (ANTHROPIC_API_KEY)
 * and never exposed to the browser.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
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

    // Validate: only allow messages endpoint with reasonable limits
    if (!body?.messages || !Array.isArray(body.messages)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Cap max_tokens to prevent abuse
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
  } catch (err) {
    return res.status(502).json({ error: 'Claude API proxy failed' });
  }
}
