import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { DATA_DIR } from "@/lib/overrides";

export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
};

/**
 * GET /api/editor/files/<name> — public delivery of editor-uploaded images
 * (they must be visible to every visitor). Path traversal is blocked.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name) || name.includes("..") || name.length > 120) {
    return NextResponse.json({ error: "Bad file name." }, { status: 400 });
  }
  const file = path.join(DATA_DIR, "uploads", name);
  if (!file.startsWith(path.join(DATA_DIR, "uploads") + path.sep)) {
    return NextResponse.json({ error: "Bad file name." }, { status: 400 });
  }
  try {
    statSync(file);
    const ext = name.split(".").pop()!.toLowerCase();
    const type = MIME[ext];
    if (!type) return NextResponse.json({ error: "Unsupported type." }, { status: 404 });
    const buf = readFileSync(file);
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
