"use client";

import { useRef, useState } from "react";
import { useT } from "./LangProvider";

export default function CopyBlock({ title, text }: { title: string; text: string }) {
  const t = useT();
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLPreElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      const r = document.createRange();
      if (ref.current) {
        r.selectNodeContents(ref.current);
        const s = window.getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
    }
  }
  return (
    <div className="tpl">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <button type="button" className="btn btn-ghost btn-small" onClick={copy}>
          {done ? t("w.copied") : t("cb.copy")}
        </button>
      </div>
      <pre ref={ref}>{text}</pre>
    </div>
  );
}
