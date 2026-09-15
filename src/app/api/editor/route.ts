import { NextRequest, NextResponse } from "next/server";
import { getOverrides, setOverride, type OverrideValue } from "@/lib/overrides";

export const dynamic = "force-dynamic";

const KEY_RE = /^[a-z]+\.[a-z0-9][a-z0-9._-]*$/i;

/** GET /api/editor — current override map (Basic-auth gated by middleware). */
export async function GET() {
  return NextResponse.json(getOverrides());
}

/**
 * POST /api/editor — save one override. Body: { key, value }
 * value: string for text / img keys, { color?, image? } for bg keys,
 * or null to reset back to the coded default.
 */
export async function POST(req: NextRequest) {
  let body: { key?: unknown; value?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { key, value } = body as { key?: string; value?: unknown };
  if (typeof key !== "string" || !KEY_RE.test(key) || key.length > 160) {
    return NextResponse.json({ error: "Invalid override key." }, { status: 422 });
  }

  const ns = key.split(".")[0];
  let v: OverrideValue;
  if (value === null || value === undefined) {
    v = null; // reset
  } else if (ns === "bg") {
    if (typeof value !== "object") return NextResponse.json({ error: "bg value must be { color?, image? }." }, { status: 422 });
    const { color, image } = value as { color?: unknown; image?: unknown };
    v = {
      color: typeof color === "string" && color.length <= 40 ? color.trim() : "",
      image: typeof image === "string" && image.length <= 2000 ? image.trim() : "",
    };
  } else if (ns === "text" || ns === "img") {
    if (typeof value !== "string" || value.length > 20000) {
      return NextResponse.json({ error: "Invalid value." }, { status: 422 });
    }
    v = value;
  } else {
    return NextResponse.json({ error: "Unknown key namespace." }, { status: 422 });
  }

  const overrides = setOverride(key, v);
  return NextResponse.json({ ok: true, count: Object.keys(overrides).length });
}
