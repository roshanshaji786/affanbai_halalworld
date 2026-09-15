import Image from "next/image";
import Link from "next/link";
import { Star8 } from "@/components/Icons";
import { inr, site, type Pack } from "@/lib/content";
import { t } from "@/lib/i18n";

export function SectionHeading({
  kicker,
  title,
  sub,
  light = false,
}: {
  kicker: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className={`flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase ${light ? "text-gold-soft" : "text-gold"}`}>
        <Star8 className="h-3.5 w-3.5" /> {kicker}
      </p>
      <h2 className={`font-display mt-3 text-3xl sm:text-4xl ${light ? "text-ivory" : "text-cocoa-deep"}`}>
        {title}
      </h2>
      <span className="rule-gold mt-4" aria-hidden="true" />
      {sub && <p className={`mt-4 text-sm leading-relaxed sm:text-base ${light ? "text-ivory/70" : "text-ink/70"}`}>{sub}</p>}
    </div>
  );
}

export function PackageCard({ pack, locale = "en" }: { pack: Pack; locale?: string }) {
  const s = t(locale);
  return (
    <article className="group bg-ivory shadow-card hover:shadow-lift overflow-hidden rounded-2xl border border-cocoa/10 transition-shadow">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={pack.image === "makkah" ? "/images/makkah-clocktower.jpg" : "/images/madinah-movenpick.jpg"}
          alt={pack.image === "makkah" ? "Makkah — Clock Tower and Haram district by night" : "Madinah — hotel towers beside the Prophet's Mosque"}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="bg-cocoa text-gold-soft absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
          {pack.kicker}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-cocoa-deep text-2xl">{pack.title}</h3>
        <p className="text-ink/60 mt-1 text-sm">{pack.departure}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
          <li className="flex justify-between gap-3">
            <span className="text-ink/50">{s.pkg.makkah} · {pack.nightsMakkah}{s.pkg.nights}</span>
            <span className="font-medium text-right">{pack.hotelMakkah}</span>
          </li>
          <li className="flex justify-between gap-3">
            <span className="text-ink/50">{s.pkg.madinah} · {pack.nightsMadinah}{s.pkg.nights}</span>
            <span className="font-medium text-right">{pack.hotelMadinah}</span>
          </li>
        </ul>

        <div className="bg-sand mt-5 flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-ink/60 text-xs font-semibold tracking-widest uppercase">{s.pkg.from}</span>
          <span className="font-display text-cocoa text-2xl">
            {pack.priceINR ? inr(pack.priceINR) : s.pkg.onRequest}
          </span>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/packages/${pack.slug}`}
            className="bg-cocoa text-ivory hover:bg-cocoa-deep flex-1 rounded-full py-2.5 text-center text-sm font-bold transition-colors"
          >
            {s.pkg.view}
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="border-cocoa/30 text-cocoa hover:border-gold hover:text-gold flex-1 rounded-full border-2 py-2.5 text-center text-sm font-bold transition-colors"
          >
            {s.pkg.enquire}
          </a>
        </div>
      </div>
    </article>
  );
}
