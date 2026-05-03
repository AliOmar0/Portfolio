# Ali Omar — Portfolio

A single-page portfolio website for **Ali Omar**, a full-stack and AI software developer based in Ramallah, Palestine. Built with React, TypeScript, and a small Express API for the contact form.

Live: https://aliomar.dev *(or your custom domain)*

---

## What's inside

This repository is a **pnpm monorepo** with two deployable artifacts:

| Path | Purpose |
| --- | --- |
| `artifacts/portfolio` | The portfolio site itself — a Vite + React 19 SPA. |
| `artifacts/api-server` | A small Express 5 API mounted at `/api`, currently powering the contact form. |
| `artifacts/mockup-sandbox` | A design playground used during development. |
| `lib/api-client-react`, `lib/api-zod` | Auto-generated API client + Zod schemas (Orval). |

## Highlights

- **Liquid-glass aesthetic** with custom glass panels, animated borders, and a moving conic-gradient aurora behind the hero.
- **Cursor-following spotlight** on every interactive card.
- **3D mouse-tilt** on project cards.
- **Per-project case-study pages** at `/projects/:slug`.
- **Command palette** (`⌘K` / `Ctrl+K` / `/`) for jumping to pages, projects, theme, locale, copy email, download CV.
- **Theme switcher** with Light / Dark / **System** modes and an animated 3-state toggle.
- **English / Arabic locales** with full RTL flipping (navbar, timeline, icons).
- **Per-route page transitions** (blur, scale, slide-up, slide-side).
- **Real contact backend** with validation, honeypot, per-IP rate limiting, JSONL persistence, and optional Resend email delivery.
- **Performance** — hero and project art served as AVIF / WebP / PNG via a `<Picture>` component; hero AVIF preloaded; pre-paint script avoids theme/locale flash.

## Tech stack

- **Frontend:** React 19, Vite, TypeScript 5.9, Tailwind CSS, framer-motion, wouter, cmdk, lucide-react, shadcn/ui primitives.
- **Backend:** Node.js 24, Express 5, Pino logger, native `fetch`. Optional [Resend](https://resend.com/) for email.
- **Tooling:** pnpm workspaces, Orval (OpenAPI → React Query hooks), Drizzle ORM (available, not currently used by the portfolio).

## Getting started

Requires **Node.js 24** and **pnpm**.

```bash
pnpm install
pnpm run dev          # runs every artifact's dev script
```

Or run an individual artifact:

```bash
pnpm --filter @workspace/portfolio run dev      # http://localhost:5173
pnpm --filter @workspace/api-server run dev     # http://localhost:8080
```

### Useful commands

```bash
pnpm run typecheck                              # typecheck the whole workspace
pnpm run build                                  # typecheck + build everything
pnpm --filter @workspace/portfolio run build    # build just the portfolio
```

## Contact form

The contact form posts to `POST /api/contact`. The endpoint:

- validates name, email, and message,
- silently drops bots that fill the hidden honeypot field,
- rate-limits to 4 requests / minute / IP,
- appends every message to `${CONTACT_STORE_PATH:-/tmp/portfolio-contact-messages.jsonl}`,
- and (if `RESEND_API_KEY` is set) delivers the message to `CONTACT_TARGET_EMAIL` via Resend.

Without `RESEND_API_KEY` the endpoint still returns success and the message is stored on disk, so nothing is lost.

### Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | *(unset)* | Enables real email delivery. |
| `CONTACT_TARGET_EMAIL` | `alidawood098@gmail.com` | Where contact messages are sent. |
| `CONTACT_FROM_EMAIL` | `Portfolio <onboarding@resend.dev>` | The `From:` header for outbound emails. |
| `CONTACT_STORE_PATH` | `/tmp/portfolio-contact-messages.jsonl` | Where messages are appended on disk. |

## Project structure

```
artifacts/
  portfolio/
    public/                       # static assets (PNG + WebP + AVIF triplets)
    src/
      components/
        layout/                   # navbar, command palette, theme + locale toggles
        sections/                 # hero, about, skills, experience, projects,
                                  # education, testimonials, contact, highlights
        ui/                       # picture, spotlight, glass-card, shadcn primitives
      data/projects.ts            # case-study content for /projects/:slug
      hooks/                      # use-theme, use-i18n
      lib/                        # api client, i18n strings, utils
      pages/                      # project-detail, not-found
      App.tsx                     # routing + transitions + providers
      index.css                   # design tokens + glass utilities
  api-server/
    src/
      routes/contact.ts           # POST /api/contact
      routes/health.ts            # GET /api/healthz
```

## Deployment

The site can be deployed as a static SPA (the portfolio) plus a small Node service (the API). Any platform that supports those two pieces will work. Replit Deployments is the easiest path since the project already ships with `artifact.toml` build/serve definitions.

## License

MIT — see [`LICENSE`](LICENSE) if present, otherwise the MIT license text applies. Personal content (résumé, photographs, project case studies) is © Ali Omar and may not be reused without permission.

## Contact

- Email: alidawood098@gmail.com
- LinkedIn: https://www.linkedin.com/in/ali-omar0/
- GitHub: https://github.com/AliOmar0
