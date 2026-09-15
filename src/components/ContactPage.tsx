"use client";

import { useState } from "react";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";
import { packages, site } from "@/lib/content";
import { t } from "@/lib/i18n";

const inputCls =
  "w-full rounded-xl border border-cocoa/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export function ContactPage({ locale }: { locale: string }) {
  const s = t(locale).contact;
  const [form, setForm] = useState({ name: "", phone: "", email: "", pack: packages[0].title, travellers: "2", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError(s.errName);
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) return setError(s.errPhone);
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return setError(s.errEmail);
    setError("");
    setSent(s.saving);
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => (r.ok ? setSent(s.saved) : setSent(s.opening)))
      .catch(() => setSent(s.opening));
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
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-gold flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase">✦ {s.kicker}</p>
        <h1 className="font-display text-cocoa-deep mt-3 text-4xl sm:text-5xl">{s.title}</h1>
        <span className="rule-gold mt-4" aria-hidden="true" />
        <p className="text-ink/70 mt-4 text-sm leading-relaxed sm:text-base">{s.sub}</p>
        <ul className="mt-8 space-y-4 text-sm">
          <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
            <IconPhone className="text-cocoa h-5 w-5" /><a className="font-bold text-cocoa-deep" href={site.phoneHref}>{site.phoneDisplay}</a>
          </li>
          <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
            <IconWhatsApp className="text-cocoa h-5 w-5" /><a className="font-bold text-cocoa-deep" href={site.whatsapp} target="_blank" rel="noopener noreferrer">{s.fastest}</a>
          </li>
          <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
            <IconMail className="text-cocoa h-5 w-5" /><a className="font-bold text-cocoa-deep" href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li className="bg-ivory shadow-card flex items-start gap-3 rounded-xl border border-cocoa/10 p-4">
            <IconPin className="text-cocoa h-5 w-5 shrink-0" />
            <span className="text-ink/70">{locale === "ml" ? "ഹലാൽ വേൾഡ്, ടി.സി. റോഡ്, തിരുവനന്തപുരം, കേരളം 695001" : site.address}</span>
          </li>
          <li className="bg-ivory shadow-card flex items-center gap-3 rounded-xl border border-cocoa/10 p-4">
            <IconClock className="text-cocoa h-5 w-5" /><span className="text-ink/70">{site.hours}</span>
          </li>
        </ul>
      </div>

      <form onSubmit={submit} className="bg-ivory shadow-lift h-fit rounded-3xl border border-cocoa/10 p-7 sm:p-9" noValidate>
        <h2 className="font-display text-cocoa-deep text-2xl">{s.formTitle}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-cocoa-deep font-semibold">{s.name}</span>
            <input className={inputCls} value={form.name} onChange={set("name")} autoComplete="name" />
          </label>
          <label className="block text-sm">
            <span className="text-cocoa-deep font-semibold">{s.phone}</span>
            <input className={inputCls} value={form.phone} onChange={set("phone")} inputMode="numeric" autoComplete="tel-national" />
          </label>
          <label className="block text-sm">
            <span className="text-cocoa-deep font-semibold">{s.email}</span>
            <input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" />
          </label>
          <label className="block text-sm">
            <span className="text-cocoa-deep font-semibold">{s.travellers}</span>
            <input className={inputCls} value={form.travellers} onChange={set("travellers")} inputMode="numeric" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-cocoa-deep font-semibold">{s.pack}</span>
            <select className={inputCls} value={form.pack} onChange={set("pack")}>
              {packages.map((p) => <option key={p.slug}>{p.title}</option>)}
              <option>{s.custom}</option>
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-cocoa-deep font-semibold">{s.message}</span>
            <textarea className={inputCls} rows={4} value={form.message} onChange={set("message")} />
          </label>
        </div>
        {error && <p role="alert" className="text-cocoa mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold">{error}</p>}
        <button type="submit" className="bg-cocoa text-ivory hover:bg-cocoa-deep mt-6 w-full rounded-full py-3.5 text-sm font-bold transition-colors">
          {s.submit}
        </button>
        {sent && <p role="status" className="text-gold mt-3 text-center text-sm font-bold">{sent}</p>}
        <p className="text-ink/50 mt-3 text-xs">{s.privacy}</p>
      </form>
    </div>
  );
}
