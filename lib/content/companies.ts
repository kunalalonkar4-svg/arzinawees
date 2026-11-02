import type { ML } from "./pick";

type C = {
  title: string;
  desc: string;
  eyebrow: string;
  sub: string;
  note: string; // {date} {rbi}
  thApp: string;
  thTo: string;
  thCc: string;
  send: string;
  missT: string;
  miss: [string, string, string]; // 3rd: before link, link text, after link joined by |
  formLink: string;
};

export const COMP: ML<C> = {
  hi: {
    title: "लोन कंपनियों के शिकायत ईमेल",
    desc: "KreditBee, Moneyview, Fibe, mPokket, CASHe, Bajaj Finance और दूसरी लोन कंपनियों के Grievance Officer और Nodal Officer के ईमेल।",
    eyebrow: "डायरेक्टरी",
    sub: "हर कंपनी को RBI के नियम से शिकायत सुनने के लिए Grievance Redressal Officer रखना होता है। नीचे उनके ईमेल हैं। “शिकायत भेजें” दबाने पर फ़ॉर्म में यही पता अपने-आप भर जाएगा।",
    note: "ये ईमेल कंपनियों की वेबसाइट और सार्वजनिक दस्तावेज़ों से लिए गए हैं (जाँच: {date})। कंपनियाँ कभी-कभी पते बदलती हैं, इसलिए ज़रूरी हो तो कंपनी की वेबसाइट पर “Grievance Redressal” पेज भी देख लें। RBI का ईमेल: {rbi}",
    thApp: "ऐप / कंपनी",
    thTo: "शिकायत ईमेल (To)",
    thCc: "Nodal / दूसरा ईमेल (CC)",
    send: "शिकायत भेजें",
    missT: "आपकी कंपनी लिस्ट में नहीं है?",
    miss: [
      "लोन एग्रीमेंट या ऐप में लिखी NBFC/बैंक (लोन देने वाली कंपनी) का नाम देखें। वह ऊपर लिस्ट में हो सकती है।",
      "ऐप में Help, Contact या Grievance Redressal पेज पर शिकायत अधिकारी का ईमेल ढूँढें।",
      "में “कोई और ऐप / कंपनी” चुनकर वह ईमेल डालें।",
    ],
    formLink: "शिकायत फ़ॉर्म",
  },
  en: {
    title: "Grievance emails of loan companies",
    desc: "Grievance Officer and Nodal Officer emails of KreditBee, Moneyview, Fibe, mPokket, CASHe, Bajaj Finance and other lenders.",
    eyebrow: "Directory",
    sub: "Under RBI rules every company must have a Grievance Redressal Officer to hear complaints. Their emails are below. Tap “Send complaint” and this address fills into the form automatically.",
    note: "These emails are taken from company websites and public documents (checked: {date}). Companies sometimes change addresses, so if needed also check the “Grievance Redressal” page on the company's website. RBI email: {rbi}",
    thApp: "App / company",
    thTo: "Grievance email (To)",
    thCc: "Nodal / other email (CC)",
    send: "Send complaint",
    missT: "Your company isn't listed?",
    miss: [
      "Look for the NBFC/bank (the lender) named in the loan agreement or the app. It may be in the list above.",
      "Find the grievance officer's email on the app's Help, Contact or Grievance Redressal page.",
      "and choose “Other app / company”, then enter that email.",
    ],
    formLink: "Open the complaint form",
  },
  mr: {
    title: "लोन कंपन्यांचे तक्रार ईमेल",
    desc: "KreditBee, Moneyview, Fibe, mPokket, CASHe, Bajaj Finance आणि इतर लोन कंपन्यांच्या Grievance Officer आणि Nodal Officer चे ईमेल.",
    eyebrow: "निर्देशिका",
    sub: "RBI च्या नियमानुसार प्रत्येक कंपनीला तक्रारी ऐकण्यासाठी Grievance Redressal Officer ठेवावा लागतो. खाली त्यांचे ईमेल आहेत. “तक्रार पाठवा” दाबल्यावर फॉर्ममध्ये हाच पत्ता आपोआप भरला जाईल.",
    note: "हे ईमेल कंपन्यांच्या वेबसाइट आणि सार्वजनिक कागदपत्रांतून घेतले आहेत (तपासणी: {date}). कंपन्या कधी कधी पत्ते बदलतात, म्हणून गरज असल्यास कंपनीच्या वेबसाइटवरील “Grievance Redressal” पान पहा. RBI चा ईमेल: {rbi}",
    thApp: "ॲप / कंपनी",
    thTo: "तक्रार ईमेल (To)",
    thCc: "Nodal / दुसरा ईमेल (CC)",
    send: "तक्रार पाठवा",
    missT: "तुमची कंपनी यादीत नाही?",
    miss: [
      "लोन करारात किंवा ॲपमध्ये लिहिलेल्या NBFC/बँकेचे (कर्ज देणारी कंपनी) नाव पहा. ती वरील यादीत असू शकते.",
      "ॲपमधील Help, Contact किंवा Grievance Redressal पानावर तक्रार अधिकाऱ्याचा ईमेल शोधा.",
      "मध्ये “दुसरे ॲप / कंपनी” निवडून तो ईमेल टाका.",
    ],
    formLink: "तक्रार फॉर्म",
  },
  bn: {
    title: "লোন কোম্পানিগুলির অভিযোগ ইমেল",
    desc: "KreditBee, Moneyview, Fibe, mPokket, CASHe, Bajaj Finance ও অন্যান্য লোন কোম্পানির Grievance Officer ও Nodal Officer-এর ইমেল।",
    eyebrow: "ডিরেক্টরি",
    sub: "RBI-এর নিয়মে প্রতিটি কোম্পানিকে অভিযোগ শোনার জন্য একজন Grievance Redressal Officer রাখতে হয়। নিচে তাঁদের ইমেল দেওয়া হল। “অভিযোগ পাঠান” চাপলে ফর্মে এই ঠিকানা নিজে থেকে বসে যাবে।",
    note: "এই ইমেলগুলি কোম্পানির ওয়েবসাইট ও সর্বজনীন নথি থেকে নেওয়া (যাচাই: {date})। কোম্পানি কখনো কখনো ঠিকানা বদলায়, তাই প্রয়োজনে কোম্পানির ওয়েবসাইটে “Grievance Redressal” পেজটিও দেখে নিন। RBI-এর ইমেল: {rbi}",
    thApp: "অ্যাপ / কোম্পানি",
    thTo: "অভিযোগ ইমেল (To)",
    thCc: "Nodal / অন্য ইমেল (CC)",
    send: "অভিযোগ পাঠান",
    missT: "আপনার কোম্পানি তালিকায় নেই?",
    miss: [
      "লোন চুক্তি বা অ্যাপে লেখা NBFC/ব্যাংকের (যে কোম্পানি লোন দিয়েছে) নাম দেখুন। সেটি উপরের তালিকায় থাকতে পারে।",
      "অ্যাপের Help, Contact বা Grievance Redressal পেজে অভিযোগ আধিকারিকের ইমেল খুঁজুন।",
      "-এ “অন্য অ্যাপ / কোম্পানি” বেছে সেই ইমেল দিন।",
    ],
    formLink: "অভিযোগ ফর্ম",
  },
  te: {
    title: "లోన్ కంపెనీల ఫిర్యాదు ఈమెయిల్స్",
    desc: "KreditBee, Moneyview, Fibe, mPokket, CASHe, Bajaj Finance, ఇతర లోన్ కంపెనీల Grievance Officer, Nodal Officer ఈమెయిల్స్.",
    eyebrow: "డైరెక్టరీ",
    sub: "RBI నియమం ప్రకారం ప్రతి కంపెనీ ఫిర్యాదులు వినడానికి Grievance Redressal Officerను నియమించాలి. వారి ఈమెయిల్స్ కింద ఉన్నాయి. “ఫిర్యాదు పంపండి” నొక్కితే ఫారంలో ఈ చిరునామా ఆటోమేటిక్‌గా నిండుతుంది.",
    note: "ఈ ఈమెయిల్స్ కంపెనీల వెబ్‌సైట్లు, బహిరంగ పత్రాల నుంచి తీసుకున్నవి (తనిఖీ: {date}). కంపెనీలు అప్పుడప్పుడు చిరునామాలు మారుస్తాయి, కాబట్టి అవసరమైతే కంపెనీ వెబ్‌సైట్‌లోని “Grievance Redressal” పేజీ కూడా చూడండి. RBI ఈమెయిల్: {rbi}",
    thApp: "యాప్ / కంపెనీ",
    thTo: "ఫిర్యాదు ఈమెయిల్ (To)",
    thCc: "Nodal / ఇతర ఈమెయిల్ (CC)",
    send: "ఫిర్యాదు పంపండి",
    missT: "మీ కంపెనీ జాబితాలో లేదా?",
    miss: [
      "లోన్ ఒప్పందం లేదా యాప్‌లో రాసిన NBFC/బ్యాంక్ (లోన్ ఇచ్చిన కంపెనీ) పేరు చూడండి. అది పై జాబితాలో ఉండవచ్చు.",
      "యాప్‌లోని Help, Contact లేదా Grievance Redressal పేజీలో ఫిర్యాదు అధికారి ఈమెయిల్ వెతకండి.",
      "లో “వేరే యాప్ / కంపెనీ” ఎంచుకుని ఆ ఈమెయిల్ ఇవ్వండి.",
    ],
    formLink: "ఫిర్యాదు ఫారం",
  },
  ta: {
    title: "கடன் நிறுவனங்களின் புகார் மின்னஞ்சல்கள்",
    desc: "KreditBee, Moneyview, Fibe, mPokket, CASHe, Bajaj Finance மற்றும் பிற கடன் நிறுவனங்களின் Grievance Officer, Nodal Officer மின்னஞ்சல்கள்.",
    eyebrow: "அடைவு",
    sub: "RBI விதிப்படி ஒவ்வொரு நிறுவனமும் புகார்களைக் கேட்க ஒரு Grievance Redressal Officer-ஐ நியமிக்க வேண்டும். அவர்களின் மின்னஞ்சல்கள் கீழே. “புகார் அனுப்பு” அழுத்தினால் இந்த முகவரி படிவத்தில் தானாக நிரம்பும்.",
    note: "இந்த மின்னஞ்சல்கள் நிறுவனங்களின் இணையதளங்கள் மற்றும் பொது ஆவணங்களிலிருந்து எடுக்கப்பட்டவை (சரிபார்ப்பு: {date}). நிறுவனங்கள் சில நேரம் முகவரியை மாற்றுகின்றன, எனவே தேவைப்பட்டால் நிறுவன இணையதளத்தின் “Grievance Redressal” பக்கத்தையும் பாருங்கள். RBI மின்னஞ்சல்: {rbi}",
    thApp: "செயலி / நிறுவனம்",
    thTo: "புகார் மின்னஞ்சல் (To)",
    thCc: "Nodal / பிற மின்னஞ்சல் (CC)",
    send: "புகார் அனுப்பு",
    missT: "உங்கள் நிறுவனம் பட்டியலில் இல்லையா?",
    miss: [
      "கடன் ஒப்பந்தம் அல்லது செயலியில் எழுதியுள்ள NBFC/வங்கியின் (கடன் கொடுத்த நிறுவனம்) பெயரைப் பாருங்கள். அது மேலே உள்ள பட்டியலில் இருக்கலாம்.",
      "செயலியின் Help, Contact அல்லது Grievance Redressal பக்கத்தில் புகார் அலுவலரின் மின்னஞ்சலைத் தேடுங்கள்.",
      "-இல் “வேறு செயலி / நிறுவனம்” தேர்ந்தெடுத்து அந்த மின்னஞ்சலை உள்ளிடுங்கள்.",
    ],
    formLink: "புகார் படிவம்",
  },
};
