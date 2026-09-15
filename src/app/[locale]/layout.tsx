import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconWhatsApp } from "@/components/Icons";
import { site } from "@/lib/content";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ml") notFound();
  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      {/* Mobile-only floating WhatsApp — one thumb-tap to the office */}
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Halal World on WhatsApp"
        className="fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg md:hidden"
      >
        <IconWhatsApp className="h-7 w-7" />
      </a>
    </>
  );
}
