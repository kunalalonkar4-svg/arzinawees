import Link from "next/link";
import { articlesFor } from "@/lib/articles-l";
import { TESTIMONIALS } from "@/lib/testimonials";
import { LENDERS } from "@/lib/lenders";
import HeroArt from "@/components/HeroArt";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { APPDL } from "@/lib/content/appdl";
import { t as tr } from "@/lib/i18n";
import {
  IcAlert, IcArrow, IcBuilding, IcCheck, IcClock, IcEye, IcHome, IcImage, IcMail, IcMoon, IcPen, IcPhone, IcSend, IcShield, IcUsers, IcX,
} from "@/components/Icons";

const PROBLEMS = [
  { ic: <IcAlert />, k: "pr1" },
  { ic: <IcUsers />, k: "pr2" },
  { ic: <IcImage />, k: "pr3" },
  { ic: <IcHome />, k: "pr4" },
  { ic: <IcMoon />, k: "pr5" },
  { ic: <IcPhone />, k: "pr6" },
];

const PROCESS = [
  { ic: <IcPen />, k: "p1" },
  { ic: <IcEye />, k: "p2" },
  { ic: <IcSend />, k: "p3" },
];

export default async function Home() {
  const lang = await getLang();
  const t = (k: string) => tr(lang, k);
  const app = pick(lang, APPDL);
  return (
    <>
      <section className="hero-x">
        <div className="wrap">
          <div>
            <span className="chip" style={{ marginBottom: 16 }}>
              <IcShield size={16} /> {t("h.badge")}
            </span>
            <h1>
              {t("h.t1")} <em>{t("h.t2")}</em>
              {t("h.t3")}
            </h1>
            <p className="lead">{t("h.lead")}</p>
            <div className="hero-actions">
              <Link href="/shikayat" className="btn btn-primary" style={{ background: "var(--gold)", color: "#1c1600" }}>
                {t("cta.start")} <IcArrow size={18} />
              </Link>
              <Link href="/kaise-kaam-karta-hai" className="btn btn-ghost">
                {t("nav.how")}
              </Link>
            </div>
            <div className="chips">
              <span className="chip"><IcCheck size={16} /> {t("chip.free")}</span>
              <span className="chip"><IcCheck size={16} /> {t("chip.nocall")}</span>
              <span className="chip"><IcCheck size={16} /> {t("chip.gmail")}</span>
              <span className="chip"><IcCheck size={16} /> {t("chip.lang")}</span>
            </div>
          </div>
          <HeroArt l={t} />
        </div>
      </section>

      <section className="stats-band" aria-label="stats">
        <div className="wrap">
          <div className="stat-x"><b>20+</b><span>{t("s.helped")}</span></div>
          <div className="stat-x"><b>{t("s.minV")}</b><span>{t("s.min")}</span></div>
          <div className="stat-x"><b>₹0</b><span>{t("s.cost")}</span></div>
          <div className="stat-x"><b>{LENDERS.length}</b><span>{t("s.cos")}</span></div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">{t("p.eyebrow")}</span>
            <h2>{t("p.title")}</h2>
            <p>{t("p.sub")}</p>
          </div>
          <ol className="process">
            {PROCESS.map((p, i) => (
              <li className="reveal" key={p.k}>
                <span className="p-num">0{i + 1}</span>
                <span className="p-ic">{p.ic}</span>
                <h3>{t(`${p.k}.t`)}</h3>
                <p>{t(`${p.k}.d`)}</p>
              </li>
            ))}
          </ol>
          <p style={{ textAlign: "center", marginTop: 22 }}>
            <Link href="/kaise-kaam-karta-hai">{t("p.more")}</Link>
          </p>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{t("pr.eyebrow")}</span>
            <h2>{t("pr.title")}</h2>
            <p>{t("pr.sub")}</p>
          </div>
          <div className="icon-grid">
            {PROBLEMS.map((p) => (
              <div className="icard reveal" key={p.k}>
                <div className="ic">{p.ic}</div>
                <h3>{t(`${p.k}.t`)}</h3>
                <p>{t(`${p.k}.d`)}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href="/haq">{t("pr.more")}</Link>
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">{t("c.eyebrow")}</span>
            <h2>{t("c.title")}</h2>
          </div>
          <div className="compare reveal">
            <div className="good">
              <h3><IcShield /> Arzinawees</h3>
              <ul>
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n}><IcCheck size={20} /> {t(`c.g${n}`)}</li>
                ))}
              </ul>
            </div>
            <div className="bad">
              <h3><IcAlert /> {t("c.bad")}</h3>
              <ul>
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n}><IcX size={20} /> {t(`c.b${n}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap story">
          <div>
            <span className="eyebrow">{t("st.eyebrow")}</span>
            <h2>{t("st.title")}</h2>
            <p>{t("st.p1")}</p>
            <p>{t("st.p2")}</p>
            <Link href="/about">{t("st.more")}</Link>
          </div>
          <div className="story-card reveal">
            <h3>{t("st.card")}</h3>
            <ol>
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n}><b>{t(`st.s${n}b`)}:</b> {t(`st.s${n}`)}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="two" style={{ marginBottom: 36 }}>
            {[1, 2].map((n) => (
              <div className="promise reveal" key={n}>
                <span className="eyebrow">{t(`m.e${n}`)}</span>
                <h3 style={{ fontSize: "1.35rem" }}>{t(`m.t${n}`)}</h3>
                <p>{t(`m.d${n}`)}</p>
              </div>
            ))}
          </div>
          <div className="sec-head">
            <span className="eyebrow">{t("tr.eyebrow")}</span>
            <h2>{t("tr.title")}</h2>
          </div>
          <div className="icon-grid">
            {[<IcShield key="a" />, <IcEye key="b" />, <IcMail key="c" />].map((ic, i) => (
              <div className="icard reveal" key={i}>
                <div className="ic" style={{ color: "var(--seal)" }}>{ic}</div>
                <h3>{t(`tr${i + 1}.t`)}</h3>
                <p>{t(`tr${i + 1}.d`)}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/privacy">{t("foot.privacy")}</Link> · <Link href="/grievance">{t("foot.grievance")}</Link> ·{" "}
            <Link href="/contact">{t("nav.contact")}</Link>
          </p>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{t("co.eyebrow")}</span>
            <h2>{t("co.title")}</h2>
            <p>{t("co.sub")}</p>
          </div>
          <div className="co-wrap">
            {LENDERS.map((l) => (
              <Link key={l.id} href={`/shikayat?lender=${l.id}`} className="co">
                <IcBuilding size={18} /> {l.name}
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/companies">{t("co.more")}</Link>
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{t("k.eyebrow")}</span>
            <h2>{t("k.title")}</h2>
          </div>
          <div className="grid-cards">
            {articlesFor(lang).slice(0, 3).map((a) => (
              <Link key={a.slug} href={`/gyan/${a.slug}`} className="card-link reveal">
                <span className="tag">{a.tag}</span>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 16 }}>
            <Link href="/gyan">{t("k.more")}</Link>
          </p>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{t("t.eyebrow")}</span>
              <h2>{t("t.title")}</h2>
            </div>
            <div className="grid-cards">
              {TESTIMONIALS.map((q) => (
                <figure className="quote reveal" key={q.text}>
                  <p>“{q.text}”</p>
                  <footer>{q.who}</footer>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="block alt">
        <div className="wrap two">
          <div>
            <span className="eyebrow">{t("f.eyebrow")}</span>
            <h2>{t("f.title")}</h2>
            {[1, 2, 3, 4].map((n) => (
              <details key={n}>
                <summary>{t(`f${n}q`)}</summary>
                <p>{t(`f${n}a`)}</p>
              </details>
            ))}
            <p style={{ marginTop: 14 }}>
              <Link href="/faq">{t("f.more")}</Link>
            </p>
          </div>
          <div>
            <span className="eyebrow">{t("hn.eyebrow")}</span>
            <h2>{t("hn.title")}</h2>
            <div className="help-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="hcard urgent"><span>{t("hn1.t")}</span><b className="num">112</b><p>{t("hn1.d")}</p></div>
              <div className="hcard"><span>{t("hn2.t")}</span><b className="num">1930</b><p>{t("hn2.d")}</p></div>
              <div className="hcard"><span>{t("hn3.t")}</span><b className="num">181</b><p>{t("hn3.d")}</p></div>
              <div className="hcard"><span>Tele-MANAS</span><b className="num">14416</b><p>{t("hn4.d")}</p></div>
            </div>
            <p style={{ marginTop: 14 }}>
              <Link href="/helplines">{t("hn.more")}</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="app-band reveal">
            <div className="app-band-ic" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ margin: 0 }}>{app.band}</h3>
              <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>{app.meta}</p>
            </div>
            <Link href="/app" className="btn btn-primary">{app.bandBtn}</Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="cta-band">
            <span className="chip" style={{ marginBottom: 14 }}><IcClock size={16} /> {t("cta.chip")}</span>
            <h2>{t("cta.title")}</h2>
            <p>{t("cta.sub")}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 18 }}>
              <Link href="/shikayat" className="btn btn-primary">
                {t("cta.start")} <IcArrow size={18} />
              </Link>
              <Link href="/format" className="btn btn-ghost" style={{ color: "var(--on-hero)", borderColor: "rgba(255,255,255,.35)" }}>
                <IcMail size={18} /> {t("cta.format")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
