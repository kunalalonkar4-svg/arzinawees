import Link from "next/link";
import CopyBlock from "@/components/CopyBlock";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { FORMAT } from "@/lib/content/format";

export async function generateMetadata() {
  const c = pick(await getLang(), FORMAT);
  return { title: c.title, description: c.desc };
}

const LENDER = `To: [Company grievance email]
CC: [Nodal officer email], crpc@rbi.org.in
Subject: Complaint against recovery agents: harassment and threats (Loan ID [____])

To the Grievance Redressal Officer,
[Company name]

I, [Name], resident of [City] (registered mobile: [Mobile]), have a loan with [Company], Loan ID [____].

Your recovery agents have been harassing me:
1. Abusive language, including abuse of my family, from [numbers].
2. Calls to my family members and contacts.
3. [Any other threat, with date and time]

This violates the RBI Fair Practices Code and RBI directions on recovery agents. I request you to:
1. Stop all abusive calls and messages immediately.
2. Inform me in writing within 7 days of the recovery agency's name and the action taken.
3. Communicate with me only in writing.

If unresolved, I will escalate to the RBI Ombudsman and the police. Screenshots are attached.

[Name]
[Mobile]`;

const NODAL = `To: [Principal Nodal Officer email]
Subject: Escalation: no resolution of my complaint dated [date] (Loan ID [____])

Dear Principal Nodal Officer,

I complained to your Grievance Redressal Officer on [date] about abuse and threats by your recovery agents (copy attached). I have received no satisfactory response, and the harassment continues.

Please take action within the time required under RBI rules and inform me in writing. Otherwise I will file a complaint with the RBI Ombudsman (cms.rbi.org.in).

[Name], [Mobile]`;

export default async function Format() {
  const c = pick(await getLang(), FORMAT);
  return (
    <div className="wrap narrow prose">
      <span className="eyebrow">{c.eyebrow}</span>
      <h1>{c.title}</h1>
      <p style={{ color: "var(--muted)" }}>
        {c.introPre} <Link href="/shikayat">{c.formLink}</Link>
        {c.introPost}
      </p>
      <CopyBlock title={c.t1} text={LENDER} />
      <CopyBlock title={c.t2} text={NODAL} />
      <CopyBlock title={c.t3} text={c.police} />
      <div className="notice">{c.note}</div>
    </div>
  );
}
