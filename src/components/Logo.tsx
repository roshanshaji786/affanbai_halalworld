import { site } from "@/lib/content";

/**
 * Recreated brand mark: eight-point star ring with a plane on ascent,
 * echoing the original poster logo's flight motif.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--color-gold)" strokeWidth="2.4">
        <rect x="17" y="17" width="30" height="30" />
        <rect x="17" y="17" width="30" height="30" transform="rotate(45 32 32)" />
      </g>
      <path
        d="M20 40c6-1 10-4 13-9l6-10c1.2-2 3.4-2.6 4.8-1.4 1.4 1.2 1.2 3.4-.6 5l-8.6 7.6c-4.6 4-9.6 6.6-14.6 7.8Z"
        fill="var(--color-cocoa)"
      />
      <circle cx="32" cy="32" r="3" fill="var(--color-gold)" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-2xl tracking-wide ${light ? "text-ivory" : "text-cocoa"}`}
        >
          Halal <span className="text-gold">World</span>
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold tracking-[0.28em] uppercase ${
            light ? "text-gold-soft" : "text-mahogany"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
