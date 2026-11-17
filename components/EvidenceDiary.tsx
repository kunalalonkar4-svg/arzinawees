"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang, useT } from "./LangProvider";
import { CopyButton, VoiceButton, WhatsAppButton } from "./Tools";
import { LOCALE } from "@/lib/i18n";
import { DiaryEntry, diaryText, getDiary, KIND_EN, setDiary, today } from "@/lib/local";

const KINDS: DiaryEntry["kind"][] = ["call", "sms", "wa", "contact", "other"];
const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export default function EvidenceDiary() {
  const t = useT();
  const lang = useLang();
  const [list, setList] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [kind, setKind] = useState<DiaryEntry["kind"]>("call");
  const [number, setNumber] = useState("");
  const [what, setWhat] = useState("");
  const [err, setErr] = useState("");
  const [pname, setPname] = useState("");

  useEffect(() => {
    setList(getDiary());
    setDate(today());
    setTime(now());
  }, []);

  function save(next: DiaryEntry[]) {
    setList(next);
    setDiary(next);
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!number.trim() && what.trim().length < 3) return setErr(t("sb.need"));
    setErr("");
    const entry: DiaryEntry = { id: Math.random().toString(36).slice(2), date: date || today(), time, kind, number: number.trim().slice(0, 20), what: what.trim().slice(0, 600) };
    save([entry, ...list].slice(0, 300));
    setNumber("");
    setWhat("");
    setTime(now());
  }

  const sorted = [...list].sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  const asText = diaryText(list);
  const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString(LOCALE[lang]);

  return (
    <>
      <form className="sheet no-print" onSubmit={add}>
        <div className="grid-3">
          <div className="field">
            <label htmlFor="dd">{t("sb.date")}</label>
            <input id="dd" type="date" value={date} max={today()} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="dt">{t("sb.time")}</label>
            <input id="dt" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="dk">{t("sb.kind")}</label>
            <select id="dk" value={kind} onChange={(e) => setKind(e.target.value as DiaryEntry["kind"])}>
              {KINDS.map((k) => <option key={k} value={k}>{t(`sb.k.${k}`)}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="dn">{t("sb.number")}</label>
          <input id="dn" type="tel" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="+91 88XXXXXXXX" />
        </div>
        <div className="field">
          <label htmlFor="dw">{t("sb.what")}</label>
          <textarea id="dw" value={what} onChange={(e) => setWhat(e.target.value)} style={{ minHeight: 90 }} />
          <VoiceButton onText={(s) => setWhat((p) => (p ? p + " " : "") + s)} />
        </div>
        {err && <p className="err">{err}</p>}
        <button className="btn btn-primary">{t("sb.add")}</button>
        <p className="hint" style={{ color: "var(--muted)", marginTop: 12, fontSize: ".9rem" }}>{t("sb.tips")}</p>
      </form>

      <div className="sheet no-print" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem" }}>{t("sb.list", { n: list.length })}</h2>
        {list.length === 0 ? (
          <p>{t("sb.empty")}</p>
        ) : (
          <>
            <div className="field" style={{ marginTop: 10 }}>
              <label htmlFor="pn">{t("sb.printName")}</label>
              <input id="pn" value={pname} onChange={(e) => setPname(e.target.value)} />
            </div>
            <div className="btn-row" style={{ marginTop: 0 }}>
              <button type="button" className="btn btn-primary btn-small" onClick={() => window.print()}>{t("x.print")}</button>
              <CopyButton text={asText} />
              <WhatsAppButton text={asText} />
              <Link className="btn btn-ghost btn-small" href="/shikayat">{t("sb.useIn")}</Link>
            </div>
            <p className="hint" style={{ color: "var(--muted)", fontSize: ".88rem" }}>{t("sb.pdfHint")}</p>
            <div className="diary-list">
              {sorted.map((e) => (
                <div className="diary-item" key={e.id}>
                  <div>
                    <div className="meta">
                      {fmt(e.date)} {e.time} · {t(`sb.k.${e.kind}`)} {e.number && <>· <b>{e.number}</b></>}
                    </div>
                    {e.what && <p>{e.what}</p>}
                  </div>
                  <button type="button" className="btn btn-ghost btn-small" onClick={() => save(list.filter((x) => x.id !== e.id))} aria-label={t("x.delete")}>
                    ×
                  </button>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>
              <button type="button" className="btn btn-ghost btn-small" onClick={() => window.confirm(t("sb.clearQ")) && save([])}>{t("sb.clear")}</button>
            </p>
          </>
        )}
      </div>

      {/* Sirf print/PDF mein dikhta hai */}
      <div className="print-only">
        <h1 style={{ fontSize: "18pt" }}>Harassment log / उत्पीड़न का रिकॉर्ड</h1>
        <p>
          {pname && <>Name: <b>{pname}</b> · </>}Printed on: {fmt(today())} · Entries: {list.length}
        </p>
        <table className="print-table">
          <thead>
            <tr><th>#</th><th>Date</th><th>Time</th><th>Type</th><th>Number</th><th>What happened</th></tr>
          </thead>
          <tbody>
            {[...list].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td><td>{e.date}</td><td>{e.time}</td><td>{KIND_EN[e.kind]}</td><td>{e.number}</td><td>{e.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: 24 }}>I confirm that the above record is true to the best of my knowledge.</p>
        <p style={{ marginTop: 36 }}>Signature: ____________________</p>
      </div>
    </>
  );
}
