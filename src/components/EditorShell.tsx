"use client";

/**
 * Elementor-style live editor shell.
 *
 * Left: the real site in a same-origin iframe (?__edit=1) — click any
 * outlined element to edit it. Right: a contextual sidebar with the matching
 * control (text / image / background). Saves persist to data/content.json
 * via /api/editor and are applied to the canvas instantly; visitors see the
 * same values because the server merges overrides at render time.
 */
import { useCallback, useEffect, useRef, useState } from "react";

type Kind = "text" | "img" | "bg";
type Selection = { key: string; kind: Kind; label: string; value: unknown };

const rgbToHex = (rgb: string) => {
  const m = rgb.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (!m) return "#ffffff";
  return "#" + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, "0")).join("");
};

/** Quick-pick element list (home page) shown before anything is selected. */
const layers = (locale: string): { label: string; key: string }[] => [
  { label: "Hero · headline A", key: `text.${locale}.hero.h1a` },
  { label: "Hero · headline B (Umrah)", key: `text.${locale}.hero.h1b` },
  { label: "Hero · headline C", key: `text.${locale}.hero.h1c` },
  { label: "Hero · subtitle", key: `text.${locale}.hero.sub` },
  { label: "Hero · Arabic tagline", key: "text.global.arabicTagline" },
  { label: "Hero · image", key: "img.hero" },
  { label: "Hero · background", key: "bg.hero" },
  { label: "Stats · numbers", key: "text.global.stats.num.0" },
  { label: "Packages · title", key: `text.${locale}.pkg.title` },
  { label: "Journey · background", key: "bg.journey" },
  { label: "Testimonials · background", key: "bg.testi" },
  { label: "CTA · title", key: `text.${locale}.cta.title` },
  { label: "CTA · background", key: "bg.cta" },
  { label: "Footer · blurb", key: `text.${locale}.footer.blurb` },
];

