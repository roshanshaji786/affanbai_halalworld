/**
 * ONE FILE TO EDIT.
 * Brand, contact details, packages, city pages, FAQs and guides all live here.
 * Every page is generated from this data at build time.
 *
 * Items marked TODO are placeholders until the real details are confirmed.
 */

export const site = {
  name: 'Halal World',
  legalName: 'Halal World Tours & Travels', // TODO: confirm registered business name
  tagline: 'Travel through the earth',
  // TODO: replace with the real domain before going live (used for canonical URLs, sitemap and schema).
  url: 'https://www.halalworld.in',
  phone: '+91 99470 32507',
  phoneE164: '+919947032507',
  whatsapp: '919947032507',
  email: 'info@halalworld.in', // TODO: confirm email
  address: {
    street: '', // TODO: full street address exactly as on Google Maps
    locality: 'Thiruvananthapuram',
    region: 'Kerala',
    postalCode: '695001', // TODO: confirm PIN code
    country: 'IN',
  },
  geo: { lat: 8.5241, lng: 76.9366 }, // TODO: set to the office pin from Google Maps
  mapsUrl: 'https://maps.google.com/?q=Halal+World+Trivandrum', // TODO: paste the Google Business Profile link
  hours: [
    // TODO: confirm opening hours
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'], opens: '09:30', closes: '19:00' },
    { days: ['Friday'], opens: '14:30', closes: '19:00' },
  ],
  hoursText: 'Sat to Thu 9:30 am to 7 pm, Fri 2:30 pm to 7 pm', // TODO: keep in sync with hours above
  social: {
    instagram: '', // TODO
    facebook: '', // TODO
    youtube: '', // TODO
  },
  // TODO: add the numbers you hold. Empty values are hidden on the site.
  registrations: [
    { label: 'GST registered', value: '' },
    { label: 'IATA accredited', value: '' },
    { label: 'Ministry of Tourism approved', value: '' },
  ],
  airports: [
    { code: 'TRV', name: 'Thiruvananthapuram International Airport' },
    { code: 'COK', name: 'Cochin International Airport' },
  ],
};

export type Inclusion = 'visa' | 'flights' | 'hotels' | 'meals' | 'transfers' | 'ziyarat' | 'guide' | 'zamzam' | 'insurance';

export const inclusionInfo: Record<Inclusion, { title: string; text: string }> = {
  visa: { title: 'Umrah visa', text: 'We file your Saudi Umrah e-visa and check every document before it goes in.' },
  flights: { title: 'Return flights', text: 'From Thiruvananthapuram (TRV) or Kochi (COK) to Jeddah or Madinah.' },
  hotels: { title: 'Hotels near the Haram', text: 'Rooms close to Masjid al-Haram and Masjid an-Nabawi, chosen for walking distance.' },
  meals: { title: 'Meals', text: 'Indian and Kerala-style meals on full-board packages, so you eat well between prayers.' },
  transfers: { title: 'Transfers', text: 'Air-conditioned coaches for the airport, Makkah to Madinah and every ziyarat.' },
  ziyarat: { title: 'Ziyarat', text: 'Guided visits to the historic sites of Makkah and Madinah.' },
  guide: { title: 'Group guide', text: 'A Malayalam-speaking guide who walks first-timers through every step of Umrah.' },
  zamzam: { title: 'Zamzam', text: 'Help with your Zamzam allowance on the flight home.' },
  insurance: { title: 'Travel insurance', text: 'Medical cover for the trip, included where the airline or visa requires it.' },
};

export type Package = {
  slug: string;
  name: string;
  short: string;
  badge?: string;
  days: number;
  makkahNights: number;
  madinahNights: number;
  hotelClass: string;
  hotelExamples: string;
  distance: string;
  room: string;
  meals: string;
  /** Starting price per person in INR. null shows "Ask for this month's fare". */
  startsFrom: number | null;
  bestFor: string;
  highlights: string[];
  includes: Inclusion[];
  excludes: string[];
  description: string;
};

