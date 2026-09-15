import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { inclusionIcon, IconCheck, IconWhatsApp } from "@/components/Icons";
import { inr, packages, site } from "@/lib/content";
import { JsonLd, breadcrumbLd, productLd } from "@/lib/seo";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> | Metadata {
  return params.then(({ slug }) => {
    const p = packages.find((x) => x.slug === slug);
    if (!p) return { title: "Package not found" };
    return {
      title: `${p.title} — ${p.priceINR ? inr(p.priceINR) : "Price on Request"}`,
      description: `${p.title}: ${p.nightsMakkah} nights at ${p.hotelMakkah} and ${p.nightsMadinah} nights at ${p.hotelMadinah}. Includes ${p.inclusions.join(", ").toLowerCase()}. Enquire with Halal World, Trivandrum.`,
    };
  });
}

export default async function PackageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = packages.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <section className="bg-starlattice">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-ink/60 text-xs font-semibold tracking-widest uppercase">
              <Link href="/" className="hover:text-gold">Home</Link> /{" "}
              <Link href="/packages" className="hover:text-gold">Packages</Link> /{" "}
              <span className="text-cocoa">{p.title}</span>
            </nav>
            <p className="text-gold mt-6 text-xs font-bold tracking-[0.25em] uppercase">{p.kicker}</p>
            <h1 className="font-display text-cocoa-deep mt-2 text-4xl sm:text-5xl">{p.title}</h1>
            <p className="text-ink/70 mt-3">{p.departure}</p>

            <div className="relative mt-8 h-72 overflow-hidden rounded-3xl shadow-lg sm:h-96">
              <Image
                src={p.image === "makkah" ? "/images/makkah-clocktower.jpg" : "/images/madinah-movenpick.jpg"}
                alt={p.title + " — hotel and holy city view"}
                fill
                sizes="(min-width:1024px) 55vw, 92vw"
                className="object-cover"
              />
            </div>

            <h2 className="font-display text-cocoa-deep mt-10 text-2xl">What's included</h2>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {p.inclusions.map((inc) => (
                <li key={inc} className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
                  <span className="text-cocoa">{inclusionIcon(inc, "h-6 w-6")}</span>
                  <span className="text-cocoa-deep text-sm font-bold">{inc}</span>
                </li>
              ))}
            </ul>

            {p.note && <p className="text-ink/55 mt-6 text-xs italic">{p.note}</p>}
          </div>

          <aside className="lg:pt-24">
            <div className="bg-cocoa shadow-lift rounded-3xl p-7">
              <h2 className="text-gold-soft text-xs font-bold tracking-[0.25em] uppercase">Stay Plan</h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-gold-soft text-sm font-bold">Makkah · {p.nightsMakkah} nights</p>
                  <p className="text-ivory mt-1 text-sm">{p.hotelMakkah}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-gold-soft text-sm font-bold">Madinah · {p.nightsMadinah} nights</p>
                  <p className="text-ivory mt-1 text-sm">{p.hotelMadinah}</p>
                </div>
              </div>
              <div className="border-ivory/20 mt-6 border-t pt-5">
                <p className="text-ivory/60 text-xs font-semibold tracking-widest uppercase">Package price</p>
                <p className="font-display text-gold-soft mt-1 text-4xl">
                  {p.priceINR ? inr(p.priceINR) : "On request"}
                </p>
                <p className="text-ivory/60 mt-1 text-xs">per person · instalments available</p>
              </div>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-cocoa-deep hover:bg-gold-soft mt-6 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-colors"
              >
                <IconWhatsApp className="h-5 w-5" /> Reserve on WhatsApp
              </a>
              <Link
                href="/contact"
                className="text-gold-soft mt-3 block rounded-full border-2 border-white/25 py-3 text-center text-sm font-bold hover:border-white/50"
              >
                Send Enquiry Form
              </Link>
              <ul className="text-ivory/70 mt-5 space-y-2 text-xs">
                {["Seats limited per departure", "Passport must be valid 6+ months", "Prices subject to airline & forex variation"].map((t) => (
                  <li key={t} className="flex gap-2"><IconCheck className="text-gold-soft h-4 w-4 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd data={productLd(p)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Packages", path: "/packages" }, { name: p.title, path: `/packages/${p.slug}` }])} />
    </>
  );
}
