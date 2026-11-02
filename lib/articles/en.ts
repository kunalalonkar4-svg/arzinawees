import type { Article } from "../articles";

export const EN: Article[] = [
  {
    slug: "agent-gaali-de-to-kya-karein",
    tag: "Start here",
    title: "What to do if a recovery agent abuses or threatens you",
    summary: "The right steps instead of fear: evidence, a written complaint, and where to escalate.",
    sections: [
      { h: "First, know this", p: ["Not being able to repay a loan is not a crime. The company has the right to recover its money, but abuse, threats, harassing your family or humiliating you are against both RBI rules and the law."] },
      {
        h: "What to do right away",
        steps: [
          "Don't argue on the call. Stay calm and say: “Communicate with me only in writing.”",
          "Take a screenshot of every threatening message and the call log.",
          "Send a written complaint to the loan company's Grievance Redressal Officer, with the threatening numbers and screenshots.",
          "If you can, tell the company in writing how much you are able to pay and when.",
        ],
      },
      {
        h: "If there's no reply",
        list: [
          "After 7 days: write again to the company's Principal Nodal Officer.",
          "Not resolved in 30 days: complain on RBI's portal cms.rbi.org.in.",
          "Serious threats (to your life, rape, coming home, spreading photos): complain to the police or at cybercrime.gov.in the same day.",
        ],
      },
    ],
  },
  {
    slug: "saboot-kaise-sambhalein",
    tag: "Evidence",
    title: "How to keep evidence of threats",
    summary: "Screenshots, chat exports and call logs: how to make your complaint strong.",
    sections: [
      {
        h: "What to save",
        list: [
          "Screenshots of WhatsApp/SMS showing the number, date and time.",
          "WhatsApp chat: open the chat → ⋮ → More → Export chat. Email the file to yourself to keep it.",
          "A screenshot of the call log showing call times (especially calls before 8 am or after 7 pm).",
          "Payment receipts, to show you are trying to repay.",
          "Doctor's prescriptions, if you are being treated because of the stress.",
        ],
      },
      {
        h: "Keep in mind",
        list: [
          "Don't edit screenshots. Keep the full screen.",
          "Take screenshots before you block a threatening number.",
          "Don't send your evidence to strangers or “settlement agents”.",
        ],
      },
    ],
  },
  {
    slug: "police-aur-cyber-complaint",
    tag: "Serious threats",
    title: "How to complain to the police and cyber crime cell",
    summary: "Where to complain about threats to your life, rape threats or threats to come to your home.",
    sections: [
      { h: "If you are in immediate danger", p: ["Call 112. It is the emergency number."] },
      {
        h: "Online complaint",
        steps: [
          "Go to cybercrime.gov.in and file a complaint, or call 1930.",
          "Add the threatening numbers, dates, times and screenshots.",
          "Write down your complaint number.",
        ],
      },
      {
        h: "Complaint at the police station",
        list: [
          "Give a written application at the nearest police station and make sure you get a receiving (a stamped copy).",
          "If the station doesn't listen, give or post a written application to the district SP.",
          "If a woman is threatened, you can also complain to the women's helpline 181 and the National Commission for Women (ncwapps.nic.in).",
          "Free legal help is available from the District Legal Services Authority (DLSA).",
        ],
      },
    ],
  },
  {
    slug: "photo-morph-ki-dhamki",
    tag: "Serious threats",
    title: "If someone threatens to morph and spread your photos",
    summary: "This is a cyber crime. Don't panic, take these steps.",
    sections: [
      {
        h: "What to do",
        steps: [
          "Screenshot the threatening message. Don't try to “settle the matter” by paying.",
          "Complain immediately at cybercrime.gov.in or by calling 1930.",
          "If a photo has been posted on social media, Report that post on the platform.",
          "Tell people close to you to ignore and not forward any wrong photo or message sent in your name.",
          "Send a written complaint to the loan company.",
        ],
      },
      { h: "Remember", p: ["The shame belongs to the person making threats, not to you. Asking for help is the right step."] },
    ],
  },
  {
    slug: "illegal-loan-app-kaise-pehchanein",
    tag: "Caution",
    title: "How to spot an illegal loan app",
    summary: "A genuine loan app is linked to an RBI-registered bank or NBFC. Here's how to check.",
    sections: [
      {
        h: "Warning signs",
        list: [
          "No bank or NBFC is named in the app or the loan agreement.",
          "The app asks for access to all your contacts and photos.",
          "A “fee” far too large for the loan amount was deducted.",
          "The loan came through a WhatsApp link or an APK file, not the Play Store.",
          "A very short loan, like 7 days, with heavy interest.",
        ],
      },
      {
        h: "How to check",
        steps: [
          "Find the NBFC/bank name in the loan agreement or on the app's About/Grievance page.",
          "Check that company's name and its digital lending app details on the RBI website.",
          "Report illegal apps on RBI's Sachet portal (sachet.rbi.org.in) and cybercrime.gov.in.",
        ],
      },
    ],
  },
  {
    slug: "rbi-mein-shikayat-kaise-karein",
    tag: "Complaint",
    title: "How to complain to the RBI",
    summary: "How to approach the RBI Ombudsman if the company doesn't resolve it in 30 days.",
    sections: [
      {
        h: "When to do it",
        list: [
          "You have first sent a written complaint to the loan company.",
          "There has been no reply in 30 days, or you are not satisfied with the reply.",
        ],
      },
      {
        h: "How to do it",
        steps: [
          "Open cms.rbi.org.in and choose “File a Complaint”.",
          "Enter the OTP sent to your mobile number.",
          "Choose the company, write your complaint, and attach a copy of the complaint you sent the company along with your evidence.",
          "Save the complaint number. The status will show on the same portal.",
        ],
      },
      { h: "Other ways", list: ["Email: crpc@rbi.org.in", "RBI helpline: 14440"] },
    ],
  },
  {
    slug: "emi-nahi-bhar-pa-rahe",
    tag: "Repayment",
    title: "Can't pay your EMI? Read this first",
    summary: "Avoid the trap of taking a new loan to pay off an old one. Honest options.",
    sections: [
      {
        h: "What to do",
        steps: [
          "Tell the loan company in writing why you can't pay (illness, job loss, etc.) and how much you can pay, and by when.",
          "Ask about reducing the EMI or extending the time (restructuring).",
          "Keep a receipt for every payment you make.",
        ],
      },
      {
        h: "What to avoid",
        list: [
          "Don't take a new loan from another app to repay one loan.",
          "Don't pay upfront to an agent who says they will “get your loan waived”.",
          "Don't share your bank or UPI OTP with anyone.",
        ],
      },
    ],
  },
];
