"use client";

import { useMemo, useState } from "react";

type Row = {
  code: string; created_at: string; name: string; mobile: string; city: string; lender: string; loan_id: string;
  threats: string[]; numbers: string; severe: boolean; status: string; follow_up_on: string; notes: string;
};

const STATUSES: [string, string][] = [
  ["sent", "भेजी गई"],
  ["reply_received", "जवाब आया"],
  ["escalated_nodal", "Nodal को भेजी"],
  ["rbi_filed", "RBI में दर्ज"],
  ["resolved", "सुलझ गया"],
  ["closed", "बंद"],
];

export default function Admin() {
  const [pw, setPw] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<any[]>([]);

  async function load(e?: React.FormEvent) {
    e?.preventDefault();
    setErr("");
    const r = await fetch("/api/cases", { headers: { "x-admin-password": pw } });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return setErr(d.error || "लोड नहीं हुआ");
    setRows(d.cases);
    fetch("/api/contact", { headers: { "x-admin-password": pw } })
      .then((r) => r.json())
      .then((m) => setMsgs(m.messages || []))
      .catch(() => {});
  }

  async function patch(code: string, body: Partial<Row>) {
    const r = await fetch("/api/cases", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": pw },
      body: JSON.stringify({ code, ...body }),
    });
    if (!r.ok) return setErr("सेव नहीं हुआ");
    setRows((p) => p?.map((x) => (x.code === code ? { ...x, ...body } : x)) || null);
  }

  const today = new Date().toISOString().slice(0, 10);
  const filtered = useMemo(() => {
    if (!rows) return [];
    const s = q.toLowerCase();
    return rows.filter((r) => !s || [r.code, r.name, r.mobile, r.lender, r.numbers].join(" ").toLowerCase().includes(s));
  }, [rows, q]);

  const byLender = useMemo(() => {
    const m = new Map<string, number>();
    rows?.forEach((r) => m.set(r.lender, (m.get(r.lender) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [rows]);

  const numbersTop = useMemo(() => {
    const m = new Map<string, number>();
    rows?.forEach((r) =>
      (r.numbers || "").split(/[\n,]+/).map((n) => n.replace(/[^\d+]/g, "")).filter((n) => n.length >= 10)
        .forEach((n) => m.set(n, (m.get(n) || 0) + 1)),
    );
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [rows]);

  if (!rows) {
    return (
      <div className="wrap narrow prose">
        <h1>Admin</h1>
        <form className="sheet" onSubmit={load}>
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
          </div>
          <button className="btn btn-primary">खोलें</button>
          {err && <p className="err">{err}</p>}
        </form>
      </div>
    );
  }

  const due = rows.filter((r) => r.status === "sent" && r.follow_up_on && r.follow_up_on <= today).length;

  return (
    <div className="wrap" style={{ paddingBlock: "28px 56px" }}>
      <h1 style={{ fontSize: "2rem" }}>Admin: सारे केस</h1>
      <div className="stats">
        <div className="stat">कुल अर्ज़ियाँ<b>{rows.length}</b></div>
        <div className="stat">गंभीर धमकी<b>{rows.filter((r) => r.severe).length}</b></div>
        <div className="stat">आज follow-up<b>{due}</b></div>
        <div className="stat">सुलझे<b>{rows.filter((r) => r.status === "resolved").length}</b></div>
      </div>
      <div className="two" style={{ marginBottom: 20 }}>
        <div className="sheet">
          <h3>किस कंपनी के ख़िलाफ़ सबसे ज़्यादा</h3>
          {byLender.map(([l, n]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>{l}</span><b>{n}</b></div>
          ))}
        </div>
        <div className="sheet">
          <h3>बार-बार आने वाले धमकी नंबर</h3>
          {numbersTop.length ? numbersTop.map(([n, c]) => (
            <div key={n} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>{n}</span><b>{c}</b></div>
          )) : <p>अभी कोई नहीं</p>}
        </div>
      </div>
      <details className="sheet" style={{ marginBottom: 18 }}>
        <summary>संपर्क फ़ॉर्म के संदेश ({msgs.length})</summary>
        {msgs.length ? msgs.map((m) => (
          <div key={m.id} style={{ borderTop: "1px solid var(--line)", paddingTop: 10, marginTop: 10 }}>
            <b>{m.name}</b> · {m.contact} · <span className="pill">{m.type}</span> · {new Date(m.created_at).toLocaleString("hi-IN")}
            <p style={{ margin: "6px 0 0", whiteSpace: "pre-wrap" }}>{m.message}</p>
          </div>
        )) : <p>अभी कोई संदेश नहीं।</p>}
      </details>
      <div className="field">
        <input type="text" placeholder="नाम, नंबर, कोड या कंपनी से खोजें" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {err && <p className="err">{err}</p>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>कोड / तारीख़</th><th>व्यक्ति</th><th>कंपनी</th><th>धमकी नंबर</th><th>स्टेटस</th><th>Follow-up</th><th>नोट</th></tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.code}>
                <td><b>{r.code}</b><br />{new Date(r.created_at).toLocaleDateString("hi-IN")}{r.severe && <><br /><span className="pill sev">गंभीर</span></>}</td>
                <td>{r.name}<br />{r.mobile}<br />{r.city}</td>
                <td>{r.lender}<br /><small>{r.loan_id}</small></td>
                <td style={{ whiteSpace: "pre-line", minWidth: 140 }}>{r.numbers}</td>
                <td>
                  <select value={r.status} onChange={(e) => patch(r.code, { status: e.target.value })} aria-label="स्टेटस">
                    {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </td>
                <td style={{ color: r.status === "sent" && r.follow_up_on <= today ? "var(--stamp)" : undefined }}>{r.follow_up_on}</td>
                <td>
                  <textarea defaultValue={r.notes} style={{ minHeight: 60, minWidth: 160 }} onBlur={(e) => e.target.value !== r.notes && patch(r.code, { notes: e.target.value })} aria-label="नोट" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
