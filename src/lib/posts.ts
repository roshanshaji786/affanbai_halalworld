export type PostSection = { h?: string; p?: string[]; list?: string[] };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tag: string;
  readMins: number;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "umrah-from-kerala-2026-cost-guide",
    title: "Umrah from Kerala in 2026: Flights, Visa & a Realistic Cost Guide",
    excerpt:
      "What does an Umrah actually cost from Kochi or Calicut? We break down flights, hotels, visa and meals — and where the price really moves.",
    date: "2026-08-20",
    author: "Halal World Team",
    tag: "Planning",
    readMins: 6,
    sections: [
      {
        p: [
          "Every week, families across Kerala ask us the same first question: “how much should we keep aside for Umrah?” The honest answer is: it depends on three dials — season, hotel distance from the Haram, and group size. Here is how to think about each.",
        ],
      },
      {
        h: "Flights from Kochi & Calicut",
        p: [
          "Kochi (COK) and Calicut (CCJ) both see direct services to Jeddah (JED) of roughly four to five hours, which is why Kerala pilgrims rarely need a Gulf or metro transit. Direct seats in peak season (school holidays, Ramadan, December) cost meaningfully more than in the quieter months.",
          "Booking as a confirmed group, rather than individual tickets, is the single biggest flight saving we can offer — airlines release group fares that individuals simply cannot see.",
        ],
      },
      {
        h: "The visa, simply",
        p: [
          "Umrah visas are issued through Saudi-accredited channels. As pilgrims you never touch the portal yourselves — an accredited agency prepares and files it with your passport, photograph and basic KYC. Allow a couple of weeks end-to-end in normal season.",
        ],
      },
      {
        h: "Where the budget really moves: hotels",
        p: [
          "A room 800 metres from the Haram and a room 3 kilometres away can differ by tens of thousands of rupees over a week — yet the nearer one returns its cost in ease for elderly parents who can walk to every prayer.",
          "This is why our flagship Premium Short Stay uses the Anjum Makkah and the Anwar Al Madinah Mövenpick: close, calm, and family-friendly.",
        ],
      },
      {
        h: "A realistic 2026 budget, per person",
        list: [
          "Economy (good hotels, short walks, group fares): roughly ₹85,000 – ₹1,10,000",
          "Premium (Haram-near 4–5★, like our 17 Oct departure): roughly ₹1,20,000 – ₹1,60,000",
          "Ramadan / peak season: add a significant seasonal premium on both",
        ],
        p: [
          "Treat these as planning bands, not quotations — airline and forex movement changes them monthly. What should never change is transparency: one written price with visa, flights, hotels, halal meals, transfers and ziyarat included.",
        ],
      },
      {
        h: "The bottom line",
        p: [
          "Fix your season first, then your hotel distance, then your group size — in that order. And always insist on a written inclusion list. If a price looks too good to be true, the missing item is usually the one you cared about most.",
        ],
      },
    ],
  },
  {
    slug: "umrah-visa-documents-india-checklist",
    title: "Umrah Visa Documents from India — The Complete Checklist",
    excerpt:
      "Passport rules, photographs, KYC and family certificates: the exact documents we check before filing, so your visa never surprises you.",
    date: "2026-08-28",
    author: "Halal World Team",
    tag: "Visa",
    readMins: 5,
    sections: [
      {
        p: [
          "Most visa delays we see are not rejections — they are avoidable do-overs. Keep this checklist ready and your application moves in one clean pass.",
        ],
      },
      {
        h: "The passport",
        list: [
          "Validity of at least 6 months from your date of travel",
          "At least two blank facing pages",
          "No damage to the laminate or machine-readable zone",
          "Old passport, if any, carried with the new one",
        ],
      },
      {
        h: "Photographs & KYC",
        list: [
          "Recent passport-size photos on a plain white background (no shadows, no spectacles glare)",
          "Aadhaar and PAN details for KYC, matching the passport spelling exactly",
          "A working Indian mobile number and email — every update rides on these",
        ],
      },
      {
        h: "For families",
        list: [
          "Marriage certificate for couples travelling together",
          "Birth certificates for minors",
          "If a minor travels with one parent only, a consent note from the other parent",
        ],
      },
      {
        h: "Health & vaccination",
        p: [
          "Saudi health requirements for pilgrims commonly include meningococcal (ACYW135) vaccination with a valid certificate; seasonal polio doses may apply depending on advisories. Your doctor or a travel clinic can issue the international certificate — we remind every group well ahead of time.",
        ],
      },
      {
        h: "Women travelling without a mahram",
        p: [
          "Current Saudi rules permit women to perform Umrah without a mahram. Many Kerala families still prefer to travel together, and our groups are structured family-first either way — ladies' coach seating and family rooms as standard.",
        ],
      },
      {
        h: "One golden rule",
        p: [
          "Name spelling must be identical across passport, tickets and visa. A single transposed letter can cost a day at the airport. We triple-check this before any ticket is issued.",
        ],
      },
    ],
  },
  {
    slug: "makkah-first-or-madinah-first",
    title: "Makkah First or Madinah First? Planning Your Umrah Route",
    excerpt:
      "Jeddah landing, Makkah-Madinah order, night counts and ziyarat days — how we pace a 7-night journey so worship never feels rushed.",
    date: "2026-09-05",
    author: "Halal World Team",
    tag: "Itinerary",
    readMins: 5,
    sections: [
      {
        p: [
          "Land in Jeddah and you have a choice most first-timers never consider: drive ~95 km straight to Makkah for Umrah, or rest first in Madinah and come south later. Both are done every day; here is how we decide for each family.",
        ],
      },
      {
        h: "Why most groups go Makkah first",
        p: [
          "Completing Umrah immediately lifts the weight of ihram restrictions and settles the heart. For short stays of seven nights or fewer — like our 17 Oct premium departure — Makkah first is the calmer rhythm: 4 nights Makkah, then the ~450 km coach ride north for 3 nights Madinah, flying home from Madinah or returning to Jeddah.",
        ],
      },
      {
        h: "When Madinah first makes sense",
        p: [
          "Elderly pilgrims landing on a tiring overnight flight sometimes prefer a gentle first day in Madinah's quiet before the intensity of Makkah. On longer 12–14 night journeys we build exactly that: rest, Rawdah, then Makkah with days to spare.",
        ],
      },
      {
        h: "How many nights is enough?",
        list: [
          "Makkah: 4 nights minimum to pray, repeat Umrah if you wish, and ziyarat (Jabal al-Nour, Mina, Muzdalifah)",
          "Madinah: 3 nights minimum for Rawdah visits and Quba, Uhud ziyarat",
          "Add buffer nights in Makkah for large families — mornings with grandparents are slower and holier",
        ],
      },
      {
        h: "Ziyarat is not sightseeing",
        p: [
          "Done well, ziyarat is storytelling: the seerah at Uhud, the patience at Ta'if gate, the mercy at Quba. Our leaders brief every stop before you step off the coach, so each place lands in the heart, not just the camera.",
        ],
      },
      {
        h: "The takeaway",
        p: [
          "Short stay? Makkah first. Long stay or elderly-first family? Consider Madinah first. Either way, fix hotels within walking distance of the Haram — distance is the one cost you pay five times a day.",
        ],
      },
    ],
  },
];
