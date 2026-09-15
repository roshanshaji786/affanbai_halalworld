import type { Metadata } from "next";
import { PackageCard, SectionHeading } from "@/components/ui";
import { packages, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Umrah Packages from Kerala & India",
  description:
    "Compare Halal World Umrah packages: premium short stay, classic 14-night and private family journeys. Visa, flights, halal meals, hotels and ziyarat included.",
};

export default function Packages() {
  return (
    <section className="bg-starlattice">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          kicker="Curated Journeys"
          title="Umrah Packages"
          sub="Transparent, all-inclusive pricing in Indian Rupees. Can't see your dates? We build private departures on request."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.slug} pack={p} />
          ))}
        </div>
        <p className="bg-ivory shadow-card mt-10 rounded-2xl border border-cocoa/10 p-6 text-sm text-ink/70">
          Need a custom group — masjid jama'at, family function or corporate
          retreat? Message us on WhatsApp at{" "}
          <a className="text-cocoa font-bold" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            {site.phoneDisplay}
          </a>{" "}
          and we'll craft an itinerary within 24 hours.
        </p>
      </div>
    </section>
  );
}
