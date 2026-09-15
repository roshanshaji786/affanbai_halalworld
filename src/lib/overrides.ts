/**
 * Live-editor content overrides (server-only).
 *
 * The visual editor at /admin/editor saves edits to `data/content.json`
 * (key → value). Pages read overrides at request time and merge them over
 * the coded defaults in `content.ts` / `i18n.ts`, so published edits appear
 * instantly for every visitor — no rebuild, no redeploy.
 *
 * Key namespaces:
 *   text.<locale>.<path>   locale string        ("text.en.hero.h1a")
 *   text.global.<path>     shared string/number ("text.global.arabicTagline")
 *   text.pack.<slug>.<k>   package card field   ("text.pack.umrah-classic-14n.title")
 *   img.<id>               image URL override   ("img.hero")
 *   bg.<id>                section background   ("bg.hero" → { color?, image? })
 *
 * IMPORTANT: this module imports node:fs — never import it from
 * "use client" components.
 */
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";

export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");

export type BgValue = { color?: string; image?: string };
export type OverrideValue = string | BgValue | null;
export type Overrides = Record<string, OverrideValue>;

/* Read-through cache invalidated by file mtime — cheap per-request reads. */
let cache: { mtimeMs: number; data: Overrides } | null = null;

/** Drop the in-memory cache (used after writes and in tests). */
export function resetOverrideCache() {
  cache = null;
}

export function getOverrides(): Overrides {
  try {
    const { mtimeMs } = statSync(FILE);
    if (cache && cache.mtimeMs === mtimeMs) return cache.data;
    const data = JSON.parse(readFileSync(FILE, "utf8")) as Overrides;
    cache = { mtimeMs, data };
    return data;
  } catch {
    return {};
  }
}

export function ovRaw(key: string): OverrideValue | undefined {
  const v = getOverrides()[key];
  return v === undefined ? undefined : v;
}

/** String override ("" and whitespace-only count as unset). */
export function ovText(key: string): string | undefined {
  const v = ovRaw(key);
  return typeof v === "string" && v.trim() !== "" ? v : undefined;
}

/** Locale-scoped text: `tx(locale, "hero.h1a", fallback)` */
export function tx(locale: string, p: string, fallback: string): string {
  return ovText(`text.${locale}.${p}`) ?? fallback;
}

/** Global (all locales) text: `tg("arabicTagline", fallback)` */
export function tg(p: string, fallback: string): string {
  return ovText(`text.global.${p}`) ?? fallback;
}

/** Package-card text (shared across locales). */
export function tp(slug: string, p: string, fallback: string): string {
  return ovText(`text.pack.${slug}.${p}`) ?? fallback;
}

/** Image URL override: `ovAsset("img.hero")` */
export function ovAsset(key: string): string | undefined {
  const v = ovText(key);
  if (!v) return undefined;
  // Only allow same-origin upload/API paths or absolute https URLs.
  if (v.startsWith("/api/editor/files/") || /^https:\/\/\S+$/i.test(v)) return v;
  return undefined;
}

/** Section background override → inline style (empty object = no override). */
export function ovBg(id: string): CSSProperties | undefined {
  const v = ovRaw(`bg.${id}`);
  if (!v || typeof v !== "object") return undefined;
  const style: CSSProperties = {};
  if (typeof v.color === "string" && v.color.trim()) style.backgroundColor = v.color.trim();
  const img = typeof v.image === "string" ? v.image.trim() : "";
  if (img && (img.startsWith("/api/editor/files/") || /^https:\/\/\S+$/i.test(img))) {
    style.backgroundImage = `url("${img}")`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }
  return Object.keys(style).length ? style : undefined;
}

/* ---------------- writes (used by /api/editor) ---------------- */

export function setOverride(key: string, value: OverrideValue): Overrides {
  const data = getOverrides();
  const next: Overrides = { ...data };
  if (value === null || value === "" || (typeof value === "object" && !value.color && !value.image)) {
    delete next[key];
  } else {
    next[key] = value;
  }
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(next, null, 2));
  cache = null;
  return next;
}
