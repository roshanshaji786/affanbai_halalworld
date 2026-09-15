type P = { className?: string };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const IconPlane = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M10.5 13.5 3 11l1.5-1.5L10 10l4-4.5c.6-.6 1.6-.6 2 0 .5.5.5 1.5 0 2L11.5 12l.5 5.5L10.5 19l-2.5-7.5" />
    <path d="M4 20h16" />
  </svg>
);

export const IconPassport = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M8.5 17h7" />
  </svg>
);

export const IconHotel = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
    <path d="M2 21h20" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
  </svg>
);

export const IconMeal = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M7 3v7a2 2 0 0 1-2 2v9M3 3v5M11 3v5" transform="translate(1 0) scale(.9)" />
    <circle cx="16" cy="12" r="5" />
    <path d="M16 3v4" />
  </svg>
);

export const IconBus = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 21v-2M17 21v-2" />
    <circle cx="8" cy="14" r=".8" />
    <circle cx="16" cy="14" r=".8" />
  </svg>
);

export const IconSight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <circle cx="7" cy="15" r="4" />
    <circle cx="17" cy="15" r="4" />
    <path d="M11 15h2M9 11.5 10 5h1.5M15 11.5 14 5h-1.5" />
  </svg>
);

export const IconPhone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const IconWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.1 14.9l-.5-.3-2.6.7.7-2.5-.3-.5A8 8 0 0 1 12 4Zm-3 4.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.6-.8c.2-.2.1-.4 0-.6l-.8-1.8c-.2-.5-.4-.7-.6-.7Z" />
  </svg>
);

export const IconPin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const IconMail = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <path d="M12 3 5 6v5c0 5 3 8.4 7 10 4-1.6 7-5 7-10V6Z" />
    <path d="m9 12 2 2 4-4.5" />
  </svg>
);

export const IconUsers = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" />
    <path d="M16 5a3 3 0 0 1 0 6M17.5 14.7c2 .8 3.2 2.6 3.5 5.3" />
  </svg>
);

/** Eight-point star — the brand motif from the poster lattice. */
export const Star8 = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 1.8 14.4 7l5.2-2.6L17 9.6l5.2 2.4L17 14.4l2.6 5.2L14.4 17 12 22.2 9.6 17l-5.2 2.6L7 14.4 1.8 12 7 9.6 4.4 4.4 9.6 7Z" />
  </svg>
);

export const inclusionIcon = (name: string, className = "h-6 w-6") => {
  switch (name) {
    case "Visa": return <IconPassport className={className} />;
    case "Flights": return <IconPlane className={className} />;
    case "Hotels": return <IconHotel className={className} />;
    case "Meals": return <IconMeal className={className} />;
    case "Transfers": return <IconBus className={className} />;
    default: return <IconSight className={className} />;
  }
};
