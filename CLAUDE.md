# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wiseman2.0 is Drew Hartsfield's personal portfolio website with a React frontend (Vite) and Express backend for Spotify integration.

## Commands

### Frontend (from `/frontend`)
```bash
npm run dev          # Start Vite dev server (--host enabled)
npm run build        # TypeScript compile + Vite production build
npm run lint         # ESLint with zero warnings policy
npm run preview      # Preview production build
```

### Backend (from `/backend`)
```bash
npm start            # Run with ts-node (development)
npm run build        # Compile TypeScript to dist/
npm run serve        # Run compiled JS (production)
```

## Architecture

### Frontend (`/frontend`)
- **React 18 + TypeScript** with Vite bundler
- **Chakra UI** for components and styling
- **Framer Motion** for animations
- Key pages: `Homepage.tsx` (main landing), `Login.tsx` (Spotify auth)
- Components use modal popups for portfolio sections (AboutMe, UxUi, SkatePopUp)
- Mobile-responsive with conditional rendering for different breakpoints
- Static assets hosted on AWS S3 bucket (wiseman2.0images)

### Backend (`/backend`)
- **Express.js + TypeScript** server on port 3000
- Spotify OAuth 2.0 with PKCE flow in `src/api/authorization.ts`
- Caches top artists data with hourly refresh
- Endpoint: `GET /my-top-artists`
- Requires `.env` with `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_ACCESS_TOKEN`, `SPOTIFY_REFRESH_TOKEN`

### Type Sharing
Frontend tsconfig references backend types from `backend/src/models/` for shared interfaces (Artist, Album, Track, UserProfile).

### Grid App (City Builder)
- Source lives in a **separate repo**: `~/Desktop/repositories/power-grid-command-center/`
- **Cesium.js + Zustand + Vite + TypeScript** (vanilla, no React)
- Build output is committed to `frontend/public/grid/` (Vercel needs it in-repo)
- Served at `/grid` via Vercel rewrite in `frontend/vercel.json`

#### Updating the Grid App
```bash
# Option A: From the grid repo
cd ~/Desktop/repositories/power-grid-command-center
npm run deploy       # Builds + copies output to Wiseman2.0/frontend/public/grid/

# Option B: From the Wiseman2.0 frontend
cd frontend
npm run sync-grid    # Same thing, runs deploy in the grid repo
```
After syncing, commit the changes in Wiseman2.0 and push to trigger Vercel deployment.

## Deployment

- **Frontend**: Vercel
- **Backend**: AWS EC2 with PM2 process manager
