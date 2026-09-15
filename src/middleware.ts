import { NextRequest, NextResponse } from "next/server";

/**
 * 1) Locale routing: clean English URLs (/…) are rewritten internally to /en/…;
 *    Malayalam lives at /ml/… (crawlable, shareable).
 * 2) Basic auth gate for the admin area and lead reads.
 *    If ADMIN_PASSWORD is unset, protected routes fail closed with 503.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- admin / lead-read auth ---
  const protectedRead =
    pathname.startsWith("/admin") || (pathname === "/api/leads" && req.method === "GET");
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
        return NextResponse.next();
      }
    }
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Halal World Admin"' } },
    );
  }

  // --- locale rewrite (skip already-localised paths, API, assets) ---
  if (/^\/(ml|en|api|admin|_next|images|favicon|robots|sitemap|og\.)/.test(pathname)) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  url.pathname = "/en" + (pathname === "/" ? "" : pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
