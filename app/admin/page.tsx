"use client";

import { useMemo, useState } from "react";

type Row = {
  code: string; created_at: string; name: string; mobile: string; city: string; lender: string; loan_id: string;
  threats: string[]; numbers: string; severe: boolean; status: string; follow_up_on: string; notes: string;
};

const THREAT_HI: Record<string, string> = {
  abuse: "गाली", family: "घरवालों को धमकी", contacts: "कॉन्टैक्ट्स को कॉल", photo: "फ़ोटो morph", rape: "यौन हिंसा की धमकी",
  life: "जान की धमकी", home: "घर आने की धमकी", night: "रात/सुबह कॉल", many: "बहुत सारी कॉल", office: "ऑफ़िस में कॉल",
};

// Ek rang ki horizontal bars (magnitude). Hover par title se poori value.
function Bars({ data, unit = "" }: { data: [string, number][]; unit?: string }) {
  const max = Math.max(1, ...data.map((d) => d[1]));
  if (!data.length) return <p>अभी कोई डेटा नहीं</p>;
  return (
    <div className="bars">
      {data.map(([l, n]) => (
        <div className="bar-row" key={l} title={`${l}: ${n}${unit}`}>
          <span className="lbl">{l}</span>
          <span className="track"><span className="fill" style={{ width: `${(n / max) * 100}%`, display: "block" }} /></span>
          <b>{n}{unit}</b>
        </div>
      ))}
    </div>
  );
}

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

  const charts = useMemo(() => {
    const r = rows || [];
    const status = STATUSES.map(([v, l]) => [l, r.filter((x) => x.status === v).length] as [string, number]);
    const tm = new Map<string, number>();
    r.forEach((x) => (x.threats || []).forEach((t) => tm.set(t, (tm.get(t) || 0) + 1)));
    const threats = [...tm.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => [THREAT_HI[k] || k, n] as [string, number]);
    // pichhle 12 hafte
    const weeks: { label: string; n: number }[] = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay() - 7 * 11);
    for (let i = 0; i < 12; i++) {
      const a = new Date(start.getTime() + i * 7 * 864e5);
      const b = new Date(a.getTime() + 7 * 864e5);
      weeks.push({
        label: a.toLocaleDateString("hi-IN", { day: "numeric", month: "short" }),
        n: r.filter((x) => { const d = new Date(x.created_at); return d >= a && d < b; }).length,
      });
    }
    // company ke hisaab se kitne % suljhe (kam se kam 2 case)
    const lm = new Map<string, { n: number; ok: number }>();
    r.forEach((x) => {
      const k = x.lender.replace(/\s*\(.*\)\s*$/, "");
      const v = lm.get(k) || { n: 0, ok: 0 };
      v.n += 1;
      if (x.status === "resolved") v.ok += 1;
      lm.set(k, v);
    });
    const resolveRate = [...lm.entries()].filter(([, v]) => v.n >= 2).map(([k, v]) => [`${k} (${v.n})`, Math.round((v.ok / v.n) * 100)] as [string, number]).sort((a, b) => b[1] - a[1]).slice(0, 10);
    return { status, threats, weeks, resolveRate };
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
      <div className="two" style={{ marginBottom: 20 }}>
        <div className="sheet">
          <h3>हर हफ़्ते नई अर्ज़ियाँ (पिछले 12 हफ़्ते)</h3>
          <div className="cols" role="img" aria-label="हफ़्तेवार अर्ज़ियाँ">
            {charts.weeks.map((w) => (
              <div key={w.label} title={`${w.label} से: ${w.n}`} style={{ height: `${(w.n / Math.max(1, ...charts.weeks.map((x) => x.n))) * 100}%` }} />
            ))}
          </div>
          <div className="cols-x">{charts.weeks.map((w, i) => <span key={w.label}>{i % 3 === 0 ? w.label : ""}</span>)}</div>
          <details style={{ marginTop: 8 }}>
            <summary>टेबल</summary>
            {charts.weeks.map((w) => <div key={w.label} style={{ display: "flex", justifyContent: "space-between" }}><span>{w.label}</span><b>{w.n}</b></div>)}
          </details>
        </div>
        <div className="sheet">
          <h3>स्टेटस</h3>
          <Bars data={charts.status} />
        </div>
        <div className="sheet">
          <h3>किस तरह की धमकी सबसे ज़्यादा</h3>
          <Bars data={charts.threats} />
        </div>
        <div className="sheet">
          <h3>कंपनी के हिसाब से सुलझे केस (%)</h3>
          <p style={{ color: "var(--muted)", fontSize: ".85rem", marginTop: 0 }}>सिर्फ़ 2+ केस वाली कंपनियाँ; ब्रैकेट में कुल केस</p>
          <Bars data={charts.resolveRate} unit="%" />
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
