import type { Metadata } from "next";
import Link from "next/link";
import { Star8 } from "@/components/Icons";
import { SectionHeading } from "@/components/ui";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Halal Travel Blog — Umrah Guides from Kerala, India",
  description:
    "Practical Umrah and halal travel guidance from Trivandrum: costs, visa checklists, route planning and ziyarat wisdom — written for Indian families.",
};

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const ml = locale === "ml";
  return (
    <section className="bg-starlattice">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <SectionHeading
          kicker={ml ? "ഹലാൽ വേൾഡ് ജേണൽ" : "The Halal World Journal"}
          title={ml ? "യാത്രയ്ക്കുള്ള ഗൈഡുകളും ജ്ഞാനവും" : "Guides & wisdom for the journey"}
          sub={ml ? "ഞങ്ങളുടെ ഓഫീസിൽ ദിവസവും കേൾക്കുന്ന ചോദ്യങ്ങൾക്ക് വ്യക്തമായ ഉത്തരങ്ങൾ. (ലേഖനങ്ങൾ ഇംഗ്ലീഷിൽ)" : "Plain, honest answers to the questions our office hears every day — written in Kerala, for families across India."}
        />
        <div className="mt-12 space-y-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group bg-ivory shadow-card hover:shadow-lift block rounded-2xl border border-cocoa/10 p-7 transition-shadow"
            >
              <p className="text-gold flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                <Star8 className="h-3.5 w-3.5" /> {p.tag} · {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {p.readMins} min
              </p>
              <h2 className="font-display text-cocoa-deep group-hover:text-cocoa mt-3 text-2xl transition-colors sm:text-3xl">
                {p.title}
              </h2>
              <p className="text-ink/65 mt-3 text-sm leading-relaxed">{p.excerpt}</p>
              <span className="text-gold mt-4 inline-block text-sm font-bold">{ml ? "വായിക്കൂ →" : "Read the guide →"}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
