import { NextResponse } from "next/server";
import { ComplaintInput, redactSensitive, templateDraft } from "@/lib/complaint";
import { allow, ipOf } from "@/lib/ratelimit";

export const runtime = "nodejs";

const SYSTEM = `You write formal complaint emails for Indian borrowers who are being harassed by loan recovery agents.
Rules:
- Write in clear, polite, firm English that a bank grievance officer will take seriously.
- Use ONLY facts given by the user. Never invent dates, numbers, names, amounts or events.
- The user's own story may be in Hindi or Hinglish; translate it faithfully.
- Do not tell the borrower to stop repaying. Do not promise any outcome.
- Cite that the conduct violates the RBI Fair Practices Code and RBI directions on recovery agents and digital lending.
- Ask the lender to stop the harassment, name the recovery agency and the action taken within 7 days, and communicate only in writing.
- Mention escalation to the RBI Ombudsman and police if unresolved.
- Keep it under 350 words. Plain text, no markdown.
Return ONLY a JSON object: {"subject": "...", "body": "..."}`;

function clean(v: unknown, max = 2000) {
  return redactSensitive(String(v ?? "").slice(0, max)).trim();
}

export async function POST(req: Request) {
  if (!allow(ipOf(req), 40, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Bahut zyada koshish. Thodi der baad dobara karein." }, { status: 429 });
  }
  let raw: any;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Galat request" }, { status: 400 });
  }

  const input: ComplaintInput = {
    name: clean(raw.name, 80),
    mobile: clean(raw.mobile, 15).replace(/\[removed\]/g, ""),
    city: clean(raw.city, 80),
    lenderName: clean(raw.lenderName, 120),
    loanId: clean(raw.loanId, 40),
    threats: Array.isArray(raw.threats) ? raw.threats.map(String).slice(0, 12) : [],
    numbers: clean(raw.numbers, 500),
    incidentDate: clean(raw.incidentDate, 30),
    story: clean(raw.story, 2500),
    paidRecently: clean(raw.paidRecently, 300),
    attachmentCount: Number(raw.attachmentCount) || 0,
  };
  if (!input.name || !input.lenderName) {
    return NextResponse.json({ error: "Naam aur loan app zaroori hai" }, { status: 400 });
  }

  const fallback = templateDraft(input);
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ...fallback, source: "template" });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
        max_tokens: 1200,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content:
              "Complaint details (JSON):\n" +
              JSON.stringify(input, null, 2) +
              "\n\nA reference draft built from a template (improve it, keep all facts):\n" +
              fallback.body,
          },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const text: string = (data.content || []).map((c: any) => c.text || "").join("");
    const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    if (!json.subject || !json.body) throw new Error("bad json");
    return NextResponse.json({ subject: String(json.subject), body: String(json.body), source: "ai" });
  } catch {
    return NextResponse.json({ ...fallback, source: "template" });
  }
}
