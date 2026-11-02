import type { ML } from "./pick";

export type ContactFormText = {
  about: string;
  types: [string, string, string, string]; // help, feedback, complaint, other
  name: string;
  contact: string;
  msg: string;
  noAadhaar: string;
  send: string;
  sending: string;
  err: string;
  done: string;
  doneNo: string;
  doneTime: string;
  e400?: string;
  e429?: string;
};

type C = {
  title: string;
  desc: string;
  eyebrow: string;
  h1: string;
  sub: string;
  email: string;
  timeT: string;
  time: string;
  dangerT: string;
  danger: string;
  grvPre: string;
  grvLink: string;
  form: ContactFormText;
};

export const CONTACT: ML<C> = {
  hi: {
    title: "संपर्क करें",
    desc: "Arzinawees से संपर्क: मदद, सुझाव या शिकायत।",
    eyebrow: "संपर्क",
    h1: "हमसे बात करें",
    sub: "शिकायत भेजने में दिक्कत हो, कोई सुझाव हो, या हमारी सेवा से शिकायत हो, लिखकर बताइए। कॉल करने की ज़रूरत नहीं।",
    email: "ईमेल",
    timeT: "जवाब का समय",
    time: "आम तौर पर 2 कामकाजी दिन",
    dangerT: "ख़तरे में हैं?",
    danger: "हमारा इंतज़ार न करें: तुरंत 112 पर कॉल करें।",
    grvPre: "हमारी सेवा से शिकायत का तरीका:",
    grvLink: "शिकायत निवारण",
    form: {
      about: "किस बारे में?",
      types: ["शिकायत भेजने में मदद चाहिए", "सुझाव / फ़ीडबैक", "Arzinawees के बारे में शिकायत", "कुछ और"],
      name: "आपका नाम",
      contact: "मोबाइल या ईमेल",
      msg: "संदेश",
      noAadhaar: "आधार, PAN या बैंक नंबर न लिखें।",
      send: "संदेश भेजें",
      sending: "भेज रहे हैं…",
      err: "संदेश नहीं गया। दोबारा कोशिश करें।",
      done: "आपका संदेश मिल गया ✓",
      doneNo: "संदेश नंबर",
      doneTime: "हम आम तौर पर 2 कामकाजी दिनों में जवाब देते हैं।",
    },
  },
  en: {
    title: "Contact us",
    desc: "Contact Arzinawees: help, suggestions or complaints.",
    eyebrow: "Contact",
    h1: "Talk to us",
    sub: "If you have trouble sending a complaint, a suggestion, or a complaint about our service, write to us. No need to call.",
    email: "Email",
    timeT: "Reply time",
    time: "Usually 2 working days",
    dangerT: "In danger?",
    danger: "Don't wait for us: call 112 right away.",
    grvPre: "How to complain about our service:",
    grvLink: "Grievance redressal",
    form: {
      about: "What is it about?",
      types: ["I need help sending a complaint", "Suggestion / feedback", "Complaint about Arzinawees", "Something else"],
      name: "Your name",
      contact: "Mobile or email",
      msg: "Message",
      noAadhaar: "Don't write Aadhaar, PAN or bank numbers.",
      send: "Send message",
      sending: "Sending…",
      err: "Message not sent. Please try again.",
      done: "We got your message ✓",
      doneNo: "Message number",
      doneTime: "We usually reply within 2 working days.",
    },
  },
  mr: {
    title: "संपर्क करा",
    desc: "Arzinawees शी संपर्क: मदत, सूचना किंवा तक्रार.",
    eyebrow: "संपर्क",
    h1: "आमच्याशी बोला",
    sub: "तक्रार पाठवण्यात अडचण असेल, काही सूचना असेल, किंवा आमच्या सेवेबद्दल तक्रार असेल, तर लिहून सांगा. कॉल करण्याची गरज नाही.",
    email: "ईमेल",
    timeT: "उत्तराची वेळ",
    time: "साधारणपणे 2 कामकाजाचे दिवस",
    dangerT: "धोक्यात आहात?",
    danger: "आमची वाट पाहू नका: लगेच 112 वर कॉल करा.",
    grvPre: "आमच्या सेवेबद्दल तक्रारीची पद्धत:",
    grvLink: "तक्रार निवारण",
    form: {
      about: "कशाबद्दल?",
      types: ["तक्रार पाठवण्यासाठी मदत हवी", "सूचना / अभिप्राय", "Arzinawees बद्दल तक्रार", "इतर काही"],
      name: "तुमचे नाव",
      contact: "मोबाईल किंवा ईमेल",
      msg: "संदेश",
      noAadhaar: "आधार, PAN किंवा बँक क्रमांक लिहू नका.",
      send: "संदेश पाठवा",
      sending: "पाठवत आहोत…",
      err: "संदेश गेला नाही. पुन्हा प्रयत्न करा.",
      done: "तुमचा संदेश मिळाला ✓",
      doneNo: "संदेश क्रमांक",
      doneTime: "आम्ही साधारणपणे 2 कामकाजाच्या दिवसांत उत्तर देतो.",
    },
  },
  bn: {
    title: "যোগাযোগ করুন",
    desc: "Arzinawees-এর সঙ্গে যোগাযোগ: সাহায্য, পরামর্শ বা অভিযোগ।",
    eyebrow: "যোগাযোগ",
    h1: "আমাদের সঙ্গে কথা বলুন",
    sub: "অভিযোগ পাঠাতে অসুবিধা হলে, কোনো পরামর্শ থাকলে, বা আমাদের পরিষেবা নিয়ে অভিযোগ থাকলে লিখে জানান। ফোন করার দরকার নেই।",
    email: "ইমেল",
    timeT: "উত্তরের সময়",
    time: "সাধারণত ২ কর্মদিবস",
    dangerT: "বিপদে আছেন?",
    danger: "আমাদের অপেক্ষা করবেন না: এখনই 112-এ কল করুন।",
    grvPre: "আমাদের পরিষেবা নিয়ে অভিযোগের উপায়:",
    grvLink: "অভিযোগ নিষ্পত্তি",
    form: {
      about: "কী বিষয়ে?",
      types: ["অভিযোগ পাঠাতে সাহায্য চাই", "পরামর্শ / মতামত", "Arzinawees সম্পর্কে অভিযোগ", "অন্য কিছু"],
      name: "আপনার নাম",
      contact: "মোবাইল বা ইমেল",
      msg: "বার্তা",
      noAadhaar: "আধার, PAN বা ব্যাংক নম্বর লিখবেন না।",
      send: "বার্তা পাঠান",
      sending: "পাঠানো হচ্ছে…",
      err: "বার্তা যায়নি। আবার চেষ্টা করুন।",
      done: "আপনার বার্তা পেয়েছি ✓",
      doneNo: "বার্তা নম্বর",
      doneTime: "আমরা সাধারণত ২ কর্মদিবসের মধ্যে উত্তর দিই।",
    },
  },
  te: {
    title: "మమ్మల్ని సంప్రదించండి",
    desc: "Arzinawees‌ను సంప్రదించండి: సహాయం, సూచనలు లేదా ఫిర్యాదులు.",
    eyebrow: "సంప్రదింపు",
    h1: "మాతో మాట్లాడండి",
    sub: "ఫిర్యాదు పంపడంలో ఇబ్బంది ఉన్నా, ఏదైనా సూచన ఉన్నా, లేదా మా సేవపై ఫిర్యాదు ఉన్నా రాసి చెప్పండి. కాల్ చేయాల్సిన అవసరం లేదు.",
    email: "ఈమెయిల్",
    timeT: "జవాబు సమయం",
    time: "సాధారణంగా 2 పని దినాలు",
    dangerT: "ప్రమాదంలో ఉన్నారా?",
    danger: "మా కోసం ఎదురుచూడకండి: వెంటనే 112కి కాల్ చేయండి.",
    grvPre: "మా సేవపై ఫిర్యాదు చేసే విధానం:",
    grvLink: "ఫిర్యాదుల పరిష్కారం",
    form: {
      about: "దేని గురించి?",
      types: ["ఫిర్యాదు పంపడంలో సహాయం కావాలి", "సూచన / అభిప్రాయం", "Arzinawees గురించి ఫిర్యాదు", "ఇంకేదైనా"],
      name: "మీ పేరు",
      contact: "మొబైల్ లేదా ఈమెయిల్",
      msg: "సందేశం",
      noAadhaar: "ఆధార్, PAN లేదా బ్యాంక్ నంబర్లు రాయకండి.",
      send: "సందేశం పంపండి",
      sending: "పంపుతున్నాము…",
      err: "సందేశం వెళ్లలేదు. మళ్లీ ప్రయత్నించండి.",
      done: "మీ సందేశం అందింది ✓",
      doneNo: "సందేశం నంబర్",
      doneTime: "మేము సాధారణంగా 2 పని దినాల్లో జవాబిస్తాము.",
    },
  },
  ta: {
    title: "எங்களைத் தொடர்பு கொள்ள",
    desc: "Arzinawees-ஐத் தொடர்பு கொள்ள: உதவி, பரிந்துரை அல்லது புகார்.",
    eyebrow: "தொடர்பு",
    h1: "எங்களுடன் பேசுங்கள்",
    sub: "புகார் அனுப்புவதில் சிக்கல், ஏதேனும் பரிந்துரை, அல்லது எங்கள் சேவை பற்றிப் புகார் இருந்தால் எழுதித் தெரிவியுங்கள். அழைக்க வேண்டியதில்லை.",
    email: "மின்னஞ்சல்",
    timeT: "பதில் நேரம்",
    time: "பொதுவாக 2 வேலை நாட்கள்",
    dangerT: "ஆபத்தில் இருக்கிறீர்களா?",
    danger: "எங்களுக்காகக் காத்திருக்காதீர்கள்: உடனே 112 அழையுங்கள்.",
    grvPre: "எங்கள் சேவை பற்றிப் புகார் செய்யும் முறை:",
    grvLink: "குறைதீர்ப்பு",
    form: {
      about: "எதைப் பற்றி?",
      types: ["புகார் அனுப்ப உதவி வேண்டும்", "பரிந்துரை / கருத்து", "Arzinawees பற்றிப் புகார்", "வேறு ஏதாவது"],
      name: "உங்கள் பெயர்",
      contact: "மொபைல் அல்லது மின்னஞ்சல்",
      msg: "செய்தி",
      noAadhaar: "ஆதார், PAN அல்லது வங்கி எண்களை எழுத வேண்டாம்.",
      send: "செய்தி அனுப்பு",
      sending: "அனுப்புகிறோம்…",
      err: "செய்தி போகவில்லை. மீண்டும் முயலுங்கள்.",
      done: "உங்கள் செய்தி கிடைத்தது ✓",
      doneNo: "செய்தி எண்",
      doneTime: "பொதுவாக 2 வேலை நாட்களில் பதில் அளிப்போம்.",
    },
  },
};
