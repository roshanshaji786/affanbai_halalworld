# Halal World — Premium Umrah & Halal Travel 🕋

> *Travel Through the Earth* — a premium travel website for **Halal World**,
> Trivandrum (Thiruvananthapuram), Kerala, India.

Built as a client-grade production site: **Next.js 15 (App Router) · React 19 ·
TypeScript · Tailwind CSS v4**, fully static-rendered for speed and SEO.

## Brand

The identity is extracted from the studio poster in `brand/poster-original.jpeg`:

- **Palette** — deep cocoa `#5b2b1d`, cocoa-deep `#3c1b10`, gold `#b98a44`,
  gold-soft `#d9b878`, sand/ivory/silver neutrals (defined in `src/app/globals.css`).
- **Motif** — Islamic eight-point star lattice (`bg-starlattice` / `bg-starlattice-dark`).
- **Type** — Marcellus (display serif), Inter (body), Amiri (Arabic accents);
  self-hosted via `@fontsource` (zero third-party requests).
- **Assets** — authentic photos cropped from the poster in `public/images/`
  (Makkah clock tower, Madinah Mövenpick, transparent minaret), plus `public/og.jpg`.

## One-command deploy (no prompts)

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
npm test           # unit tests (Vitest, 19 tests)
npm run test:e2e   # smoke suite vs live server (52 checks: routes, headers,
                   # locales, JSON-LD, auth gates, validation, rate limiting)
```

## Pages

`/` home · `/packages` · `/packages/[slug]` (SSG) · `/destinations` ·
`/about` · `/contact` (enquiry → WhatsApp hand-off) · custom 404.

## Editing business facts

Everything editable lives in **`src/lib/content.ts`** — phone, WhatsApp,
address, packages, prices (INR), testimonials, FAQs. Change it there; no
component edits needed. Set `NEXT_PUBLIC_SITE_URL` at deploy to fix the
canonical domain (default `https://www.halalworld.in`).

## SEO shipped

- Static prerender of every route; semantic HTML; single h1 per page.
- `Metadata` per page + template titles; Open Graph + Twitter cards with `og.jpg`.
- JSON-LD: `TravelAgency` (NAP + geo), `Product/Offer` (INR prices),
  `FAQPage`, `BreadcrumbList`.
- `public/robots.txt` + `public/sitemap.xml`.
- India-targeted keyword set (Umrah packages Kerala / from Kochi etc.).

## Security shipped (see `SECURITY.md`)

CSP, HSTS (preload-ready), nosniff, `X-Frame-Options: DENY`, Referrer-Policy,
Permissions-Policy, COOP/CORP, `X-Powered-By` disabled, self-hosted fonts,
`rel="noopener"` on external links, client-side input validation on the
enquiry form, immutable caching for hashed assets.

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
