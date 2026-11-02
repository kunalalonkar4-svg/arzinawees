import Link from "next/link";
import { notFound } from "next/navigation";
import { articleFor, articlesFor } from "@/lib/articles-l";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleFor(await getLang(), (await params).slug);
  return a ? { title: a.title, description: a.summary } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getLang();
  const a = articleFor(lang, (await params).slug);
  if (!a) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://arzinawees.in";
  const related = articlesFor(lang).filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article className="wrap narrow prose article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.summary,
            inLanguage: lang,
            publisher: { "@type": "Organization", name: "Arzinawees" },
            mainEntityOfPage: `${site}/gyan/${a.slug}`,
          }),
        }}
      />
      <div className="breadcrumb">
        <Link href="/gyan">{t(lang, "g.title")}</Link> › {a.tag}
      </div>
      <h1 style={{ fontSize: "clamp(1.8rem,4.6vw,2.6rem)" }}>{a.title}</h1>
      <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>{a.summary}</p>
      {a.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p?.map((t) => <p key={t}>{t}</p>)}
          {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
          {s.steps && <ol>{s.steps.map((t) => <li key={t}>{t}</li>)}</ol>}
        </section>
      ))}
      <div className="notice" style={{ marginTop: 28 }}>{t(lang, "g.note")}</div>
      <p style={{ marginTop: 24 }}>
        <Link href="/shikayat" className="btn btn-primary">
          {t(lang, "cta.start")}
        </Link>
      </p>
      <h2>{t(lang, "g.related")}</h2>
      <div className="grid-cards">
        {related.map((r) => (
          <Link key={r.slug} href={`/gyan/${r.slug}`} className="card-link">
            <span className="tag">{r.tag}</span>
            <h3>{r.title}</h3>
          </Link>
        ))}
      </div>
    </article>
  );
}