// TODO: replace with the tiers, hotels and fares you actually sell.
export const packages: Package[] = [
  {
    slug: 'premium-short-stay',
    name: 'Premium Short Stay Umrah',
    short: 'Eight days, five-star hotels steps from the Haram. Built for people who can only take a week off.',
    badge: 'Most popular',
    days: 8,
    makkahNights: 4,
    madinahNights: 3,
    hotelClass: '5 star',
    hotelExamples: 'Anjum Makkah and Anwar Al Madinah Mövenpick, or similar',
    distance: 'About 100 to 300 m from the Haram',
    room: 'Double, triple or quad sharing',
    meals: 'Breakfast and dinner',
    startsFrom: 130000,
    bestFor: 'Working professionals and couples',
    highlights: ['Five-star hotels close to both Harams', 'Short leave, full Umrah', 'Ziyarat in Makkah and Madinah'],
    includes: ['visa', 'flights', 'hotels', 'meals', 'transfers', 'ziyarat', 'guide'],
    excludes: ['Personal shopping and laundry', 'Single room supplement', 'Anything not listed as included'],
    description:
      'Our Premium Short Stay Umrah fits a complete Umrah and visits to both holy cities into eight days. You stay in five-star hotels a short walk from Masjid al-Haram and Masjid an-Nabawi, so you spend your time in prayer, not in traffic.',
  },
  {
    slug: 'family',
    name: 'Family Umrah',
    short: 'Fifteen unhurried days with family rooms, extra care for elders and children, and a guide who knows your group.',
    days: 15,
    makkahNights: 8,
    madinahNights: 6,
    hotelClass: '4 star',
    hotelExamples: 'Hand-picked four-star hotels within walking distance',
    distance: 'About 300 to 600 m from the Haram',
    room: 'Family rooms and connecting rooms on request',
    meals: 'Breakfast, lunch and dinner',
    startsFrom: null,
    bestFor: 'Families with elders or young children',
    highlights: ['Wheelchair help for elders on request', 'Family and connecting rooms', 'Relaxed pace with rest days'],
    includes: ['visa', 'flights', 'hotels', 'meals', 'transfers', 'ziyarat', 'guide', 'zamzam'],
    excludes: ['Personal expenses', 'Wheelchair hire charges inside the Haram', 'Anything not listed as included'],
    description:
      'Family Umrah gives you fifteen days at a gentle pace, with family rooms, meals for all three times of the day and a guide who looks after elders and first-timers. It suits households travelling together from Kerala.',
  },
  {
    slug: 'value',
    name: 'Value Umrah',
    short: 'A complete Umrah at an honest price, with clean three-star hotels, full board and a hotel shuttle.',
    days: 15,
    makkahNights: 9,
    madinahNights: 5,
    hotelClass: '3 star',
    hotelExamples: 'Clean three-star hotels with a shuttle to the Haram',
    distance: 'About 800 m to 1.5 km, with shuttle',
    room: 'Quad or quint sharing',
    meals: 'Breakfast, lunch and dinner',
    startsFrom: null,
    bestFor: 'First-time pilgrims and groups on a budget',
    highlights: ['Lowest fare without cutting essentials', 'Full board, Kerala-style food', 'Group departures every month'],
    includes: ['visa', 'flights', 'hotels', 'meals', 'transfers', 'ziyarat', 'guide'],
    excludes: ['Personal expenses', 'Room upgrades', 'Anything not listed as included'],
    description:
      'Value Umrah keeps the fare low without cutting what matters: your visa, return flights, three meals a day, transfers, ziyarat and a guide are all included. Hotels are a short shuttle ride from the Haram.',
  },
  {
    slug: 'ramadan',
    name: 'Ramadan Umrah',
    short: 'Spend the last nights of Ramadan in Makkah, with suhoor and iftar arranged and hotels booked early.',
    badge: 'Book early',
    days: 15,
    makkahNights: 9,
    madinahNights: 5,
    hotelClass: '4 or 5 star',
    hotelExamples: 'Hotels booked months ahead for the busiest season',
    distance: 'About 100 to 600 m from the Haram',
    room: 'Double, triple or quad sharing',
    meals: 'Suhoor and iftar',
    startsFrom: null,
    bestFor: 'Pilgrims seeking the last ten nights',
    highlights: ['Last ten nights options', 'Suhoor and iftar arranged', 'Rooms secured before prices rise'],
    includes: ['visa', 'flights', 'hotels', 'meals', 'transfers', 'ziyarat', 'guide', 'zamzam'],
    excludes: ['Personal expenses', 'Itikaf arrangements inside the Haram', 'Anything not listed as included'],
    description:
      'Ramadan Umrah places you in Makkah for the most blessed nights of the year. Hotels and flights fill up months in advance, so we hold rooms early and arrange suhoor and iftar for the group.',
  },
  {
    slug: 'land-only',
    name: 'Umrah Land Package',
    short: 'Already have your visa or tickets? We handle hotels, transfers, ziyarat and support on the ground.',
    days: 10,
    makkahNights: 5,
    madinahNights: 4,
    hotelClass: '3 to 5 star, your choice',
    hotelExamples: 'Choose any hotel tier',
    distance: 'Depends on the hotel you choose',
    room: 'Any room type',
    meals: 'Optional',
    startsFrom: null,
    bestFor: 'Gulf residents and travellers with their own flights',
    highlights: ['Pick only what you need', 'Works with your own flights', 'Support on the ground in Saudi Arabia'],
    includes: ['hotels', 'transfers', 'ziyarat'],
    excludes: ['Flights', 'Visa (we can add it)', 'Meals unless chosen'],
    description:
      'The Umrah Land Package is for pilgrims who already have flights or a visa. We book your hotels in Makkah and Madinah, arrange every transfer and ziyarat, and stay reachable on WhatsApp throughout.',
  },
];