export function EditorShell() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [locale, setLocale] = useState<"en" | "ml">("en");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [sel, setSel] = useState<Selection | null>(null);
  const [status, setStatus] = useState("Loading canvas…");
  const [busy, setBusy] = useState(false);

  // drafts for the sidebar controls
  const [textDraft, setTextDraft] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [bgColorOn, setBgColorOn] = useState(false);
  const [bgColor, setBgColor] = useState("#f4ede3");
  const [bgImg, setBgImg] = useState("");

  const send = useCallback((msg: object) => {
    iframeRef.current?.contentWindow?.postMessage(msg, window.location.origin);
  }, []);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const m = e.data as { type?: string } & Partial<Selection>;
      if (m?.type === "hw:ready") setStatus("Ready — click any highlighted element to edit it.");
      if (m?.type === "hw:select" && m.key && m.kind) {
        const selection: Selection = { key: m.key, kind: m.kind as Kind, label: m.label ?? m.key, value: m.value };
        setSel(selection);
        if (selection.kind === "text") setTextDraft(String(selection.value ?? ""));
        if (selection.kind === "img") setImgUrl(String(selection.value ?? ""));
        if (selection.kind === "bg") {
          const v = (selection.value ?? {}) as { color?: string; image?: string };
          setBgColorOn(Boolean(v.color && v.color !== "rgba(0, 0, 0, 0)"));
          setBgColor(v.color ? rgbToHex(v.color) : "#f4ede3");
          setBgImg(v.image ?? "");
        }
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const save = async (value: unknown, note = "Saved ✓ visible to visitors") => {
    if (!sel) return;
    setBusy(true);
    setStatus("Saving…");
    try {
      const r = await fetch("/api/editor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: sel.key, value }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setStatus(`Save failed — ${(j as { error?: string }).error ?? r.status}`);
        return;
      }
      send({ type: "hw:apply", key: sel.key, value });
      setSel({ ...sel, value });
      setStatus(note);
    } finally {
      setBusy(false);
    }
  };

  const reset = () => save(null, "Reset ✓ back to the coded default");

  const upload = async (file: File): Promise<string | null> => {
    setBusy(true);
    setStatus(`Uploading ${file.name}…`);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/editor/upload", { method: "POST", body: fd });
      const j = (await r.json()) as { url?: string; error?: string };
      if (!r.ok || !j.url) {
        setStatus(`Upload failed — ${j.error ?? r.status}`);
        return null;
      }
      return j.url;
    } finally {
      setBusy(false);
    }
  };

  const switchLocale = (l: "en" | "ml") => {
    setLocale(l);
    setSel(null);
    setStatus("Loading canvas…");
  };

  const btn = "rounded-full px-4 py-2 text-xs font-bold transition-colors";

  return (
    <div className="flex h-screen flex-col bg-[#1d1410] text-white">
      {/* ---------- top bar ---------- */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-[#2a1c14] px-4 py-2.5">
        <p className="text-sm font-bold tracking-wide">
          Halal World <span className="text-[#d9b878]">· Live Editor</span>
        </p>

        <span className="flex items-center gap-1 rounded-full border border-white/15 p-0.5 text-[11px] font-bold">
          {(["en", "ml"] as const).map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`rounded-full px-3 py-1 uppercase ${locale === l ? "bg-[#b98a44] text-[#2a1c14]" : "text-white/70 hover:text-white"}`}
            >
              {l === "en" ? "English" : "മലയാളം"}
            </button>
          ))}
        </span>

        <span className="flex items-center gap-1 rounded-full border border-white/15 p-0.5 text-[11px] font-bold">
          {(["desktop", "mobile"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`rounded-full px-3 py-1 capitalize ${device === d ? "bg-white/20" : "text-white/70 hover:text-white"}`}
            >
              {d === "desktop" ? "🖥 Desktop" : "📱 Mobile"}
            </button>
          ))}
        </span>

        <p className="min-w-0 flex-1 truncate text-xs text-white/60">{status}</p>

        <span className="flex items-center gap-2 text-[11px] font-semibold">
          <a href={locale === "ml" ? "/ml" : "/"} className={`${btn} border border-white/20 hover:border-[#d9b878] hover:text-[#d9b878]`}>View site ↗</a>
          <a href="/admin" className={`${btn} border border-white/20 hover:border-[#d9b878] hover:text-[#d9b878]`}>Leads</a>
          <a href="/" className={`${btn} bg-[#b98a44] text-[#2a1c14] hover:bg-[#d9b878]`}>Exit</a>
        </span>
      </div>

      {/* ---------- canvas + sidebar ---------- */}
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 items-stretch justify-center overflow-auto bg-[#120c09] p-4">
          <iframe
            ref={iframeRef}
            key={locale}
            title="Halal World live canvas"
            src={`/${locale}?__edit=1`}
            className={`h-full rounded-lg border border-white/10 bg-white shadow-2xl transition-all ${
              device === "mobile" ? "w-[390px]" : "w-full"
            }`}
          />
        </div>

        {/* ---------- sidebar ---------- */}
        <aside className="w-[360px] shrink-0 overflow-y-auto border-l border-white/10 bg-[#241a14] p-5">
          {!sel ? (
            <>
              <h2 className="text-sm font-bold tracking-widest text-[#d9b878] uppercase">How it works</h2>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                <li>1 · Click any element in the canvas — dashed gold outlines show what's editable.</li>
                <li>2 · Edit text, swap the image, or restyle the background here.</li>
                <li>3 · <b>Save</b> publishes instantly — visitors see it without a redeploy.</li>
              </ul>
              <h3 className="mt-6 text-sm font-bold tracking-widest text-[#d9b878] uppercase">Jump to element</h3>
              <ul className="mt-3 space-y-1.5">
                {layers(locale).map((l) => (
                  <li key={l.key}>
                    <button
                      onClick={() => send({ type: "hw:pick", key: l.key })}
                      className="w-full rounded-lg border border-white/10 px-3 py-2 text-left text-xs font-semibold text-white/80 hover:border-[#b98a44] hover:text-[#d9b878]"
                    >
                      {l.label}
                      <span className="mt-0.5 block font-mono text-[10px] font-normal text-white/35">{l.key}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <button onClick={() => setSel(null)} className="text-[11px] font-bold text-white/50 hover:text-white">
                ← Back to element list
              </button>
              <h2 className="mt-3 text-sm font-bold tracking-widest text-[#d9b878] uppercase">
                {sel.kind === "text" ? "Text" : sel.kind === "img" ? "Image" : "Background"}
              </h2>
              <p className="mt-1 font-mono text-[10px] break-all text-white/35">{sel.key}</p>

              {/* ---------- TEXT ---------- */}
              {sel.kind === "text" && (
                <div className="mt-4 space-y-3">
                  <textarea
                    value={textDraft}
                    onChange={(e) => setTextDraft(e.target.value)}
                    rows={5}
                    dir="auto"
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white outline-none focus:border-[#b98a44]"
                  />
                  <div className="flex gap-2">
                    <button disabled={busy} onClick={() => save(textDraft)} className={`${btn} flex-1 bg-[#b98a44] text-[#2a1c14] hover:bg-[#d9b878] disabled:opacity-40`}>
                      Save text
                    </button>
                    <button disabled={busy} onClick={reset} className={`${btn} border border-white/20 hover:border-red-400 hover:text-red-300`}>
                      Reset
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/45">
                    English and Malayalam are edited separately — switch language in the top bar.
                  </p>
                </div>
              )}

              {/* ---------- IMAGE ---------- */}
              {sel.kind === "img" && (
                <div className="mt-4 space-y-3">
                  {imgUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imgUrl} alt="Current" className="max-h-44 w-full rounded-xl border border-white/10 object-contain bg-white/5" />
                  )}
                  <label className={`${btn} block cursor-pointer bg-[#b98a44] text-center text-[#2a1c14] hover:bg-[#d9b878] ${busy ? "pointer-events-none opacity-40" : ""}`}>
                    Upload new image…
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const url = await upload(f);
                        if (url) {
                          setImgUrl(url);
                          await save(url, "Image saved ✓");
                        }
                        e.target.value = "";
                      }}
                    />
                  </label>
                  <input
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="…or paste an https:// image URL"
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-3 font-mono text-[11px] text-white outline-none focus:border-[#b98a44]"
                  />
                  <div className="flex gap-2">
                    <button disabled={busy} onClick={() => save(imgUrl)} className={`${btn} flex-1 bg-[#b98a44] text-[#2a1c14] hover:bg-[#d9b878] disabled:opacity-40`}>
                      Save image
                    </button>
                    <button disabled={busy} onClick={reset} className={`${btn} border border-white/20 hover:border-red-400 hover:text-red-300`}>
                      Reset
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/45">JPG · PNG · WebP · AVIF · SVG, up to 5 MB.</p>
                </div>
              )}

              {/* ---------- BACKGROUND ---------- */}
              {sel.kind === "bg" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-white/80">
                      <input type="checkbox" checked={bgColorOn} onChange={(e) => setBgColorOn(e.target.checked)} className="accent-[#b98a44]" />
                      Override background colour
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} disabled={!bgColorOn} className="h-10 w-16 cursor-pointer rounded border border-white/15 bg-transparent disabled:opacity-30" />
                      <code className="font-mono text-xs text-white/60">{bgColorOn ? bgColor : "(default)"}</code>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white/80">Background image (optional)</p>
                    <label className={`${btn} mt-2 block cursor-pointer border border-white/20 text-center hover:border-[#d9b878] hover:text-[#d9b878] ${busy ? "pointer-events-none opacity-40" : ""}`}>
                      Upload image…
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          const url = await upload(f);
                          if (url) setBgImg(url);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <input
                      value={bgImg}
                      onChange={(e) => setBgImg(e.target.value)}
                      placeholder="…or paste an https:// image URL"
                      className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 p-3 font-mono text-[11px] text-white outline-none focus:border-[#b98a44]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      disabled={busy}
                      onClick={() => save({ color: bgColorOn ? bgColor : "", image: bgImg })}
                      className={`${btn} flex-1 bg-[#b98a44] text-[#2a1c14] hover:bg-[#d9b878] disabled:opacity-40`}
                    >
                      Save background
                    </button>
                    <button disabled={busy} onClick={reset} className={`${btn} border border-white/20 hover:border-red-400 hover:text-red-300`}>
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
