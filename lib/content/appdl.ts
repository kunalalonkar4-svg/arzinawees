import type { ML } from "./pick";

export type AppText = {
  title: string;
  desc: string;
  eyebrow: string;
  h1: string;
  sub: string;
  btn: string;
  checking: string;
  soon: string;
  meta: string; // version / size line
  pwaT: string;
  pwaBtn: string;
  pwaHow: string;
  stepsT: string;
  steps: string[];
  whyT: string;
  why: string[];
  safe: string;
  band: string;
  bandBtn: string;
};

export const APPDL: ML<AppText> = {
  hi: {
    title: "ऐप डाउनलोड करें",
    desc: "Arzinawees का Android ऐप मुफ़्त डाउनलोड करें।",
    eyebrow: "Android ऐप",
    h1: "Arzinawees ऐप अपने फ़ोन में रखें",
    sub: "एक टैप में खुलता है, होम स्क्रीन पर रहता है। वही मुफ़्त सेवा, वही आपकी Gmail से शिकायत।",
    btn: "APK डाउनलोड करें",
    checking: "देख रहे हैं…",
    soon: "ऐप की फ़ाइल अभी तैयार हो रही है। थोड़ी देर बाद फिर देखें, या नीचे वाला तरीका अपनाएँ।",
    meta: "Android 5.0 या नया · मुफ़्त · कोई विज्ञापन नहीं",
    pwaT: "या बिना डाउनलोड के",
    pwaBtn: "होम स्क्रीन पर जोड़ें",
    pwaHow: "Chrome में ऊपर ⋮ मेन्यू खोलें और “Add to Home screen” या “Install app” दबाएँ।",
    stepsT: "APK कैसे इंस्टॉल करें",
    steps: [
      "ऊपर “APK डाउनलोड करें” दबाएँ। फ़ाइल आपके फ़ोन के Downloads में आ जाएगी।",
      "डाउनलोड पूरा होने पर फ़ाइल खोलें।",
      "फ़ोन पूछे तो “इस सोर्स से इंस्टॉल की अनुमति दें” (Allow from this source) चालू करें।",
      "“Install” दबाएँ। होम स्क्रीन पर Arzinawees का आइकन आ जाएगा।",
    ],
    whyT: "ऐप में क्या मिलेगा",
    why: [
      "पूरी वेबसाइट, फ़ुल स्क्रीन में, आपकी चुनी भाषा में",
      "Gmail से शिकायत भेजना ऐप में भी चलता है",
      "वेबसाइट में हर सुधार ऐप में अपने-आप आ जाता है, अपडेट की झंझट नहीं",
      "कोई अलग अनुमति नहीं: न कॉन्टैक्ट्स, न फ़ोटो, न लोकेशन",
    ],
    safe: "ऐप सिर्फ़ इसी वेबसाइट से डाउनलोड करें। किसी WhatsApp लिंक या अनजान व्यक्ति से मिली “Arzinawees” फ़ाइल इंस्टॉल न करें।",
    band: "Arzinawees अब Android ऐप में भी",
    bandBtn: "ऐप डाउनलोड करें",
  },
  en: {
    title: "Download the app",
    desc: "Download the free Arzinawees Android app.",
    eyebrow: "Android app",
    h1: "Keep Arzinawees on your phone",
    sub: "Opens in one tap and stays on your home screen. The same free service, the same complaint from your own Gmail.",
    btn: "Download APK",
    checking: "Checking…",
    soon: "The app file is still being prepared. Check back a little later, or use the option below.",
    meta: "Android 5.0 or newer · Free · No ads",
    pwaT: "Or without downloading",
    pwaBtn: "Add to home screen",
    pwaHow: "In Chrome, open the ⋮ menu at the top and tap “Add to Home screen” or “Install app”.",
    stepsT: "How to install the APK",
    steps: [
      "Tap “Download APK” above. The file will go to your phone's Downloads.",
      "When the download finishes, open the file.",
      "If your phone asks, turn on “Allow from this source”.",
      "Tap “Install”. The Arzinawees icon will appear on your home screen.",
    ],
    whyT: "What you get in the app",
    why: [
      "The full website, full screen, in your chosen language",
      "Sending complaints from Gmail works in the app too",
      "Every website improvement reaches the app automatically, no updates to manage",
      "No extra permissions: no contacts, no photos, no location",
    ],
    safe: "Download the app only from this website. Don't install an “Arzinawees” file received from a WhatsApp link or a stranger.",
    band: "Arzinawees is now on Android",
    bandBtn: "Download the app",
  },
  mr: {
    title: "ॲप डाउनलोड करा",
    desc: "Arzinawees चे Android ॲप मोफत डाउनलोड करा.",
    eyebrow: "Android ॲप",
    h1: "Arzinawees ॲप तुमच्या फोनमध्ये ठेवा",
    sub: "एका टॅपमध्ये उघडते, होम स्क्रीनवर राहते. तीच मोफत सेवा, तीच तुमच्या Gmail वरून तक्रार.",
    btn: "APK डाउनलोड करा",
    checking: "तपासत आहोत…",
    soon: "ॲपची फाइल अजून तयार होत आहे. थोड्या वेळाने पुन्हा पहा, किंवा खालील पद्धत वापरा.",
    meta: "Android 5.0 किंवा नवीन · मोफत · जाहिराती नाहीत",
    pwaT: "किंवा डाउनलोड न करता",
    pwaBtn: "होम स्क्रीनवर जोडा",
    pwaHow: "Chrome मध्ये वरचा ⋮ मेनू उघडा आणि “Add to Home screen” किंवा “Install app” दाबा.",
    stepsT: "APK कसे इन्स्टॉल करावे",
    steps: [
      "वरील “APK डाउनलोड करा” दाबा. फाइल तुमच्या फोनच्या Downloads मध्ये येईल.",
      "डाउनलोड पूर्ण झाल्यावर फाइल उघडा.",
      "फोनने विचारल्यास “या स्रोतावरून इन्स्टॉलला परवानगी द्या” (Allow from this source) चालू करा.",
      "“Install” दाबा. होम स्क्रीनवर Arzinawees चा आयकॉन येईल.",
    ],
    whyT: "ॲपमध्ये काय मिळेल",
    why: [
      "संपूर्ण वेबसाइट, फुल स्क्रीनमध्ये, तुमच्या निवडलेल्या भाषेत",
      "Gmail वरून तक्रार पाठवणे ॲपमध्येही चालते",
      "वेबसाइटमधील प्रत्येक सुधारणा ॲपमध्ये आपोआप येते, अपडेटची कटकट नाही",
      "कोणतीही वेगळी परवानगी नाही: संपर्क, फोटो, लोकेशन काहीच नाही",
    ],
    safe: "ॲप फक्त याच वेबसाइटवरून डाउनलोड करा. WhatsApp लिंक किंवा अनोळखी व्यक्तीकडून आलेली “Arzinawees” फाइल इन्स्टॉल करू नका.",
    band: "Arzinawees आता Android ॲपमध्येही",
    bandBtn: "ॲप डाउनलोड करा",
  },
  bn: {
    title: "অ্যাপ ডাউনলোড করুন",
    desc: "Arzinawees-এর Android অ্যাপ বিনামূল্যে ডাউনলোড করুন।",
    eyebrow: "Android অ্যাপ",
    h1: "Arzinawees অ্যাপ আপনার ফোনে রাখুন",
    sub: "এক ট্যাপে খোলে, হোম স্ক্রিনে থাকে। একই বিনামূল্যের পরিষেবা, একই আপনার Gmail থেকে অভিযোগ।",
    btn: "APK ডাউনলোড করুন",
    checking: "দেখা হচ্ছে…",
    soon: "অ্যাপের ফাইল এখনও তৈরি হচ্ছে। একটু পরে আবার দেখুন, অথবা নিচের উপায়টি ব্যবহার করুন।",
    meta: "Android 5.0 বা নতুন · বিনামূল্যে · কোনো বিজ্ঞাপন নেই",
    pwaT: "অথবা ডাউনলোড ছাড়াই",
    pwaBtn: "হোম স্ক্রিনে যোগ করুন",
    pwaHow: "Chrome-এ উপরের ⋮ মেনু খুলে “Add to Home screen” বা “Install app” চাপুন।",
    stepsT: "APK কীভাবে ইনস্টল করবেন",
    steps: [
      "উপরের “APK ডাউনলোড করুন” চাপুন। ফাইলটি আপনার ফোনের Downloads-এ আসবে।",
      "ডাউনলোড শেষ হলে ফাইলটি খুলুন।",
      "ফোন জিজ্ঞেস করলে “এই উৎস থেকে ইনস্টলের অনুমতি দিন” (Allow from this source) চালু করুন।",
      "“Install” চাপুন। হোম স্ক্রিনে Arzinawees-এর আইকন চলে আসবে।",
    ],
    whyT: "অ্যাপে কী পাবেন",
    why: [
      "পুরো ওয়েবসাইট, ফুল স্ক্রিনে, আপনার বেছে নেওয়া ভাষায়",
      "Gmail থেকে অভিযোগ পাঠানো অ্যাপেও চলে",
      "ওয়েবসাইটের প্রতিটি উন্নতি অ্যাপে নিজে থেকে আসে, আপডেটের ঝামেলা নেই",
      "আলাদা কোনো অনুমতি নেই: কন্টাক্ট, ছবি, লোকেশন কিছুই না",
    ],
    safe: "অ্যাপ শুধু এই ওয়েবসাইট থেকেই ডাউনলোড করুন। WhatsApp লিংক বা অচেনা কারও কাছ থেকে পাওয়া “Arzinawees” ফাইল ইনস্টল করবেন না।",
    band: "Arzinawees এখন Android অ্যাপেও",
    bandBtn: "অ্যাপ ডাউনলোড করুন",
  },
  te: {
    title: "యాప్ డౌన్‌లోడ్ చేయండి",
    desc: "Arzinawees Android యాప్‌ను ఉచితంగా డౌన్‌లోడ్ చేయండి.",
    eyebrow: "Android యాప్",
    h1: "Arzinawees యాప్‌ను మీ ఫోన్‌లో ఉంచుకోండి",
    sub: "ఒక్క ట్యాప్‌తో తెరుచుకుంటుంది, హోమ్ స్క్రీన్‌పై ఉంటుంది. అదే ఉచిత సేవ, అదే మీ Gmail నుంచి ఫిర్యాదు.",
    btn: "APK డౌన్‌లోడ్",
    checking: "చూస్తున్నాము…",
    soon: "యాప్ ఫైల్ ఇంకా తయారవుతోంది. కాసేపటి తర్వాత మళ్లీ చూడండి, లేదా కింది మార్గం వాడండి.",
    meta: "Android 5.0 లేదా కొత్తది · ఉచితం · ప్రకటనలు లేవు",
    pwaT: "లేదా డౌన్‌లోడ్ లేకుండా",
    pwaBtn: "హోమ్ స్క్రీన్‌కు జోడించండి",
    pwaHow: "Chromeలో పైన ⋮ మెనూ తెరిచి “Add to Home screen” లేదా “Install app” నొక్కండి.",
    stepsT: "APK ఎలా ఇన్‌స్టాల్ చేయాలి",
    steps: [
      "పైన “APK డౌన్‌లోడ్” నొక్కండి. ఫైల్ మీ ఫోన్ Downloadsలోకి వస్తుంది.",
      "డౌన్‌లోడ్ పూర్తయ్యాక ఫైల్ తెరవండి.",
      "ఫోన్ అడిగితే “ఈ సోర్స్ నుంచి ఇన్‌స్టాల్‌కు అనుమతించు” (Allow from this source) ఆన్ చేయండి.",
      "“Install” నొక్కండి. హోమ్ స్క్రీన్‌పై Arzinawees ఐకాన్ వస్తుంది.",
    ],
    whyT: "యాప్‌లో ఏం లభిస్తుంది",
    why: [
      "పూర్తి వెబ్‌సైట్, ఫుల్ స్క్రీన్‌లో, మీరు ఎంచుకున్న భాషలో",
      "Gmail నుంచి ఫిర్యాదు పంపడం యాప్‌లోనూ పనిచేస్తుంది",
      "వెబ్‌సైట్‌లో ప్రతి మెరుగుదల యాప్‌లోకి ఆటోమేటిక్‌గా వస్తుంది, అప్‌డేట్ బాధ లేదు",
      "వేరే అనుమతులు లేవు: కాంటాక్ట్స్, ఫోటోలు, లొకేషన్ ఏవీ కాదు",
    ],
    safe: "యాప్‌ను ఈ వెబ్‌సైట్ నుంచి మాత్రమే డౌన్‌లోడ్ చేయండి. WhatsApp లింక్ లేదా తెలియని వ్యక్తి నుంచి వచ్చిన “Arzinawees” ఫైల్‌ను ఇన్‌స్టాల్ చేయకండి.",
    band: "Arzinawees ఇప్పుడు Android యాప్‌లోనూ",
    bandBtn: "యాప్ డౌన్‌లోడ్ చేయండి",
  },
  ta: {
    title: "செயலியைப் பதிவிறக்கு",
    desc: "Arzinawees Android செயலியை இலவசமாகப் பதிவிறக்குங்கள்.",
    eyebrow: "Android செயலி",
    h1: "Arzinawees செயலியை உங்கள் போனில் வைத்திருங்கள்",
    sub: "ஒரு தொடுதலில் திறக்கும், முகப்புத் திரையில் இருக்கும். அதே இலவசச் சேவை, அதே உங்கள் Gmail-இலிருந்து புகார்.",
    btn: "APK பதிவிறக்கு",
    checking: "பார்க்கிறோம்…",
    soon: "செயலிக் கோப்பு இன்னும் தயாராகிறது. சிறிது நேரம் கழித்துப் பாருங்கள், அல்லது கீழே உள்ள வழியைப் பயன்படுத்துங்கள்.",
    meta: "Android 5.0 அல்லது புதியது · இலவசம் · விளம்பரம் இல்லை",
    pwaT: "அல்லது பதிவிறக்காமல்",
    pwaBtn: "முகப்புத் திரையில் சேர்",
    pwaHow: "Chrome-இல் மேலே ⋮ மெனுவைத் திறந்து “Add to Home screen” அல்லது “Install app” அழுத்துங்கள்.",
    stepsT: "APK-ஐ நிறுவுவது எப்படி",
    steps: [
      "மேலே “APK பதிவிறக்கு” அழுத்துங்கள். கோப்பு உங்கள் போனின் Downloads-க்கு வரும்.",
      "பதிவிறக்கம் முடிந்ததும் கோப்பைத் திறங்கள்.",
      "போன் கேட்டால் “இந்த மூலத்திலிருந்து நிறுவ அனுமதி” (Allow from this source) இயக்குங்கள்.",
      "“Install” அழுத்துங்கள். முகப்புத் திரையில் Arzinawees ஐகான் வரும்.",
    ],
    whyT: "செயலியில் என்ன கிடைக்கும்",
    why: [
      "முழு இணையதளம், முழுத் திரையில், நீங்கள் தேர்ந்த மொழியில்",
      "Gmail-இலிருந்து புகார் அனுப்புவது செயலியிலும் வேலை செய்யும்",
      "இணையதளத்தின் ஒவ்வொரு மேம்பாடும் செயலிக்குத் தானாக வரும், புதுப்பிப்புத் தொல்லை இல்லை",
      "கூடுதல் அனுமதிகள் இல்லை: தொடர்புகள், படங்கள், இருப்பிடம் எதுவும் இல்லை",
    ],
    safe: "செயலியை இந்த இணையதளத்திலிருந்து மட்டுமே பதிவிறக்குங்கள். WhatsApp இணைப்பு அல்லது அறிமுகமில்லாதவரிடமிருந்து வந்த “Arzinawees” கோப்பை நிறுவ வேண்டாம்.",
    band: "Arzinawees இப்போது Android செயலியிலும்",
    bandBtn: "செயலியைப் பதிவிறக்கு",
  },
};
