import { describe, expect, it } from "vitest";
import { rateLimited, validIndianMobile } from "./leads";

describe("validIndianMobile", () => {
  it("accepts valid Indian mobiles (6-9 prefix, 10 digits)", () => {
    expect(validIndianMobile("9847012345")).toBe(true);
    expect(validIndianMobile("6282000000")).toBe(true);
    expect(validIndianMobile("98470 12345")).toBe(true); // spaces tolerated
  });
  it("rejects invalid numbers", () => {
    expect(validIndianMobile("1234567890")).toBe(false); // wrong prefix
    expect(validIndianMobile("984701234")).toBe(false); // 9 digits
    expect(validIndianMobile("98470123456")).toBe(false); // 11 digits
    expect(validIndianMobile("")).toBe(false);
    expect(validIndianMobile("abcdefghij")).toBe(false);
  });
});

describe("rateLimited", () => {
  it("allows up to max requests in the window, then blocks", () => {
    const ip = "test-ip-1";
    for (let i = 0; i < 5; i++) expect(rateLimited(ip, 5, 60_000)).toBe(false);
    expect(rateLimited(ip, 5, 60_000)).toBe(true);
  });
  it("tracks IPs independently", () => {
    expect(rateLimited("test-ip-2", 5, 60_000)).toBe(false);
  });
});
