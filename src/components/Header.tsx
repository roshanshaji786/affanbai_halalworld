"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/content";
import { t } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { IconClock, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";

export function Header({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const s = t(locale);
  const pathname = usePathname();
  // usePathname returns the *rewritten* path (/en/…) — strip any locale prefix
  const base = pathname.replace(/^\/(en|ml)/, "") || "/";
  const isMl = locale === "ml";

  const links = [
    { href: "/", label: s.nav.home },
    { href: "/packages", label: s.nav.packages },
    { href: "/destinations", label: s.nav.destinations },
    { href: "/about", label: s.nav.about },
    { href: "/blog", label: s.nav.journal },
    { href: "/contact", label: s.nav.contact },
  ];

  const langToggle = (
    <span className="border-cocoa/20 flex items-center gap-1 rounded-full border p-0.5 text-[11px] font-bold">
      <Link
        href={base}
        className={`rounded-full px-2.5 py-1 ${!isMl ? "bg-cocoa text-ivory" : "text-cocoa hover:text-gold"}`}
        aria-label="English"
      >
        EN
      </Link>
      <Link
        href={"/ml" + (base === "/" ? "" : base)}
        className={`rounded-full px-2.5 py-1 ${isMl ? "bg-cocoa text-ivory" : "text-cocoa hover:text-gold"}`}
        aria-label="മലയാളം"
      >
        മല
      </Link>
    </span>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-cocoa-deep text-ivory/90 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5">
          <p className="flex items-center gap-1.5 truncate">
            <IconPin className="text-gold-soft h-3.5 w-3.5 shrink-0" />
            {s.top.city}
          </p>
          <p className="text-gold-soft/90 hidden items-center gap-1.5 md:flex">
            <IconClock className="h-3.5 w-3.5" /> {site.hours}
          </p>
          <a href={site.phoneHref} className="hover:text-gold-soft flex items-center gap-1.5 font-semibold">
            <IconPhone className="h-3.5 w-3.5" /> {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="bg-ivory/95 border-cocoa/10 border-b shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" aria-label="Halal World — home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-cocoa hover:text-gold text-sm font-semibold tracking-wide transition-colors"
              >
                {l.label}
              </Link>
            ))}
            {langToggle}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-cocoa-deep hover:bg-gold-soft inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-md transition-colors"
            >
              <IconWhatsApp className="h-4 w-4" /> {s.nav.quote}
            </a>
          </nav>

          <span className="flex items-center gap-3 xl:hidden">
            {langToggle}
            <button
              className="text-cocoa"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </span>
        </div>

        {open && (
          <nav className="border-cocoa/10 border-t bg-ivory px-4 pb-5 xl:hidden" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-cocoa border-cocoa/10 block border-b py-3 text-sm font-semibold"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-cocoa-deep mt-4 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
            >
              <IconWhatsApp className="h-4 w-4" /> {s.nav.quote}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
