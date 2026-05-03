# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/portfolio` — Single-page React + Vite portfolio for Ali Omar (slug `portfolio`, previewPath `/`).
  - Routing: wouter with per-route page transitions (blur, slide-up, scale, slide-side).
  - State: `ThemeProvider` (light/dark/system) and `I18nProvider` (EN/AR with RTL) in `src/hooks/`.
  - Pre-paint script in `index.html` applies theme + dir before first frame to avoid FOUC.
  - Hero background uses an AVIF/WebP/PNG `<picture>` with high `fetchPriority` and is preloaded in `index.html`.
  - All raster art lives in `/public` as `<name>.{png,webp,avif}` and is served via `src/components/ui/picture.tsx`.
  - Sections live in `src/components/sections/`. Per-project case studies live in `src/data/projects.ts` and render at `/projects/:slug`.
  - Cursor spotlight wrapper: `src/components/ui/spotlight.tsx`. 3D tilt is inline in `projects.tsx` and `project-detail.tsx`.
  - Command palette (`⌘K` / `/`): `src/components/layout/command-palette.tsx`, mounted once in `App.tsx`.
  - Contact form posts to the API server via `src/lib/api.ts` → `POST /api/contact`. Honeypot field included.
- `artifacts/api-server` — Express 5 API behind `/api`.
  - `routes/contact.ts`: validation + honeypot + per-IP in-memory rate limit (4/min) + JSONL persistence at `CONTACT_STORE_PATH` (default `/tmp/portfolio-contact-messages.jsonl`).
  - Optional Resend delivery: set `RESEND_API_KEY` (and optionally `CONTACT_TARGET_EMAIL`, `CONTACT_FROM_EMAIL`). Without it, the endpoint still returns 200 with `delivered: false` and stores the message.
- `artifacts/mockup-sandbox` — design-system playground.

## Conventions

- Image assets: always provide AVIF + WebP + PNG and serve through `<Picture name="...">`.
- All UI strings go through `useI18n().t(key)` with keys defined in `src/lib/i18n-strings.ts`.
- Use the `Spotlight` wrapper around `GlassCard` for hoverable surfaces.