export type ItineraryDay = { day: string; title: string; text: string };

export function itinerary(p: Package): ItineraryDay[] {
  const days: ItineraryDay[] = [];
  const fly = p.includes.includes('flights');
  days.push({
    day: 'Day 1',
    title: fly ? 'Fly from Kerala, perform Umrah' : 'Arrive in Jeddah, perform Umrah',
    text: fly
      ? 'Wear ihram at home or before the miqat, fly from TRV or COK to Jeddah, then travel by coach to your Makkah hotel. Your guide leads the group through Tawaf and Sa’i.'
      : 'Meet our team at the airport and travel by coach to your Makkah hotel. Your guide leads the group through Tawaf and Sa’i.',
  });
  const m = p.makkahNights;
  if (m >= 2) {
    days.push({
      day: m > 2 ? `Days 2 to ${m}` : 'Day 2',
      title: 'Prayers in Makkah and ziyarat',
      text: 'Pray in Masjid al-Haram. On one morning the group visits Jabal al-Nour, Jabal Thawr, Arafat, Muzdalifah and Mina with the guide.',
    });
  }
  days.push({
    day: `Day ${m + 1}`,
    title: 'Travel to Madinah',
    text: 'Check out after Fajr and travel to Madinah by coach or the Haramain high-speed train, depending on your package.',
  });
  const end = m + p.madinahNights;
  days.push({
    day: end > m + 2 ? `Days ${m + 2} to ${end}` : `Day ${m + 2}`,
    title: 'Madinah and ziyarat',
    text: 'Pray in Masjid an-Nabawi and visit Rawdah with a Nusuk permit. Ziyarat to Quba Mosque, Uhud and Masjid al-Qiblatayn.',
  });
  days.push({
    day: `Day ${end + 1}`,
    title: fly ? 'Fly home' : 'Departure',
    text: fly
      ? 'Transfer to the airport and fly back to Kerala with your Zamzam.'
      : 'Transfer to Madinah or Jeddah airport for your onward flight.',
  });
  return days;
}

export type City = {
  slug: string;
  name: string;
  altName?: string;
  airport: string;
  airportCode: string;
  airportNote: string;
  nearby: string[];
  intro: string;
  why: string;
  faqs: { q: string; a: string }[];
};

