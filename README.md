# Halal World website

A light, minimal, mobile-first website for **Halal World**, a travel consultancy in Thiruvananthapuram. Umrah is the main focus (tailor-made first, plus group departures with an Ameer every March, July and November), alongside flights, visas, hotels, transfers and sightseeing.

- **Static and fast.** Built with [Astro](https://astro.build): every page is plain HTML. No page builder and no jQuery. Lighthouse scores are 99 for performance on mobile and 100 for SEO.
- **3D hero.** A [three.js](https://threejs.org) paper-white globe with maroon flight arcs from Kerala to Jeddah, Makkah and Madinah. It loads only after the page is usable. Phones that are slow, in data saver mode, set to reduce motion, or rendering in software keep a matching still image instead.
- **Calligraphy.** The Talbiyah, «لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ», is set in Amiri. It is turned into SVG outlines at build time and drawn stroke by stroke, so no Arabic font is downloaded for it. Section labels use Reem Kufi, cut down to the few letters used (about 5 KB).
- **Built for local search.** There are city pages for Thiruvananthapuram, Kochi and Kollam. Pages carry structured data for TravelAgency, FAQPage, BreadcrumbList, TouristTrip/Offer and Article. The site also has a sitemap, robots.txt, canonical URLs and an Open Graph image for WhatsApp link previews.
- **WhatsApp-first.** The enquiry form opens WhatsApp with the details already filled in, so no server is needed. On phones, a WhatsApp and call bar stays fixed at the bottom of the screen.

## Editing content

Everything lives in **`src/data/site.ts`**: contact details, opening hours, registrations, group departure months and confirmed dates, the two ways to do Umrah, tailor-made options, services, city pages, FAQs and guides. Search that file for `TODO` to find the placeholders that still need real details.

- The "next group departure" strip is worked out from `groupDepartures.months` and refreshes itself in the browser, so it never shows a past month. Add an exact date to `groupDepartures.confirmed`, e.g. `'2027-03': { date: '2027-03-12' }`, once a group is fixed.
- Adding a city creates its page automatically.
- If you change any Arabic text, run `npm run fonts` to regenerate the font subset and the calligraphy outline. This needs Python with `fonttools`, `brotli` and `uharfbuzz` installed.

## Commands

```bash
npm install
npm run dev       # local preview at http://localhost:4321
npm run build     # production build in dist/
npm run preview   # serve the build
```

## Deploying

`dist/` is a plain static folder, so it can be uploaded to any host (Hostinger, Netlify, Vercel or Cloudflare Pages). Before going live, set `url` in `src/data/site.ts` (or the `SITE_URL` environment variable) to the real domain.

The workflow in `.github/workflows/preview.yml` publishes a preview to GitHub Pages on every push to `main`. The preview is marked noindex so it never competes with the real site. To turn it on once, go to Settings > Pages > Source and choose "GitHub Actions".

## Structure

```
src/data/site.ts          all content
src/pages/                home, tailor-made Umrah, group Umrah, travel services, /umrah-packages-from-<city>/, visa, guides, about, contact, legal
src/components/           Hero (3D), Departure (next group), Enquiry, Faq, ...
src/scripts/globe.ts      three.js globe (lazy loaded)
src/scripts/ui.ts         menu, scroll reveal, WhatsApp form
scripts/                  land-dot, font-subset and calligraphy generators
docs/                     the original event poster this site replaces
```
