"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/content";
import { Logo } from "@/components/Logo";
import { IconClock, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Umrah Packages" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-cocoa-deep text-ivory/90 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5">
          <p className="flex items-center gap-1.5 truncate">
            <IconPin className="text-gold-soft h-3.5 w-3.5 shrink-0" />
            {site.city} · Kerala, India
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label="Halal World — home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-cocoa hover:text-gold text-sm font-semibold tracking-wide transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-cocoa-deep hover:bg-gold-soft inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-md transition-colors"
            >
              <IconWhatsApp className="h-4 w-4" /> Get Quote
            </a>
          </nav>

          <button
            className="text-cocoa lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="border-cocoa/10 border-t bg-ivory px-4 pb-5 lg:hidden" aria-label="Mobile">
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
              <IconWhatsApp className="h-4 w-4" /> Get Quote on WhatsApp
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