export const cities: City[] = [
  {
    slug: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    altName: 'Trivandrum',
    airport: 'Thiruvananthapuram International Airport',
    airportCode: 'TRV',
    airportNote: 'Our office is in Trivandrum, so you can meet us before you fly and we can see you off at TRV.',
    nearby: ['Kazhakoottam', 'Attingal', 'Varkala', 'Neyyattinkara', 'Nedumangad', 'Kattakada', 'Balaramapuram', 'Nagercoil'],
    intro:
      'Halal World is a Trivandrum travel agency, so pilgrims from Thiruvananthapuram get our office, our guides and our phone line in their own city. Packages leave from Thiruvananthapuram International Airport (TRV) with connections to Jeddah and Madinah.',
    why: 'You fill in your forms with us face to face, hand over documents in person, and meet the rest of your group at a briefing before departure.',
    faqs: [
      {
        q: 'Do Umrah flights leave directly from Trivandrum?',
        a: 'Most Umrah journeys from TRV connect through a Gulf hub such as Dubai, Abu Dhabi, Doha or Muscat. When a direct or faster flight from Kochi works better, we offer that too and help with travel to COK.',
      },
      {
        q: 'Can I visit your office in Trivandrum?',
        a: 'Yes. Call or WhatsApp us first so the right person is free to sit with you.',
      },
      {
        q: 'Do you hold a pre-departure class in Trivandrum?',
        a: 'Yes. Every group gets a briefing on the rites of Umrah, packing and travel days before departure.',
      },
    ],
  },
  {
    slug: 'kochi',
    name: 'Kochi',
    altName: 'Cochin',
    airport: 'Cochin International Airport',
    airportCode: 'COK',
    airportNote: 'Cochin has the widest choice of Gulf and Saudi connections in Kerala, which often means shorter journeys.',
    nearby: ['Ernakulam', 'Aluva', 'Perumbavoor', 'Kothamangalam', 'Muvattupuzha', 'Angamaly', 'Thrissur', 'Kottayam'],
    intro:
      'Pilgrims from Kochi and central Kerala can start their Umrah from Cochin International Airport (COK), which has more Gulf and Saudi connections than any other airport in the state. Halal World arranges the full journey, from visa to hotels near the Haram.',
    why: 'We handle your documents over WhatsApp and courier, and our team meets the group at COK on departure day.',
    faqs: [
      {
        q: 'Are there flights from Kochi to Jeddah?',
        a: 'Yes. Cochin has frequent connections to Jeddah and Madinah through the Gulf, and some seasons have direct flights. We choose the routing with the shortest total journey.',
      },
      {
        q: 'I live in Kochi. Do I need to visit your Trivandrum office?',
        a: 'No. You can share documents on WhatsApp and pay online. We meet you at the airport on the day you fly.',
      },
      {
        q: 'Which package suits a family from Ernakulam?',
        a: 'Most families choose our Family Umrah for its rest days and family rooms. Tell us who is travelling and we will suggest the right one.',
      },
    ],
  },
  {
    slug: 'kollam',
    name: 'Kollam',
    altName: 'Quilon',
    airport: 'Thiruvananthapuram International Airport',
    airportCode: 'TRV',
    airportNote: 'Kollam is about 70 km from TRV, so most of our Kollam pilgrims fly from Trivandrum.',
    nearby: ['Karunagappally', 'Kottarakkara', 'Punalur', 'Chathannoor', 'Paravur', 'Sasthamcotta', 'Kottiyam', 'Kayamkulam'],
    intro:
      'Families in Kollam are a short drive from our Trivandrum office and from Thiruvananthapuram International Airport (TRV). Halal World plans complete Umrah packages for Kollam pilgrims, with visa, flights, hotels near the Haram and a guide.',
    why: 'You can visit us in Trivandrum or send documents on WhatsApp, and we can arrange a vehicle from Kollam to the airport for your group.',
    faqs: [
      {
        q: 'Which airport do Kollam pilgrims fly from?',
        a: 'Usually Thiruvananthapuram (TRV), about 70 km away. Kochi (COK) is an option when its flights suit your dates better.',
      },
      {
        q: 'Can you arrange travel from Kollam to the airport?',
        a: 'Yes, we can book a vehicle for your family or group. Just ask when you book.',
      },
      {
        q: 'Do you have group departures for Kollam?',
        a: 'Kollam pilgrims join our regular Trivandrum groups, so you travel with families from the same part of Kerala.',
      },
    ],
  },
];

export const faqs = [
  {
    q: 'What documents do I need for an Umrah visa?',
    a: 'A passport valid for at least six months, a recent photo on a white background and any vaccination certificate currently required. Rules change, so we send you the up-to-date checklist when you enquire.',
  },
  {
    q: 'How long does the Umrah visa take?',
    a: 'Usually a few working days once your documents are complete. Apply at least three to four weeks before you plan to fly, and earlier for Ramadan.',
  },
  {
    q: 'Can women travel for Umrah without a mahram?',
    a: 'Saudi rules on this have changed in recent years. Tell us who is travelling and we will explain what applies today and how our groups support women travellers.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Yes. You pay an advance to hold your seat and the balance before the visa is filed. We give a written receipt for every payment.',
  },
  {
    q: 'Is the price per person?',
    a: 'Yes. Prices are per person and depend on room sharing, the season and your departure airport. We confirm the exact fare in writing before you pay.',
  },
  {
    q: 'Do you help elderly pilgrims?',
    a: 'Yes. We arrange wheelchairs on request, keep elders in hotels with short walks, and our guide checks on them every day.',
  },
];

