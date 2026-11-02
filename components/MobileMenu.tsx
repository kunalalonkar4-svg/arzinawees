"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IcMenu, IcX } from "./Icons";
import LangSwitcher from "./LangSwitcher";
import { useT } from "./LangProvider";

export default function MobileMenu({ items, extra, cta }: { items: [string, string][]; extra: [string, string][]; cta: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const t = useT();
  useEffect(() => setOpen(false), [path]);

  return (
    <div className="mob-only">
      <button type="button" className="theme-btn" aria-expanded={open} aria-label={open ? t("menu.close") : t("menu.open")} onClick={() => setOpen((o) => !o)}>
        {open ? <IcX size={20} /> : <IcMenu size={20} />}
      </button>
      {open && (
        <nav className="mob-menu" aria-label="menu">
          <div style={{ padding: "6px 0 10px" }}>
            <LangSwitcher id="lang-select-mob" wide />
          </div>
          {[...items, ...extra].map(([h, l]) => (
            <Link key={h} href={h} className={path === h ? "on" : ""}>
              {l}
            </Link>
          ))}
          <Link href="/shikayat" className="btn btn-primary" style={{ marginTop: 8 }}>
            {cta}
          </Link>
        </nav>
      )}
    </div>
  );
}
