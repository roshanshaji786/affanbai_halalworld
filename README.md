# Halal World — Premium Umrah & Halal Travel 🕋

> *Travel Through the Earth* — a premium travel website for **Halal World**,
> Trivandrum (Thiruvananthapuram), Kerala, India.

Built as a client-grade production site: **Next.js 15 (App Router) · React 19 ·
TypeScript · Tailwind CSS v4**, server-rendered per request (so live-editor
changes publish instantly) with SEO intact.

## Brand

The identity is extracted from the studio poster in `brand/poster-original.jpeg`:

- **Palette** — deep cocoa `#5b2b1d`, cocoa-deep `#3c1b10`, gold `#b98a44`,
  gold-soft `#d9b878`, sand/ivory/silver neutrals (defined in `src/app/globals.css`).
- **Motif** — Islamic eight-point star lattice (`bg-starlattice` / `bg-starlattice-dark`).
- **Type** — Marcellus (display serif), Inter (body), Amiri (Arabic accents);
  self-hosted via `@fontsource` (zero third-party requests).
- **Assets** — authentic photos cropped from the poster in `public/images/`
  (Makkah clock tower, Madinah Mövenpick, transparent minaret), plus `public/og.jpg`.

## Free cloud deploy — Render (one click)

1. Sign in at render.com with GitHub (free account).
2. **New → Blueprint**, connect this repo, choose branch
   `arena/01a0a44e-affanbai-halalworld` (or `main` after merging).
3. Render reads `render.yaml` → **Apply** → builds & deploys automatically.
4. Site: `https://halal-world.onrender.com` (free SSL). Admin password:
   service → *Environment* → `ADMIN_PASSWORD`.
   Free tier sleeps after ~15 min idle (first visit takes ~30 s to wake).

Leads stored on Render's ephemeral disk reset on redeploy — the WhatsApp
hand-off is the primary lead channel, so nothing is ever lost.

## One-command deploy (own server / no prompts)

```bash
git clone https://github.com/roshanshaji786/affanbai_halalworld.git
cd affanbai_halalworld
./deploy.sh              # installs, builds, starts prod server, health-checks
PORT=8080 ./deploy.sh    # custom port
./deploy.sh stop         # stop
```

Requires only Node 18+. Generates `.env` with a random admin password on
first run (printed once, stored in `.env`). Serves on `0.0.0.0` so it works
behind any reverse proxy / VPS / Vercel-container setup.

## Run (manual)

```bash
npm install
npm run dev        # development
npm run build      # production build + typecheck
npm run start      # serve production build
ADMIN_PASSWORD=x npm run start  # set an admin password (admin UI fails closed without one)
npm test           # unit tests (Vitest, 26 tests)
npm run test:e2e   # smoke suite vs live server (67 checks: routes, headers,
                   # locales, JSON-LD, auth gates, live editor, validation…)
```

## Pages

`/` home · `/packages` · `/packages/[slug]` (SSG) · `/destinations` ·
`/about` · `/contact` (enquiry → WhatsApp hand-off) · custom 404.

## Live Editor (Elementor-style) 🎨

Open **`/admin/editor`** (same Basic-auth login as `/admin`) to edit the
published site visually — no code, no rebuild, no redeploy:

- **Click any element** in the canvas (dashed gold outline) — hero headline,
  Arabic tagline, subtitles, buttons, stats, section headings, package card
  titles/kickers/departures, journey steps, why-us cards, testimonials, FAQs,
  CTA and footer texts.
- **Text** — type in the sidebar, Save. English and Malayalam are edited
  separately (language switch in the top bar).
- **Images** — upload (JPG/PNG/WebP/AVIF/SVG ≤ 5 MB) or paste an https URL
  for the hero image and every package card.
- **Backgrounds** — colour picker and/or background image (cover) for hero,
  stats band, journey, testimonials, CTA and footer sections.
- **Save publishes instantly** — visitors see the change on the next page
  load; **Reset** restores the coded default. Desktop/mobile preview toggle.

How it works: editable elements carry `data-ed` keys; edits are stored in
`data/content.json` (`/api/editor`, Basic-auth protected) and merged over the
coded defaults at render time (`src/lib/overrides.ts`). Uploaded images live in
`data/uploads/` and are served from `/api/editor/files/<name>` (public).
Pages are rendered per-request (`force-dynamic`) so overrides apply fresh.
Set `DATA_DIR` to relocate the store (e.g. a mounted disk).

> ⚠️ On Render's **free tier the disk is ephemeral** — edits (like leads)
> reset on redeploy. Attach a Render Disk, mount it and set
> `DATA_DIR=/opt/render/home/data` to make edits permanent.

## Editing business facts

Everything editable lives in **`src/lib/content.ts`** — phone, WhatsApp,
address, packages, prices (INR), testimonials, FAQs. Change it there; no
component edits needed. The Live Editor overrides these values at runtime
without touching the file. Set `NEXT_PUBLIC_SITE_URL` at deploy to fix the
canonical domain (default `https://www.halalworld.in`).

## SEO shipped

- Static prerender of every route; semantic HTML; single h1 per page.
- `Metadata` per page + template titles; Open Graph + Twitter cards with `og.jpg`.
- JSON-LD: `TravelAgency` (NAP + geo), `Product/Offer` (INR prices),
  `FAQPage`, `BreadcrumbList`.
- `public/robots.txt` + `public/sitemap.xml`.
- India-targeted keyword set (Umrah packages Kerala / from Kochi etc.).

## Security shipped (see `SECURITY.md`)

CSP, HSTS (preload-ready), nosniff, `X-Frame-Options: DENY` + CSP
`frame-ancestors 'none'` (relaxed to SAMEORIGIN/'self' only for the
admin live-editor's same-origin `?__edit=1` canvas), Referrer-Policy,
Permissions-Policy, COOP/CORP, `X-Powered-By` disabled, self-hosted fonts,
`rel="noopener"` on external links, client-side input validation on the
enquiry form, immutable caching for hashed assets, editor writes gated by
Basic auth, upload type/size limits, path-traversal-proof file serving.

## Milestone 4 (shipped): Elementor-style live editor

- `/admin/editor` — visual canvas (real site in a same-origin iframe with
  `?__edit=1`) + contextual sidebar: click-to-edit text (EN/ML), image
  upload/URL swap, section background colour/image. Desktop & mobile preview.
- `data/content.json` override store merged at render time; instant publish,
  per-key reset. `POST /api/editor` (auth) · `POST /api/editor/upload` (auth) ·
  `GET /api/editor/files/<name>` (public, immutable-cached).
- Covered by 7 unit tests + 15 smoke checks (auth gates, live apply,
  locale isolation, traversal protection).

## Milestone 2 (shipped): lead capture + admin

- `POST /api/leads` — validated (Indian mobile regex), rate-limited
  (5 req/min/IP), stores to `data/leads.json` (gitignored).
- `/admin` — leads dashboard (IST timestamps, tel: links), gated by
  HTTP Basic auth in `src/middleware.ts`. Set `ADMIN_USER` /
  `ADMIN_PASSWORD` in the environment; **fails closed (503) if unset**.
- Contact form saves the lead first, then hands off to WhatsApp.

## Roadmap (milestone 3)

Razorpay checkout (UPI / cards — needs merchant keys), email notifications,
blog for long-tail SEO, Malayalam locale.
