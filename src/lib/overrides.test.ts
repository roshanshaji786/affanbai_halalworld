import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

// The store reads DATA_DIR at module evaluation — set it before the import runs.
const DIR = vi.hoisted(() => {
  process.env.DATA_DIR = "/tmp/hw-overrides-test";
  return "/tmp/hw-overrides-test";
});

import {
  getOverrides,
  ovAsset,
  ovBg,
  ovText,
  resetOverrideCache,
  setOverride,
  tg,
  tp,
  tx,
} from "./overrides";

const FILE = path.join(DIR, "content.json");

beforeEach(() => {
  mkdirSync(DIR, { recursive: true });
  writeFileSync(FILE, "{}");
  resetOverrideCache();
});

afterAll(() => rmSync(DIR, { recursive: true, force: true }));

describe("override store", () => {
  it("returns empty state when file is empty", () => {
    expect(getOverrides()).toEqual({});
    expect(ovText("text.en.hero.h1a")).toBeUndefined();
  });

  it("setOverride persists and reads back", () => {
    setOverride("text.en.hero.h1a", "Luxury");
    expect(ovText("text.en.hero.h1a")).toBe("Luxury");
    // cache must not serve stale data after a second write
    setOverride("text.en.hero.h1a", "Blessed");
    expect(ovText("text.en.hero.h1a")).toBe("Blessed");
  });

  it("null value removes the override", () => {
    setOverride("text.en.hero.h1a", "X");
    setOverride("text.en.hero.h1a", null);
    expect(ovText("text.en.hero.h1a")).toBeUndefined();
    expect("text.en.hero.h1a" in getOverrides()).toBe(false);
  });

  it("tx/tg/tp fall back to coded defaults", () => {
    expect(tx("en", "hero.h1a", "Premium")).toBe("Premium");
    setOverride("text.ml.hero.h1a", "പ്രീമിയം എഡിറ്റ്");
    expect(tx("ml", "hero.h1a", "Premium")).toBe("പ്രീമിയം എഡിറ്റ്");
    expect(tx("en", "hero.h1a", "Premium")).toBe("Premium"); // other locale untouched
    setOverride("text.global.arabicTagline", "X");
    expect(tg("arabicTagline", "fallback")).toBe("X");
    setOverride("text.pack.abc.title", "T");
    expect(tp("abc", "title", "orig")).toBe("T");
  });

  it("whitespace-only strings count as unset", () => {
    setOverride("text.en.hero.sub", "   ");
    expect(ovText("text.en.hero.sub")).toBeUndefined();
  });

  it("ovAsset only allows upload paths and https URLs", () => {
    setOverride("img.hero", "/api/editor/files/abc.jpg");
    expect(ovAsset("img.hero")).toBe("/api/editor/files/abc.jpg");
    setOverride("img.hero", "https://cdn.example.com/a.jpg");
    expect(ovAsset("img.hero")).toBe("https://cdn.example.com/a.jpg");
    setOverride("img.hero", "javascript:alert(1)");
    expect(ovAsset("img.hero")).toBeUndefined();
    setOverride("img.hero", "/images/makkah-clocktower.jpg");
    expect(ovAsset("img.hero")).toBeUndefined(); // arbitrary local paths rejected
  });

  it("ovBg builds cover/center styles", () => {
    setOverride("bg.hero", { color: "#112233", image: "/api/editor/files/bg.png" });
    expect(ovBg("hero")).toEqual({
      backgroundColor: "#112233",
      backgroundImage: 'url("/api/editor/files/bg.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
    setOverride("bg.hero", { color: "#112233", image: "" });
    expect(ovBg("hero")).toEqual({ backgroundColor: "#112233" });
    setOverride("bg.hero", { color: "", image: "" });
    expect(ovBg("hero")).toBeUndefined();
  });
});
