import Image from "next/image";
import Link from "next/link";
import { PackageCard, SectionHeading } from "@/components/ui";
import {
  IconBus, IconCheck, IconHotel, IconMeal, IconPassport, IconPhone,
  IconPlane, IconShield, IconSight, IconUsers, IconWhatsApp, Star8,
} from "@/components/Icons";
import { faqs, inr, packages, site, testimonials } from "@/lib/content";
import { t } from "@/lib/i18n";
import { JsonLd, faqLd } from "@/lib/seo";

/* Stats are launch placeholders — confirm exact figures with the client. */
const statNums = ["12+", "1,500+", "40+", "4.9/5"];

const whyIcons = [IconMeal, IconHotel, IconPassport, IconUsers, IconShield, IconCheck];

const journey = [
  { icon: IconPlane, t: "COK → JED", d: "Direct-group flights from Kochi to Jeddah" },
  { icon: IconBus, t: "JED → Makkah", d: "Private coach transfer & Umrah assistance" },
  { icon: IconHotel, t: "Makkah · 4N", d: "Anjum Makkah, steps from the Haram" },
  { icon: IconHotel, t: "Madinah · 3N", d: "Anwar Al Madinah Mövenpick" },
  { icon: IconSight, t: "Ziyarat & Return", d: "Guided ziyarat, then Madinah → JED flight home" },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const s = t(locale);
  const flagship = packages[0];
  return (
    <>
      {/* HERO */}
      <section className="bg-starlattice relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-14 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-mahogany flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase">
              <Star8 className="text-gold h-4 w-4" /> {s.hero.city}
            </p>
            <h1 className="font-display text-cocoa-deep mt-5 text-5xl leading-[1.05] sm:text-6xl xl:text-7xl">
              {s.hero.h1a} <span className="text-cocoa">{s.hero.h1b}</span>,<br />
              {s.hero.h1c}
            </h1>
            <p className="font-arabic text-mahogany mt-4 text-2xl" dir="rtl" lang="ar">
              {site.arabicTagline}
            </p>
            <p className="text-ink/70 mt-3 max-w-xl text-base leading-relaxed sm:text-lg">{s.hero.sub}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cocoa text-ivory hover:bg-cocoa-deep inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-lg transition-colors"
              >
                <IconWhatsApp className="h-5 w-5" /> {s.hero.ctaWa}
              </a>
              <a
                href={site.phoneHref}
                className="border-cocoa/40 text-cocoa hover:border-gold hover:text-gold inline-flex items-center gap-2 rounded-full border-2 bg-white/60 px-7 py-3.5 text-sm font-bold backdrop-blur transition-colors"
              >
                <IconPhone className="h-5 w-5" /> {site.phoneDisplay}
              </a>
            </div>

            <div className="text-cocoa mt-10 flex flex-wrap items-center gap-2 text-sm font-semibold">
              {flagship.route.map((stop, i) => (
                <span key={stop + i} className="flex items-center gap-2">
                  {i > 0 &&
                    (i === 1 || i === flagship.route.length - 1 ? (
                      <IconPlane className="text-gold h-4 w-4" />
                    ) : (
                      <IconBus className="text-gold h-4 w-4" />
                    ))}
                  <span className="bg-white/70 rounded-full px-3 py-1 shadow-sm">{stop}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-md lg:h-[560px]">
            <Image
              src="/images/minaret.png"
              alt="Minaret of the Prophet's Mosque, Madinah"
              fill
              priority
              sizes="(min-width:1024px) 40vw, 90vw"
              className="object-contain drop-shadow-2xl"
            />
            <Link
              href={`/packages/${flagship.slug}`}
              className="bg-cocoa shadow-lift hover:bg-cocoa-deep absolute bottom-2 left-1/2 w-64 -translate-x-1/2 rounded-2xl p-5 text-center transition-colors"
            >
              <p className="text-gold-soft text-[11px] font-bold tracking-[0.25em] uppercase">17 Oct · COK ✈ JED</p>
              <p className="font-display text-ivory mt-1 text-xl">{flagship.title}</p>
              <p className="font-display text-gold-soft mt-2 text-3xl">{inr(flagship.priceINR!)}</p>
              <p className="text-ivory/70 mt-1 text-[11px]">4N {s.pkg.makkah} + 3N {s.pkg.madinah}</p>
            </Link>
          </div>
        </div>

        <div className="bg-cocoa relative">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center md:grid-cols-4">
            {statNums.map((n, i) => (
              <div key={n}>
                <p className="font-display text-gold-soft text-3xl sm:text-4xl">{n}</p>
                <p className="text-ivory/70 mt-1 text-xs font-semibold tracking-widest uppercase">{s.stats[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker={s.pkg.kicker} title={s.pkg.title} sub={s.pkg.sub} />
          <Link href="/packages" className="text-cocoa hover:text-gold text-sm font-bold tracking-wide uppercase">
            {s.pkg.all}
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.slug} pack={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading kicker={s.journey.kicker} title={s.journey.title} sub={s.journey.sub} />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {journey.map((j, i) => (
              <li key={j.t} className="bg-ivory shadow-card relative rounded-2xl p-5">
                <span className="font-display text-gold text-4xl">{i + 1}</span>
                <j.icon className="text-cocoa mt-2 h-7 w-7" />
                <h3 className="text-cocoa-deep mt-3 font-bold">{j.t}</h3>
                <p className="text-ink/60 mt-1 text-sm">{j.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading kicker={s.why.kicker} title={s.why.title} sub={s.why.sub} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {s.why.items.map((w, i) => {
            const Ic = whyIcons[i];
            return (
              <div key={w[0]} className="group hover:border-gold/60 rounded-2xl border border-cocoa/10 bg-white p-6 shadow-sm transition-colors">
                <span className="bg-sand text-cocoa group-hover:bg-cocoa group-hover:text-gold-soft inline-flex rounded-xl p-3 transition-colors">
                  <Ic className="h-6 w-6" />
                </span>
                <h3 className="text-cocoa-deep mt-4 text-lg font-bold">{w[0]}</h3>
                <p className="text-ink/65 mt-2 text-sm leading-relaxed">{w[1]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-starlattice-dark">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading light kicker={s.testi.kicker} title={s.testi.title} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((tm) => (
              <figure key={tm.name} className="rounded-2xl border border-ivory/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-gold-soft flex gap-1" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star8 key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="text-ivory/85 mt-4 text-sm leading-relaxed">“{tm.text}”</blockquote>
                <figcaption className="text-gold-soft mt-4 text-sm font-bold">
                  {tm.name} <span className="text-ivory/50 font-normal">· {tm.place}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <SectionHeading kicker={s.faq.kicker} title={s.faq.title} />
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-ivory shadow-card rounded-2xl border border-cocoa/10 p-5">
              <summary className="text-cocoa-deep flex cursor-pointer list-none items-center justify-between font-bold">
                {f.q}
                <span className="text-gold text-2xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-ink/70 mt-3 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <JsonLd data={faqLd()} />
      </section>

      {/* CTA */}
      <section className="bg-cocoa relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center">
          <Star8 className="text-gold-soft h-8 w-8" />
          <h2 className="font-display text-ivory max-w-2xl text-3xl sm:text-4xl">{s.cta.title}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-cocoa-deep hover:bg-gold-soft rounded-full px-8 py-3.5 text-sm font-bold transition-colors"
            >
              WhatsApp {site.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="text-gold-soft border-gold-soft/50 hover:border-gold-soft rounded-full border-2 px-8 py-3.5 text-sm font-bold transition-colors"
            >
              {s.cta.enquiry}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
