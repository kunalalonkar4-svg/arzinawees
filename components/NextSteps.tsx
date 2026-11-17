"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLang, useT } from "./LangProvider";
import { CopyButton, VoiceButton, WhatsAppButton } from "./Tools";
import { LOCALE } from "@/lib/i18n";
import { Lender, OTHER_LENDER_ID, RBI_CRPC_EMAIL, THREATS } from "@/lib/lenders";
import { EscInput, policeDraftEn, policeDraftHi, rbiDraft, reminderDraft } from "@/lib/escalation";
import { addDays, calendarUrl, daysSince, deleteCase, diaryText, getCases, getDiary, LocalCase, today } from "@/lib/local";
import { gmailComposeUrl } from "@/lib/gmail";

type Tab = "rem" | "rbi" | "pol";
const MANUAL = "__manual";
const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export default function NextSteps({ lenders }: { lenders: Lender[] }) {
  const t = useT();
  const lang = useLang();
  const fmt = (d: string) => (d ? new Date(d + "T00:00:00").toLocaleDateString(LOCALE[lang]) : "");

  const [cases, setCases] = useState<LocalCase[]>([]);
  const [sel, setSel] = useState(MANUAL);
  const [diaryN, setDiaryN] = useState(0);
  const [tab, setTab] = useState<Tab>("rem");

  // manual form
  const [m, setM] = useState({ name: "", mobile: "", city: "", lenderId: "", otherName: "", otherEmail: "", loanId: "", sentOn: "", numbers: "", story: "" });
  const [mThreats, setMThreats] = useState<string[]>([]);

  // har tab ke options
  const [still, setStill] = useState(true);
  const [replied, setReplied] = useState(false);
  const [newInc, setNewInc] = useState("");
  const [useDiary, setUseDiary] = useState(true);
  const [station, setStation] = useState("");
  const [polLang, setPolLang] = useState<"hi" | "en">("hi");

  // tab badalne ya input badalne par draft dobara banta hai; user ka edit tab tak rehta hai
  const [edited, setEdited] = useState<string | null>(null);

  useEffect(() => {
    const list = getCases();
    setCases(list);
    setDiaryN(getDiary().length);
    const want = new URLSearchParams(window.location.search).get("code");
    const hit = list.find((c) => c.code === want) || list[0];
    if (hit) setSel(hit.code);
    const tb = new URLSearchParams(window.location.search).get("tab");
    if (tb === "rbi" || tb === "pol" || tb === "rem") setTab(tb);
  }, []);

  const saved = cases.find((c) => c.code === sel);
  const lender = lenders.find((l) => l.id === m.lenderId);

  const base = useMemo(() => {
    if (saved) {
      return { name: saved.name, mobile: saved.mobile, city: saved.city, lenderName: saved.lenderName, loanId: saved.loanId, sentOn: saved.sentOn, subject: saved.subject, threats: saved.threats, numbers: saved.numbers, story: saved.story, to: saved.to, cc: saved.cc };
    }
    const isOther = m.lenderId === OTHER_LENDER_ID;
    return {
      name: m.name.trim(),
      mobile: m.mobile.replace(/\D/g, "").slice(-10),
      city: m.city.trim(),
      lenderName: isOther ? m.otherName.trim() : lender ? `${lender.name} (${lender.legalName})` : "",
      loanId: m.loanId.trim(),
      sentOn: m.sentOn,
      subject: "",
      threats: mThreats,
      numbers: m.numbers,
      story: m.story.trim(),
      to: isOther ? m.otherEmail.split(/[,\s]+/).filter(emailOk) : lender?.to || [],
      cc: isOther ? [] : lender?.cc || [],
    };
  }, [saved, m, mThreats, lender]);

  const input: EscInput = {
    ...base,
    stillHarassing: still,
    replied,
    newIncidents: newInc.trim(),
    diary: useDiary && diaryN ? diaryText(getDiary()) : "",
    station: station.trim(),
  };

  const rem = reminderDraft(input);
  const auto = tab === "rem" ? rem.body : tab === "rbi" ? rbiDraft(input) : polLang === "hi" ? policeDraftHi(input) : policeDraftEn(input);
  const text = edited ?? auto;
  const ready = Boolean(base.name && base.lenderName);
  const days = base.sentOn ? daysSince(base.sentOn) : null;
  const rbiDate = base.sentOn ? addDays(base.sentOn, 30) : "";

  // input badla to purana edit hata do
  const sig = JSON.stringify([tab, polLang, sel, base, still, replied, newInc, useDiary, station]);
  const [lastSig, setLastSig] = useState(sig);
  if (sig !== lastSig) {
    setLastSig(sig);
    setEdited(null);
  }

  function remove() {
    if (!saved) return;
    deleteCase(saved.code);
    const list = getCases();
    setCases(list);
    setSel(list[0]?.code || MANUAL);
  }

  const setF = (k: keyof typeof m) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setM((p) => ({ ...p, [k]: e.target.value }));

  return (
    <>
      <div className="sheet">
        {cases.length > 0 ? (
          <div className="field">
            <label htmlFor="pick">{t("ag.pick")}</label>
            <select id="pick" value={sel} onChange={(e) => setSel(e.target.value)}>
              {cases.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} · {c.lenderName} · {fmt(c.sentOn)}
                </option>
              ))}
              <option value={MANUAL}>{t("ag.manual")}</option>
            </select>
          </div>
        ) : (
          <p className="notice" style={{ marginTop: 0 }}>{t("ag.none")}</p>
        )}

        {!saved && (
          <>
            <div className="two" style={{ gap: "0 16px" }}>
              <div className="field">
                <label htmlFor="mn">{t("w.name")}</label>
                <input id="mn" value={m.name} onChange={setF("name")} autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="mm">{t("w.mobile")}</label>
                <input id="mm" type="tel" inputMode="numeric" value={m.mobile} onChange={setF("mobile")} />
              </div>
              <div className="field">
                <label htmlFor="ml">{t("w.lender")}</label>
                <select id="ml" value={m.lenderId} onChange={setF("lenderId")}>
                  <option value="">{t("w.choose")}</option>
                  {lenders.map((l) => (
                    <option key={l.id} value={l.id}>{l.name} ({l.legalName})</option>
                  ))}
                  <option value={OTHER_LENDER_ID}>{t("w.other")}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="ms">{t("ag.sentOn")}</label>
                <input id="ms" type="date" value={m.sentOn} max={today()} onChange={setF("sentOn")} />
              </div>
              {m.lenderId === OTHER_LENDER_ID && (
                <>
                  <div className="field">
                    <label htmlFor="mon">{t("w.oname")}</label>
                    <input id="mon" value={m.otherName} onChange={setF("otherName")} />
                  </div>
                  <div className="field">
                    <label htmlFor="moe">{t("ag.lenderEmail")}</label>
                    <input id="moe" type="email" value={m.otherEmail} onChange={setF("otherEmail")} placeholder="grievance@company.com" />
                  </div>
                </>
              )}
              <div className="field">
                <label htmlFor="mc">{t("w.city")}</label>
                <input id="mc" value={m.city} onChange={setF("city")} />
              </div>
              <div className="field">
                <label htmlFor="mli">{t("w.loanid")}</label>
                <input id="mli" value={m.loanId} onChange={setF("loanId")} />
              </div>
            </div>
            <details>
              <summary>{t("w.whatDid")}</summary>
              <div className="checks" style={{ margin: "10px 0" }}>
                {THREATS.map((th) => (
                  <label key={th.id} className={`check${th.severe ? " sev" : ""}`}>
                    <input type="checkbox" checked={mThreats.includes(th.id)} onChange={(e) => setMThreats((p) => (e.target.checked ? [...p, th.id] : p.filter((x) => x !== th.id)))} />
                    <span>{t(`th.${th.id}`)}</span>
                  </label>
                ))}
              </div>
              <div className="field">
                <label htmlFor="mnum">{t("w.numbers")}</label>
                <textarea id="mnum" value={m.numbers} onChange={setF("numbers")} style={{ minHeight: 70 }} />
              </div>
              <div className="field">
                <label htmlFor="mst">{t("w.story")}</label>
                <textarea id="mst" value={m.story} onChange={setF("story")} />
                <VoiceButton onText={(s) => setM((p) => ({ ...p, story: (p.story ? p.story + " " : "") + s }))} />
              </div>
            </details>
          </>
        )}

        {days !== null && <p style={{ margin: "10px 0 0" }}><b>{t("ag.days", { n: days })}</b></p>}
        {saved && (
          <p style={{ margin: "8px 0 0" }}>
            <button type="button" className="btn btn-ghost btn-small" onClick={remove}>{t("ag.del")}</button>
          </p>
        )}
      </div>

      <div className="tabs" role="tablist">
        {(["rem", "rbi", "pol"] as Tab[]).map((k, i) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
            <b>{i + 1}. {t(k === "rem" ? "ag.t1" : k === "rbi" ? "ag.t2" : "ag.t3")}</b>
            <small>{t(k === "rem" ? "ag.t1d" : k === "rbi" ? "ag.t2d" : "ag.t3d")}</small>
          </button>
        ))}
      </div>

      <div className="sheet">
        <div className="radio-row" style={{ marginBottom: 10 }}>
          <label className="check">
            <input type="checkbox" checked={still} onChange={(e) => setStill(e.target.checked)} />
            <span>{t("ag.still")}</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={replied} onChange={(e) => setReplied(e.target.checked)} />
            <span>{t("ag.r1")}</span>
          </label>
          {diaryN > 0 && (
            <label className="check">
              <input type="checkbox" checked={useDiary} onChange={(e) => setUseDiary(e.target.checked)} />
              <span>{t("ag.useDiary", { n: diaryN })}</span>
            </label>
          )}
        </div>
        <div className="field">
          <label htmlFor="ni">{t("ag.newInc")}</label>
          <textarea id="ni" value={newInc} onChange={(e) => setNewInc(e.target.value)} style={{ minHeight: 70 }} />
          <VoiceButton onText={(s) => setNewInc((p) => (p ? p + " " : "") + s)} />
        </div>

        {tab === "rbi" && rbiDate && (
          <p className="notice">
            {rbiDate <= today() ? <b>{t("ag.rbiReady")} </b> : null}
            {t("ag.rbiWait", { date: fmt(rbiDate) })}
          </p>
        )}

        {tab === "pol" && (
          <>
            <div className="emergency" style={{ marginBottom: 12 }}>
              <p style={{ margin: 0 }}><b>{t("ag.ps3")}</b></p>
            </div>
            <div className="radio-row" style={{ marginBottom: 10 }}>
              <label className="check">
                <input type="radio" name="pl" checked={polLang === "hi"} onChange={() => setPolLang("hi")} />
                <span>{t("ag.polHi")}</span>
              </label>
              <label className="check">
                <input type="radio" name="pl" checked={polLang === "en"} onChange={() => setPolLang("en")} />
                <span>{t("ag.polEn")}</span>
              </label>
            </div>
            {polLang === "hi" && (
              <div className="field">
                <label htmlFor="stn">{t("ag.station")}</label>
                <input id="stn" value={station} onChange={(e) => setStation(e.target.value)} />
              </div>
            )}
          </>
        )}

        {!ready ? (
          <p className="err">{t("e.name")} · {t("e.lender")}</p>
        ) : (
          <>
            {tab === "rem" && (
              <div className="kv">
                <span>To</span><span>{base.to.join(", ") || "—"}</span>
                <span>CC</span><span>{[...base.cc, RBI_CRPC_EMAIL].join(", ")}</span>
                <span>{t("w.subjShort")}</span><span style={{ wordBreak: "normal" }}>{rem.subject}</span>
              </div>
            )}
            <div className="field">
              <label htmlFor="draft">{t("ag.draft")}</label>
              <textarea id="draft" className="mail-body" value={text} onChange={(e) => setEdited(e.target.value)} />
            </div>
            <div className="btn-row no-print">
              {tab === "rem" && (
                <a className="btn btn-primary btn-small" href={gmailComposeUrl(base.to, [...base.cc, RBI_CRPC_EMAIL], rem.subject, text)} target="_blank" rel="noopener noreferrer">
                  {t("x.gmail")}
                </a>
              )}
              {tab === "rbi" && (
                <a className="btn btn-primary btn-small" href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer">{t("ag.openRbi")}</a>
              )}
              {tab === "pol" && (
                <a className="btn btn-primary btn-small" href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">{t("ag.openCyber")}</a>
              )}
              <CopyButton text={tab === "rem" ? `Subject: ${rem.subject}\n\n${text}` : text} />
              <WhatsAppButton text={tab === "rem" ? `${rem.subject}\n\n${text}` : text} />
              {tab === "pol" && (
                <button type="button" className="btn btn-ghost btn-small" onClick={() => window.print()}>{t("x.print")}</button>
              )}
            </div>
            <pre className="print-only print-pre">{text}</pre>
          </>
        )}

        <div className="no-print">
          {tab === "rbi" && (
            <>
              <h3 style={{ marginTop: 22 }}>{t("ag.howT")}</h3>
              <ol>{[1, 2, 3, 4, 5].map((n) => <li key={n}>{t(`ag.rs${n}`)}</li>)}</ol>
              {rbiDate && rbiDate > today() && (
                <a className="btn btn-ghost btn-small" href={calendarUrl(t("cal.t30", { lender: base.lenderName }), rbiDate, `${typeof window !== "undefined" ? window.location.origin : ""}/aage?tab=rbi`)} target="_blank" rel="noopener noreferrer">
                  {t("d.cal30")}
                </a>
              )}
            </>
          )}
          {tab === "pol" && (
            <>
              <h3 style={{ marginTop: 22 }}>{t("ag.howT")}</h3>
              <ul>
                <li>{t("ag.ps1")}</li>
                <li>{t("ag.ps2")}</li>
              </ul>
            </>
          )}
          <p style={{ marginTop: 16 }}>
            <Link href="/saboot">{t("nav.saboot")} →</Link>
          </p>
        </div>
      </div>
    </>
  );
}
