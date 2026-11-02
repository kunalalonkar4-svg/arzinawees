import AppDownload from "@/components/AppDownload";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { APPDL } from "@/lib/content/appdl";

export async function generateMetadata() {
  const c = pick(await getLang(), APPDL);
  return { title: c.title, description: c.desc };
}

export default async function AppPage() {
  const c = pick(await getLang(), APPDL);
  return (
    <>
      <section className="hero-x" style={{ paddingBlock: "44px 48px" }}>
        <div className="wrap" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>{c.eyebrow}</span>
            <h1 style={{ fontSize: "clamp(1.9rem,5vw,2.9rem)" }}>{c.h1}</h1>
            <p className="lead">{c.sub}</p>
          </div>
          <AppDownload c={c} />
        </div>
      </section>
      <section className="block">
        <div className="wrap narrow prose">
          <h2>{c.stepsT}</h2>
          <ol>{c.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
          <h2>{c.whyT}</h2>
          <ul className="list-check list-ok">{c.why.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <p className="notice" style={{ marginTop: 20 }}>{c.safe}</p>
        </div>
      </section>
    </>
  );
}
