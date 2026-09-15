export type Locale = "en" | "ml";

const en = {
  nav: { home: "Home", packages: "Umrah Packages", destinations: "Destinations", about: "About", journal: "Journal", contact: "Contact", quote: "Get Quote" },
  top: { city: "Trivandrum · Kerala, India" },
  hero: {
    city: "Trivandrum · Kerala · India",
    h1a: "Premium", h1b: "Umrah", h1c: "crafted with care.",
    sub: "Travel through the earth — halal meals, Haram-near hotels and caring group leaders, from visa to ziyarat. Departures from Kochi, Calicut and across India.",
    ctaWa: "Plan My Umrah",
  },
  stats: ["Years of service", "Pilgrims hosted", "Departures a year", "Guest rating"],
  pkg: {
    kicker: "Curated Journeys", title: "Umrah Packages from India",
    sub: "Every package includes visa, flights, hotels, halal meals, transfers and guided ziyarat — one transparent price.",
    all: "All packages →", from: "From", onRequest: "On request", view: "View Details", enquire: "Enquire",
    nights: "N", makkah: "Makkah", madinah: "Madinah",
  },
  journey: { kicker: "The Flagship Route", title: "Seven nights, perfectly paced", sub: "Our 17 October premium short stay — the same rhythm we bring to every journey." },
  why: {
    kicker: "Why Halal World", title: "Travel through the earth, the halal way",
    sub: "We are travellers of faith ourselves — every detail is handled the way we would want our own parents served.",
    items: [
      ["100% Halal, Always", "Halal meals on every itinerary and verified halal restaurants on ziyarat days."],
      ["Hotels Near the Haram", "Hand-picked stays like Anjum Makkah & Mövenpick Madinah, minutes from prayer."],
      ["Visa to Boarding Pass", "We prepare, file and track every document — you only pack your bags."],
      ["Caring Group Leaders", "Experienced mutawwifs guide each group in Malayalam, English and Urdu."],
      ["Safe for Families", "Family rooms, ladies' coach seating and 24×7 on-trip support."],
      ["Transparent Pricing", "One price, everything included. No hidden charges at the airport."],
    ],
  },
  testi: { kicker: "Guest Du'as", title: "Words from our pilgrims" },
  faq: { kicker: "Good to know", title: "Questions, answered" },
  cta: { title: "Your journey to the two Holy Mosques begins with one message.", enquiry: "Send an Enquiry" },
  contact: {
    kicker: "We reply fast", title: "Plan your journey",
    sub: "Send an enquiry and our team will call you back the same working day — or walk into our Trivandrum office for a cup of sulaimani and a chat.",
    formTitle: "Enquiry Form", name: "Full name *", phone: "Mobile (India) *", email: "Email (optional)",
    travellers: "Travellers", pack: "Interested package", message: "Message",
    submit: "Send via WhatsApp →",
    privacy: "Your details go only to our team over WhatsApp. No spam, ever.",
    errName: "Please tell us your name.", errPhone: "Please enter a valid 10-digit Indian mobile number.", errEmail: "That email doesn't look right.",
    saving: "Saving your enquiry…", saved: "Enquiry saved! Opening WhatsApp…", opening: "Opening WhatsApp…",
    office: "Visit our office", fastest: "WhatsApp — fastest reply", custom: "Custom / Halal Holiday",
  },
  footer: {
    blurb: "Premium Umrah and halal-friendly travel, crafted in Kerala. Visa to ziyarat, we carry you through the earth with care, safety and transparent pricing.",
    explore: "Explore", departures: "Departures", reach: "Reach Us",
    next: "Next flagship: 17 Oct · COK → JED",
    rights: "All rights reserved.", crafted: "Crafted with ihsan in Kerala, India 🇮🇳",
  },
};

