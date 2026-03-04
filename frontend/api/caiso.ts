import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_PATHS = [
  '/outlook/current/fuelsource.csv',
  '/outlook/current/demand.csv',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.query.path as string | undefined;
  if (!path || !ALLOWED_PATHS.includes(path)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  try {
    const upstream = await fetch(`https://www.caiso.com${path}`);
    if (!upstream.ok) {
      return res.status(upstream.status).send(await upstream.text());
    }

    const body = await upstream.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'text/csv');
    return res.status(200).send(body);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream fetch failed' });
  }
}
