import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { IcMail, IcClock, IcShield } from "@/components/Icons";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { t } from "@/lib/i18n";
import { CONTACT } from "@/lib/content/contact";

export async function generateMetadata() {
  const c = pick(await getLang(), CONTACT);
  return { title: c.title, description: c.desc };
}

export default async function Contact() {
  const lang = await getLang();
  const c = pick(lang, CONTACT);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "arzinawees@gmail.com";
  return (
    <div className="wrap" style={{ paddingBlock: "36px 64px" }}>
      <span className="eyebrow">{c.eyebrow}</span>
      <h1>{c.h1}</h1>
      <div className="two" style={{ marginTop: 16 }}>
        <div>
          <p style={{ color: "var(--muted)" }}>{c.sub}</p>
          <div className="grid-cards" style={{ gridTemplateColumns: "1fr", marginTop: 16 }}>
            <div className="hcard"><IcMail /><h3 style={{ margin: "6px 0 2px" }}>{c.email}</h3><p>{email}</p></div>
            <div className="hcard"><IcClock /><h3 style={{ margin: "6px 0 2px" }}>{c.timeT}</h3><p>{c.time}</p></div>
            <div className="hcard"><IcShield /><h3 style={{ margin: "6px 0 2px" }}>{c.dangerT}</h3><p>{c.danger}</p></div>
          </div>
          <p style={{ marginTop: 16 }}>
            {c.grvPre} <Link href="/grievance">{c.grvLink}</Link>
          </p>
        </div>
        <ContactForm c={{ ...c.form, e400: t(lang, "ct.e400"), e429: t(lang, "ct.e429") }} />
      </div>
    </div>
  );
}
