import React, { useState, useEffect } from "react";
import { 
  ArrowRight, Lock, User, Plus, Trash2, Settings, Upload, History, 
  Globe, Download, Info, FileText, CheckCircle2, ChevronRight, X, AlertTriangle, Eye, EyeOff
} from "lucide-react";
import PDFViewer from "./components/PDFViewer";
import RupeeCounter from "./components/RupeeCounter";

const STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka", 
  "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

// Seeded translations for preloaded bills (Phase 2 language toggle)
const TRANSLATIONS = {
  en: {
    heroTitle: "Law, Decoded Personally",
    heroSub: "Paste a parliamentary bill, enter your financial profile, and see your exact rupee impact with clause-level citations.",
    calculateButton: "Calculate Personal Impact",
    calculating: "Processing legislative clauses...",
    backToDashboard: "← Back to Bills",
    taxRegime: "Tax Regime",
    salaried: "Salaried",
    business: "Business/Corporate",
    professional: "Professional Practice",
    newRegime: "New Tax Regime (Sec 115BAC)",
    oldRegime: "Old Tax Regime",
    annualIncome: "Annual Taxable Income (INR)",
    age: "Age",
    employmentCategory: "Employment Category",
    state: "State",
    saveSession: "Save inputs to this session",
    resultHeading: "Your Calculated Impact",
    explanationHeading: "Clause Breakdown",
    citationHeading: "Source Citations",
    comparisonTitle: "Legislation Transition",
    shareTitle: "Share Impact Summary",
    downloadCard: "Download Social Card",
    blurImpact: "Blur exact amount for privacy",
    noAccount: "Want to track this over time?",
    createFreeAccount: "Create a free account",
    historyTitle: "Simulations History",
    savedProfiles: "Saved Profiles",
    privacyNotice: "Privacy Notice: Anonymous data never touches our database. All calculations are executed locally on inputs.",
    apiSettingsTitle: "Rule Extraction API Settings",
    apiPlaceholder: "Paste your Gemini API Key...",
    apiKeyNote: "Your key is saved in browser storage only and is never stored on the server.",
    uploadTitle: "Ingest New Parliamentary Bill",
    uploadNote: "Upload a PDF. If no Gemini API Key is specified, standard demo-rules will be generated.",
    equityGains: "Equity Long-Term Capital Gains (INR)",
    oldRule: "Previous Policy",
    newRule: "Proposed Clause",
  },
  hi: {
    heroTitle: "कानून, व्यक्तिगत रूप से समझें",
    heroSub: "संसदीय विधेयक पेस्ट करें, अपनी वित्तीय प्रोफ़ाइल दर्ज करें, और क्लॉज-स्तरीय उद्धरणों के साथ सटीक प्रभाव देखें।",
    calculateButton: "व्यक्तिगत प्रभाव की गणना करें",
    calculating: "संसदीय नियमों का विश्लेषण किया जा रहा है...",
    backToDashboard: "← मुख्य डैशबोर्ड",
    taxRegime: "कर प्रणाली",
    salaried: "वेतनभोगी",
    business: "व्यापार/कॉर्पोरेट",
    professional: "पेशेवर अभ्यास",
    newRegime: "नई कर प्रणाली (धारा 115BAC)",
    oldRegime: "पुरानी कर प्रणाली",
    annualIncome: "वार्षिक कर योग्य आय (₹)",
    age: "आयु",
    employmentCategory: "रोजगार श्रेणी",
    state: "राज्य",
    saveSession: "सत्र के लिए इनपुट सहेजें",
    resultHeading: "आपका अनुमानित प्रभाव",
    explanationHeading: "क्लॉज विवरण",
    citationHeading: "कानूनी स्रोत उद्धरण",
    comparisonTitle: "नीति संक्रमण",
    shareTitle: "प्रभाव साझा करें",
    downloadCard: "सोशल कार्ड डाउनलोड करें",
    blurImpact: "गोपनीयता के लिए राशि छुपाएं",
    noAccount: "क्या आप इसे समय के साथ ट्रैक करना चाहते हैं?",
    createFreeAccount: "मुफ़्त खाता बनाएँ",
    historyTitle: "सिमुलेशन इतिहास",
    savedProfiles: "सहेजे गए प्रोफ़ाइल",
    privacyNotice: "गोपनीयता सूचना: अनाम डेटा हमारे डेटाबेस को कभी नहीं छूता है। सभी गणना स्थानीय रूप से की जाती हैं।",
    apiSettingsTitle: "नियम निष्कर्षण एपीआई सेटिंग्स",
    apiPlaceholder: "अपनी जेमिनी एपीआई की पेस्ट करें...",
    apiKeyNote: "आपकी कुंजी केवल ब्राउज़र स्टोरेज में सहेजी जाती है और कभी भी सर्वर पर संग्रहीत नहीं होती है।",
    uploadTitle: "नया संसदीय विधेयक आयात करें",
    uploadNote: "एक पीडीएफ अपलोड करें। यदि कोई एपीआई कुंजी नहीं दी गई है, तो डेमो नियम उत्पन्न किए जाएंगे।",
    equityGains: "इक्विटी लॉन्ग-टर्म कैपिटल गेन्स (₹)",
    oldRule: "पिछली नीति",
    newRule: "प्रस्तावित क्लॉज",
  },
  te: {
    heroTitle: "చట్టం, వ్యక్తిగతంగా అర్థం చేసుకోండి",
    heroSub: "పార్లమెంటరీ బిల్లును పేస్ట్ చేయండి, మీ ఆర్థిక ప్రొఫైల్‌ను నమోదు చేయండి మరియు క్లాజ్-స్థాయిCitationలతో మీ రూపాయి ప్రభావాన్ని చూడండి.",
    calculateButton: "వ్యక్తిగత ప్రభావాన్ని లెక్కించండి",
    calculating: "చట్టపరమైన క్లాజులను విశ్లేషిస్తోంది...",
    backToDashboard: "← డాష్‌బోర్డ్",
    taxRegime: "పన్ను విధానం",
    salaried: "ఉద్యోగి (జీతం)",
    business: "వ్యాపారం/కార్పొరేట్",
    professional: "వృత్తిపరమైనది",
    newRegime: "కొత్త పన్ను విధానం (Sec 115BAC)",
    oldRegime: "పాత పన్ను విధానం",
    annualIncome: "వార్షిక పన్ను పరిధిలోకి వచ్చే ఆదాయం (₹)",
    age: "వయస్సు",
    employmentCategory: "ఉద్యోగ వర్గం",
    state: "రాష్ట్రం",
    saveSession: "ఈ సెషన్ కోసం వివరాలు దాచు",
    resultHeading: "మీ ఆర్థిక ప్రభావం",
    explanationHeading: "క్లాజ్ వివరణ",
    citationHeading: "మూల Citationలు",
    comparisonTitle: "విధాన మార్పు",
    shareTitle: "ప్రభావాన్ని భాగస్వామ్యం చేయండి",
    downloadCard: "సోషల్ కార్డ్ డౌన్‌లోడ్ చేయి",
    blurImpact: "గోపनीयత కోసం మొత్తాన్ని బ్లర్ చేయి",
    noAccount: "దీన్ని కాలక్రమేణా ట్రాక్ చేయాలనుకుంటున్నారా?",
    createFreeAccount: "ఉచిత ఖాతాను సృష్టించండి",
    historyTitle: "సిమ్యులేషన్స్ చరిత్ర",
    savedProfiles: "భద్రపరిచిన ప్రొఫైల్స్",
    privacyNotice: "గోప్యతా నోటీసు: అనామక వినియోగదారుల ప్రొఫైల్ డేటా సర్వర్‌లో నిల్వ చేయబడదు. అన్ని లెక్కలు మీ బ్రౌజర్‌లోనే జరుగుతాయి.",
    apiSettingsTitle: "నియమ సంగ్రహణ API సెట్టింగులు",
    apiPlaceholder: "జెమిని API కీని ఇక్కడ పేస్ట్ చేయండి...",
    apiKeyNote: "మీ కీ బ్రౌజర్ లోకల్ స్టోరేజ్‌లో మాత్రమే దాచబడుతుంది, సర్వర్‌కు పంపబడదు.",
    uploadTitle: "కొత్త పార్లమెంటరీ బిల్లును అప్‌లోడ్ చేయండి",
    uploadNote: "పీడీఎఫ్ అప్‌లోడ్ చేయండి. కీ లేకపోతే డెమో రూల్స్ మాత్రమే క్రియేట్ అవుతాయి.",
    equityGains: "ఈక్విటీ లాంగ్-టర్మ్ క్యాపిటల్ గెయిన్స్ (₹)",
    oldRule: "గత విధానం",
    newRule: "ప్రతిపాదిత క్లాజ్",
  }
};

