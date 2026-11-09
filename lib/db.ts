// Cases ka record. Vercel par: Supabase (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY), table "web_cases".
// Netlify par agar Supabase keys na hon to Netlify Blobs use hota hai.
import { getStore } from "@netlify/blobs";

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const useSupabase = Boolean(SB_URL && SB_KEY);

// Netlify par chal rahe hon to Blobs apne aap milta hai
export const dbEnabled = useSupabase || Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.SITE_ID);

export type CaseRow = {
  id?: string;
  code: string;
  created_at?: string;
  name: string;
  mobile: string;
  city: string;
  lender: string;
  loan_id: string;
  threats: string[];
  numbers: string;
  severe: boolean;
  gmail_message_id: string;
  status: string;
  follow_up_on: string;
  notes?: string;
};

/* ---------------- Netlify Blobs ---------------- */
const store = () => getStore({ name: "cases", consistency: "strong" });

/* ---------------- Supabase (optional) ---------------- */
async function sb(path: string, init: RequestInit = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SB_KEY!,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`DB error ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function insertCase(row: CaseRow) {
  const full = { ...row, created_at: new Date().toISOString(), notes: row.notes || "" };
  if (useSupabase) return sb("web_cases", { method: "POST", body: JSON.stringify(row) });
  await store().setJSON(row.code, full, { onlyIfNew: true });
  return full;
}

export async function listCases(limit = 500): Promise<CaseRow[]> {
  if (useSupabase) return sb(`web_cases?select=*&order=created_at.desc&limit=${limit}`);
  const s = store();
  const { blobs } = await s.list();
  const rows = await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" }) as Promise<CaseRow | null>));
  return rows
    .filter((r): r is CaseRow => Boolean(r))
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, limit);
}

export async function updateCase(code: string, patch: Partial<CaseRow>) {
  if (useSupabase) return sb(`web_cases?code=eq.${encodeURIComponent(code)}`, { method: "PATCH", body: JSON.stringify(patch) });
  const s = store();
  const cur = (await s.get(code, { type: "json" })) as CaseRow | null;
  if (!cur) throw new Error("case not found");
  await s.setJSON(code, { ...cur, ...patch });
}

export async function findCase(code: string, mobile: string) {
  if (useSupabase) {
    const rows = (await sb(
      `web_cases?select=code,created_at,lender,status,follow_up_on&code=eq.${encodeURIComponent(code)}&mobile=eq.${encodeURIComponent(mobile)}&limit=1`,
    )) as CaseRow[];
    return rows[0] || null;
  }
  const r = (await store().get(code, { type: "json" })) as CaseRow | null;
  if (!r || r.mobile !== mobile) return null;
  return { code: r.code, created_at: r.created_at, lender: r.lender, status: r.status, follow_up_on: r.follow_up_on };
}
