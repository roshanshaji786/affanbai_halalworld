import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { IconCheck, IconPin, IconShield, IconUsers } from "@/components/Icons";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Halal World — Halal Travel Agency in Trivandrum, Kerala",
  description:
    "Halal World is a Trivandrum-based travel company crafting premium Umrah and halal-friendly journeys for families across India. Amanah, ihsan and transparent pricing.",
};

const values = [
  { icon: IconShield, t: "Amanah — Trust", d: "Your money, documents and family are a trust. We honour it with written inclusions and zero surprise charges." },
  { icon: IconCheck, t: "Ihsan — Excellence", d: "From coach cleanliness to hotel check-in speed, we sweat the details others ignore." },
  { icon: IconUsers, t: "Khidmah — Service", d: "Serving the guests of Allah is our honour. Every group leader is trained in care before logistics." },
];

export default function About() {
  return (
    <section className="bg-starlattice">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          kicker="Our Story"
          title="From Trivandrum, with love for the Ummah"
          sub="Halal World began with a simple conviction: a pilgrim's journey should be worship, not worry."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="text-ink/75 space-y-4 text-sm leading-relaxed sm:text-base">
            <p>
              Based in {site.cityFull}, we started by serving families from our own neighbourhood — parents,
              grandparents and first-time travellers who dreamed of the two Holy Mosques but feared the
              paperwork, the language and the unknown.
            </p>
            <p>
              So we built a company that removes every fear: visas prepared and filed for you, direct-group
              flights from Kochi and Calicut, hotels we have personally inspected within walking distance of
              the Haram, fully halal meals on every single day, and group leaders who speak your language —
              Malayalam, English and Urdu.
            </p>
            <p>
              Today pilgrims travel with us from across Kerala and India, and most return with their
              extended family the very next year. That trust is our only marketing.
            </p>
            <p className="bg-ivory shadow-card rounded-2xl border border-cocoa/10 p-5">
              <span className="text-cocoa flex items-center gap-2 font-bold">
                <IconPin className="text-gold h-5 w-5" /> Visit our office
              </span>
              <span className="mt-2 block text-sm">{site.address}</span>
              <span className="mt-1 block text-sm">{site.hours}</span>
            </p>
          </div>

          <div className="space-y-6">
            {values.map((v) => (
              <div key={v.t} className="bg-ivory shadow-card flex gap-5 rounded-2xl border border-cocoa/10 p-6">
                <span className="bg-cocoa text-gold-soft h-fit rounded-xl p-3">
                  <v.icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-cocoa-deep text-lg font-bold">{v.t}</h2>
                  <p className="text-ink/65 mt-1.5 text-sm leading-relaxed">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
