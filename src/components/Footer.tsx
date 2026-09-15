import Link from "next/link";
import { site } from "@/lib/content";
import { t } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";
import { ED_BG, edText } from "@/lib/ed";
import { ovBg, tx } from "@/lib/overrides";

export function Footer({ locale }: { locale: string }) {
  const s = t(locale);
  return (
    <footer className="bg-starlattice-dark text-ivory/85" style={ovBg("footer")} {...ED_BG("footer")}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-ivory/70" {...edText(locale, "footer.blurb")}>
            {tx(locale, "footer.blurb", s.footer.blurb)}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-gold-soft font-display text-lg">{s.footer.explore}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/", s.nav.home],
              ["/packages", s.nav.packages],
              ["/destinations", s.nav.destinations],
              ["/about", s.nav.about],
              ["/blog", s.nav.journal],
              ["/contact", s.nav.contact],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-gold-soft transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-gold-soft font-display text-lg" {...edText(locale, "footer.departures")}>
            {tx(locale, "footer.departures", s.footer.departures)}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ivory/70">
            <li>Kochi (COK) · Calicut (CCJ)</li>
            <li>Trivandrum (TRV)</li>
            <li className="pt-2 text-ivory/90 font-semibold" {...edText(locale, "footer.next")}>
              {tx(locale, "footer.next", s.footer.next)}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gold-soft font-display text-lg">{s.footer.reach}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><IconPin className="text-gold-soft h-5 w-5 shrink-0" />{site.address}</li>
            <li>
              <a href={site.phoneHref} className="flex gap-2 hover:text-gold-soft">
                <IconPhone className="text-gold-soft h-5 w-5 shrink-0" />{site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-gold-soft">
                <IconWhatsApp className="text-gold-soft h-5 w-5 shrink-0" />WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-2 hover:text-gold-soft">
                <IconMail className="text-gold-soft h-5 w-5 shrink-0" />{site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="text-ivory/60 mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}, {site.city}. {tx(locale, "footer.rights", s.footer.rights)}</p>
          <p {...edText(locale, "footer.crafted")}>{tx(locale, "footer.crafted", s.footer.crafted)}</p>
        </div>
      </div>
    </footer>
  );
}
