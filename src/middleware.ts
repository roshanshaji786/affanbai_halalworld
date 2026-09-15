import { NextRequest, NextResponse } from "next/server";

/**
 * 1) Locale routing: clean English URLs (/…) are rewritten internally to /en/…;
 *    Malayalam lives at /ml/… (crawlable, shareable).
 * 2) Basic auth gate for the admin area, lead reads and live-editor writes.
 *    If ADMIN_PASSWORD is unset, protected routes fail closed with 503.
 *    /api/editor/files/* stays public — uploaded images must render for visitors.
 * 3) Frame headers / CSP: locked down ('none'/DENY) everywhere, except pages
 *    loaded with ?__edit=1, which the admin live-editor embeds in a same-origin
 *    iframe (frame-ancestors 'self', SAMEORIGIN).
 */

const CSP_BASE = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://wa.me https://api.whatsapp.com https://fonts.gstatic.com",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me https://api.whatsapp.com",
  "upgrade-insecure-requests",
].join("; ");

function secure(req: NextRequest, res: NextResponse): NextResponse {
  const editing = req.nextUrl.searchParams.get("__edit") === "1";
  res.headers.set(
    "Content-Security-Policy",
    editing ? CSP_BASE.replace("frame-ancestors 'none'", "frame-ancestors 'self'") : CSP_BASE,
  );
  res.headers.set("X-Frame-Options", editing ? "SAMEORIGIN" : "DENY");
  return res;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- admin / lead-read / editor-write auth ---
  const isEditorFiles = pathname.startsWith("/api/editor/files");
  const protectedRead =
    pathname.startsWith("/admin") ||
    (pathname === "/api/leads" && req.method === "GET") ||
    (pathname.startsWith("/api/editor") && !isEditorFiles);
  if (protectedRead) {
    const user = process.env.ADMIN_USER ?? "admin";
    const pass = process.env.ADMIN_PASSWORD;
    if (!pass) return NextResponse.json({ error: "Admin not configured." }, { status: 503 });

    const auth = req.headers.get("authorization") ?? "";
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf8");
      const idx = decoded.indexOf(":");
      if (decoded.slice(0, idx) === user && decoded.slice(idx + 1) === pass) {
        return secure(req, NextResponse.next());
      }
    }
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Halal World Admin"' } },
    );
  }

  // --- locale rewrite (skip already-localised paths, API, assets) ---
  if (/^\/(ml|en|api|admin|_next|images|favicon|robots|sitemap|og\.)/.test(pathname)) {
    return secure(req, NextResponse.next());
  }
  const url = req.nextUrl.clone();
  url.pathname = "/en" + (pathname === "/" ? "" : pathname);
  return secure(req, NextResponse.rewrite(url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
