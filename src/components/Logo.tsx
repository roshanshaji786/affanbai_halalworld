import { site } from "@/lib/content";

/**
 * Modern minimal brand mark — v2.
 * Monoline eight-point star (two rounded squares at 45°) with a center dot:
 * flat geometry, single stroke weight, scales cleanly at any size.
 * Stroke inherits currentColor so it adapts to light/dark contexts.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinejoin="round">
        <rect x="21" y="21" width="22" height="22" rx="4.5" />
        <rect x="21" y="21" width="22" height="22" rx="4.5" transform="rotate(45 32 32)" />
      </g>
      <circle cx="32" cy="32" r="3.6" fill="currentColor" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className={light ? "text-gold-soft" : "text-gold"}>
        <LogoMark />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-xl font-extrabold tracking-tight ${light ? "text-ivory" : "text-cocoa-deep"}`}
        >
          halal<span className={light ? "text-gold-soft" : "text-gold"}>world</span>
        </span>
        <span
          className={`mt-1 text-[9px] font-bold tracking-[0.3em] uppercase ${
            light ? "text-ivory/60" : "text-mahogany"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
