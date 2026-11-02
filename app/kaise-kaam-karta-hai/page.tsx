import Link from "next/link";
import { IcClock, IcEye, IcMail, IcPen, IcSend, IcShield } from "@/components/Icons";
import Rich from "@/components/Rich";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { HOW } from "@/lib/content/how";

export async function generateMetadata() {
  const c = pick(await getLang(), HOW);
  return { title: c.title, description: c.desc };
}

const ICONS = [<IcPen key="1" />, <IcShield key="2" />, <IcMail key="3" />, <IcEye key="4" />, <IcSend key="5" />, <IcClock key="6" />];

export default async function How() {
  const c = pick(await getLang(), HOW);
  return (
    <>
      <section className="hero-x" style={{ paddingBlock: "48px 52px" }}>
        <div className="wrap" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>{c.eyebrow}</span>
            <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>{c.title}</h1>
            <p className="lead">{c.lead}</p>
          </div>
        </div>
      </section>
      <section className="block">
        <div className="wrap narrow">
          <ol className="process" style={{ gridTemplateColumns: "1fr" }}>
            {c.steps.map(([t, d], i) => (
              <li key={i} className="reveal" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "start" }}>
                <span className="p-ic" style={{ marginBottom: 0 }}>{ICONS[i]}</span>
                <div>
                  <span className="p-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <h2 style={{ marginTop: 36 }}>{c.gTitle}</h2>
          <ul>
            {c.g.map((x, i) => (
              <li key={i}><Rich text={x} /></li>
            ))}
          </ul>
          <p style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/shikayat" className="btn btn-primary">{c.start}</Link>
            <Link href="/format" className="btn btn-ghost">{c.sample}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
