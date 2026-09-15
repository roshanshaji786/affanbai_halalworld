import { describe, expect, it } from "vitest";
import { faqs, packages } from "./content";
import { breadcrumbLd, faqLd, productLd, travelAgencyLd } from "./seo";

describe("JSON-LD builders", () => {
  it("TravelAgency schema carries NAP data", () => {
    const ld = travelAgencyLd() as Record<string, unknown> & { address: Record<string, string> };
    expect(ld["@type"]).toBe("TravelAgency");
    expect(ld.telephone).toBe("+91 99470 32507");
    expect(ld.address.addressCountry).toBe("IN");
    expect(ld.address.addressLocality).toBe("Thiruvananthapuram");
  });

  it("Product schema carries INR offer for priced packages", () => {
    const ld = productLd(packages[0]) as { offers: { price: number; priceCurrency: string } };
    expect(ld["@type" as keyof typeof ld]).toBe("Product");
    expect(ld.offers.price).toBe(130000);
    expect(ld.offers.priceCurrency).toBe("INR");
  });

  it("FAQPage mirrors the faq list", () => {
    const ld = faqLd() as { mainEntity: unknown[] };
    expect(ld["@type" as keyof typeof ld]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(faqs.length);
  });

  it("Breadcrumb positions are sequential", () => {
    const ld = breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Packages", path: "/packages" },
    ]) as { itemListElement: { position: number }[] };
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2]);
  });
});
