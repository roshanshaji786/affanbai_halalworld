import { NextRequest, NextResponse } from "next/server";
import { addLead, listLeads, rateLimited, validIndianMobile } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const str = (k: string) => String(b[k] ?? "").trim().slice(0, 500);

  const name = str("name");
  const phone = str("phone");
  if (name.length < 2) return NextResponse.json({ error: "Name is required." }, { status: 422 });
  if (!validIndianMobile(phone))
    return NextResponse.json({ error: "A valid 10-digit Indian mobile is required." }, { status: 422 });

  const lead = await addLead({
    name,
    phone,
    email: str("email") || undefined,
    pack: str("pack") || "Unspecified",
    travellers: str("travellers") || "1",
    message: str("message") || undefined,
    ip,
  });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

/** Protected by middleware Basic auth. */
export async function GET() {
  const leads = await listLeads();
  return NextResponse.json({ count: leads.length, leads });
}
