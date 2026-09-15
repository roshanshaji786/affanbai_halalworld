import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui";
import { Star8 } from "@/components/Icons";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Destinations — Makkah, Madinah & Halal Holidays",
  description:
    "Makkah and Madinah with Haram-near stays, plus upcoming halal holiday routes from Kerala. Halal World, Trivandrum.",
};

const destinations = [
  {
    img: "/images/makkah-clocktower.jpg",
    alt: "Makkah by night — the Clock Tower and Haram district",
    name: "Makkah Al-Mukarramah",
    ar: "مكة المكرمة",
    text: "The beloved heart of every journey. We place you minutes from the Haram so every prayer is a short, peaceful walk — Umrah assistance and ziyarat included.",
    chips: ["Anjum Makkah", "Haram-view options", "Zamzam guidance"],
  },
  {
    img: "/images/madinah-movenpick.jpg",
    alt: "Madinah — hotel towers beside the Prophet's Mosque",
    name: "Madinah Al-Munawwarah",
    ar: "المدينة المنورة",
    text: "The radiant city of the Prophet ﷺ. Our stays keep you close to the Rawdah and Riaz-ul-Jannah entrances, with guided ziyarat of the historic masjids.",
    chips: ["Mövenpick & Dar Al Taqwa", "Rawdah permits help", "Quba & Uhud ziyarat"],
  },
];

export default function Destinations() {
  return (
    <section className="bg-starlattice">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          kicker="Where we take you"
          title="The Two Holy Cities"
          sub="Every Halal World journey is built around comfort, closeness to the Haram, and unhurried worship."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {destinations.map((d) => (
            <article key={d.name} className="bg-ivory shadow-card overflow-hidden rounded-3xl border border-cocoa/10">
              <div className="relative h-72">
                <Image src={d.img} alt={d.alt} fill sizes="(min-width:1024px) 50vw, 92vw" className="object-cover" />
                <span className="bg-cocoa/90 text-gold-soft absolute top-4 left-4 rounded-full px-4 py-1.5 text-sm font-bold backdrop-blur">
                  {d.ar}
                </span>
              </div>
              <div className="p-7">
                <h2 className="font-display text-cocoa-deep text-3xl">{d.name}</h2>
                <p className="text-ink/70 mt-3 text-sm leading-relaxed">{d.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {d.chips.map((c) => (
                    <li key={c} className="bg-sand text-cocoa rounded-full px-3 py-1 text-xs font-semibold">{c}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-cocoa mt-14 rounded-3xl p-8 text-center">
          <Star8 className="text-gold-soft mx-auto h-6 w-6" />
          <h2 className="font-display text-ivory mt-3 text-2xl sm:text-3xl">Halal holidays — coming soon</h2>
          <p className="text-ivory/70 mx-auto mt-3 max-w-2xl text-sm">
            Malaysia, Türkiye and the Emirates on fully halal itineraries — halal food guarantees, prayer-friendly
            schedules and family-first pacing. Register your interest on WhatsApp and be first to hear.
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-cocoa-deep hover:bg-gold-soft mt-6 inline-block rounded-full px-7 py-3 text-sm font-bold transition-colors"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}
