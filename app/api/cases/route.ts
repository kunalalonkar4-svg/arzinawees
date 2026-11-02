import { NextResponse } from "next/server";
import { dbEnabled, insertCase, listCases, updateCase } from "@/lib/db";
import { allow, ipOf } from "@/lib/ratelimit";

export const runtime = "nodejs";

function isAdmin(req: Request) {
  const pw = process.env.ADMIN_PASSWORD;
  return Boolean(pw && pw.length >= 10 && req.headers.get("x-admin-password") === pw);
}

const STATUSES = ["sent", "reply_received", "escalated_nodal", "rbi_filed", "resolved", "closed"];

// Email bhejne ke baad case save karna
export async function POST(req: Request) {
  if (!allow(ipOf(req), 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Bahut zyada requests" }, { status: 429 });
  }
  const b = await req.json().catch(() => null);
  if (!b || !b.consent) return NextResponse.json({ error: "Sahmati zaroori hai" }, { status: 400 });

  const code = "AR-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const follow = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);

  if (!dbEnabled) return NextResponse.json({ code, saved: false, follow_up_on: follow });

  try {
    await insertCase({
      code,
      name: String(b.name || "").slice(0, 80),
      mobile: String(b.mobile || "").replace(/\D/g, "").slice(-10),
      city: String(b.city || "").slice(0, 80),
      lender: String(b.lender || "").slice(0, 120),
      loan_id: String(b.loanId || "").slice(0, 40),
      threats: Array.isArray(b.threats) ? b.threats.map(String).slice(0, 12) : [],
      numbers: String(b.numbers || "").slice(0, 500),
      severe: Boolean(b.severe),
      gmail_message_id: String(b.gmailMessageId || "").slice(0, 64),
      status: "sent",
      follow_up_on: follow,
    });
    return NextResponse.json({ code, saved: true, follow_up_on: follow });
  } catch {
    return NextResponse.json({ code, saved: false, follow_up_on: follow });
  }
}

// Admin: saare cases
export async function GET(req: Request) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Galat password" }, { status: 401 });
  if (!dbEnabled) return NextResponse.json({ error: "Database configured nahi hai" }, { status: 503 });
  return NextResponse.json({ cases: await listCases() });
}

// Admin: status / note badalna
export async function PATCH(req: Request) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Galat password" }, { status: 401 });
  const b = await req.json().catch(() => null);
  if (!b?.code) return NextResponse.json({ error: "code chahiye" }, { status: 400 });
  const patch: Record<string, string> = {};
  if (b.status && STATUSES.includes(b.status)) patch.status = b.status;
  if (typeof b.notes === "string") patch.notes = b.notes.slice(0, 2000);
  if (typeof b.follow_up_on === "string") patch.follow_up_on = b.follow_up_on.slice(0, 10);
  await updateCase(String(b.code), patch as any);
  return NextResponse.json({ ok: true });
}
