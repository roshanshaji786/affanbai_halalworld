import type { Metadata } from "next";
import type { ReactNode } from "react";
/* Self-hosted fonts (no third-party requests — privacy & CSP friendly) */
import "@fontsource/marcellus";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/amiri/400.css";
import { site } from "@/lib/content";
import { JsonLd, travelAgencyLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Halal World — Premium Umrah & Halal Travel from Kerala, India",
    template: `%s · Halal World`,
  },
  description:
    "Halal World, Trivandrum: premium Umrah packages from Kochi & Calicut with halal meals, Haram-near hotels, visa, flights, transfers and ziyarat. Travel through the earth with care.",
  keywords: [
    "Umrah packages Kerala",
    "Umrah from Kochi",
    "Umrah package price India",
    "Halal travel India",
    "Halal World Trivandrum",
    "Makkah Madinah tour Kerala",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Halal World — Premium Umrah & Halal Travel from Kerala, India",
    description:
      "Visa to ziyarat: halal meals, Haram-near hotels and caring group leaders. Departures from Kochi, Calicut & across India.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Halal World — Travel Through the Earth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Halal World — Premium Umrah & Halal Travel",
    description: "Premium Umrah packages from Kerala, India. Halal always.",
    images: ["/og.jpg"],
  },
  icons: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  robots: { index: true, follow: true },
  themeColor: "#3c1b10",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#3c1b10" />
      <body className="bg-ivory font-body text-ink antialiased">
        <a
          href="#main"
          className="bg-cocoa text-ivory sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
        <JsonLd data={travelAgencyLd()} />
      </body>
    </html>
  );
}
