import Link from "next/link";
import { Logo } from "./Header";
import { getLang } from "@/lib/lang";
import { t as tr } from "@/lib/i18n";

export default async function Footer() {
  const lang = await getLang();
  const t = (k: string) => tr(lang, k);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "arzinawees@gmail.com";
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-cols">
          <div>
            <div className="brand" style={{ marginBottom: 10 }}>
              <Logo size={34} />
              <b style={{ fontFamily: "var(--display)", fontWeight: 400, fontSize: "1.35rem", color: "var(--ink)" }}>Arzinawees</b>
            </div>
            <p style={{ margin: 0 }}>{t("foot.desc")}</p>
            <p style={{ marginTop: 8 }}>{t("foot.contact")}: {email}</p>
          </div>
          <div>
            <h4>{t("foot.service")}</h4>
            <ul>
              <li><Link href="/shikayat">{t("cta.short")}</Link></li>
              <li><Link href="/status">{t("nav.status")}</Link></li>
              <li><Link href="/kaise-kaam-karta-hai">{t("nav.how")}</Link></li>
              <li><Link href="/companies">{t("nav.companies")}</Link></li>
              <li><Link href="/format">{t("foot.format")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("foot.info")}</h4>
            <ul>
              <li><Link href="/haq">{t("nav.haq")}</Link></li>
              <li><Link href="/gyan">{t("foot.gyan")}</Link></li>
              <li><Link href="/helplines">{t("foot.helplines")}</Link></li>
              <li><Link href="/faq">{t("nav.faq")}</Link></li>
              <li><Link href="/app">{t("nav.app")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>Arzinawees</h4>
            <ul>
              <li><Link href="/about">{t("nav.about")}</Link></li>
              <li><Link href="/contact">{t("nav.contact")}</Link></li>
              <li><Link href="/privacy">{t("foot.privacy")}</Link></li>
              <li><Link href="/terms">{t("foot.terms")}</Link></li>
              <li><Link href="/disclaimer">{t("foot.disclaimer")}</Link></li>
              <li><Link href="/grievance">{t("foot.grievance")}</Link></li>
              <li><Link href="/accessibility">{t("foot.accessibility")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-legal">
          <p>{t("foot.legal")}</p>
          <p>{t("foot.emergency")}</p>
          <p style={{ paddingBottom: 56 }}>© {new Date().getFullYear()} Arzinawees · {t("brand.tag")}</p>
        </div>
      </div>
    </footer>
  );
}
