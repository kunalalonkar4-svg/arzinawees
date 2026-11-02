import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { allow, ipOf } from "@/lib/ratelimit";

export const runtime = "nodejs";

const store = () => getStore({ name: "messages", consistency: "strong" });
const onNetlify = () => Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.SITE_ID);
const TYPES = ["feedback", "help", "complaint", "other"];

// Contact / feedback / Arzinawees ke khilaaf shikayat
export async function POST(req: Request) {
  if (!allow(ipOf(req), 8, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "बहुत ज़्यादा संदेश। थोड़ी देर बाद कोशिश करें।" }, { status: 429 });
  }
  const b = await req.json().catch(() => null);
  const name = String(b?.name || "").trim().slice(0, 80);
  const contact = String(b?.contact || "").trim().slice(0, 120);
  const message = String(b?.message || "").trim().slice(0, 3000);
  const type = TYPES.includes(b?.type) ? b.type : "other";
  if (b?.website) return NextResponse.json({ ok: true }); // bot trap
  if (!name || !contact || message.length < 10) {
    return NextResponse.json({ error: "नाम, मोबाइल/ईमेल और कम से कम 10 अक्षर का संदेश लिखें।" }, { status: 400 });
  }
  const id = "MSG-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
  if (!onNetlify()) return NextResponse.json({ ok: true, id, saved: false });
  try {
    await store().setJSON(id, { id, name, contact, message, type, created_at: new Date().toISOString(), done: false });
    return NextResponse.json({ ok: true, id, saved: true });
  } catch {
    return NextResponse.json({ error: "संदेश सेव नहीं हुआ। कृपया ईमेल करें।" }, { status: 500 });
  }
}

// Admin: saare sandesh
export async function GET(req: Request) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 10 || req.headers.get("x-admin-password") !== pw) {
    return NextResponse.json({ error: "Galat password" }, { status: 401 });
  }
  if (!onNetlify()) return NextResponse.json({ messages: [] });
  const s = store();
  const { blobs } = await s.list();
  const rows = (await Promise.all(blobs.map((x) => s.get(x.key, { type: "json" })))).filter(Boolean) as any[];
  rows.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  return NextResponse.json({ messages: rows.slice(0, 300) });
}