export type Guide = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string[]; list?: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: 'how-to-perform-umrah',
    title: 'How to perform Umrah, step by step',
    description: 'A simple guide to the four rites of Umrah: ihram, tawaf, sa’i and cutting the hair, for pilgrims travelling from Kerala.',
    sections: [
      {
        heading: '1. Ihram',
        body: [
          'Ihram is the sacred state you enter before crossing the miqat. Men wear two plain white sheets; women wear modest everyday clothes that leave the face and hands uncovered.',
          'Make your intention (niyyah) for Umrah and begin reciting the Talbiyah: Labbayk Allahumma Labbayk. Pilgrims flying from India usually enter ihram before take-off or on the plane before the miqat.',
        ],
      },
      {
        heading: '2. Tawaf',
        body: [
          'At Masjid al-Haram, walk around the Kaaba seven times, anticlockwise, starting and ending at the line of the Black Stone. Stop the Talbiyah when you begin tawaf.',
          'After tawaf, pray two rak’ahs behind Maqam Ibrahim if there is space, or anywhere in the mosque, then drink Zamzam water.',
        ],
      },
      {
        heading: '3. Sa’i',
        body: [
          'Walk seven times between the hills of Safa and Marwah, starting at Safa and finishing at Marwah. Men jog lightly between the green lights.',
        ],
      },
      {
        heading: '4. Halq or taqsir',
        body: [
          'Men shave the head (halq) or shorten the hair (taqsir); women cut a fingertip’s length from the end of their hair. Your Umrah is now complete and the restrictions of ihram are lifted.',
        ],
      },
      {
        heading: 'Things to avoid in ihram',
        body: ['While in ihram, avoid the following until your Umrah is complete:'],
        list: [
          'Perfume or scented soap',
          'Cutting hair or nails',
          'Stitched clothing and head covering, for men',
          'Face veil and gloves, for women',
          'Arguing, hunting and marital relations',
        ],
      },
    ],
  },
  {
    slug: 'umrah-checklist',
    title: 'Umrah packing and documents checklist',
    description: 'Everything to pack for Umrah from India: documents, ihram, clothes, medicines and the apps you will need.',
    sections: [
      {
        heading: 'Documents',
        body: ['Keep these in one waterproof pouch and share scans with your family:'],
        list: [
          'Passport valid for at least six months',
          'Printed Umrah visa and flight tickets',
          'Hotel vouchers from us',
          'Vaccination certificates currently required',
          'Two passport photos',
          'A copy of your Aadhaar and an emergency contact card',
        ],
      },
      {
        heading: 'Clothing',
        body: ['Pack light and modest:'],
        list: [
          'Two sets of ihram for men, plus an ihram belt',
          'Comfortable abayas or loose clothing for women',
          'Soft sandals that are easy to slip off',
          'A light shawl for air-conditioned mosques',
        ],
      },
      {
        heading: 'Health and comfort',
        body: ['The days involve a lot of walking:'],
        list: [
          'Your regular medicines with prescriptions',
          'Unscented sunscreen, lip balm and soap (for ihram)',
          'A small foldable prayer mat',
          'A refillable water bottle and an umbrella for the sun',
        ],
      },
      {
        heading: 'Phone and apps',
        body: ['Install these before you fly:'],
        list: [
          'Nusuk, for Rawdah permits in Madinah',
          'A local SIM or an international roaming pack',
          'WhatsApp, to stay in touch with your guide',
          'A power bank',
        ],
      },
    ],
  },
];

/** Arabic words used on the site. The font subset script reads this list. */
export const arabic = {
  talbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ',
  umrah: 'عمرة',
  packages: 'باقات',
  journey: 'رحلة',
  guide: 'دليل',
  contact: 'تواصل',
  trust: 'ثقة',
  questions: 'أسئلة',
  services: 'خدمات',
  makkah: 'مكة',
  madinah: 'المدينة',
  welcome: 'أهلا وسهلا',
};

export function waLink(text = 'Assalamu alaikum, I would like to know about your Umrah packages.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function inr(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}
