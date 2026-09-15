/**
 * Single source of truth for business facts.
 * Edit this file to update prices, phones, packages — no component changes needed.
 */

export const site = {
  name: "Halal World",
  legalName: "Halal World Travels",
  tagline: "Travel Through the Earth",
  arabicTagline: "سِيحُوا فِي الْأَرْضِ",
  city: "Trivandrum",
  cityFull: "Thiruvananthapuram, Kerala, India",
  phoneDisplay: "+91 99470 32507",
  phoneHref: "tel:+919947032507",
  whatsapp: "https://wa.me/919947032507",
  email: "care@halalworld.in",
  address: "Halal World, TC Road, Trivandrum, Kerala 695001, India",
  hours: "Mon – Sat · 9:30 AM – 6:30 PM IST",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.halalworld.in",
} as const;

export type Pack = {
  slug: string;
  title: string;
  kicker: string;
  route: string[];
  departure: string;
  hotelMakkah: string;
  nightsMakkah: number;
  hotelMadinah: string;
  nightsMadinah: number;
  priceINR: number | null; // null = "on request"
  note?: string;
  inclusions: string[];
  image: "makkah" | "madinah";
};

export const packages: Pack[] = [
  {
    slug: "premium-short-stay-umrah",
    title: "Premium Short Stay Umrah",
    kicker: "Flagship Departure · 17 Oct",
    route: ["COK", "JED", "Makkah", "Madinah", "JED"],
    departure: "17 October · Kochi (COK) → Jeddah (JED)",
    hotelMakkah: "Anjum Makkah",
    nightsMakkah: 4,
    hotelMadinah: "Anwar Al Madinah Mövenpick",
    nightsMadinah: 3,
    priceINR: 130000,
    inclusions: ["Visa", "Flights", "Hotels", "Meals", "Transfers", "Sightseeing"],
    image: "makkah",
  },
  {
    slug: "umrah-classic-14n",
    title: "Umrah Classic — 14 Nights",
    kicker: "Most Popular",
    route: ["COK", "JED", "Makkah", "Madinah", "JED"],
    departure: "Monthly departures · Kochi / Calicut",
    hotelMakkah: "Hilton Suites Makkah",
    nightsMakkah: 8,
    hotelMadinah: "Dar Al Taqwa",
    nightsMadinah: 6,
    priceINR: null,
    note: "Sample itinerary — final hotels confirmed at booking.",
    inclusions: ["Visa", "Flights", "Hotels", "Meals", "Transfers", "Sightseeing"],
    image: "madinah",
  },
  {
    slug: "umrah-family-private",
    title: "Private Family Umrah",
    kicker: "Tailor-made",
    route: ["Any IN airport", "JED", "Makkah", "Madinah", "JED"],
    departure: "Your dates · any major Indian airport",
    hotelMakkah: "Your choice (Haram-view on request)",
    nightsMakkah: 5,
    hotelMadinah: "Your choice (near Rawdah)",
    nightsMadinah: 4,
    priceINR: null,
    note: "Sample itinerary — built around your family's schedule.",
    inclusions: ["Visa", "Flights", "Hotels", "Meals", "Transfers", "Sightseeing"],
    image: "makkah",
  },
];

/** Sample testimonials — replace with real guest reviews before launch. */
export const testimonials = [
  {
    name: "Rasheed K.",
    place: "Kochi, Kerala",
    text: "From visa to ziyarat, everything was handled with care. The hotel in Makkah was minutes from the Haram — my parents could walk for every prayer.",
  },
  {
    name: "Fathima S.",
    place: "Trivandrum, Kerala",
    text: "As a first-time traveller I was nervous. The group leader guided us at every step, and meals were always halal and hot. Felt completely safe.",
  },
  {
    name: "Ismail M.",
    place: "Kozhikode, Kerala",
    text: "Transparent pricing, no last-minute surprises. The Madinah ziyarat was beautifully organised. We have already booked again for next year.",
  },
];

export const faqs = [
  {
    q: "Which documents do I need for an Umrah visa?",
    a: "A passport valid for at least 6 months, passport-size photographs on white background, PAN/Aadhaar for KYC, and for women and minors travelling with family, proof of relationship. Our team prepares and files the visa application for you.",
  },
  {
    q: "Do you arrange halal meals throughout the journey?",
    a: "Yes. Every package includes fully halal meals, and our group leaders know verified halal restaurants in Makkah and Madinah for any meals outside the hotel.",
  },
  {
    q: "Which Indian airports do you depart from?",
    a: "Regular group departures run from Kochi (COK) and Calicut (CCJ). Private and family packages can start from Trivandrum, Chennai, Bengaluru, Mumbai or any major Indian airport.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Yes. Reserve your seat with an advance and clear the balance in instalments up to 21 days before departure. UPI, bank transfer and cards are accepted.",
  },
  {
    q: "Are women travellers and families accommodated respectfully?",
    a: "Absolutely. Family rooms, ladies' seating in coaches, and experienced family-friendly group leaders are standard on every Halal World departure.",
  },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