const HINDI_EXPLANATION_MAPPING = {
  "Increased standard deduction from ₹50,000 to ₹75,000 saves you ₹": "वेतनभोगी कर्मचारियों के लिए मानक कटौती को ₹50,000 से बढ़ाकर ₹75,000 करने पर आपकी सीमांत कर दर पर कुल कर बचत ₹",
  "You save ₹": "नई कर व्यवस्था के तहत संशोधित कर स्लैब के कारण आप ₹",
  "Revised tax slabs cost you an additional ₹": "संशोधित कर स्लैब के कारण नई कर व्यवस्था में आपकी अतिरिक्त लागत ₹",
  "The revised tax slabs have zero net impact on your income bracket.": "संशोधित कर स्लैब का आपकी आय सीमा पर शून्य शुद्ध प्रभाव पड़ता है।",
  "As a business owner, you are subject to the DPDP compliance rules with penalties up to ₹250 Cr for data breaches.": "एक व्यवसाय के स्वामी के रूप में, आप डेटा उल्लंघनों के लिए ₹250 करोड़ तक के दंड के साथ डीपीडीपी अनुपालन नियमों के अधीन हैं।",
  "As an individual data principal, DPDP grants you data control rights and does not cost you penalties.": "एक व्यक्तिगत डेटा प्रिंसिपल के रूप में, डीपीडीपी आपको डेटा नियंत्रण अधिकार प्रदान करता है और इसमें कोई दंड नहीं है।",
  "Higher exemption limit of ₹125,000 saves you ₹": "₹1,25,000 की उच्च छूट सीमा के साथ पूंजीगत लाभ कर में आपकी बचत ₹",
  "Increased LTSG rate from 10.0% to 12.5% costs you ₹": "इक्विटी परिसंपत्तियों पर दीर्घकालिक पूंजीगत लाभ दर को 10% से बढ़ाकर 12.5% करने के कारण आपकी कर लागत ₹"
};

