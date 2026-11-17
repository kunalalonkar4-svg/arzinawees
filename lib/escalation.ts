// Agle kadam ki arziyan: reminder email, RBI (CMS) shikayat, police / cyber crime arzi.
// Ye template hain (AI nahi), taaki koi tathya galat na jude. User inhe badal sakta hai.
import { THREATS } from "./lenders";

export type EscInput = {
  name: string;
  mobile: string;
  city: string;
  lenderName: string;
  loanId: string;
  sentOn: string; // YYYY-MM-DD
  subject: string;
  threats: string[];
  numbers: string;
  story: string;
  stillHarassing: boolean;
  replied: boolean; // jawab aaya par santoshjanak nahi
  newIncidents: string;
  diary: string; // diaryText() ka output, ya ""
  station: string;
};

const THREAT_EN: Record<string, string> = {
  abuse: "used filthy and abusive language",
  family: "called and threatened my family members and relatives",
  contacts: "contacted people in my phone contacts about my loan",
  photo: "threatened to morph and circulate my photographs",
  rape: "threatened sexual violence against a woman in my family",
  life: "threatened physical harm / threatened my life",
  home: "threatened to come to my house",
  night: "called me before 8 AM or after 7 PM",
  many: "called me repeatedly in a day from multiple numbers",
  office: "called my workplace / employer",
};

