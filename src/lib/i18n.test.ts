import { describe, expect, it } from "vitest";
import { locales, t } from "./i18n";

const keys = (o: unknown, prefix = ""): string[] =>
  Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
    typeof v === "object" && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

describe("i18n", () => {
  it("exposes en and ml", () => {
    expect(locales).toEqual(["en", "ml"]);
  });

  it("ml dictionary has exactly the same keys as en", () => {
    expect(keys(t("ml")).sort()).toEqual(keys(t("en")).sort());
  });

  it("ml is actually translated (not a copy of en)", () => {
    const en = t("en") as unknown as Record<string, unknown>;
    const ml = t("ml") as unknown as Record<string, unknown>;
    expect(JSON.stringify(en.nav)).not.toBe(JSON.stringify(ml.nav));
    expect(JSON.stringify(en.hero)).not.toBe(JSON.stringify(ml.hero));
    expect(JSON.stringify(en.contact)).not.toBe(JSON.stringify(ml.contact));
  });

  it("falls back to en for unknown locales", () => {
    expect(t("xx").nav.home).toBe("Home");
  });

  it("why-us and stats arrays keep parity in length", () => {
    expect((t("ml").why.items as unknown[]).length).toBe((t("en").why.items as unknown[]).length);
    expect(t("ml").stats.length).toBe(t("en").stats.length);
  });
});
