import { promises as fs } from "fs";
import path from "path";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  pack: string;
  travellers: string;
  message?: string;
  ip?: string;
};

const DIR = path.join(process.cwd(), "data");
const FILE = path.join(DIR, "leads.json");

export async function listLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export async function addLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await fs.mkdir(DIR, { recursive: true });
  const leads = await listLeads();
  leads.unshift(lead);
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2));
  return lead;
}

/** Tiny in-memory per-IP rate limit (demo-grade; replace with edge/redis in prod). */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) return true;
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

export const validIndianMobile = (p: string) => /^[6-9]\d{9}$/.test(p.replace(/\s/g, ""));
