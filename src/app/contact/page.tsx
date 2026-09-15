"use client";

import { useState } from "react";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";
import { packages, site } from "@/lib/content";

const inputCls =
  "w-full rounded-xl border border-cocoa/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", pack: packages[0].title, travellers: "2", message: "" });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please tell us your name.");
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) return setError("Please enter a valid 10-digit Indian mobile number.");
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return setError("That email doesn't look right.");
    setError("");
    const text =
      `Assalamu alaikum Halal World!%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      (form.email ? `Email: ${encodeURIComponent(form.email)}%0A` : "") +
      `Package: ${encodeURIComponent(form.pack)}%0A` +
      `Travellers: ${encodeURIComponent(form.travellers)}%0A` +
      (form.message ? `Message: ${encodeURIComponent(form.message)}` : "");
    window.open(`${site.whatsapp}?text=${text}`, "_blank", "noopener");
  };

  return (
    <section className="bg-starlattice">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-gold flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase">✦ We reply fast</p>
          <h1 className="font-display text-cocoa-deep mt-3 text-4xl sm:text-5xl">Plan your journey</h1>
          <span className="rule-gold mt-4" aria-hidden="true" />
          <p className="text-ink/70 mt-4 text-sm leading-relaxed sm:text-base">
            Send an enquiry and our team will call you back the same working day — or walk into our
            Trivandrum office for a cup of sulaimani and a chat.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
              <IconPhone className="text-cocoa h-5 w-5" /><a className="font-bold text-cocoa-deep" href={site.phoneHref}>{site.phoneDisplay}</a>
            </li>
            <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
              <IconWhatsApp className="text-cocoa h-5 w-5" /><a className="font-bold text-cocoa-deep" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp — fastest reply</a>
            </li>
            <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
              <IconMail className="text-cocoa h-5 w-5" /><a className="font-bold text-cocoa-deep" href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="bg-ivory shadow-card flex items-start gap-3 rounded-xl border border-cocoa/10 p-4">
              <IconPin className="text-cocoa h-5 w-5 shrink-0" /><span className="text-ink/70">{site.address}</span>
            </li>
            <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
              <IconClock className="text-cocoa h-5 w-5" /><span className="text-ink/70">{site.hours}</span>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} className="bg-ivory shadow-lift h-fit rounded-3xl border border-cocoa/10 p-7 sm:p-9" noValidate>
          <h2 className="font-display text-cocoa-deep text-2xl">Enquiry Form</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-cocoa-deep font-semibold">Full name *</span>
              <input className={inputCls} value={form.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Aboobacker S." />
            </label>
            <label className="block text-sm">
              <span className="text-cocoa-deep font-semibold">Mobile (India) *</span>
              <input className={inputCls} value={form.phone} onChange={set("phone")} inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" />
            </label>
            <label className="block text-sm">
              <span className="text-cocoa-deep font-semibold">Email (optional)</span>
              <input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" />
            </label>
            <label className="block text-sm">
              <span className="text-cocoa-deep font-semibold">Travellers</span>
              <input className={inputCls} value={form.travellers} onChange={set("travellers")} inputMode="numeric" />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="text-cocoa-deep font-semibold">Interested package</span>
              <select className={inputCls} value={form.pack} onChange={set("pack")}>
                {packages.map((p) => <option key={p.slug}>{p.title}</option>)}
                <option>Custom / Halal Holiday</option>
              </select>
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="text-cocoa-deep font-semibold">Message</span>
              <textarea className={inputCls} rows={4} value={form.message} onChange={set("message")} placeholder="Preferred dates, airport, any special care needed…" />
            </label>
          </div>
          {error && <p role="alert" className="text-cocoa mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold">{error}</p>}
          <button type="submit" className="bg-cocoa text-ivory hover:bg-cocoa-deep mt-6 w-full rounded-full py-3.5 text-sm font-bold transition-colors">
            Send via WhatsApp →
          </button>
          <p className="text-ink/50 mt-3 text-xs">Your details go only to our team over WhatsApp. No spam, ever.</p>
        </form>
      </div>
    </section>
  );
}
