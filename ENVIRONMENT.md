# Local development and environment configuration

## Start the website and API together

From the repository root, run:

```powershell
pnpm dev
```

This starts the Vite frontend and the Express API server in parallel. Vite serves the frontend on port 5173 by default and proxies same-origin `/api/*` requests to `http://localhost:3000`. If port 5173 is occupied, Vite may use another port; API requests still work because the frontend uses relative `/api` URLs.

For either service separately:

```powershell
pnpm dev:web
pnpm dev:api
```

## Local environment files

Keep real environment files out of Git. Use the package-specific templates as references:

- `artifacts/route2migrate/.env`: browser-safe `VITE_*` values only. Values prefixed with `VITE_` are embedded into browser code and must never contain secrets.
- `artifacts/api-server/.env`: server-only `DATABASE_URL`, `RESEND_API_KEY`, and `NOTIFICATION_EMAIL`. Optional email-link settings are `SITE_URL` and `LOGO_URL`.

Do not put database credentials or email API keys in frontend environment files. The frontend sends requests to relative `/api/*` paths; do not configure `VITE_API_URL` to a localhost address for production.

## Vercel

The Vercel project root is `artifacts/route2migrate`. Its `api/` directory contains the production serverless handlers. Set `DATABASE_URL`, `RESEND_API_KEY`, and `NOTIFICATION_EMAIL` in Vercel's server-side environment variables. Set `VITE_CLERK_PUBLISHABLE_KEY` as a frontend build variable if Clerk is used.

The Express API under `artifacts/api-server` is for local development and standalone hosting; Vercel production requests use the serverless handlers. Keep their validation, duplicate handling, and notification behavior aligned when changing either implementation.

## Safety

Never commit real `.env` or `.env.local` files. The `.env.example` files contain placeholders only. Do not remove existing local environment files until their required values have been transferred and tested in the correct package.
