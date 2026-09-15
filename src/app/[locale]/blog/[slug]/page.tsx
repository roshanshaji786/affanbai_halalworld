import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star8 } from "@/components/Icons";
import { site } from "@/lib/content";
import { posts } from "@/lib/posts";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export function generateStaticParams() {
  return posts.flatMap((p) =>
    ["en", "ml"].map((locale) => ({ slug: p.slug, locale })),
  );
}

export function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = posts.find((x) => x.slug === slug);
    if (!p) return { title: "Article not found" };
    return {
      title: p.title,
      description: p.excerpt,
      openGraph: {
        type: "article",
        title: p.title,
        description: p.excerpt,
        publishedTime: p.date,
        authors: [p.author],
        images: [{ url: "/og.jpg", width: 1200, height: 630 }],
      },
    };
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="bg-starlattice">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <nav aria-label="Breadcrumb" className="text-ink/60 text-xs font-semibold tracking-widest uppercase">
          <Link href="/" className="hover:text-gold">Home</Link> /{" "}
          <Link href="/blog" className="hover:text-gold">Journal</Link> /{" "}
          <span className="text-cocoa">{p.tag}</span>
        </nav>

        <h1 className="font-display text-cocoa-deep mt-6 text-4xl leading-tight sm:text-5xl">{p.title}</h1>
        <p className="text-ink/60 mt-4 text-sm">
          {p.author} · {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {p.readMins} min read
        </p>
        <span className="rule-gold mt-6" aria-hidden="true" />

        <div className="mt-8 space-y-8">
          {p.sections.map((s, i) => (
            <section key={i}>
              {s.h && <h2 className="font-display text-cocoa mt-2 text-2xl">{s.h}</h2>}
              {s.p?.map((t, j) => (
                <p key={j} className="text-ink/80 mt-4 text-[15px] leading-relaxed sm:text-base">{t}</p>
              ))}
              {s.list && (
                <ul className="bg-ivory shadow-card mt-4 space-y-2 rounded-2xl border border-cocoa/10 p-6">
                  {s.list.map((li) => (
                    <li key={li} className="text-ink/80 flex gap-3 text-sm leading-relaxed sm:text-base">
                      <Star8 className="text-gold mt-1 h-3.5 w-3.5 shrink-0" /> {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="bg-cocoa mt-12 rounded-3xl p-8 text-center">
          <Star8 className="text-gold-soft mx-auto h-6 w-6" />
          <h2 className="font-display text-ivory mt-3 text-2xl">Ready when you are.</h2>
          <p className="text-ivory/70 mt-2 text-sm">Talk to our Trivandrum team — same-day replies, honest prices.</p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-cocoa-deep hover:bg-gold-soft mt-5 inline-block rounded-full px-7 py-3 text-sm font-bold transition-colors"
          >
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          author: { "@type": "Organization", name: site.legalName },
          publisher: { "@type": "Organization", name: site.legalName },
          mainEntityOfPage: `${site.url}/blog/${p.slug}`,
        }}
      />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }])} />
    </article>
  );
}
