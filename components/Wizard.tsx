"use client";

import { useEffect, useMemo, useState } from "react";
import { Lender, OTHER_LENDER_ID, RBI_CRPC_EMAIL, THREATS } from "@/lib/lenders";
import { isSevere, templateDraft } from "@/lib/complaint";
import { Attachment, buildMime, getAccessToken, gmailComposeUrl, sendViaGmail, shrinkImage } from "@/lib/gmail";
import { useLang, useT } from "./LangProvider";
import { LOCALE } from "@/lib/i18n";

type Props = { lenders: Lender[]; googleClientId: string };
type FileItem = Attachment & { url?: string; id: string };

const STEPS = ["w.s1", "w.s2", "w.s3", "w.s4", "w.s5"];
const MAX_FILES = 10;
const MAX_TOTAL = 20 * 1024 * 1024;
const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export default function Wizard({ lenders, googleClientId }: Props) {
  const t = useT();
  const lang = useLang();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  // Step 1
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [lenderId, setLenderId] = useState("");
  const [otherName, setOtherName] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [loanId, setLoanId] = useState("");

  // Step 2
  const [threats, setThreats] = useState<string[]>([]);
  const [numbers, setNumbers] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [story, setStory] = useState("");
  const [paidRecently, setPaidRecently] = useState("");

  // Step 3
  const [files, setFiles] = useState<FileItem[]>([]);
  const [busyFiles, setBusyFiles] = useState(false);

  // Step 4
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [drafting, setDrafting] = useState(false);
  const [draftSource, setDraftSource] = useState("");
  const [ccRbi, setCcRbi] = useState(true);
  const [draftSig, setDraftSig] = useState("");

  // Step 5
  const [agreeTruth, setAgreeTruth] = useState(false);
  const [agreeSend, setAgreeSend] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ code: string; follow: string; saved: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const lender = lenders.find((l) => l.id === lenderId);
  const lenderName = lenderId === OTHER_LENDER_ID ? otherName.trim() : lender ? `${lender.name} (${lender.legalName})` : "";
  const to = useMemo(
    () => (lenderId === OTHER_LENDER_ID ? otherEmail.split(/[,\s]+/).filter(emailOk) : lender?.to || []),
    [lenderId, otherEmail, lender],
  );
  const cc = useMemo(() => [...(lender?.cc || []), ...(ccRbi ? [RBI_CRPC_EMAIL] : [])], [lender, ccRbi]);
  const severe = isSevere(threats);
  const totalSize = files.reduce((s, f) => s + f.blob.size, 0);
  const inputSig = JSON.stringify([name, mobile, city, lenderName, loanId, threats, numbers, incidentDate, story, paidRecently, files.length]);

  useEffect(() => () => files.forEach((f) => f.url && URL.revokeObjectURL(f.url)), []); // eslint-disable-line

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // /shikayat?lender=kreditbee se aaye to company pehle se chuni ho
  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("lender");
      if (id && lenders.some((l) => l.id === id)) setLenderId(id);
    } catch {}
  }, [lenders]);

  function validate(s: number) {
    if (s === 0) {
      if (name.trim().length < 2) return t("e.name");
      if (mobile.replace(/\D/g, "").length !== 10) return t("e.mobile");
      if (!lenderId) return t("e.lender");
      if (lenderId === OTHER_LENDER_ID && !otherName.trim()) return t("e.oname");
      if (lenderId === OTHER_LENDER_ID && !to.length)
        return t("e.oemail");
    }
    if (s === 1) {
      if (!threats.length && story.trim().length < 15) return t("e.what");
    }
    if (s === 3) {
      if (subject.trim().length < 5 || body.trim().length < 80) return t("e.draft");
    }
    return "";
  }

  async function next() {
    const e = validate(step);
    setError(e);
    if (e) return;
    if (step === 2 && (!body || draftSig !== inputSig)) await makeDraft();
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function makeDraft() {
    setDrafting(true);
    setError("");
    const input = {
      name, mobile, city, lenderName, loanId, threats, numbers, incidentDate, story, paidRecently,
      attachmentCount: files.length,
    };
    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok || !data.body) throw new Error(data.error || "draft failed");
      setSubject(data.subject);
      setBody(data.body);
      setDraftSource(data.source);
    } catch {
      // Server se na bane to browser mein hi template se bana do, taaki arzi kabhi khaali na rahe
      const tpl = templateDraft(input);
      setSubject(tpl.subject);
      setBody(tpl.body);
      setDraftSource("template");
    } finally {
      setDraftSig(inputSig);
      setDrafting(false);
    }
  }

  async function addFiles(list: FileList | null) {
    if (!list) return;
    setBusyFiles(true);
    setError("");
    const room = MAX_FILES - files.length;
    const picked = Array.from(list).slice(0, room);
    const out: FileItem[] = [];
    let size = totalSize;
    for (const f of picked) {
      if (!f.type.startsWith("image/") && f.type !== "application/pdf") continue;
      const a = await shrinkImage(f);
      if (size + a.blob.size > MAX_TOTAL) {
        setError(t("e.files20"));
        break;
      }
      size += a.blob.size;
      out.push({ ...a, id: Math.random().toString(36).slice(2), url: a.type.startsWith("image/") ? URL.createObjectURL(a.blob) : undefined });
    }
    if (list.length > room) setError(t("e.filesMax", { max: MAX_FILES }));
    setFiles((p) => [...p, ...out]);
    setBusyFiles(false);
  }

  function removeFile(id: string) {
    setFiles((p) => {
      const f = p.find((x) => x.id === id);
      if (f?.url) URL.revokeObjectURL(f.url);
      return p.filter((x) => x.id !== id);
    });
  }

  async function send() {
    setError("");
    if (!agreeTruth || !agreeSend) return setError(t("e.agree"));
    if (!googleClientId) return setError(t("e.noGoogle"));
    setSending(true);
    try {
      const token = await getAccessToken(googleClientId);
      const mime = await buildMime({ to, cc, subject, body, attachments: files });
      const sent = await sendViaGmail(token, mime);
      try {
        window.google?.accounts?.oauth2?.revoke?.(token, () => {});
      } catch {}
      // Email ja chuka hai. Record save na ho to bhi user ko success dikhana hai.
      const data: any = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consent: true, name, mobile, city, lender: lenderName, loanId, threats, numbers, severe,
          gmailMessageId: sent.id,
        }),
      })
        .then((r) => r.json())
        .catch(() => ({}));
      setDone({ code: data.code || "—", follow: data.follow_up_on || "", saved: Boolean(data.saved) });
    } catch (e: any) {
      setError(e.message || t("e.send"));
    } finally {
      setSending(false);
    }
  }

  async function copyAll() {
    const text = `To: ${to.join(", ")}\nCc: ${cc.join(", ")}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError(t("e.copy"));
    }
  }

  if (done) {
    return (
      <div className="sheet success" role="status">
        <div className="stamp" style={{ position: "static", display: "inline-block", marginBottom: 12 }}>{t("d.stamp")}</div>
        <h2>{t("d.title")}</h2>
        <p>{t("d.keep")}</p>
        <div className="code-big">{done.code}</div>
        <div style={{ textAlign: "left", maxWidth: 560, margin: "20px auto 0" }}>
          <h3>{t("d.next")}</h3>
          <ul>
            <li>{t("d.n1")}</li>
            <li>{t("d.n2", { date: done.follow ? new Date(done.follow).toLocaleDateString(LOCALE[lang]) : t("d.7days") })}</li>
            <li>{t("d.n3")}</li>
            <li>{t("d.n4")}</li>
          </ul>
          {severe && (
            <div className="emergency" style={{ marginTop: 16 }}>
              <h3>{t("d.policeT")}</h3>
              <p style={{ margin: 0 }}>{t("d.policeD")}</p>
            </div>
          )}
          <p className="hero-note" style={{ marginTop: 16 }}>
            {t("d.manas")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sheet">
      <div className="progress" aria-hidden="true">
        {STEPS.map((_, i) => (
          <span key={i} className={i <= step ? "on" : ""} />
        ))}
      </div>
      <div className="step-label">
        {t("w.stepOf", { a: step + 1, b: STEPS.length })}
      </div>
      <h2 style={{ marginTop: 4 }}>{t(STEPS[step])}</h2>

      {step === 0 && (
        <>
          <div className="field">
            <label htmlFor="name">{t("w.name")}</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="mobile">{t("w.mobile")}</label>
            <input id="mobile" type="tel" inputMode="numeric" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="98XXXXXXXX" />
            <span className="hint">{t("w.mobileHint")}</span>
          </div>
          <div className="field">
            <label htmlFor="city">{t("w.city")}</label>
            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="lender">{t("w.lender")}</label>
            <select id="lender" value={lenderId} onChange={(e) => setLenderId(e.target.value)}>
              <option value="">{t("w.choose")}</option>
              {lenders.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.legalName})
                </option>
              ))}
              <option value={OTHER_LENDER_ID}>{t("w.other")}</option>
            </select>
            <span className="hint">{t("w.lenderHint")}</span>
          </div>
          {lenderId === OTHER_LENDER_ID && (
            <>
              <div className="field">
                <label htmlFor="oname">{t("w.oname")}</label>
                <input id="oname" type="text" value={otherName} onChange={(e) => setOtherName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="oemail">{t("w.oemail")}</label>
                <input id="oemail" type="email" value={otherEmail} onChange={(e) => setOtherEmail(e.target.value)} placeholder="grievance@company.com" />
                <span className="hint">{t("w.oemailHint")}</span>
              </div>
            </>
          )}
          <div className="field">
            <label htmlFor="loanid">{t("w.loanid")}</label>
            <input id="loanid" type="text" value={loanId} onChange={(e) => setLoanId(e.target.value)} placeholder="KB250722XXXX" />
            <span className="hint">{t("w.loanidHint")}</span>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="field">
            <span className="lbl">{t("w.whatDid")}</span>
            <div className="checks">
              {THREATS.map((th) => (
                <label key={th.id} className={`check${th.severe ? " sev" : ""}`}>
                  <input
                    type="checkbox"
                    id={`t-${th.id}`}
                    checked={threats.includes(th.id)}
                    onChange={(e) => setThreats((p) => (e.target.checked ? [...p, th.id] : p.filter((x) => x !== th.id)))}
                  />
                  <span>{t(`th.${th.id}`)}</span>
                </label>
              ))}
            </div>
          </div>
          {severe && (
            <div className="emergency" style={{ marginBottom: 16 }}>
              <h3>{t("w.sevTitle")}</h3>
              <p style={{ margin: 0 }}>{t("w.sevText")}</p>
            </div>
          )}
          <div className="field">
            <label htmlFor="numbers">{t("w.numbers")}</label>
            <textarea id="numbers" value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder={"+91 88XXXXXXXX\n+91 91XXXXXXXX"} style={{ minHeight: 90 }} />
          </div>
          <div className="field">
            <label htmlFor="date">{t("w.date")}</label>
            <input id="date" type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="story">{t("w.story")}</label>
            <textarea id="story" value={story} onChange={(e) => setStory(e.target.value)} placeholder={t("w.storyPh")} />
            <span className="hint">{t("w.noAadhaar")}</span>
          </div>
          <div className="field">
            <label htmlFor="paid">{t("w.paid")}</label>
            <input id="paid" type="text" value={paidRecently} onChange={(e) => setPaidRecently(e.target.value)} placeholder={t("w.paidPh")} />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p>{t("w.evIntro")}</p>
          <div className="field">
            <label htmlFor="files" className="btn btn-ghost" style={{ width: "fit-content" }}>
              {busyFiles ? t("w.adding") : t("w.addFiles")}
            </label>
            <input
              id="files"
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
              style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
            />
            <span className="hint">
              {t("w.filesInfo", { n: files.length, max: MAX_FILES, mb: (totalSize / 1048576).toFixed(1) })}
            </span>
          </div>
          {files.length > 0 && (
            <div className="thumbs">
              {files.map((f) => (
                <div className="thumb" key={f.id}>
                  {f.url ? <img src={f.url} alt={f.name} /> : <div style={{ padding: 8, fontSize: ".8rem" }}>PDF</div>}
                  <span className="fname">{f.name}</span>
                  <button type="button" aria-label={`${f.name}: ${t("w.remove")}`} onClick={() => removeFile(f.id)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="hint" style={{ marginTop: 14, color: "var(--muted)" }}>
            {t("w.notStored")}
          </p>
        </>
      )}

      {step === 3 && (
        <>
          {drafting ? (
            <p>{t("w.drafting")}</p>
          ) : (
            <>
              <div className="kv">
                <span>To</span>
                <span>{to.join(", ")}</span>
                <span>CC</span>
                <span>{cc.join(", ") || "—"}</span>
                <span>📎</span>
                <span>{files.length} {t("w.files")}</span>
              </div>
              <label className="check" style={{ marginBottom: 14 }}>
                <input type="checkbox" id="ccrbi" checked={ccRbi} onChange={(e) => setCcRbi(e.target.checked)} />
                <span>{t("w.ccRbi")}</span>
              </label>
              <div className="field">
                <label htmlFor="subject">{t("w.subject")}</label>
                <input id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="body">{t("w.body")}</label>
                <textarea id="body" className="mail-body" value={body} onChange={(e) => setBody(e.target.value)} />
                <span className="hint">
                  {draftSource === "ai" ? t("w.bodyAi") : t("w.bodyTpl")} {t("w.bodyCheck")}
                </span>
              </div>
              <button type="button" className="btn btn-ghost btn-small" onClick={makeDraft}>
                {t("w.regen")}
              </button>
            </>
          )}
        </>
      )}

      {step === 4 && (
        <>
          <div className="notice" style={{ marginBottom: 14, fontSize: "1.05rem" }}>
            <b>{t("w.goesTo", { x: lenderName || "—" })}</b>
            {cc.includes(RBI_CRPC_EMAIL) ? t("w.andRbi") : ""}. {t("w.wrongCo")}
          </div>
          <div className="kv">
            <span>From</span>
            <span>{t("w.from")}</span>
            <span>To</span>
            <span>{to.join(", ")}</span>
            <span>CC</span>
            <span>{cc.join(", ") || "—"}</span>
            <span>{t("w.subjShort")}</span>
            <span>{subject}</span>
            <span>📎</span>
            <span>{files.length} {t("w.files")}</span>
          </div>
          <div className="checks" style={{ marginBottom: 16 }}>
            <label className="check">
              <input type="checkbox" id="truth" checked={agreeTruth} onChange={(e) => setAgreeTruth(e.target.checked)} />
              <span>{t("w.truth")}</span>
            </label>
            <label className="check">
              <input type="checkbox" id="agree" checked={agreeSend} onChange={(e) => setAgreeSend(e.target.checked)} />
              <span>
                {t("w.agree")} (<a href="/privacy" target="_blank">{t("foot.privacy")}</a>)
              </span>
            </label>
          </div>
          <button type="button" className="btn btn-primary" onClick={send} disabled={sending || !agreeTruth || !agreeSend} style={{ width: "100%" }}>
            {sending ? t("w.sending") : t("w.send")}
          </button>
          <p className="hint" style={{ color: "var(--muted)", fontSize: ".9rem", marginTop: 10 }}>
            {t("w.googleNote")}
          </p>

          <details style={{ marginTop: 18 }}>
            <summary>{t("w.noGmail")}</summary>
            <p>{t("w.noGmailText")}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              <button type="button" className="btn btn-ghost btn-small" onClick={copyAll}>
                {copied ? t("w.copied") : t("w.copy")}
              </button>
              <a className="btn btn-ghost btn-small" href={gmailComposeUrl(to, cc, subject, body)} target="_blank" rel="noopener noreferrer">
                {t("w.openGmail")}
              </a>
            </div>
          </details>
        </>
      )}

      {error && (
        <p className="err" role="alert" style={{ marginTop: 14 }}>
          {error}
        </p>
      )}

      <div className="row-actions">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => { setError(""); setStep((s) => s - 1); }} disabled={sending}>
            {t("w.back")}
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 && (
          <button type="button" className="btn btn-primary" onClick={next} disabled={drafting || busyFiles}>
            {step === 2 ? (drafting ? t("w.makingDraft") : t("w.makeDraft")) : t("w.next")}
          </button>
        )}
      </div>
    </div>
  );
}
