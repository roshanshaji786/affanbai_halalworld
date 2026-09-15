import type { Metadata } from "next";
import { PackageCard, SectionHeading } from "@/components/ui";
import { packages, site } from "@/lib/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Umrah Packages from Kerala & India",
  description:
    "Compare Halal World Umrah packages: premium short stay, classic 14-night and private family journeys. Visa, flights, halal meals, hotels and ziyarat included.",
};

export default async function Packages({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const s = t(locale);
  return (
    <section className="bg-starlattice">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading kicker={s.pkg.kicker} title={s.pkg.title} sub={s.pkg.sub} />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.slug} pack={p} locale={locale} />
          ))}
        </div>
        <p className="bg-ivory shadow-card mt-10 rounded-2xl border border-cocoa/10 p-6 text-sm text-ink/70">
          {locale === "ml"
            ? "ജമാഅത്ത്, കുടുംബ യാത്ര അല്ലെങ്കിൽ കസ്റ്റം ഗ്രൂപ്പ് വേണോ? WhatsApp-ൽ സന്ദേശം അയയ്ക്കൂ — 24 മണിക്കൂറിനുള്ളിൽ ഇനി ഇഷ്ടാനുസൃത യാത്ര ഒരുക്കാം: "
            : "Need a custom group — masjid jama'at, family function or corporate retreat? Message us on WhatsApp at "}
          <a className="text-cocoa font-bold" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
