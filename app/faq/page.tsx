import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { FAQ } from "@/lib/content/faq";

export async function generateMetadata() {
  return { title: pick(await getLang(), FAQ).title };
}

export default async function Faq() {
  const c = pick(await getLang(), FAQ);
  return (
    <div className="wrap narrow prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          }),
        }}
      />
      <h1>{c.title}</h1>
      {c.qa.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