const fmt = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}-${m}-${y}` : iso;
};
const nums = (s: string) =>
  s
    .split(/[\n,]+/)
    .map((x) => x.trim())
    .filter(Boolean);
const tidy = (lines: string[]) => lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n").trim();
const loan = (c: EscInput) => (c.loanId ? ` (Loan ID ${c.loanId})` : "");

export function reminderDraft(c: EscInput) {
  const subject = `REMINDER & ESCALATION: unresolved harassment complaint dated ${fmt(c.sentOn)}${loan(c)}, ${c.name}`;
  const body = tidy([
    `To the Principal Nodal Officer / Grievance Redressal Officer,`,
    c.lenderName,
    ``,
    `I, ${c.name} (registered mobile: ${c.mobile}), had sent a written complaint on ${fmt(c.sentOn)}${
      c.subject ? ` with the subject "${c.subject}"` : ""
    } about harassment by your recovery agents${loan(c)}.`,
    ``,
    c.replied
      ? `I received a reply, but it did not address my complaint: no action against the agents was communicated and the name of the recovery agency was not shared.`
      : `As of today, I have not received any response from you.`,
    c.stillHarassing ? `The harassment has not stopped. Your agents are still calling and threatening me.` : ``,
    c.newIncidents ? `Since my last complaint: ${c.newIncidents}` : ``,
    c.diary ? `\nRecord of incidents:\n${c.diary}` : ``,
    ``,
    `I am escalating this complaint to the Principal Nodal Officer and request you to, within 7 days:`,
    `1. Stop all abusive and threatening calls and messages immediately.`,
    `2. Share in writing the name of the recovery agency and the action taken against the agents.`,
    `3. Communicate with me only in writing.`,
    ``,
    `If this is not resolved within 30 days of my first complaint, I will file a complaint under the Reserve Bank - Integrated Ombudsman Scheme, 2021 on cms.rbi.org.in, and approach the police / cyber crime cell.`,
    ``,
    c.name,
    `Mobile: ${c.mobile}`,
  ]);
  return { subject, body };
}

export function rbiDraft(c: EscInput) {
  const acts = c.threats.map((t) => THREAT_EN[t]).filter(Boolean);
  const n = nums(c.numbers);
  const text = tidy([
    `I have a loan with ${c.lenderName}${loan(c)}. Its recovery agents have harassed me${acts.length ? ": they " + acts.join("; ") : ""}.`,
    n.length ? `Calls and messages came from: ${n.join(", ")}.` : ``,
    c.story ? `Details: ${c.story}` : ``,
    c.diary ? `Record of incidents:\n${c.diary}` : ``,
    ``,
    `I complained to the lender in writing on ${fmt(c.sentOn)}. ${
      c.replied ? `Its reply was unsatisfactory and no action against the agents was shared.` : `I have received no response.`
    }${c.stillHarassing ? ` The harassment is still continuing.` : ``}${c.newIncidents ? ` ${c.newIncidents}` : ``}`,
    ``,
    `This violates the RBI Fair Practices Code and RBI directions on recovery agents and digital lending.`,
    ``,
    `Relief sought: (1) direct the lender to stop the harassment immediately; (2) direct it to disclose the recovery agency and act against the agents; (3) any compensation the Ombudsman finds fit for the mental agony caused.`,
  ]);
  return text;
}

export function policeDraftHi(c: EscInput) {
  const acts = c.threats.map((t) => THREATS.find((x) => x.id === t)?.label).filter(Boolean) as string[];
  const n = nums(c.numbers);
  const date = new Date().toLocaleDateString("hi-IN");
  return tidy([
    `सेवा में,`,
    `थाना प्रभारी / साइबर सेल`,
    c.station ? `थाना / शहर: ${c.station}` : `थाना ____________________`,
    ``,
    `विषय: लोन रिकवरी एजेंटों द्वारा धमकी, गाली-गलौज और उत्पीड़न के संबंध में शिकायत।`,
    ``,
    `महोदय/महोदया,`,
    `मैं ${c.name}${c.city ? `, निवासी ${c.city}` : ""} (मोबाइल: ${c.mobile}), निवेदन करता/करती हूँ कि मैंने ${c.lenderName} से लोन लिया है${
      c.loanId ? ` (लोन ID ${c.loanId})` : ""
    }। इस कंपनी के रिकवरी एजेंट मुझे लगातार परेशान कर रहे हैं:`,
    ...acts.map((a, i) => `${i + 1}. ${a}`),
    ``,
    n.length ? `धमकी इन नंबरों से आई: ${n.join(", ")}` : ``,
    c.story ? `घटना का विवरण: ${c.story}` : ``,
    c.newIncidents ? `हाल की घटना: ${c.newIncidents}` : ``,
    c.diary ? `घटनाओं का रिकॉर्ड:\n${c.diary}` : ``,
    ``,
    c.sentOn ? `मैंने ${fmt(c.sentOn)} को कंपनी को लिखित शिकायत भेजी थी, लेकिन उत्पीड़न नहीं रुका।` : ``,
    ``,
    `यह आपराधिक धमकी, गाली-गलौज और मानहानि जैसे अपराध हैं, जो भारतीय न्याय संहिता (BNS) और सूचना प्रौद्योगिकी (IT) अधिनियम के तहत दंडनीय हैं। कृपया इन नंबरों और एजेंटों के ख़िलाफ़ उचित धाराओं में मामला दर्ज करके कार्रवाई करें, और मेरी व मेरे परिवार की सुरक्षा सुनिश्चित करें।`,
    ``,
    `सबूत (स्क्रीनशॉट, कॉल रिकॉर्डिंग, कंपनी को भेजा ईमेल) साथ में संलग्न हैं।`,
    ``,
    `दिनांक: ${date}`,
    ``,
    `हस्ताक्षर: ____________________`,
    `नाम: ${c.name}`,
    `मोबाइल: ${c.mobile}`,
  ]);
}

export function policeDraftEn(c: EscInput) {
  const acts = c.threats.map((t) => THREAT_EN[t]).filter(Boolean);
  const n = nums(c.numbers);
  return tidy([
    `I, ${c.name}${c.city ? ` of ${c.city}` : ""} (mobile ${c.mobile}), have a loan with ${c.lenderName}${loan(c)}. Its recovery agents are harassing me.`,
    acts.length ? `They ${acts.join("; ")}.` : ``,
    n.length ? `Threatening calls / messages came from: ${n.join(", ")}.` : ``,
    c.story ? `Details: ${c.story}` : ``,
    c.newIncidents ? `Recent incident: ${c.newIncidents}` : ``,
    c.diary ? `Record of incidents:\n${c.diary}` : ``,
    c.sentOn ? `I complained to the lender in writing on ${fmt(c.sentOn)}, but the harassment has not stopped.` : ``,
    ``,
    `These acts amount to criminal intimidation, abuse and defamation, punishable under the Bharatiya Nyaya Sanhita and the Information Technology Act. I request action against the persons using these numbers and protection for me and my family. Screenshots and recordings are attached.`,
  ]);
}
