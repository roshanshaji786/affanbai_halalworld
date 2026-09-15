import type { Metadata } from "next";
import { listLeads } from "@/lib/leads";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin — Leads",
};

export const dynamic = "force-dynamic";

export default async function Admin() {
  const leads = await listLeads();
  return (
    <section className="bg-starlattice min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-cocoa-deep text-4xl">Enquiry Leads</h1>
          <a
            href="/admin/editor"
            className="bg-cocoa text-ivory hover:bg-cocoa-deep rounded-full px-5 py-2.5 text-sm font-bold shadow-md transition-colors"
          >
            🎨 Open Live Editor
          </a>
        </div>
        <p className="text-ink/60 mt-2 text-sm">
          {leads.length} lead{leads.length === 1 ? "" : "s"} captured · stored locally in{" "}
          <code className="bg-sand rounded px-1">data/leads.json</code>
        </p>

        {leads.length === 0 ? (
          <p className="bg-ivory shadow-card mt-8 rounded-2xl border border-cocoa/10 p-8 text-sm text-ink/60">
            No leads yet. Submit the contact form to see it appear here instantly.
          </p>
        ) : (
          <div className="bg-ivory shadow-card mt-8 overflow-x-auto rounded-2xl border border-cocoa/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-cocoa text-ivory">
                <tr>
                  {["Received (IST)", "Name", "Mobile", "Email", "Package", "Pax", "Message"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cocoa/10">
                {leads.map((l) => (
                  <tr key={l.id} className="align-top odd:bg-white even:bg-sand/50">
                    <td className="px-4 py-3 whitespace-nowrap text-ink/60">
                      {new Date(l.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })}
                    </td>
                    <td className="text-cocoa-deep px-4 py-3 font-bold">{l.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a className="text-cocoa font-semibold hover:underline" href={`tel:+91${l.phone}`}>+91 {l.phone}</a>
                    </td>
                    <td className="px-4 py-3">{l.email ?? "—"}</td>
                    <td className="px-4 py-3">{l.pack}</td>
                    <td className="px-4 py-3">{l.travellers}</td>
                    <td className="text-ink/70 max-w-xs px-4 py-3">{l.message ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
