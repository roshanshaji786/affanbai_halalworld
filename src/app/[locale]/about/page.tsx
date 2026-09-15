import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { IconCheck, IconPin, IconShield, IconUsers } from "@/components/Icons";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Halal World — Halal Travel Agency in Trivandrum, Kerala",
  description:
    "Halal World is a Trivandrum-based travel company crafting premium Umrah and halal-friendly journeys for families across India. Amanah, ihsan and transparent pricing.",
};

const values = [
  { icon: IconShield, t: "Amanah — Trust", d: "Your money, documents and family are a trust. We honour it with written inclusions and zero surprise charges." },
  { icon: IconCheck, t: "Ihsan — Excellence", d: "From coach cleanliness to hotel check-in speed, we sweat the details others ignore." },
  { icon: IconUsers, t: "Khidmah — Service", d: "Serving the guests of Allah is our honour. Every group leader is trained in care before logistics." },
];

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const ml = locale === "ml";
  return (
    <section className="bg-starlattice">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          kicker={ml ? "ഞങ്ങളുടെ കഥ" : "Our Story"}
          title={ml ? "തിരുവനന്തപുരത്ത് നിന്ന്, ഉമ്മത്തിനോടുള്ള സ്നേഹത്തോടെ" : "From Trivandrum, with love for the Ummah"}
          sub={ml ? "തീർത്ഥാടകന്റെ യാത്ര ചിന്തയല്ല, ആരാധനയാകണം എന്ന ഉറച്ച ബോധ്യത്തോടെ തുടങ്ങിയത്." : "Halal World began with a simple conviction: a pilgrim's journey should be worship, not worry."}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="text-ink/75 space-y-4 text-sm leading-relaxed sm:text-base">
            <p>
              {ml
                ? "കേരളം, തിരുവനന്തപുരം ആസ്ഥാനമായി പ്രവർത്തിക്കുന്ന ഞങ്ങൾ ആദ്യം സേവിച്ചത് ഞങ്ങളുടെ സ്വന്തം നാട്ടുകാരെ — രണ്ട് വിശുദ്ധ പള്ളികൾ സ്വപ്നം കണ്ട, പേപ്പറുകളെയും ഭാഷയെയും അപരിചിതത്തെയും ഭയന്ന കുടുംബങ്ങളെ."
                : "Based in Thiruvananthapuram, Kerala, we started by serving families from our own neighbourhood — parents, grandparents and first-time travellers who dreamed of the two Holy Mosques but feared the paperwork, the language and the unknown."}
            </p>
            <p>
              {ml
                ? "അതിനാൽ ഞങ്ങൾ എല്ലാ ഭയവും നീക്കുന്ന ഒരു കമ്പനി കെട്ടിപ്പടുത്തു: വിസ ഞങ്ങൾ തയ്യാറാക്കും, കൊച്ചി-കോഴിക്കോട് നിന്ന് ഗ്രൂപ്പ് വിമാനങ്ങൾ, ഹറമിനരികിലെ ഹോട്ടലുകൾ, എല്ലാ ദിവസവും ഹലാൽ ഭക്ഷണം, നിങ്ങളുടെ ഭാഷ സംസാരിക്കുന്ന ലീഡർമാർ — മലയാളം, ഇംഗ്ലീഷ്, ഉറുദു."
                : "So we built a company that removes every fear: visas prepared and filed for you, direct-group flights from Kochi and Calicut, hotels we have personally inspected within walking distance of the Haram, fully halal meals on every single day, and group leaders who speak your language — Malayalam, English and Urdu."}
            </p>
            <p>
              {ml
                ? "ഇന്ന് കേരളത്തിനപ്പുറം ഇന്ത്യയൊട്ടാകെ തീർത്ഥാടകർ ഞങ്ങളോടൊപ്പം യാത്ര ചെയ്യുന്നു; ഭൂരിപക്ഷവും അടുത്ത വർഷം കുടുംബസമേതം മടങ്ങുന്നു. ആ വിശ്വാസമാണ് ഞങ്ങളുടെ ഏക പരസ്യം."
                : "Today pilgrims travel with us from across Kerala and India, and most return with their extended family the very next year. That trust is our only marketing."}
            </p>
            <p className="bg-ivory shadow-card rounded-2xl border border-cocoa/10 p-5">
              <span className="text-cocoa flex items-center gap-2 font-bold">
                <IconPin className="text-gold h-5 w-5" /> {ml ? "ഓഫീസിലേക്ക് വരൂ" : "Visit our office"}
              </span>
              <span className="mt-2 block text-sm">{ml ? "ഹലാൽ വേൾഡ്, ടി.സി. റോഡ്, തിരുവനന്തപുരം, കേരളം 695001" : site.address}</span>
              <span className="mt-1 block text-sm">{site.hours}</span>
            </p>
          </div>

          <div className="space-y-6">
            {values.map((v) => (
              <div key={v.t} className="bg-ivory shadow-card flex gap-5 rounded-2xl border border-cocoa/10 p-6">
                <span className="bg-cocoa text-gold-soft h-fit rounded-xl p-3">
                  <v.icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-cocoa-deep text-lg font-bold">{v.t}</h2>
                  <p className="text-ink/65 mt-1.5 text-sm leading-relaxed">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
