import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import LangSwitcher from "./LangSwitcher";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="13.5" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M20 9 L25 20 L20 31 L15 20 Z" fill="currentColor" />
      <circle cx="20" cy="20" r="2" fill="var(--sheet)" />
      <path d="M20 22 L20 31" stroke="var(--sheet)" strokeWidth="1.2" />
    </svg>
  );
}

const NAV_KEYS: [string, string][] = [
  ["/kaise-kaam-karta-hai", "nav.how"],
  ["/companies", "nav.companies"],
  ["/haq", "nav.haq"],
  ["/gyan", "nav.gyan"],
  ["/helplines", "nav.helplines"],
  ["/status", "nav.status"],
];

export default async function Header() {
  const lang = await getLang();
  const nav: [string, string][] = NAV_KEYS.map(([h, k]) => [h, t(lang, k)]);
  const extra: [string, string][] = [
    ["/faq", t(lang, "nav.faq")],
    ["/about", t(lang, "nav.about")],
    ["/contact", t(lang, "nav.contact")],
    ["/app", `📱 ${t(lang, "nav.app")}`],
  ];
  return (
    <header className="site-head">
      <div className="wrap head-row">
        <Link href="/" className="brand" aria-label="Arzinawees">
          <Logo />
          <span>
            <b>Arzinawees</b>
            <small>{t(lang, "brand.tag")}</small>
          </span>
        </Link>
        <nav className="nav desk-only" aria-label="main">
          {nav.map(([h, l]) => (
            <Link key={h} href={h}>
              {l}
            </Link>
          ))}
        </nav>
        <div className="head-actions">
          <Link href="/shikayat" className="btn btn-primary btn-small">
            {t(lang, "cta.short")}
          </Link>
          <LangSwitcher />
          <ThemeToggle />
          <MobileMenu items={nav} extra={extra} cta={t(lang, "cta.start")} />
        </div>
      </div>
    </header>
  );
}
