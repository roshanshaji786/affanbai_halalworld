import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Halal World — Umrah Enquiry, Trivandrum",
  description:
    "Enquire about Umrah packages from Kerala: phone, WhatsApp or the enquiry form. Same-day replies from our Trivandrum office.",
};

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <section className="bg-starlattice">
      <ContactPage locale={locale} />
    </section>
  );
}
