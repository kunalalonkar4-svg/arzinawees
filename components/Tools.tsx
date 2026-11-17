"use client";

// Chhote shared buttons: bolkar likhna, copy, WhatsApp share
import { useEffect, useRef, useState } from "react";
import { useLang, useT } from "./LangProvider";
import { LOCALE } from "@/lib/i18n";
import { waUrl } from "@/lib/local";

/* ---------- Voice input (Web Speech API; Chrome/Android par chalta hai) ---------- */
export function VoiceButton({ onText }: { onText: (text: string) => void }) {
  const t = useT();
  const lang = useLang();
  const [supported, setSupported] = useState(false);
  const [on, setOn] = useState(false);
  const [err, setErr] = useState("");
  const rec = useRef<any>(null);
  const cb = useRef(onText);
  cb.current = onText;

  useEffect(() => {
    const w = window as any;
    setSupported(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => rec.current?.abort?.();
  }, []);

  function toggle() {
    if (on) {
      rec.current?.stop();
      return;
    }
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = LOCALE[lang];
    r.continuous = true;
    r.interimResults = false;
    r.onresult = (e: any) => {
      let s = "";
      for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) s += e.results[i][0].transcript;
      if (s.trim()) cb.current(s.trim());
    };
    r.onerror = (e: any) => {
      if (e.error !== "aborted" && e.error !== "no-speech") setErr(t("x.voiceErr"));
    };
    r.onend = () => setOn(false);
    rec.current = r;
    setErr("");
    try {
      r.start();
      setOn(true);
    } catch {
      setErr(t("x.voiceErr"));
    }
  }

  if (!supported) return null;
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
      <button type="button" className={`btn btn-small ${on ? "btn-primary" : "btn-ghost"}`} onClick={toggle} aria-pressed={on} style={{ width: "fit-content" }}>
        {on ? t("x.listening") : t("x.voice")}
      </button>
      {err && <span className="err" style={{ fontSize: ".88rem" }}>{err}</span>}
    </span>
  );
}

/* ---------- Copy ---------- */
export function CopyButton({ text, label }: { text: string; label?: string }) {
  const t = useT();
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      ta.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }
  return (
    <button type="button" className="btn btn-ghost btn-small" onClick={copy}>
      {done ? t("x.copied") : label || t("x.copy")}
    </button>
  );
}

/* ---------- WhatsApp ---------- */
export function WhatsAppButton({ text, label, primary }: { text: string; label?: string; primary?: boolean }) {
  const t = useT();
  return (
    <a className={`btn btn-small ${primary ? "btn-wa" : "btn-ghost"}`} href={waUrl(text)} target="_blank" rel="noopener noreferrer">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
      {label || t("x.wa")}
    </a>
  );
}

/* ---------- Site share (footer / home / success) ---------- */
export function ShareSite({ primary = true }: { primary?: boolean }) {
  const t = useT();
  const [url, setUrl] = useState("https://arzinawees.in");
  useEffect(() => setUrl(window.location.origin), []);
  return <WhatsAppButton text={`${t("x.shareText")} ${url}`} label={t("x.shareSite")} primary={primary} />;
}
