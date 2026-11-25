import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const CAISO_PATHS = new Set([
  '/outlook/current/fuelsource.csv',
  '/outlook/current/demand.csv',
])

// Vite does not apply vercel.json. Without this, /grid falls through to the
// React app and /api/caiso is compiled as a source file (the query string
// makes esbuild pick a csv loader and 500).
function cityBuilderDev(): Plugin {
  return {
    name: 'city-builder-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const raw = req.url ?? ''
        const path = raw.split('?')[0]

        if (path === '/grid' || path === '/grid/') {
          req.url = '/grid/index.html'
          next()
          return
        }

        if (path !== '/api/caiso') {
          next()
          return
        }

        const query = new URL(raw, 'http://localhost').searchParams.get('path')
        if (!query || !CAISO_PATHS.has(query)) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid path' }))
          return
        }

        try {
          const upstream = await fetch(`https://www.caiso.com${query}`)
          const body = await upstream.text()
          res.statusCode = upstream.ok ? 200 : upstream.status
          res.setHeader('Content-Type', upstream.ok ? 'text/csv' : 'text/plain')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(body)
        } catch {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Upstream fetch failed' }))
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [cityBuilderDev(), react()],
})
