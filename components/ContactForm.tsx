"use client";

import { useState } from "react";
import type { ContactFormText } from "@/lib/content/contact";

export default function ContactForm({ c }: { c: ContactFormText }) {
  const [type, setType] = useState("help");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, contact, message, website: trap }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(r.status === 400 ? c.e400 || c.err : r.status === 429 ? c.e429 || c.err : c.err);
      setDone(d.id || "");
    } catch (e: any) {
      setErr(e.message || c.err);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="sheet" role="status">
        <h3>{c.done}</h3>
        <p style={{ margin: 0 }}>{c.doneNo}: <b>{done}</b>. {c.doneTime}</p>
      </div>
    );
  }

  return (
    <form className="sheet" onSubmit={submit}>
      <div className="field">
        <label htmlFor="c-type">{c.about}</label>
        <select id="c-type" value={type} onChange={(e) => setType(e.target.value)}>
          {["help", "feedback", "complaint", "other"].map((v, i) => (
            <option key={v} value={v}>{c.types[i]}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-name">{c.name}</label>
        <input id="c-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="c-contact">{c.contact}</label>
        <input id="c-contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="c-msg">{c.msg}</label>
        <textarea id="c-msg" value={message} onChange={(e) => setMessage(e.target.value)} />
        <span className="hint">{c.noAadhaar}</span>
      </div>
      <input type="text" value={trap} onChange={(e) => setTrap(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <button className="btn btn-primary" disabled={busy}>{busy ? c.sending : c.send}</button>
      {err && <p className="err" style={{ marginTop: 10 }}>{err}</p>}
    </form>
  );
}
