"use client";

import { useEffect, useState } from "react";
import type { AppText } from "@/lib/content/appdl";

// APK GitHub Release se aata hai (Actions banata hai). Badalna ho to NEXT_PUBLIC_APK_URL set karein.
const APK =
  process.env.NEXT_PUBLIC_APK_URL || "https://github.com/kunalalonkar4-svg/arzinawees/releases/latest/download/Arzinawees.apk";
const EXTERNAL = /^https?:/.test(APK);

// APK button (file na ho to "jald aa raha" sandesh) + PWA "home screen par jodo"
export default function AppDownload({ c }: { c: AppText }) {
  const [apk, setApk] = useState<"checking" | "yes" | "no">("checking");
  const [size, setSize] = useState("");
  const [prompt, setPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (EXTERNAL) setApk("yes");
    else fetch(APK, { method: "HEAD", cache: "no-store" })
      .then((r) => {
        const type = r.headers.get("content-type") || "";
        if (!r.ok || type.includes("text/html")) return setApk("no");
        const len = Number(r.headers.get("content-length") || 0);
        if (len) setSize(`${(len / 1048576).toFixed(1)} MB`);
        setApk("yes");
      })
      .catch(() => setApk("no"));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return (
    <div className="sheet app-dl">
      {apk === "yes" ? (
        <a href={APK} download="Arzinawees.apk" rel="noopener" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {c.btn}
        </a>
      ) : (
        <button type="button" className="btn btn-primary" disabled style={{ width: "100%", justifyContent: "center" }}>
          {apk === "checking" ? c.checking : c.btn}
        </button>
      )}
      <p className="hint" style={{ textAlign: "center", margin: "10px 0 0" }}>
        {c.meta}
        {size ? ` · ${size}` : ""}
      </p>
      {apk === "no" && <p className="notice" style={{ marginTop: 12 }}>{c.soon}</p>}
      <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "18px 0" }} />
      <h3 style={{ marginTop: 0 }}>{c.pwaT}</h3>
      {prompt && !installed ? (
        <button
          type="button"
          className="btn btn-ghost"
          onClick={async () => {
            prompt.prompt();
            await prompt.userChoice.catch(() => null);
            setPrompt(null);
          }}
        >
          {c.pwaBtn}
        </button>
      ) : (
        <p style={{ margin: 0, color: "var(--muted)" }}>{c.pwaHow}</p>
      )}
    </div>
  );
}
