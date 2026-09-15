/**
 * `data-ed` attribute builders for the live editor.
 *
 * Server components spread these onto editable elements. The edit overlay
 * (src/components/EditMode.tsx) discovers `[data-ed]` nodes, lets the admin
 * click-to-edit them, and the override store (src/lib/overrides.ts) applies
 * saved values at render time.
 *
 * Key namespaces (first segment = editor control kind):
 *   text.*  → inline text editor     img.* → image picker/upload   bg.* → background editor
 */

export const ED_TEXT = (key: string) => ({ "data-ed": `text.${key}` }) as const;
export const ED_IMG = (id: string) => ({ "data-ed": `img.${id}` }) as const;
export const ED_BG = (id: string) => ({ "data-ed": `bg.${id}` }) as const;

/** Locale-scoped text key, e.g. edText("en", "hero.h1a") → text.en.hero.h1a */
export const edText = (locale: string, p: string) => ED_TEXT(`${locale}.${p}`);
/** Global text key (all locales), e.g. edGlobal("arabicTagline") */
export const edGlobal = (p: string) => ED_TEXT(`global.${p}`);
/** Package-card text key (shared across locales). */
export const edPack = (slug: string, p: string) => ED_TEXT(`pack.${slug}.${p}`);
