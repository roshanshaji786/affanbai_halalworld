/**
 * End-to-end smoke test — run against a live server:
 *   node scripts/smoke.mjs [baseUrl]   (default http://localhost:3000)
 * Exits 1 on any failure.
 */
import { rmSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
let pass = 0;
let fail = 0;
const check = (name, ok, extra = "") => {
  if (ok) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name} ${extra}`); }
};

const get = (p) => fetch(BASE + p);
const text = async (p) => { const r = await get(p); return [r.status, await r.text(), r]; };

console.log(`\nSmoke testing ${BASE}\n`);

/* ---- routes ---- */
console.log("routes:");
for (const p of [
  "/", "/packages", "/packages/premium-short-stay-umrah", "/packages/umrah-classic-14n",
  "/packages/umrah-family-private", "/destinations", "/about", "/contact", "/blog",
  "/blog/umrah-from-kerala-2026-cost-guide", "/ml", "/ml/packages", "/ml/contact",
  "/ml/blog", "/en", "/sitemap.xml", "/robots.txt", "/og.jpg", "/favicon.svg",
]) {
  const r = await get(p);
  check(`GET ${p} → 200`, r.status === 200, `(got ${r.status})`);
}
{
  const r = await get("/definitely-not-a-page");
  check("GET /definitely-not-a-page → 404", r.status === 404, `(got ${r.status})`);
}

/* ---- security headers ---- */
console.log("security headers on /:");
{
  const r = await get("/");
  const h = (k) => r.headers.get(k) ?? "";
  check("CSP present", h("content-security-policy").includes("default-src 'self'"));
  check("HSTS present", h("strict-transport-security").includes("max-age=63072000"));
  check("nosniff", h("x-content-type-options") === "nosniff");
  check("X-Frame-Options DENY", h("x-frame-options") === "DENY");
  check("frame-ancestors none", h("content-security-policy").includes("frame-ancestors 'none'"));
  check("Referrer-Policy", h("referrer-policy") === "strict-origin-when-cross-origin");
  check("Permissions-Policy", h("permissions-policy").includes("camera=()"));
  check("COOP", h("cross-origin-opener-policy") === "same-origin");
  check("no X-Powered-By", h("x-powered-by") === "");
}

/* ---- locale content ---- */
console.log("locale content:");
{
  const [, en] = await text("/");
  check("EN home has English h1", en.includes("crafted with care."));
  check("EN home links to /ml", en.includes('href="/ml"'));
  const [, ml] = await text("/ml");
  check("ML home has Malayalam h1", ml.includes("പ്രീമിയം"));
  const [, mlp] = await text("/ml/packages");
  check("ML package card CTA translated", mlp.includes("അന്വേഷിക്കൂ"));
  const [, mlc] = await text("/ml/contact");
  check("ML contact form translated", mlc.includes("അന്വേഷണ ഫോം"));
  const [, enc] = await text("/contact");
  check("EN contact form English", enc.includes("Enquiry Form"));
}

/* ---- SEO artifacts ---- */
console.log("seo artifacts:");
{
  const [, home] = await text("/");
  check("TravelAgency JSON-LD", home.includes('"@type":"TravelAgency"'));
  check("FAQPage JSON-LD", home.includes('"@type":"FAQPage"'));
  const [, pkg] = await text("/packages/premium-short-stay-umrah");
  check("Product JSON-LD with INR price", pkg.includes('"priceCurrency":"INR"') && pkg.includes('"price":130000'));
  const [, art] = await text("/blog/umrah-from-kerala-2026-cost-guide");
  check("BlogPosting JSON-LD", art.includes('"@type":"BlogPosting"'));
  const [, sm] = await text("/sitemap.xml");
  check("sitemap lists /ml-free URLs", sm.includes("<loc>https://www.halalworld.in/</loc>"));
}

/* ---- auth gates ---- */
console.log("auth gates:");
{
  const r1 = await get("/admin");
  check("/admin unauthenticated → 401", r1.status === 401, `(got ${r1.status})`);
  const r2 = await fetch(BASE + "/admin", { headers: { authorization: "Basic " + Buffer.from("admin:wrongpass").toString("base64") } });
  check("/admin wrong password → 401", r2.status === 401, `(got ${r2.status})`);
  const r3 = await get("/api/leads");
  check("GET /api/leads unauthenticated → 401", r3.status === 401, `(got ${r3.status})`);
}

/* ---- leads API: validation + rate limit ---- */
console.log("leads API:");
const post = (body) =>
  fetch(BASE + "/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
{
  const bad = await post({ name: "X", phone: "123" });
  check("invalid mobile → 422", bad.status === 422, `(got ${bad.status})`);
  const badName = await post({ name: "", phone: "9847012345" });
  check("missing name → 422", badName.status === 422, `(got ${badName.status})`);
  const ok1 = await post({ name: "Smoke Test", phone: "9847012345" });
  check("valid lead → 201", ok1.status === 201, `(got ${ok1.status})`);
  // rate limit: 3 calls consumed above in this window; fire until 429 (max 6 more)
  let limited = false;
  for (let i = 0; i < 6; i++) {
    const r = await post({ name: "Smoke Test", phone: "9847012345" });
    if (r.status === 429) { limited = true; break; }
  }
  check("rate limit kicks in (429)", limited);
}

/* ---- cleanup test leads ---- */
try { rmSync(path.join(process.cwd(), "data"), { recursive: true, force: true }); } catch {}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
