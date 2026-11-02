import { THREATS } from "./lenders";

export type ComplaintInput = {
  name: string;
  mobile: string;
  city: string;
  lenderName: string;
  loanId: string;
  threats: string[];
  numbers: string;
  incidentDate: string;
  story: string;
  paidRecently: string;
  attachmentCount: number;
};

const THREAT_EN: Record<string, string> = {
  abuse: "used filthy and abusive language, including abuse of my mother and sisters",
  family: "called and threatened my family members and relatives",
  contacts: "contacted people in my phone contacts about my loan",
  photo: "threatened to morph and circulate my photographs",
  rape: "threatened sexual violence (rape) against a woman in my family",
  life: "threatened physical harm / threatened my life",
  home: "threatened to come to my house and repeatedly asked for my home location",
  night: "called me before 8 AM or after 7 PM",
  many: "called me repeatedly in a day from multiple numbers",
  office: "called my workplace / employer",
};

export function isSevere(threats: string[]) {
  return threats.some((t) => THREATS.find((x) => x.id === t)?.severe);
}

// Aadhaar/PAN/card jaise number AI ko na jaayein
export function redactSensitive(text: string) {
  return text
    .replace(/\b\d{4}\s?\d{4}\s?\d{4}\b/g, "[removed]")
    .replace(/\b[A-Z]{5}\d{4}[A-Z]\b/g, "[removed]")
    .replace(/\b\d{13,19}\b/g, "[removed]");
}

export function templateDraft(c: ComplaintInput) {
  const lines = c.numbers
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const acts = c.threats.map((t) => THREAT_EN[t]).filter(Boolean);
  const subject = `Complaint against recovery agents: harassment and threats${
    c.loanId ? ` (Loan ID ${c.loanId})` : ""
  }, ${c.name}`;

  const body = [
    `To the Grievance Redressal Officer / Principal Nodal Officer,`,
    `${c.lenderName}`,
    ``,
    `I, ${c.name}${c.city ? `, resident of ${c.city}` : ""} (registered mobile: ${c.mobile}), have a loan with ${c.lenderName}${
      c.loanId ? `, Loan ID ${c.loanId}` : ""
    }.`,
    ``,
    `Your recovery agents have been harassing me in the following ways${
      c.incidentDate ? ` (most recently on ${c.incidentDate})` : ""
    }:`,
    ...acts.map((a, i) => `${i + 1}. They ${a}.`),
    ``,
    lines.length
      ? `The calls and messages came from these numbers: ${lines.join(", ")}.`
      : ``,
    c.story ? `In my own words: ${c.story}` : ``,
    c.paidRecently ? `Repayment status: ${c.paidRecently}` : ``,
    ``,
    `This conduct violates the RBI Fair Practices Code, the RBI directions on recovery agents and digital lending, and is a criminal offence. I request you to:`,
    `1. Stop all abusive calls and messages from these agents immediately.`,
    `2. Inform me in writing, within 7 days, of the name of the recovery agency and the action taken against these agents.`,
    `3. Communicate with me only in writing, and only about genuine repayment matters.`,
    ``,
    `If I do not receive a satisfactory response, I will escalate this complaint to the RBI Ombudsman and the police.`,
    c.attachmentCount ? `Screenshots of the calls and messages are attached as evidence.` : ``,
    ``,
    `${c.name}`,
    `Mobile: ${c.mobile}`,
  ]
    .filter((l, i, arr) => !(l === "" && arr[i - 1] === ""))
    .join("\n");

  return { subject, body };
}