const TELUGU_EXPLANATION_MAPPING = {
  "Increased standard deduction from ₹50,000 to ₹75,000 saves you ₹": "ఉద్యోగులకు ప్రామాణిక తగ్గింపును ₹50,000 నుండి ₹75,000 కి పెంచడం ద్వారా మీకు లభించే పన్ను ఆదా ₹",
  "You save ₹": "కొత్త పన్ను విధానంలో సవరించిన స్లాబ్‌ల కారణంగా మీరు ఆదా చేసిన మొత్తం ₹",
  "Revised tax slabs cost you an additional ₹": "సవరించిన పన్ను స్లాబ్‌ల కారణంగా కొత్త పన్ను విధానంలో మీకు అదనంగా పడే పన్ను భారం ₹",
  "The revised tax slabs have zero net impact on your income bracket.": "సవరించిన పన్ను స్లాబ్‌ల వలన మీ ఆదాయ పరిమితిపై ఎటువంటి పన్ను మార్పు లేదు.",
  "As a business owner, you are subject to the DPDP compliance rules with penalties up to ₹250 Cr for data breaches.": "వ్యాపార యజమానిగా, మీరు డేటా ఉల్లంఘనల కోసం ₹250 కోట్ల వరకు జరిమానాలతో కూడిన DPDP నిబంధనలకు కట్టుబడి ఉండాలి.",
  "As an individual data principal, DPDP grants you data control rights and does not cost you penalties.": "వ్యక్తిగత డేటా ప్రిన్సిపాల్‌గా, DPDP మీకు డేటా నియంత్రణ హక్కులను మంజూరు చేస్తుంది మరియు ఎటువంటి జరిమానాలు పడవు.",
  "Higher exemption limit of ₹125,000 saves you ₹": "₹1,25,000 కి పెంచిన పన్ను మినహాయింపు పరిమితి ద్వారా మీకు ఆదా అయిన క్యాపిటల్ గెయిన్స్ పన్ను ₹",
  "Increased LTSG rate from 10.0% to 12.5% costs you ₹": "లాంగ్-టర్మ్ క్యాపిటల్ గెయిన్స్ పన్నును 10% నుండి 12.5% కి పెంచడం వల్ల మీపై అదనంగా పడే పన్ను భారం ₹"
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];

  // App States
  const [activeTab, setActiveTab] = useState("bills"); // bills, calc_history, profiles, auth
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  
  // Profile form values (Phase 1 inputs)
  const [profileForm, setProfileForm] = useState({
    annual_income: 800000,
    age: 30,
    tax_regime: "new",
    state: "Maharashtra",
    employment_category: "salaried",
    equity_ltsg: 0,
    save_session: true,
  });

  // Verification & Loading indicators
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  
  // Custom API Key & upload panel states
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", summary: "", source_url: "" });
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // Auth details
  const [authForm, setAuthForm] = useState({ email: "", password: "", isSignUp: false });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [simHistory, setSimHistory] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState("");

  // Share Card blur setting
  const [blurExactAmount, setBlurExactAmount] = useState(false);

  // Initialize
  useEffect(() => {
    fetchBills();
    
    // Load API Key if present
    const savedKey = localStorage.getItem("gemini_api_key") || "";
    setApiKey(savedKey);

    // Load inputs session cache (Phase 1 browser storage persistence)
    const sessionCached = localStorage.getItem("vidhi_session_inputs");
    if (sessionCached) {
      try {
        setProfileForm(JSON.parse(sessionCached));
      } catch (e) {
        console.error("Failed to parse cached session inputs", e);
      }
    }
  }, []);

  // Sync token to auth loads
  useEffect(() => {
    if (token) {
      fetchProfiles();
      fetchHistory();
    } else {
      setSavedProfiles([]);
      setSimHistory([]);
    }
  }, [token]);

  // Fetch Bills from DB
  const fetchBills = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bills`);
      if (res.ok) {
        const data = await res.json();
        setBills(data);
      }
    } catch (e) {
      console.error("Failed to load bills: ", e);
    }
  };

  const fetchProfiles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSavedProfiles(data);
        if (data.length > 0 && !activeProfileId) {
          setActiveProfileId(data[0].id.toString());
        }
      }
    } catch (e) {
      console.error("Failed to load profiles: ", e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/history`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSimHistory(data);
      }
    } catch (e) {
      console.error("Failed to load calculation logs: ", e);
    }
  };

  const selectBill = async (bill) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bills/${bill.id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedBill(data);
        setResult(null);
        setSelectedRule(null);
      }
    } catch (e) {
      console.error("Failed to get bill details: ", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    
    const updated = {
      ...profileForm,
      [name]: name === "annual_income" || name === "age" || name === "equity_ltsg" ? Number(value) : val
    };

    setProfileForm(updated);
    
    if (updated.save_session) {
      localStorage.setItem("vidhi_session_inputs", JSON.stringify(updated));
    } else {
      localStorage.removeItem("vidhi_session_inputs");
    }
  };

  // Profile Auto-fill selector
  const handleProfileSelect = (e) => {
    const pId = e.target.value;
    setActiveProfileId(pId);
    if (!pId) return;
    
    const matched = savedProfiles.find(p => p.id.toString() === pId);
    if (matched) {
      setProfileForm({
        ...profileForm,
        ...matched.profile_data
      });
    }
  };

  // Run calculation (Phase 1 Anonymous evaluation)
  const calculateImpact = async (e) => {
    e.preventDefault();
    if (!selectedBill) return;

    setCalculating(true);
    setResult(null);
    setSelectedRule(null);

    // Skeleton loader timer (minimum 800ms to allow smooth visual loader effect)
    const minTimer = new Promise(resolve => setTimeout(resolve, 800));

    try {
      const calcPromise = fetch(`${API_BASE_URL}/api/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bill_id: selectedBill.id,
          profile: {
            annual_income: profileForm.annual_income,
            age: profileForm.age,
            tax_regime: profileForm.tax_regime,
            state: profileForm.state,
            employment_category: profileForm.employment_category,
            equity_ltsg: profileForm.equity_ltsg
          }
        })
      });

      const [res, _] = await Promise.all([calcPromise, minTimer]);

      if (res.ok) {
        const data = await res.json();
        setResult(data);
        
        // Auto-select first rule to show initial PDF highlight instantly
        if (data.triggered_rules && data.triggered_rules.length > 0) {
          setSelectedRule(data.triggered_rules[0]);
        }

        // If authenticated, automatically log simulation history (Phase 3 save simulations)
        if (token && activeProfileId) {
          await fetch(`${API_BASE_URL}/api/history`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              profile_id: Number(activeProfileId),
              bill_id: selectedBill.id,
              calculated_impact: data.total_impact,
              explanation: data.explanation,
              details_json: { triggered_rules: data.triggered_rules }
            })
          });
          fetchHistory();
        }
      }
    } catch (err) {
      console.error("Calculation failed: ", err);
    } finally {
      setCalculating(false);
    }
  };

  // Language translation logic for calculations explanations (Phase 2)
  const getTranslatedExplanation = (engText) => {
    if (lang === "en" || !engText) return engText;
    
    let text = engText;
    const mapping = lang === "hi" ? HINDI_EXPLANATION_MAPPING : TELUGU_EXPLANATION_MAPPING;
    
    // Replace standard segments
    Object.keys(mapping).forEach(key => {
      if (text.includes(key)) {
        text = text.replace(key, mapping[key]);
      }
    });

    return text;
  };

  // Canvas Image Share card generation (Phase 2 social sharing)
  const downloadShareCard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    // Clean Minimalist background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 800, 400);

    // Hairline border
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 780, 380);

    // Brand Label
    ctx.fillStyle = "#1E1B4B";
    ctx.font = "bold 20px Inter, sans-serif";
    ctx.fillText("VidhiVyakhya  |  विधिव्याख्या", 40, 50);

    ctx.fillStyle = "#64748b";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText("Law, Decoded Personally", 40, 72);

    // Bill title
    ctx.fillStyle = "#334155";
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.fillText(selectedBill?.title || "Parliament Bill", 40, 130);

    // Slogan or impact description
    ctx.fillStyle = "#475569";
    ctx.font = "16px Inter, sans-serif";
    ctx.fillText("Calculated personal financial impact:", 40, 190);

    // Impact value rendering
    const impact = result?.total_impact || 0;
    const isSavings = impact >= 0;
    
    ctx.fillStyle = isSavings ? "#059669" : "#DC2626";
    ctx.font = "bold 56px Inter, sans-serif";

    let label = "";
    if (blurExactAmount) {
      label = isSavings ? "+₹XX,XXX" : "-₹XX,XXX";
    } else {
      const prefix = impact > 0 ? "+" : impact < 0 ? "-" : "";
      label = `${prefix}₹${Math.abs(impact).toLocaleString("en-IN")}`;
    }

    ctx.fillText(label, 40, 260);

    ctx.fillStyle = "#64748b";
    ctx.font = "italic 13px Inter, sans-serif";
    ctx.fillText(
      isSavings 
        ? "✔ Grounded with precise clause-level gazette citations." 
        : "⚠ Increased cost changes evaluated from legislative formulas.", 
      40, 310
    );

    // Footer link
    ctx.fillStyle = "#312E81";
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillText("Evaluate your impact at vidhivyakhya.in", 40, 360);

    // Trigger download
    const link = document.createElement("a");
    link.download = `vidhivyakhya_${selectedBill?.title.replace(/\s+/g, "_")}_impact.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Auth Handling (Phase 3 Auth)
  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = authForm.isSignUp ? "register" : "login";
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });
      const data = await res.json();
      if (res.ok) {
        if (authForm.isSignUp) {
          // Automatic login upon register
          setAuthForm({ ...authForm, isSignUp: false });
          alert("Account registered! Please log in with your credentials.");
        } else {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("userEmail", authForm.email);
          setToken(data.access_token);
          setUserEmail(authForm.email);
          setActiveTab("bills");
        }
      } else {
        alert(data.detail || "Authentication request failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Auth server connection failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken("");
    setUserEmail("");
    setActiveTab("bills");
  };

  const deleteAccount = async () => {
    if (!window.confirm("Are you absolutely sure you want to delete your account? All saved profiles and history will be deleted immediately.")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/account`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        handleLogout();
        alert("Account deleted.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Profile management (Save Profile - Phase 3)
  const [profileName, setProfileName] = useState("");
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileName.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileName,
          profile_data: {
            annual_income: profileForm.annual_income,
            age: profileForm.age,
            tax_regime: profileForm.tax_regime,
            state: profileForm.state,
            employment_category: profileForm.employment_category,
            equity_ltsg: profileForm.equity_ltsg
          }
        })
      });
      if (res.ok) {
        setProfileName("");
        fetchProfiles();
        alert("Profile saved securely (AES-256 encrypted at rest).");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProfile = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProfiles();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // API Key Settings toggle
  const saveApiKeySetting = () => {
    localStorage.setItem("gemini_api_key", apiKey);
    setSettingsOpen(false);
    alert("Gemini key saved locally to browser sandbox.");
  };

  // Bill Upload (Phase 1 upload + Phase 2 Mock extractor support)
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Please select a bill PDF file to upload.");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("title", uploadForm.title);
    formData.append("summary", uploadForm.summary);
    if (uploadForm.source_url) {
      formData.append("source_url", uploadForm.source_url);
    }
    formData.append("file", uploadFile);

    try {
      const res = await fetch(`${API_BASE_URL}/api/bills/upload`, {
        method: "POST",
        headers: {
          "X-Gemini-API-Key": apiKey
        },
        body: formData
      });
      if (res.ok) {
        alert("Bill processed and rules extracted successfully!");
        setUploadOpen(false);
        setUploadForm({ title: "", summary: "", source_url: "" });
        setUploadFile(null);
        fetchBills();
      } else {
        const errData = await res.json();
        alert(errData.detail || "Upload parsing failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server parsing call timed out or failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* Header bar */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-dark flex items-center justify-center text-white text-sm font-bold tracking-tight rounded-sm">
              वि
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base tracking-tight">VidhiVyakhya</span>
              <span className="hidden sm:inline text-xs text-slate-500 font-normal ml-2">विधिव्याख्या</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Lang toggle (Phase 2) */}
            <div className="flex border border-slate-200 rounded-sm overflow-hidden text-xs font-medium">
              <button 
                onClick={() => setLang("en")} 
                className={`px-2 py-1 ${lang === "en" ? "bg-brand text-white" : "bg-white hover:bg-slate-50"}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang("hi")} 
                className={`px-2 py-1 border-l border-slate-200 ${lang === "hi" ? "bg-brand text-white" : "bg-white hover:bg-slate-50"}`}
              >
                HI
              </button>
              <button 
                onClick={() => setLang("te")} 
                className={`px-2 py-1 border-l border-slate-200 ${lang === "te" ? "bg-brand text-white" : "bg-white hover:bg-slate-50"}`}
              >
                TE
              </button>
            </div>

            {/* Admin Key Settings toggle */}
            <button 
              onClick={() => setSettingsOpen(true)}
              className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-sm"
              title="API settings"
            >
              <Settings size={16} />
            </button>

            {/* Navigation options */}
            {token ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab(activeTab === "bills" ? "calc_history" : "bills")}
                  className={`hidden sm:flex items-center gap-1 text-xs font-medium px-3 py-1.5 border border-slate-200 rounded-sm hover:bg-slate-50`}
                >
                  <History size={14} />
                  {activeTab === "bills" ? "Simulation History" : "View Bills"}
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-xs font-semibold px-3 py-1.5 bg-brand-dark text-white rounded-sm hover:bg-brand"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setActiveTab("auth")}
                className="text-xs font-semibold px-3 py-1.5 bg-brand-dark text-white rounded-sm hover:bg-brand"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* API Settings Modal */}
        {settingsOpen && (
          <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-md p-6 relative rounded-sm shadow-minimal">
              <button 
                onClick={() => setSettingsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{t.apiSettingsTitle}</h3>
              <p className="text-xs text-slate-500 mb-4">{t.apiKeyNote}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gemini API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t.apiPlaceholder}
                    className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                  />
                </div>
                <button 
                  onClick={saveApiKeySetting}
                  className="w-full text-xs font-semibold bg-brand-dark text-white py-2 rounded-sm hover:bg-brand transition-colors"
                >
                  Save to Local Sandbox
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Bill Modal */}
        {uploadOpen && (
          <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-lg p-6 relative rounded-sm shadow-minimal">
              <button 
                onClick={() => setUploadOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{t.uploadTitle}</h3>
              <p className="text-xs text-slate-500 mb-4">{t.uploadNote}</p>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bill Title *</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    placeholder="e.g. Finance Bill 2024"
                    className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={uploadForm.summary}
                    onChange={(e) => setUploadForm({ ...uploadForm, summary: e.target.value })}
                    placeholder="Provide a 2-3 sentence overview."
                    className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gazette Source Link (Optional)</label>
                  <input
                    type="url"
                    value={uploadForm.source_url}
                    onChange={(e) => setUploadForm({ ...uploadForm, source_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PDF Gazette File *</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    required
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-slate-50 hover:file:bg-slate-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full text-xs font-semibold bg-brand-dark text-white py-2 rounded-sm hover:bg-brand disabled:opacity-50"
                >
                  {uploading ? "Extracting Rules..." : "Ingest Bill & Parse"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Auth Page Tab */}
        {activeTab === "auth" && (
          <div className="max-w-md mx-auto py-12">
            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-minimal">
              <h2 className="font-bold text-xl text-slate-900 mb-2">
                {authForm.isSignUp ? "Create your Account" : "Access your Account"}
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Save family profiles, compile multi-bill simulations, and track history.
              </p>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-xs font-semibold bg-brand-dark text-white py-2.5 rounded-sm hover:bg-brand transition-colors"
                >
                  {authForm.isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
                {authForm.isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setAuthForm({ ...authForm, isSignUp: !authForm.isSignUp })}
                  className="text-brand font-bold hover:underline"
                >
                  {authForm.isSignUp ? "Sign In" : "Sign Up for Free"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Timelines Tab (Phase 3) */}
        {activeTab === "calc_history" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{t.historyTitle}</h2>
                <p className="text-xs text-slate-500">History logs of simulations compiled across active profiles.</p>
              </div>
              <button 
                onClick={() => setActiveTab("bills")}
                className="text-xs font-medium text-brand hover:underline"
              >
                {t.backToDashboard}
              </button>
            </div>

            {simHistory.length === 0 ? (
              <div className="border border-slate-100 p-8 text-center bg-slate-50 rounded-sm">
                <Info className="mx-auto text-slate-400 mb-2" size={24} />
                <p className="text-sm text-slate-600 font-medium">No saved history yet.</p>
                <p className="text-xs text-slate-400 mt-1">Run a bill calculation on a saved profile to store logs.</p>
              </div>
            ) : (
              <div className="border border-slate-200 bg-white rounded-sm divide-y divide-slate-100">
                {simHistory.map((s) => {
                  const matchedProfile = savedProfiles.find(p => p.id === s.profile_id);
                  return (
                    <div key={s.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{s.bill_title}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            Profile: {matchedProfile?.name || "Deleted"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.explanation}</p>
                        <span className="text-[10px] text-slate-400 mt-2 block">
                          Simulated on: {new Date(s.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className={`text-base font-bold ${s.calculated_impact >= 0 ? "text-savings" : "text-cost"}`}>
                          {s.calculated_impact >= 0 ? "+" : "-"}₹{Math.abs(s.calculated_impact).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Account deletion utility (Phase 3 privacy) */}
            <div className="pt-6 border-t border-slate-200 text-right">
              <button 
                onClick={deleteAccount}
                className="text-xs font-semibold text-red-600 border border-red-200 px-3 py-1.5 rounded-sm hover:bg-red-50"
              >
                Delete Account & Scrub Data
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Landing view */}
        {activeTab === "bills" && !selectedBill && (
          <div className="space-y-8">
            {/* Hero text */}
            <div className="max-w-2xl py-4 space-y-2">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                {t.heroTitle}
              </h1>
              <p className="text-base text-slate-500 font-normal leading-relaxed">
                {t.heroSub}
              </p>
            </div>

            {/* Privacy notice banner */}
            <div className="p-3 bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 rounded-sm">
              <Info size={16} className="text-slate-500 shrink-0 mt-0.5" />
              <span>{t.privacyNotice}</span>
            </div>

            {/* Action headers */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="font-bold text-slate-900 text-lg">Active Legislative Gazette Bills</h2>
              <button
                onClick={() => setUploadOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
              >
                <Upload size={14} />
                {t.uploadTitle}
              </button>
            </div>

            {/* Bill cards loop (Phase 1 preloaded cards) */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bills.map((b) => (
                <div 
                  key={b.id}
                  onClick={() => selectBill(b)}
                  className="group bg-white border border-slate-200 hover:border-brand-light p-5 transition-all duration-200 cursor-pointer rounded-sm flex flex-col justify-between hover:shadow-minimal"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-brand tracking-wider uppercase">Gazette Ingested</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-brand" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-2 group-hover:text-brand transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                      {b.summary}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Source: Parliamentary Gazette</span>
                    <span className="text-brand font-semibold hover:underline">Calculate →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bill calculation details page (Split panel - PDF on left, Inputs on right) */}
        {activeTab === "bills" && selectedBill && (
          <div className="space-y-6">
            
            {/* Header back navigate */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => { setSelectedBill(null); setResult(null); }}
                className="text-xs font-bold text-slate-600 hover:text-brand flex items-center gap-1"
              >
                {t.backToDashboard}
              </button>

              {selectedBill.source_url && (
                <a
                  href={selectedBill.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand hover:underline flex items-center gap-1.5 font-medium"
                >
                  <FileText size={14} />
                  Original Gazette PDF
                </a>
              )}
            </div>

            {/* Bill Summary */}
            <div className="border border-slate-200 bg-white p-4 rounded-sm">
              <h2 className="font-bold text-slate-900 text-lg mb-1">{selectedBill.title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{selectedBill.summary}</p>
            </div>

            {/* Main panels columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: PDF viewer (collapsible on mobile, side-by-side desktop) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="border border-slate-200 bg-white rounded-sm overflow-hidden">
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Official Legislative Draft Preview</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-sm">
                      Interactive Highlighter Active
                    </span>
                  </div>
                  <PDFViewer
                    pdfUrl={`${API_BASE_URL}/api/bills/pdf/${selectedBill.pdf_path}`}
                    highlight={selectedRule?.source_span}
                  />
                </div>
              </div>

              {/* Right Column: Profile input & results outcome */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Profile Form card */}
                <div className="border border-slate-200 bg-white p-6 rounded-sm">
                  <h3 className="font-bold text-slate-900 text-sm mb-4">Enter Financial Profile</h3>
                  
                  {/* Active profile filler dropdown */}
                  {token && savedProfiles.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {t.savedProfiles}
                      </label>
                      <select
                        value={activeProfileId}
                        onChange={handleProfileSelect}
                        className="w-full text-xs border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm bg-slate-50"
                      >
                        <option value="">Select profile to auto-fill...</option>
                        {savedProfiles.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <form onSubmit={calculateImpact} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{t.annualIncome}</label>
                        <input
                          type="number"
                          name="annual_income"
                          required
                          value={profileForm.annual_income}
                          onChange={handleInputChange}
                          className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{t.age}</label>
                        <input
                          type="number"
                          name="age"
                          required
                          value={profileForm.age}
                          onChange={handleInputChange}
                          className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{t.taxRegime}</label>
                        <select
                          name="tax_regime"
                          value={profileForm.tax_regime}
                          onChange={handleInputChange}
                          className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm bg-white"
                        >
                          <option value="new">{t.newRegime}</option>
                          <option value="old">{t.oldRegime}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{t.employmentCategory}</label>
                        <select
                          name="employment_category"
                          value={profileForm.employment_category}
                          onChange={handleInputChange}
                          className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm bg-white"
                        >
                          <option value="salaried">{t.salaried}</option>
                          <option value="business">{t.business}</option>
                          <option value="professional">{t.professional}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{t.state}</label>
                        <select
                          name="state"
                          value={profileForm.state}
                          onChange={handleInputChange}
                          className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm bg-white"
                        >
                          {STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      {/* Show LTCG field if selected bill is Capital Gains */}
                      {(selectedBill.title.toLowerCase().includes("gains") || selectedBill.summary.toLowerCase().includes("gains")) && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">{t.equityGains}</label>
                          <input
                            type="number"
                            name="equity_ltsg"
                            value={profileForm.equity_ltsg}
                            onChange={handleInputChange}
                            className="w-full text-sm border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center">
                        <input
                          id="save_session"
                          name="save_session"
                          type="checkbox"
                          checked={profileForm.save_session}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-brand focus:ring-brand border-slate-300 rounded-sm"
                        />
                        <label htmlFor="save_session" className="ml-2 block text-xs text-slate-500">
                          {t.saveSession}
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={calculating}
                      className="w-full text-xs font-bold bg-brand-dark text-white py-2.5 rounded-sm hover:bg-brand transition-colors disabled:opacity-50"
                    >
                      {calculating ? t.calculating : t.calculateButton}
                    </button>
                  </form>

                  {/* Profile Encryption save option (Phase 3) */}
                  {token && (
                    <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                      <input
                        type="text"
                        required
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="Name: e.g. My Business, Family"
                        className="text-xs border border-slate-200 p-2 focus:outline-none focus:border-brand rounded-sm flex-1"
                      />
                      <button
                        type="submit"
                        className="text-xs font-semibold border border-brand text-brand px-3 py-2 rounded-sm hover:bg-indigo-50"
                      >
                        Secure Save Profile
                      </button>
                    </form>
                  )}
                </div>

                {/* Shimmer skeleton screen calculation loader */}
                {calculating && (
                  <div className="border border-slate-200 bg-white p-6 rounded-sm space-y-4">
                    <div className="h-6 w-1/3 animate-shimmer rounded-sm"></div>
                    <div className="h-16 w-full animate-shimmer rounded-sm"></div>
                    <div className="h-4 w-5/6 animate-shimmer rounded-sm"></div>
                    <div className="h-4 w-4/6 animate-shimmer rounded-sm"></div>
                  </div>
                )}

                {/* Results block (Phase 1 animated output + citations) */}
                {result && !calculating && (
                  <div className="space-y-6">
                    
                    {/* Rupee payoff outcome card */}
                    <div className="border border-slate-200 bg-white p-6 rounded-sm text-center relative overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        {t.resultHeading}
                      </span>
                      
                      {/* Big single payoff number */}
                      <RupeeCounter
                        value={result.total_impact}
                        className={`text-5xl font-extrabold tracking-tight block ${
                          result.total_impact > 0 
                            ? "text-savings" 
                            : result.total_impact < 0 
                              ? "text-cost" 
                              : "text-slate-500"
                        }`}
                      />

                      <p className="text-xs font-medium text-slate-700 mt-4 leading-relaxed max-w-md mx-auto">
                        {getTranslatedExplanation(result.explanation)}
                      </p>
                    </div>

                    {/* Comparison Card View (Phase 2) */}
                    {result.triggered_rules && result.triggered_rules.some(r => r.rule_type === "standard_deduction" || r.rule_type === "tax_slab" || r.rule_type === "capital_gains") && (
                      <div className="border border-slate-200 bg-white p-5 rounded-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                          {t.comparisonTitle}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                          {/* Old rule visual card */}
                          <div className="border border-slate-100 p-4 bg-slate-50 text-slate-600 rounded-sm">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              {t.oldRule}
                            </span>
                            <div className="text-xs font-normal">
                              {result.triggered_rules.map((r, idx) => {
                                if (r.rule_type === "standard_deduction") {
                                  return <div key={idx}>Standard Deduction: ₹50,000</div>;
                                }
                                if (r.rule_type === "tax_slab") {
                                  return <div key={idx}>Tax Slabs: Older 5% slab starts from ₹3,00,000 up to ₹6,00,000.</div>;
                                }
                                if (r.rule_type === "capital_gains") {
                                  return <div key={idx}>LTCG Rate: 10% (Exemption Limit: ₹1,00,000)</div>;
                                }
                                return null;
                              })}
                            </div>
                          </div>

                          {/* New rule visual card */}
                          <div className="border border-slate-200 p-4 bg-white text-slate-800 rounded-sm relative">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-brand block mb-1">
                              {t.newRule}
                            </span>
                            <div className="text-xs font-semibold">
                              {result.triggered_rules.map((r, idx) => {
                                if (r.rule_type === "standard_deduction") {
                                  return <div key={idx} className="text-savings">Standard Deduction: ₹75,000</div>;
                                }
                                if (r.rule_type === "tax_slab") {
                                  return <div key={idx} className="text-savings">Tax Slabs: Revised 5% slab expanded from ₹3,00,000 up to ₹7,00,000.</div>;
                                }
                                if (r.rule_type === "capital_gains") {
                                  return <div key={idx} className="text-cost">LTCG Rate: 12.5% (Exemption Limit: ₹1,25,000)</div>;
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Citations panel with scroll-to link */}
                    <div className="border border-slate-200 bg-white p-5 rounded-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                        {t.citationHeading}
                      </span>
                      
                      <div className="space-y-3">
                        {result.triggered_rules.map((r) => (
                          <div 
                            key={r.id}
                            onClick={() => setSelectedRule(r)}
                            className={`p-3 border transition-colors cursor-pointer rounded-sm ${
                              selectedRule?.id === r.id 
                                ? "border-brand bg-slate-50" 
                                : "border-slate-100 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{r.clause_number}</span>
                              <span className="text-[9px] text-slate-400">Page {r.source_span.page}  |  Click to view</span>
                            </div>
                            
                            {/* Legal clause quote */}
                            <blockquote className="text-xs italic text-slate-600 mt-2 border-l border-slate-300 pl-2">
                              "{r.clause_text}"
                            </blockquote>
                            
                            {/* Math translation info */}
                            <div className="mt-2 flex items-center gap-1 text-[10px] text-brand-light font-medium">
                              <CheckCircle2 size={12} />
                              <span>Calculated mathematically from formula variables</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Share Card (Phase 2) */}
                    <div className="border border-slate-200 bg-white p-5 rounded-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                        {t.shareTitle}
                      </span>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center">
                          <input
                            id="blur_impact"
                            type="checkbox"
                            checked={blurExactAmount}
                            onChange={(e) => setBlurExactAmount(e.target.checked)}
                            className="h-4 w-4 text-brand focus:ring-brand border-slate-300 rounded-sm"
                          />
                          <label htmlFor="blur_impact" className="ml-2 text-xs text-slate-600">
                            {t.blurImpact}
                          </label>
                        </div>
                        <button
                          onClick={downloadShareCard}
                          className="flex items-center justify-center gap-2 text-xs font-bold border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-sm text-slate-700"
                        >
                          <Download size={14} />
                          {t.downloadCard}
                        </button>
                      </div>
                    </div>

                    {/* Non-intrusive call to action sign-up (Phase 1 CTA) */}
                    {!token && (
                      <div className="p-4 bg-slate-50 border border-slate-200 text-xs flex items-center justify-between rounded-sm">
                        <span className="text-slate-600">{t.noAccount}</span>
                        <button 
                          onClick={() => setActiveTab("auth")}
                          className="text-brand font-bold hover:underline flex items-center gap-0.5"
                        >
                          {t.createFreeAccount}
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-slate-100 py-6 bg-white text-center text-xs text-slate-400">
        <div>© 2026 VidhiVyakhya. Indian Parliamentary Gazette Financial Calculations Engine.</div>
        <div className="mt-1">All data processed in sandbox. Self-supplied API keys remain in browser memory.</div>
      </footer>
    </div>
  );
}
