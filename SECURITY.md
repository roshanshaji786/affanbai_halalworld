# Security — Halal World website

## Reporting

Report vulnerabilities privately to `care@halalworld.in` (or via the business
WhatsApp +91 99470 32507). Please allow a reasonable window before public disclosure.

## Implemented controls

| Control | Where |
| --- | --- |
| Content-Security-Policy | `next.config.ts` headers |
| HSTS `max-age=63072000; includeSubDomains; preload` | `next.config.ts` |
| `X-Content-Type-Options: nosniff` | `next.config.ts` |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'` (clickjacking) | `next.config.ts` |
| `Referrer-Policy: strict-origin-when-cross-origin` | `next.config.ts` |
| `Permissions-Policy` (camera/mic/geo/payment/usb off) | `next.config.ts` |
| COOP / CORP `same-origin` | `next.config.ts` |
| `X-Powered-By` removed (`poweredByHeader: false`) | `next.config.ts` |
| Immutable caching only for content-hashed `/_next/static` | `next.config.ts` |
| Self-hosted fonts (no third-party font CDN, no data leakage) | `@fontsource` |
| `rel="noopener noreferrer"` on all external links | components |
| Enquiry form: client validation, Indian-mobile regex, no data stored, WhatsApp hand-off | `src/app/contact/page.tsx` |
| No `dangerouslySetInnerHTML` except non-executable `application/ld+json` | `src/lib/seo.tsx` |

## Known considerations

- **CSP `script-src 'unsafe-inline'`** is required today because Next.js App
  Router inlines its RSC flight payload (`self.__next_f.push`) in the HTML.
  Hardening path: when an edge/proxy layer is added (Vercel Edge Middleware or
  a CDN worker), switch to a per-request **nonce** CSP and set
  `script-src 'nonce-…' 'strict-dynamic'`.
- The contact form currently hands data to WhatsApp on the client; no PII is
  stored server-side. When a backend is added (milestone 2), introduce
  server-side validation, rate limiting and CSRF protection there.
- Dependencies are minimal (next, react, @fontsource) to keep the supply chain
  small; run `npm audit` before each release.
