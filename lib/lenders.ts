// Loan companies ke grievance email.
// IMPORTANT: Har email company ki official website ke "Grievance Redressal" page se
// verify karke hi yahan jodein. Galat email par complaint jaayegi to user ka nuksaan hoga.

export type Lender = {
  id: string;
  name: string;
  legalName: string;
  to: string[]; // grievance / customer care
  cc: string[]; // nodal / grievance officer
  verifiedOn?: string;
  source?: string; // jahan se email liya gaya
};

// 2026-11-01 ko jaancha gaya. "official" = company ki apni website/document.
// "third-party" wale emails ko launch se pehle company ki website par ek baar zaroor milaayein.
export const LENDERS: Lender[] = [
  {
    id: "kreditbee",
    name: "KreditBee",
    legalName: "KrazyBee Services Ltd",
    to: ["help@kreditbee.in"],
    cc: ["grievance@kbnbfc.in"],
    verifiedOn: "2026-10-31",
    source: "third-party (complainthub); 20+ cases mein kaam kiya",
  },
  {
    id: "moneyview",
    name: "Moneyview",
    legalName: "Whizdm Finance Pvt Ltd",
    to: ["GR@whizdmfinance.com", "customercare@whizdmfinance.com"],
    cc: ["pno@whizdmfinance.com"],
    verifiedOn: "2026-11-01",
    source: "official: whizdmfinance.com/grievance-redressal",
  },
  {
    id: "fibe",
    name: "Fibe (EarlySalary)",
    legalName: "Social Worth Technologies Ltd",
    to: ["grievance@fibe.in", "care@fibe.in"],
    cc: [],
    verifiedOn: "2026-11-01",
    source: "official: fibe.in/grievance-redressal",
  },
  {
    id: "mpokket",
    name: "mPokket",
    legalName: "mPokket Financial Services Pvt Ltd",
    to: ["grievance@mpokket.com"],
    cc: [],
    verifiedOn: "2026-11-01",
    source: "third-party (gocredit.money, RBI public records)",
  },
  {
    id: "cashe",
    name: "CASHe",
    legalName: "Bhanix Finance and Investment Ltd",
    to: ["Grievance@Bhanix.in", "support@bhanix.in"],
    cc: ["bhanix@bhanix.in"],
    verifiedOn: "2026-11-01",
    source: "official: cashe.co.in lending partners page",
  },
  {
    id: "truebalance",
    name: "True Balance",
    legalName: "True Balance Pvt Ltd",
    to: ["terms@balancehero.com", "cs@balancehero.com"],
    cc: ["nodalofficer.cg@balancehero.com"],
    verifiedOn: "2026-11-01",
    source: "official: True Balance grievance policy PDF",
  },
  {
    id: "homecredit",
    name: "Home Credit",
    legalName: "Home Credit India Finance Pvt Ltd",
    to: ["grievanceofficer@homecredit.co.in", "care@homecredit.co.in"],
    cc: ["in.pno@homecredit.co.in"],
    verifiedOn: "2026-11-01",
    source: "official: homecredit.co.in/en/contact-us",
  },
  {
    id: "bajaj",
    name: "Bajaj Finance",
    legalName: "Bajaj Finance Ltd",
    to: ["grievanceredressalteam@bajajfinserv.in"],
    cc: ["ospno@bajajfinserv.in"],
    verifiedOn: "2026-11-01",
    source: "official: bajajfinserv.in/grievance-redressal-procedure",
  },
  {
    id: "incred",
    name: "InCred",
    legalName: "InCred Financial Services Ltd",
    to: ["incred.grievance@incred.com", "care@incred.com"],
    cc: [],
    verifiedOn: "2026-11-01",
    source: "official: cashe.co.in lending partners page",
  },
  {
    id: "poonawalla",
    name: "Poonawalla Fincorp",
    legalName: "Poonawalla Fincorp Ltd",
    to: ["grievance@poonawallafincorp.com", "customercare@poonawallafincorp.com"],
    cc: [],
    verifiedOn: "2026-11-01",
    source: "official: cashe.co.in lending partners page",
  },
  {
    id: "northernarc",
    name: "Northern Arc",
    legalName: "Northern Arc Capital Ltd",
    to: ["gro@northernarc.com"],
    cc: ["nodal.officer@northernarc.com"],
    verifiedOn: "2026-11-01",
    source: "official: cashe.co.in lending partners page",
  },
  {
    id: "vivriti",
    name: "Vivriti Capital",
    legalName: "Vivriti Capital Ltd",
    to: ["grievanceredressal@vivriticapital.com"],
    cc: [],
    verifiedOn: "2026-11-01",
    source: "official: cashe.co.in lending partners page",
  },
  {
    id: "lendbox",
    name: "Lendbox",
    legalName: "Transactree Technologies Pvt Ltd",
    to: ["grievances@lendbox.in"],
    cc: [],
    verifiedOn: "2026-11-01",
    source: "official: cashe.co.in lending partners page",
  },
  {
    id: "apollo",
    name: "Apollo Finvest",
    legalName: "Apollo Finvest (India) Ltd",
    to: ["compliance@apollofinvest.com"],
    cc: [],
    verifiedOn: "2026-11-01",
    source: "official: cashe.co.in lending partners page",
  },
];

export const OTHER_LENDER_ID = "other";

export const RBI_CRPC_EMAIL = "crpc@rbi.org.in";

export const THREATS: { id: string; label: string; severe?: boolean }[] = [
  { id: "abuse", label: "माँ-बहन की गालियाँ / गंदी भाषा" },
  { id: "family", label: "घरवालों या रिश्तेदारों को धमकी या कॉल" },
  { id: "contacts", label: "मेरे कॉन्टैक्ट्स को मैसेज या कॉल" },
  { id: "photo", label: "मेरी फ़ोटो एडिट (morph) करके भेजने की धमकी", severe: true },
  { id: "rape", label: "बलात्कार / यौन हिंसा की धमकी", severe: true },
  { id: "life", label: "जान से मारने या मारपीट की धमकी", severe: true },
  { id: "home", label: "घर आने की धमकी / घर का पता पूछना", severe: true },
  { id: "night", label: "सुबह 8 से पहले या शाम 7 के बाद कॉल" },
  { id: "many", label: "दिन में बहुत सारी कॉल, अलग-अलग नंबरों से" },
  { id: "office", label: "ऑफ़िस या मालिक को कॉल" },
];
