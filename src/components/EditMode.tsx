"use client";

/**
 * Live-editor overlay.
 *
 * Rendered on every page but inert unless the URL has `?__edit=1` (set by
 * the /admin/editor canvas iframe). When active it:
 *   • outlines every [data-ed] element on hover and selects it on click,
 *   • blocks link navigation,
 *   • talks to the editor shell via postMessage:
 *       child → parent : hw:ready | hw:select {key, kind, label, value}
 *       parent → child : hw:apply  {key, value}   (value null = restore)
 *                        hw:pick   {key}          (scroll + select element)
 */
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

type Msg =
  | { type: "hw:apply"; key: string; value: unknown }
  | { type: "hw:pick"; key: string };

const EDIT_CSS = `
html[data-hw-edit] [data-ed] { cursor: pointer; }
html[data-hw-edit] [data-ed]:hover { outline: 2px dashed #b98a44 !important; outline-offset: 3px; }
html[data-hw-edit] .hw-selected { outline: 2px solid #b98a44 !important; outline-offset: 3px; box-shadow: 0 0 0 6px rgb(185 138 68 / 0.18); }
html[data-hw-edit] { scroll-behavior: smooth; }
`;

const kindOf = (key: string) => (key.startsWith("img.") ? "img" : key.startsWith("bg.") ? "bg" : "text");

/** Human label for the sidebar, e.g. text.en.hero.h1a → "hero · h1a". */
function labelOf(key: string): string {
  const parts = key.split(".");
  return (parts[0] === "text" ? parts.slice(2) : parts.slice(1)).join(" · ");
}

function readValue(el: HTMLElement): unknown {
  const kind = kindOf(el.dataset.ed ?? "");
  if (kind === "img") {
    const img = el.tagName === "IMG" ? (el as HTMLImageElement) : el.querySelector("img");
    return img?.getAttribute("src") ?? "";
  }
  if (kind === "bg") {
    const cs = getComputedStyle(el);
    const raw = cs.backgroundImage;
    const m = raw.match(/url\("?(.*?)"?\)/);
    return { color: cs.backgroundColor, image: m && !m[1].startsWith("data:") ? m[1] : "" };
  }
  return (el.innerText ?? "").trim();
}

/** Replace visible text without clobbering nested markup (icons, spans). */
function setText(el: HTMLElement, value: string) {
  if (!el.querySelector("*")) {
    el.textContent = value;
    return;
  }
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last: Text | null = null;
  let n: Node | null;
  while ((n = walker.nextNode())) {
    if (n.textContent && n.textContent.trim() !== "") last = n as Text;
  }
  if (last) last.textContent = value;
  else el.append(document.createTextNode(value));
}

function EditModeInner() {
  const params = useSearchParams();
  const active = params.get("__edit") === "1";

  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    if (window.self === window.top) return; // only run inside the editor canvas

    document.documentElement.setAttribute("data-hw-edit", "1");
    const style = document.createElement("style");
    style.textContent = EDIT_CSS;
    document.head.appendChild(style);

    const originals = new Map<string, string>(); // key → outerHTML snapshot
    let selected: HTMLElement | null = null;

    const findByKey = (key: string) =>
      document.querySelector<HTMLElement>(`[data-ed="${CSS.escape(key)}"]`);

    const snapshot = (el: HTMLElement) => {
      const key = el.dataset.ed!;
      if (!originals.has(key)) originals.set(key, el.innerHTML);
    };

    const select = (el: HTMLElement) => {
      selected?.classList.remove("hw-selected");
      selected = el;
      el.classList.add("hw-selected");
      snapshot(el);
      window.parent.postMessage(
        { type: "hw:select", key: el.dataset.ed, kind: kindOf(el.dataset.ed!), label: labelOf(el.dataset.ed!), value: readValue(el) },
        window.location.origin,
      );
    };

    const apply = (key: string, value: unknown) => {
      const el = findByKey(key);
      if (!el) return;
      snapshot(el);
      const kind = kindOf(key);
      if (value === null || value === undefined) {
        el.innerHTML = originals.get(key) ?? el.innerHTML;
        return;
      }
      if (kind === "img") {
        const img = el.tagName === "IMG" ? (el as HTMLImageElement) : el.querySelector("img");
        if (img && typeof value === "string" && value) {
          img.removeAttribute("srcset");
          img.removeAttribute("sizes");
          img.src = value;
        }
      } else if (kind === "bg") {
        const v = value as { color?: string; image?: string };
        el.style.backgroundColor = v.color || "";
        if (v.image) {
          el.style.backgroundImage = `url("${v.image}")`;
          el.style.backgroundSize = "cover";
          el.style.backgroundPosition = "center";
        } else {
          el.style.backgroundImage = "";
          el.style.backgroundSize = "";
          el.style.backgroundPosition = "";
        }
      } else {
        setText(el, String(value));
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Block navigation entirely while editing.
      if (target?.closest("a, button[type='submit']")) e.preventDefault();
      const el = target?.closest<HTMLElement>("[data-ed]");
      if (el) {
        e.preventDefault();
        e.stopPropagation();
        select(el);
      }
    };

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const msg = e.data as Msg;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "hw:apply") apply(msg.key, msg.value);
      if (msg.type === "hw:pick") {
        const el = findByKey(msg.key);
        if (el) {
          el.scrollIntoView({ block: "center", behavior: "smooth" });
          select(el);
        }
      }
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "hw:ready" }, window.location.origin);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onMessage);
      document.documentElement.removeAttribute("data-hw-edit");
      style.remove();
    };
  }, [active]);

  return null;
}

export function EditMode() {
  return (
    <Suspense fallback={null}>
      <EditModeInner />
    </Suspense>
  );
}
