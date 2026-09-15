import { NextRequest, NextResponse } from "next/server";

/**
 * Basic auth gate for the admin area and lead reads.
 * Configure ADMIN_USER / ADMIN_PASSWORD in the environment.
 * If unset, protected routes fail closed with 503 (never an open default).
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedRead =
    pathname.startsWith("/admin") || (pathname === "/api/leads" && req.method === "GET");
  if (!protectedRead) return NextResponse.next();

  const user = process.env.ADMIN_USER ?? "admin";
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) {
    return NextResponse.json({ error: "Admin not configured." }, { status: 503 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme === "Basic" && encoded) {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const idx = decoded.indexOf(":");
    const u = decoded.slice(0, idx);
    const p = decoded.slice(idx + 1);
    if (u === user && p === pass) return NextResponse.next();
  }

  return NextResponse.json(
    { error: "Authentication required." },
    { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Halal World Admin"' } },
  );
}

export const config = {
  matcher: ["/admin/:path*", "/api/leads"],
};
