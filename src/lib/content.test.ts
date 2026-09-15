import { describe, expect, it } from "vitest";
import { faqs, inr, packages, site, testimonials } from "./content";

describe("business content integrity", () => {
  it("package slugs are unique", () => {
    const slugs = packages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("flagship package matches the studio poster", () => {
    const f = packages[0];
    expect(f.slug).toBe("premium-short-stay-umrah");
    expect(f.priceINR).toBe(130000);
    expect(f.nightsMakkah).toBe(4);
    expect(f.nightsMadinah).toBe(3);
    expect(f.hotelMakkah).toMatch(/Anjum/i);
    expect(f.hotelMadinah).toMatch(/M[öo]venpick/i);
    expect(f.inclusions).toEqual(["Visa", "Flights", "Hotels", "Meals", "Transfers", "Sightseeing"]);
  });

  it("every package has 6 inclusions and a usable image key", () => {
    for (const p of packages) {
      expect(p.inclusions).toHaveLength(6);
      expect(["makkah", "madinah"]).toContain(p.image);
    }
  });

  it("INR formatting uses Indian digit grouping", () => {
    expect(inr(130000)).toBe("₹1,30,000");
    expect(inr(1000)).toBe("₹1,000");
  });

  it("contact facts are well-formed", () => {
    expect(site.phoneHref).toBe("tel:+919947032507");
    expect(site.whatsapp).toBe("https://wa.me/919947032507");
    expect(site.email).toContain("@");
    expect(site.url).toMatch(/^https:\/\//);
  });

  it("faqs and testimonials are non-empty", () => {
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    for (const f of faqs) {
      expect(f.q.length).toBeGreaterThan(10);
      expect(f.a.length).toBeGreaterThan(20);
    }
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
  });
});
