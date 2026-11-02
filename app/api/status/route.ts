import { NextResponse } from "next/server";
import { dbEnabled, findCase } from "@/lib/db";
import { allow, ipOf } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!allow(ipOf(req), 15, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Bahut zyada koshish. 15 minute baad dobara karein." }, { status: 429 });
  }
  const b = await req.json().catch(() => null);
  const code = String(b?.code || "").trim().toUpperCase();
  const mobile = String(b?.mobile || "").replace(/\D/g, "").slice(-10);
  if (!code || mobile.length !== 10) {
    return NextResponse.json({ error: "Arzi number aur 10 ankon ka mobile number daalein" }, { status: 400 });
  }
  if (!dbEnabled) return NextResponse.json({ error: "Status abhi uplabdh nahi hai" }, { status: 503 });
  const row = await findCase(code, mobile).catch(() => null);
  if (!row) return NextResponse.json({ error: "Is number aur mobile se koi arzi nahi mili" }, { status: 404 });
  return NextResponse.json({ case: row });
}
