/**
 * ONE FILE TO EDIT.
 * Brand, contact details, group departures, services, city pages, FAQs and guides all live here.
 * Every page is generated from this data at build time.
 *
 * Items marked TODO are placeholders until the real details are confirmed.
 */

export const site = {
  name: 'Halal World',
  legalName: 'Halal World Travel Consultancy', // TODO: confirm registered business name
  tagline: 'Travel through the earth',
  role: 'Travel consultancy',
  url: 'https://halalworld.co.in',
  phone: '+91 99470 32507',
  phoneE164: '+919947032507',
  whatsapp: '919947032507',
  email: 'info@halalworld.co.in', // TODO: confirm email
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

/* ---------------------------------------------------------------------------
 * Group departures: fixed every four months, starting in March.
 * Add an exact date (YYYY-MM-DD) for a departure once it is confirmed.
 * ------------------------------------------------------------------------- */
export const groupDepartures = {
  months: [3, 7, 11], // March, July, November
  days: 15, // TODO: confirm usual group length
  // TODO: add confirmed dates, e.g. '2027-03': { date: '2027-03-12', note: 'Seats open' }
  confirmed: {} as Record<string, { date?: string; note?: string }>,
};

export type Departure = { key: string; label: string; month: number; year: number; date?: string; note?: string };

/** The next `count` group departures from `from` (a departure in the current month counts only if its confirmed date is still ahead). */
export function nextDepartures(count = 3, from = new Date()): Departure[] {
  const out: Departure[] = [];
  let y = from.getFullYear();
  let m = from.getMonth() + 1;
  for (let guard = 0; out.length < count && guard < 48; guard++) {
    if (groupDepartures.months.includes(m)) {
      const key = `${y}-${String(m).padStart(2, '0')}`;
      const c = groupDepartures.confirmed[key] ?? {};
      const isCurrent = y === from.getFullYear() && m === from.getMonth() + 1;
      const ahead = c.date ? new Date(c.date + 'T23:59:59') >= from : !isCurrent;
      if (ahead) {
        const label = new Date(y, m - 1, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' });
        out.push({ key, label, month: m, year: y, ...c });
      }
    }
    m++;
    if (m > 12) { m = 1; y++; }
  }
  return out;
}

/* ---------------------------------------------------------------------------
 * The two ways to do Umrah with us.
 * ------------------------------------------------------------------------- */
export const umrahWays = [
  {
    slug: 'tailor-made',
    name: 'Tailor-made Umrah',
    kicker: 'Most requested',
    short: 'Your dates, your number of days, your hotel distance. We plan around your family’s comfort.',
    points: [
      'Leave on any date that suits you',
      'Choose the number of days, from a short week to a long stay',
      'Pick how close you stay to the Haram, from steps away to a shuttle ride',
      'Split nights between Makkah and Madinah as you like',
      'Rooms, meals and pace planned for elders and children',
    ],
  },
  {
    slug: 'group-departures',
    name: 'Group Umrah with an Ameer',
    kicker: 'Every four months',
    short: 'Travel with a guided group led by an Ameer, on fixed departures in March, July and November.',
    points: [
      'Led by an experienced Ameer from departure to return',
      'Group classes before you fly',
      'Shared ziyarat, prayers and reminders throughout',
      'Fixed dates, so you can plan leave early',
      'Ideal for first-timers and those travelling alone',
    ],
  },
];

/** Options a tailor-made Umrah is built from. Shown on the tailor-made page and in the enquiry form. */
export const tailorOptions = {
  days: ['7 to 10 days', '11 to 15 days', '16 to 21 days', 'More than 21 days'],
  distance: ['Closest possible (under 300 m)', 'Walking distance (300 to 800 m)', 'Shuttle to the Haram (budget friendly)', 'Not sure, advise me'],
  hotel: ['5 star', '4 star', '3 star', 'Advise me'],
};

/* ---------------------------------------------------------------------------
 * Other services.
 * ------------------------------------------------------------------------- */
export const services = [
  { icon: 'flights', title: 'International flights', text: 'Fares to the Gulf, Saudi Arabia, Europe and beyond, with the best routing from TRV or COK.' },
  { icon: 'plane-in', title: 'Domestic flights', text: 'Tickets across India for work, family visits and connecting journeys.' },
  { icon: 'visa', title: 'Visa assistance', text: 'Umrah, visit and tourist visas. We check your documents before they are filed.' },
  { icon: 'hotels', title: 'Hotels worldwide', text: 'Stays chosen for location and value, from Makkah to anywhere you travel.' },
  { icon: 'transfers', title: 'Transfers', text: 'Airport pick-ups and intercity travel, booked in advance.' },
  { icon: 'ziyarat', title: 'Sightseeing', text: 'Ziyarat in the holy cities and halal-friendly tours on any trip.' },
];

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
      'Halal World is a travel consultancy in Trivandrum. Pilgrims from Thiruvananthapuram can sit with us, plan an Umrah around their own dates and comfort, and fly from Thiruvananthapuram International Airport (TRV).',
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
        a: 'Yes. Every group gets a class on the rites of Umrah, packing and travel days before departure. Tailor-made travellers are welcome to join it.',
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
      'Pilgrims from Kochi and central Kerala can start their Umrah from Cochin International Airport (COK), which has more Gulf and Saudi connections than any other airport in the state. We plan the whole journey with you, from visa to the hotel distance you want.',
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
        q: 'Can a family from Ernakulam plan its own dates?',
        a: 'Yes. Most families choose a tailor-made Umrah: you pick the dates, the number of days and how close to the Haram you stay, and we plan the rest.',
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
      'Families in Kollam are a short drive from our Trivandrum office and from Thiruvananthapuram International Airport (TRV). We plan tailor-made Umrah for Kollam pilgrims, or a seat on our next group with an Ameer.',
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
        a: 'Yes. Kollam pilgrims join our group departures with an Ameer in March, July and November, travelling with families from the same part of Kerala.',
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
    q: 'How is a tailor-made Umrah priced?',
    a: 'Every quote is built from your dates, number of days, hotel distance and room sharing. You get the full fare in writing before you pay anything.',
  },
  {
    q: 'When are the group departures?',
    a: 'Groups with an Ameer leave every four months, in March, July and November. Message us to hold a seat on the next one.',
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

export function waLink(text = 'Assalamu alaikum, I would like to plan a trip with Halal World.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function inr(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}
