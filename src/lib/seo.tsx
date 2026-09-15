import { site, faqs, type Pack } from "@/lib/content";

/** Renders a JSON-LD block (non-executable type, CSP-safe). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function travelAgencyLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.legalName,
    slogan: site.tagline,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "TC Road",
      addressLocality: "Thiruvananthapuram",
      addressRegion: "Kerala",
      postalCode: "695001",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Country", name: "India" },
    openingHours: "Mo-Sa 09:30-18:30",
  };
}

export function productLd(p: Pack) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: `${p.nightsMakkah} nights Makkah (${p.hotelMakkah}) + ${p.nightsMadinah} nights Madinah (${p.hotelMadinah}). Includes ${p.inclusions.join(", ")}.`,
    brand: { "@type": "Brand", name: site.name },
    offers: p.priceINR
      ? {
          "@type": "Offer",
          price: p.priceINR,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `${site.url}/packages/${p.slug}`,
        }
      : { "@type": "Offer", availability: "https://schema.org/InStock", url: `${site.url}/packages/${p.slug}` },
  };
}

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
