import { NextResponse } from "next/server";
import { dbEnabled, listCases } from "@/lib/db";
import { allow, ipOf } from "@/lib/ratelimit";

export const runtime = "nodejs";

// Dhamki wale numbers ki gintee. Shikayat karne wale ki koi jaankari bahar nahi jaati:
// sirf agent ka number, kitni shikayatein, kaun si company, aur aakhri mahina.
type Agg = { n: number; lenders: Map<string, number>; last: string };
let cache: { at: number; map: Map<string, Agg> } | null = null;

const last10 = (s: string) => s.replace(/\D/g, "").slice(-10);
const shortLender = (s: string) => s.replace(/\s*\(.*\)\s*$/, "").trim();

async function aggregate() {
  if (cache && Date.now() - cache.at < 10 * 60 * 1000) return cache.map;
  const rows = await listCases(5000);
  const map = new Map<string, Agg>();
  for (const r of rows) {
    const seen = new Set<string>();
    for (const raw of String(r.numbers || "").split(/[\n,;/]+/)) {
      const n = last10(raw);
      if (n.length !== 10 || !/^[6-9]/.test(n) || seen.has(n)) continue;
      seen.add(n);
      const a = map.get(n) || { n: 0, lenders: new Map(), last: "" };
      a.n += 1;
      const l = shortLender(r.lender || "");
      if (l) a.lenders.set(l, (a.lenders.get(l) || 0) + 1);
      const month = String(r.created_at || "").slice(0, 7);
      if (month > a.last) a.last = month;
      map.set(n, a);
    }
  }
  cache = { at: Date.now(), map };
  return map;
}

const topLenders = (a: Agg) => [...a.lenders.entries()].sort((x, y) => y[1] - x[1]).slice(0, 3).map(([l]) => l);
const mask = (n: string) => `${n.slice(0, 5)}XXX${n.slice(8)}`;

export async function GET(req: Request) {
  if (!allow(ipOf(req), 60, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "rate" }, { status: 429 });
  }
  if (!dbEnabled) return NextResponse.json({ error: "na" }, { status: 503 });
  const url = new URL(req.url);
  let map: Map<string, Agg>;
  try {
    map = await aggregate();
  } catch {
    return NextResponse.json({ error: "na" }, { status: 503 });
  }

  if (url.searchParams.get("top")) {
    // Public list mein sirf 2+ alag shikayaton wale number, aur wo bhi aadhe chhupe hue
    const top = [...map.entries()]
      .filter(([, a]) => a.n >= 2)
      .sort((x, y) => y[1].n - x[1].n)
      .slice(0, 10)
      .map(([n, a]) => ({ number: mask(n), reports: a.n, lenders: topLenders(a) }));
    return NextResponse.json({ top });
  }

  const n = last10(url.searchParams.get("n") || "");
  if (n.length !== 10) return NextResponse.json({ error: "bad" }, { status: 400 });
  const a = map.get(n);
  if (!a) return NextResponse.json({ reports: 0 });
  return NextResponse.json({ reports: a.n, lenders: topLenders(a), last: a.last });
}