const ml: typeof en = {
  nav: { home: "ഹോം", packages: "ഉംറ പാക്കേജുകൾ", destinations: "ഇടങ്ങൾ", about: "ഞങ്ങളെക്കുറിച്ച്", journal: "ജേണൽ", contact: "ബന്ധപ്പെടുക", quote: "വില അറിയൂ" },
  top: { city: "തിരുവനന്തപുരം · കേരളം, ഇന്ത്യ" },
  hero: {
    city: "തിരുവനന്തപുരം · കേരളം · ഇന്ത്യ",
    h1a: "പ്രീമിയം", h1b: "ഉംറ", h1c: "സ്നേഹപൂർവ്വം ഒരുക്കിയത്.",
    sub: "ഭൂമിയിലൂടെ സഞ്ചരിക്കൂ — ഹലാൽ ഭക്ഷണം, ഹറമിനരികിലെ ഹോട്ടലുകൾ, കരുതലുള്ള ഗ്രൂപ്പ് ലീഡർമാർ; വിസ മുതൽ സിയാറത്ത് വരെ. കൊച്ചി, കോഴിക്കോട്, ഇന്ത്യയൊട്ടാകെ യാത്രകൾ.",
    ctaWa: "എന്റെ ഉംറ പ്ലാൻ ചെയ്യൂ",
  },
  stats: ["സേവന വർഷങ്ങൾ", "തീർത്ഥാടകർ", "വാർഷിക യാത്രകൾ", "അതിഥി റേറ്റിംഗ്"],
  pkg: {
    kicker: "തിരഞ്ഞെടുത്ത യാത്രകൾ", title: "ഇന്ത്യയിൽ നിന്നുള്ള ഉംറ പാക്കേജുകൾ",
    sub: "വിസ, വിമാനം, ഹോട്ടൽ, ഹലാൽ ഭക്ഷണം, ട്രാൻസ്ഫർ, സിയാറത്ത് — എല്ലാം ഉൾപ്പെട്ട ഒറ്റ സുതാര്യ വില.",
    all: "എല്ലാ പാക്കേജുകളും →", from: "മുതൽ", onRequest: "ആവശ്യപ്പെട്ടാൽ", view: "വിവരങ്ങൾ കാണൂ", enquire: "അന്വേഷിക്കൂ",
    nights: "രാത്രി", makkah: "മക്ക", madinah: "മദീന",
  },
  journey: { kicker: "പ്രധാന റൂട്ട്", title: "ഏഴ് രാത്രികൾ, തികഞ്ഞ താളത്തിൽ", sub: "ഒക്ടോബർ 17 പ്രീമിയം ഷോർട്ട് സ്റ്റേ — ഓരോ യാത്രയിലും ഞങ്ങൾ നൽകുന്ന അതേ താളം." },
  why: {
    kicker: "എന്തുകൊണ്ട് ഹലാൽ വേൾഡ്", title: "ഹലാൽ വഴിയിൽ, ഭൂമിയിലൂടെ",
    sub: "ഞങ്ങളും വിശ്വാസത്തിന്റെ യാത്രികരാണ് — ഞങ്ങളുടെ സ്വന്തം മാതാപിതാക്കൾക്ക് വേണ്ടത് പോലെ ഓരോ വിശദാംശവും.",
    items: [
      ["എപ്പോഴും 100% ഹലാൽ", "എല്ലാ ദിവസവും ഹലാൽ ഭക്ഷണം; സിയാറത്ത് ദിവസങ്ങളിൽ പരിശോധിച്ച റെസ്റ്റോറന്റുകൾ."],
      ["ഹറമിനരികിലെ ഹോട്ടലുകൾ", "അഞ്ജും മക്ക, മൊവെൻപിക്ക് മദീന — പ്രാർത്ഥനയ്ക്ക് മിനിറ്റുകൾ അകലെ."],
      ["വിസ മുതൽ ബോർഡിംഗ് പാസ്സ് വരെ", "എല്ലാ രേഖകളും ഞങ്ങൾ ഒരുക്കും; നിങ്ങൾ ബാഗ് പായ്ക്ക് ചെയ്താൽ മതി."],
      ["കരുതലുള്ള ലീഡർമാർ", "മലയാളം, ഇംഗ്ലീഷ്, ഉറുദു ഭാഷകളിൽ പരിചയസമ്പന്നരായ മുതവ്വിഫുകൾ."],
      ["കുടുംബങ്ങൾക്ക് സുരക്ഷിതം", "ഫാമിലി റൂമുകൾ, ലേഡീസ് സീറ്റിംഗ്, 24×7 സപ്പോർട്ട്."],
      ["സുതാര്യമായ വില", "ഒറ്റ വില, എല്ലാം ഉൾപ്പെട്ടത്. വിമാനത്താവളത്ത് മറഞ്ഞ ചാർജുകളില്ല."],
    ],
  },
  testi: { kicker: "അതിഥികളുടെ ദുആകൾ", title: "ഞങ്ങളുടെ തീർത്ഥാടകരുടെ വാക്കുകൾ" },
  faq: { kicker: "അറിയേണ്ടത്", title: "ചോദ്യങ്ങൾ, ഉത്തരങ്ങൾ" },
  cta: { title: "രണ്ട് വിശുദ്ധ പള്ളികളിലേക്കുള്ള യാത്ര ഒരു സന്ദേശത്തോടെ തുടങ്ങുന്നു.", enquiry: "അന്വേഷണം അയയ്ക്കൂ" },
  contact: {
    kicker: "വേഗത്തിൽ മറുപടി", title: "നിങ്ങളുടെ യാത്ര പ്ലാൻ ചെയ്യാം",
    sub: "അന്വേഷണം അയയ്ക്കൂ; അതേ ദിവസം തന്നെ ഞങ്ങളുടെ ടീം തിരികെ വിളിക്കും — അല്ലെങ്കിൽ തിരുവനന്തപുരം ഓഫീസിലേക്ക് ഒരു സുലൈമാനി ചായയ്ക്കായി വന്നാലും.",
    formTitle: "അന്വേഷണ ഫോം", name: "പൂർണ്ണമായ പേര് *", phone: "മൊബൈൽ (ഇന്ത്യ) *", email: "ഇമെയിൽ (ഓപ്ഷണൽ)",
    travellers: "യാത്രക്കാർ", pack: "താൽപ്പര്യമുള്ള പാക്കേജ്", message: "സന്ദേശം",
    submit: "വാട്ട്സ്ആപ്പ് വഴി അയയ്ക്കൂ →",
    privacy: "നിങ്ങളുടെ വിവരങ്ങൾ ഞങ്ങളുടെ ടീമിലേക്ക് മാത്രം. സ്പാമില്ല, ഒരിക്കലും.",
    errName: "ദയവായി പേര് നൽകൂ.", errPhone: "ശരിയായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകൂ.", errEmail: "ഇമെയിൽ ശരിയല്ലെന്ന് തോന്നുന്നു.",
    saving: "അന്വേഷണം സേവ് ചെയ്യുന്നു…", saved: "അന്വേഷണം സേവ് ചെയ്തു! വാട്ട്സ്ആപ്പ് തുറക്കുന്നു…", opening: "വാട്ട്സ്ആപ്പ് തുറക്കുന്നു…",
    office: "ഓഫീസിലേക്ക് വരൂ", fastest: "വാട്ട്സ്ആപ്പ് — വേഗമേറിയ മറുപടി", custom: "കസ്റ്റം / ഹലാൽ ഹോളിഡേ",
  },
  footer: {
    blurb: "പ്രീമിയം ഉംറ, ഹലാൽ യാത്രകൾ — കേരളത്തിൽ നിന്ന് സ്നേഹത്തോടെ. വിസ മുതൽ സിയാറത്ത് വരെ, കരുതലോടെ, സുരക്ഷിതമായി, സുതാര്യമായ വിലയിൽ.",
    explore: "കാണൂ", departures: "യാത്രകൾ", reach: "ബന്ധപ്പെടാൻ",
    next: "അടുത്ത യാത്ര: ഒക്ടോ 17 · COK → JED",
    rights: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.", crafted: "കേരളത്തിൽ, ഇഹ്‌സാനോടെ 🇮🇳",
  },
};

export function t(locale: string) {
  return locale === "ml" ? ml : en;
}

export const locales: Locale[] = ["en", "ml"];
