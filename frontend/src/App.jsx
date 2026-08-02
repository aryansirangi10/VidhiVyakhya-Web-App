import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  ArrowRight, Lock, User, Plus, Trash2, Settings, Upload, History, 
  Globe, Download, Info, FileText, CheckCircle2, ChevronRight, X, AlertTriangle, Eye, EyeOff
} from "lucide-react";

// PDF Viewer
import PDFViewer from "./components/PDFViewer";

// Services Layer
import { billService } from "./services/billService";
import { profileService } from "./services/profileService";
import { simulationService } from "./services/simulationService";
import { glossaryService } from "./services/glossaryService";

// Custom Hooks
import { useImpactSimulator } from "./hooks/useImpactSimulator";
import { useTimeline } from "./hooks/useTimeline";
import { useBillMetadata } from "./hooks/useBillMetadata";
import { useProfileComparison } from "./hooks/useProfileComparison";
import { useGlossary } from "./hooks/useGlossary";
import { useAnimatedNumber } from "./hooks/useAnimatedNumber";

// Visual Components
import Timeline from "./components/Bill/Timeline";
import Metadata from "./components/Bill/Metadata";
import ReadingTime from "./components/Bill/ReadingTime";
import IncomeSlider from "./components/Calculator/IncomeSlider";
import BreakdownBars from "./components/Calculator/BreakdownBars";
import AnimatedImpact from "./components/Calculator/AnimatedImpact";
import CitationCard from "./components/Rule/CitationCard";
import RuleMatch from "./components/Rule/RuleMatch";
import ComparisonGrid from "./components/Profiles/ComparisonGrid";
import Tooltip from "./components/Common/Tooltip";
import StatCard from "./components/Common/StatCard";

const STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka", 
  "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

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
    blurImpact: "గోపనీయత కోసం మొత్తాన్ని బ్లర్ చేయి",
    noAccount: "దీన్ని కాలక్రమేణా ట్రాక్ చేయాలనుకుంటున్నారా?",
    createFreeAccount: "ఉచిత ఖాతాను సృష్టించండి",
    historyTitle: "సిమ్యులేషన్స్ చరిత్ర",
    savedProfiles: "భద్రపరిచిన ప్రొఫైల్స్",
    privacyNotice: "గోప్యతా నోటీసు: అనామక వినియోగదారుల ప్రొఫైల్ డేటా సర్వర్‌లో నిల్వ చేయబడదు. అన్ని లెక్కలు మీ బ్రౌజర్‌లోనే జరుగుస్తాయి.",
    apiSettingsTitle: "నియమ సంగ్రహణ API సెట్టింగులు",
    apiPlaceholder: "అనుకూల API కీని పేస్ట్ చేయండి...",
    apiKeyNote: "మీ కీ బ్రౌజర్ లోకల్ స్టోరేజ్‌లో మాత్రమే దాచబడుతుంది, సర్వర్‌కు పంపబడదు.",
    uploadTitle: "కొత్త పార్లమెంటరీ బిల్లును అప్‌లోడ్ చేయండి",
    uploadNote: "పీడీఎఫ్ అప్‌లోడ్ చేయండి. కీ లేకపోతే డెమో రూల్స్ మాత్రమే క్రియేట్ అవుతాయి.",
    equityGains: "ఈక్విటీ లాంగ్-టర్మ్ క్యాపిటల్ గెయిన్స్ (₹)",
    oldRule: "గత విధానం",
    newRule: "ప్రతిపాదిత క్లాజ్",
  }
};

const HINDI_EXPLANATION_MAPPING = {
  "Applied Standard Deduction saving of": "मानक कटौती के कारण आपकी सीमांत दर पर शुद्ध कर बचत:",
  "Tax Slabs Adjustment: Saved": "संशोधित कर स्लैब के कारण कुल कर बचत:",
  "LTCG rate increase to 12.5% added a net tax cost of": "दीर्घकालिक पूंजीगत लाभ दर (LTCG) को 12.5% करने पर कर भार बढ़ा:",
  "LTCG exemption expansion saved": "पूंजीगत लाभ (LTCG) सीमा छूट बढ़ने से कर बचत:",
  "Compliance Risk Warning: New penalty guidelines": "डीपीडीपी अनुपालन जोखिम चेतावनी: नियमों के उल्लंघन पर जुर्माना:",
  "Cumulative Net Outcome": "कुल संचयी परिणाम"
};

const TELUGU_EXPLANATION_MAPPING = {
  "Applied Standard Deduction saving of": "ప్రామాణిక తగ్గింపు కారణంగా మీకు లభించిన పన్ను ఆదా:",
  "Tax Slabs Adjustment: Saved": "సవరించిన పన్ను స్లాబ్‌ల కారణంగా ఆదా అయిన మొత్తం:",
  "LTCG rate increase to 12.5% added a net tax cost of": "LTCG పన్ను 12.5% కి పెరగడం వల్ల పడిన అదనపు పన్ను భారం:",
  "LTCG exemption expansion saved": "క్యాపిటల్ గెయిన్స్ మినహాయింపు పెరగడం వల్ల ఆదా అయిన పన్ను:",
  "Compliance Risk Warning: New penalty guidelines": "DPDP డేటా నిబంధనల ఉల్లంఘన జరిమానా భద్రతా హెచ్చరిక:",
  "Cumulative Net Outcome": "మొత్తం నికర పన్ను మార్పు"
};

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];

  // App Navigation States
  const [activeTab, setActiveTab] = useState("bills"); 
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  
  // Profile form values (Phase 1 inputs)
  const [profileForm, setProfileForm] = useState({
    annual_income: 1000000,
    age: 30,
    tax_regime: "new",
    state: "Maharashtra",
    employment_category: "salaried",
    equity_ltsg: 0,
    save_session: true,
  });

  // Highlight coordinates & loader indicators
  const [calculating, setCalculating] = useState(false);
  const [activeRuleHighlight, setActiveRuleHighlight] = useState(null);
  const [selectedRuleId, setSelectedRuleId] = useState(null);
  
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

  // Share Card settings
  const [blurExactAmount, setBlurExactAmount] = useState(false);

  // Glossary Hover States
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Custom hooks integrations
  const { timeline, loading: timelineLoading, error: timelineError } = useTimeline(selectedBill?.id);
  const { metadata: billMeta, loading: metaLoading, error: metaError } = useBillMetadata(selectedBill?.id);
  const { comparisons, loading: compLoading, refetch: refetchComparisons } = useProfileComparison(token, selectedBill?.id);
  const { definition, loading: glossaryLoading, fetchTerm, clearTerm, highlightTerms } = useGlossary();

  // Local Evaluator engine hook (runs instantly on profileForm changes)
  const { impact, matchedRules, breakdown, trace, hasComplianceAlert } = useImpactSimulator(
    profileForm,
    selectedBill?.rules || []
  );

  // Initial Seed loaders
  useEffect(() => {
    fetchBills();
    
    // Load API Key
    const savedKey = localStorage.getItem("gemini_api_key") || "";
    setApiKey(savedKey);

    // Load inputs session cache
    const sessionCached = localStorage.getItem("vidhi_session_inputs");
    if (sessionCached) {
      try {
        setProfileForm(JSON.parse(sessionCached));
      } catch (e) {
        console.error("Failed to parse cached session inputs", e);
      }
    }
  }, []);

  // Sync token to auth databases
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
      const data = await billService.getBills();
      setBills(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProfiles = async () => {
    try {
      const data = await profileService.getProfiles(token);
      setSavedProfiles(data);
      if (data.length > 0 && !activeProfileId) {
        setActiveProfileId(data[0].id.toString());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHistory = async () => {
    try {
      const data = await simulationService.getHistory(token);
      setSimHistory(data);
    } catch (e) {
      console.error(e);
    }
  };

  const selectBill = async (bill) => {
    try {
      const data = await billService.getBillById(bill.id);
      setSelectedBill(data);
      // Auto-select first rule for visual highlight
      if (data.rules && data.rules.length > 0) {
        setSelectedRuleId(data.rules[0].id);
        setActiveRuleHighlight(data.rules[0].source_span);
      } else {
        setSelectedRuleId(null);
        setActiveRuleHighlight(null);
      }
    } catch (e) {
      console.error(e);
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

  // Compare profile click selector (updates form with saved data instantly)
  const handleProfileSelect = (pId) => {
    setActiveProfileId(pId.toString());
    const matched = savedProfiles.find(p => p.id.toString() === pId.toString());
    if (matched) {
      setProfileForm({
        ...profileForm,
        ...matched.profile_data
      });
    }
  };

  // Saves calculated simulation log to database history timeline
  const saveSimulationRecord = async () => {
    if (!token || !activeProfileId || !selectedBill) return;
    
    try {
      await simulationService.saveHistory(token, {
        profile_id: Number(activeProfileId),
        bill_id: selectedBill.id,
        calculated_impact: impact,
        explanation: trace.join("\n"),
        details_json: { triggered_rules: matchedRules }
      });
      alert("Impact Simulation logged to history timeline successfully!");
      fetchHistory();
      refetchComparisons();
    } catch (e) {
      console.error(e);
    }
  };

  // Language translation logic for calculations explanations (Phase 2)
  const getTranslatedExplanation = (engText) => {
    if (lang === "en" || !engText) return engText;
    
    let text = engText;
    const mapping = lang === "hi" ? HINDI_EXPLANATION_MAPPING : TELUGU_EXPLANATION_MAPPING;
    
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
      const res = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });
      const data = await res.json();
      if (res.ok) {
        if (authForm.isSignUp) {
          alert("Account registered successfully! Please sign in.");
          setAuthForm({ ...authForm, isSignUp: false });
        } else {
          setToken(data.access_token);
          setUserEmail(authForm.email);
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("userEmail", authForm.email);
          setActiveTab("bills");
        }
      } else {
        alert(data.detail || "Authentication request failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setToken("");
    setUserEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setActiveProfileId("");
    setActiveTab("bills");
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const name = prompt("Enter profile display name (e.g. Spouse, HUF, My Company):");
    if (!name) return;

    try {
      const res = await profileService.createProfile(token, {
        name: name,
        display_name: name,
        profile_data: {
          annual_income: profileForm.annual_income,
          age: profileForm.age,
          tax_regime: profileForm.tax_regime,
          state: profileForm.state,
          employment_category: profileForm.employment_category,
          equity_ltsg: profileForm.equity_ltsg
        },
        avatar: "avatar_1",
        color: "#4f46e5",
        default_profile: savedProfiles.length === 0
      });
      alert("Profile secure encrypted and saved!");
      fetchProfiles();
      refetchComparisons();
    } catch (err) {
      alert("Failed to save profile.");
    }
  };

  const deleteProfile = async (id) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    try {
      await profileService.deleteProfile(token, id);
      fetchProfiles();
      refetchComparisons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("CAUTION: This permanently scrub-deletes your user account and all encrypted profiles. Proceed?")) return;
    try {
      const res = await fetch(`/api/auth/account`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Account completely deleted.");
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Upload Bill
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadForm.title);
    formData.append("summary", uploadForm.summary);
    if (uploadForm.source_url) {
      formData.append("source_url", uploadForm.source_url);
    }

    try {
      const data = await billService.uploadBill(formData, apiKey);
      alert(`Bill ingested successfully! Rules extracted: ${data.rules_extracted_count}`);
      setUploadOpen(false);
      setUploadForm({ title: "", summary: "", source_url: "" });
      setUploadFile(null);
      fetchBills();
    } catch (err) {
      alert(err.message || "Failed to process parliamentary bill.");
    } finally {
      setUploading(false);
    }
  };

  const saveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem("gemini_api_key", apiKey);
    setSettingsOpen(false);
    alert("Gemini key saved locally.");
  };

  const getPDFURL = () => {
    if (!selectedBill) return "";
    return `/api/bills/pdf/${selectedBill.pdf_path}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      
      {/* 1. Header Toolbar Layout */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2 cursor-pointer" onClick={() => setSelectedBill(null)}>
              <span className="text-white bg-indigo-950 p-1.5 rounded-sm font-serif">विधिव्याख्या</span>
              <span>VidhiVyakhya</span>
            </h1>
            
            {/* Lang selectors */}
            <div className="flex bg-slate-100 p-0.5 rounded-sm text-[10px] font-bold">
              {["en", "hi", "te"].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-sm uppercase ${lang === l ? 'bg-indigo-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => { setSelectedBill(null); setActiveTab("bills"); }}
              className={`hover:text-slate-900 ${activeTab === 'bills' && !selectedBill ? 'text-brand' : 'text-slate-500'}`}
            >
              Bills Library
            </button>
            {token && (
              <>
                <button 
                  onClick={() => { setActiveTab("profiles"); setSelectedBill(null); }}
                  className={`hover:text-slate-900 ${activeTab === 'profiles' ? 'text-brand' : 'text-slate-500'}`}
                >
                  My Profiles
                </button>
                <button 
                  onClick={() => { setActiveTab("calc_history"); setSelectedBill(null); }}
                  className={`hover:text-slate-900 ${activeTab === 'calc_history' ? 'text-brand' : 'text-slate-500'}`}
                >
                  Simulation Timeline
                </button>
              </>
            )}
            
            <div className="h-4 w-[1px] bg-slate-200"></div>

            <button 
              onClick={() => setSettingsOpen(true)}
              className="text-slate-500 hover:text-slate-800"
              title="Settings API Keys"
            >
              <Settings className="w-4 h-4" />
            </button>

            {token ? (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-slate-500 tracking-normal lowercase">{userEmail}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-sm border border-slate-200 text-[10px]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setActiveTab("auth"); setSelectedBill(null); }}
                className="bg-indigo-950 hover:bg-indigo-900 text-white px-3 py-1.5 rounded-sm text-[10px]"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* 2. Main Dashboard Panel container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Tooltip Overlay */}
        {showTooltip && definition && (
          <Tooltip 
            definition={definition} 
            loading={glossaryLoading} 
            position={tooltipPos} 
            onClose={() => setShowTooltip(false)}
          />
        )}

        {/* Tab 1: Library list */}
        {activeTab === "bills" && !selectedBill && (
          <div className="space-y-8 animate-fade">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-2">
                {t.heroTitle}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                {t.heroSub}
              </p>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Legislation Documents</span>
              <button 
                onClick={() => setUploadOpen(true)}
                className="bg-indigo-950 hover:bg-indigo-900 text-white px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                Ingest New Bill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bills.map((bill) => (
                <div 
                  key={bill.id}
                  onClick={() => selectBill(bill)}
                  className="border border-slate-200 bg-white p-5 rounded-sm hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between h-48 group shadow-sm"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <span className="text-[10px] font-bold text-indigo-950 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">
                        {bill.category}
                      </span>
                      <ReadingTime minutes={bill.reading_time} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-brand mb-1">
                      {bill.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                      {bill.summary}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 border-t border-slate-100 pt-3">
                    <span>Stage: {bill.current_stage || "Introduced"}</span>
                    <span className="text-brand group-hover:translate-x-1 transition-transform uppercase tracking-wider text-[9px]">
                      Analyze →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Bill detail workspace split */}
        {selectedBill && activeTab === "bills" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-10rem)]">
            
            {/* Left Column calculator panel */}
            <div className="flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-thin">
              
              {/* Back navigation */}
              <button 
                onClick={() => setSelectedBill(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 uppercase tracking-wider self-start"
              >
                {t.backToDashboard}
              </button>

              {/* Bill Details Title Header */}
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900 mb-1">
                  {selectedBill.title}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {selectedBill.summary}
                </p>
              </div>

              {/* Metadata Panel */}
              <Metadata metadata={billMeta} loading={metaLoading} error={metaError} />

              {/* Legislative Timeline Stages */}
              <Timeline stages={timeline} loading={timelineLoading} error={timelineError} />

              {/* Profile Autofill selector (if user logged in) */}
              {token && savedProfiles.length > 0 && (
                <div className="border border-slate-200 p-4 rounded-sm bg-white shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Select Encrypted Entity Profile
                    </label>
                    <span className="text-xs font-semibold text-slate-700">Auto-fill values from saved records</span>
                  </div>
                  <select 
                    value={activeProfileId}
                    onChange={(e) => handleProfileSelect(e.target.value)}
                    className="border border-slate-200 text-xs font-semibold p-1.5 rounded-sm focus:outline-none"
                  >
                    <option value="">-- Choose Profile --</option>
                    {savedProfiles.map(p => (
                      <option key={p.id} value={p.id.toString()}>{p.display_name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dynamic Profiles Comparisons Deck */}
              {token && comparisons.length > 0 && (
                <ComparisonGrid 
                  comparisons={comparisons}
                  activeProfileId={Number(activeProfileId)}
                  onSelectProfile={handleProfileSelect}
                  onAddProfile={() => setActiveTab("profiles")}
                />
              )}

              {/* Personal Financial Profile Inputs Form */}
              <div className="border border-slate-200 p-5 rounded-sm bg-white shadow-sm space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 block">
                  Simulate Financial Profile Inputs
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Regime */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t.taxRegime}
                    </label>
                    <select
                      name="tax_regime"
                      value={profileForm.tax_regime}
                      onChange={handleInputChange}
                      className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand"
                    >
                      <option value="new">{t.newRegime}</option>
                      <option value="old">{t.oldRegime}</option>
                    </select>
                  </div>

                  {/* Employment Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t.employmentCategory}
                    </label>
                    <select
                      name="employment_category"
                      value={profileForm.employment_category}
                      onChange={handleInputChange}
                      className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand"
                    >
                      <option value="salaried">{t.salaried}</option>
                      <option value="business">{t.business}</option>
                      <option value="professional">{t.professional}</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t.age}
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={profileForm.age}
                      onChange={handleInputChange}
                      className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand"
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t.state}
                    </label>
                    <select
                      name="state"
                      value={profileForm.state}
                      onChange={handleInputChange}
                      className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand"
                    >
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Capital Gains (Equity LTSG) */}
                {selectedBill.category?.toLowerCase().includes("capital") && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t.equityGains}
                    </label>
                    <input
                      type="number"
                      name="equity_ltsg"
                      value={profileForm.equity_ltsg}
                      onChange={handleInputChange}
                      className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand"
                    />
                  </div>
                )}
              </div>

              {/* Slider Controller (Renders slider directly below result panels) */}
              <IncomeSlider 
                value={profileForm.annual_income}
                onChange={(val) => {
                  setProfileForm(prev => {
                    const updated = { ...prev, annual_income: val };
                    if (updated.save_session) {
                      localStorage.setItem("vidhi_session_inputs", JSON.stringify(updated));
                    }
                    return updated;
                  });
                }}
              />

              {/* Rupee Impact Result Card */}
              <div className="border border-slate-200 bg-white p-5 rounded-sm shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.resultHeading}
                  </h3>
                  
                  {token && activeProfileId && (
                    <button 
                      onClick={saveSimulationRecord}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-sm border border-slate-200 text-[10px] font-bold uppercase tracking-wider"
                    >
                      Save Simulation Log
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Rupee animated value counter */}
                  <AnimatedImpact value={impact} className="text-4xl" />
                  
                  {hasComplianceAlert && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Compliance Risk
                    </span>
                  )}
                </div>

                {/* Explanation text translations */}
                <div className="text-xs leading-relaxed text-slate-600 border-l-2 border-brand pl-3 py-1 space-y-1 bg-slate-50 rounded-r-sm pr-2">
                  <span className="font-bold text-slate-800 block uppercase tracking-wide text-[9px] mb-1">
                    Trace Calculations explanations:
                  </span>
                  {trace.map((line, idx) => (
                    <div key={idx} className="font-medium text-slate-700">
                      {highlightTerms(getTranslatedExplanation(line), (term, termIdx) => (
                        <span 
                          key={termIdx}
                          className="underline decoration-dotted decoration-brand cursor-help relative group inline-block font-semibold text-slate-800"
                          onMouseEnter={(e) => {
                            const rect = e.target.getBoundingClientRect();
                            setTooltipPos({
                              top: e.target.offsetTop + e.target.offsetHeight + 4,
                              left: e.target.offsetLeft
                            });
                            fetchTerm(term);
                            setShowTooltip(true);
                          }}
                          onMouseLeave={clearTerm}
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Breakdown Bars */}
              <BreakdownBars breakdown={breakdown} totalImpact={impact} />

              {/* Rule Match Grounding counter */}
              <RuleMatch matchedRules={matchedRules} />

              {/* Social Share generator panel */}
              <div className="border border-slate-200 bg-white p-5 rounded-sm shadow-sm space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t.shareTitle}
                </h3>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={downloadShareCard}
                    className="bg-indigo-950 hover:bg-indigo-900 text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.downloadCard}
                  </button>

                  <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={blurExactAmount}
                      onChange={(e) => setBlurExactAmount(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-900 focus:ring-brand w-3.5 h-3.5"
                    />
                    <span>{t.blurImpact}</span>
                  </label>
                </div>
              </div>

              {/* Source Citations panels */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 block">
                  {t.citationHeading}
                </h3>
                
                <div className="flex flex-col gap-4">
                  {selectedBill.rules.map((rule) => {
                    const isActive = selectedRuleId === rule.id;
                    return (
                      <CitationCard
                        key={rule.id}
                        rule={rule}
                        isActive={isActive}
                        onClickHighlight={(span) => {
                          setSelectedRuleId(rule.id);
                          setActiveRuleHighlight(span);
                        }}
                      />
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column PDF canvas split */}
            <div className="border border-slate-200 bg-slate-100 rounded-sm relative h-full flex flex-col shadow-inner">
              <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  Original Gazette Document PDF
                </span>
                {selectedBill.source_url && (
                  <a 
                    href={selectedBill.source_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-brand hover:underline font-bold uppercase tracking-wider text-[10px]"
                  >
                    View Official Source
                  </a>
                )}
              </div>

              <div className="flex-1 overflow-hidden relative bg-slate-200 p-2">
                <PDFViewer 
                  pdfUrl={getPDFURL()} 
                  highlightSpan={activeRuleHighlight}
                />
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: User Profiles CRUD */}
        {activeTab === "profiles" && (
          <div className="max-w-2xl mx-auto border border-slate-200 bg-white p-6 rounded-sm shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Manage Encrypted Entity Profiles
                </h2>
                <p className="text-[11px] text-slate-400 lowercase tracking-normal">
                  profiles are AES-256 encrypted at rest on server databases.
                </p>
              </div>
              
              <button 
                onClick={saveProfile}
                className="bg-indigo-950 hover:bg-indigo-900 text-white px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider"
              >
                Create New Profile
              </button>
            </div>

            {savedProfiles.length === 0 ? (
              <div className="text-xs text-slate-400 py-6 text-center italic border border-dashed border-slate-200 rounded-sm">
                No profiles saved yet. Click 'Create New Profile' to add family members or company accounts.
              </div>
            ) : (
              <div className="space-y-4">
                {savedProfiles.map(p => (
                  <div key={p.id} className="border border-slate-200 p-4 rounded-sm flex items-center justify-between bg-slate-50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-800">{p.display_name}</span>
                        {p.default_profile && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[8px] font-bold px-1 rounded-sm uppercase tracking-wider">Default</span>}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Income: <span className="font-mono font-semibold">₹{p.profile_data.annual_income.toLocaleString('en-IN')}</span> | Regime: <span className="uppercase">{p.profile_data.tax_regime}</span> | Category: <span className="capitalize">{p.profile_data.employment_category}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteProfile(p.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Account Administration</h3>
              <button 
                onClick={handleDeleteAccount}
                className="text-rose-600 hover:text-rose-800 text-[10px] font-bold uppercase tracking-wider border border-rose-200 hover:border-rose-300 px-3 py-1.5 rounded-sm bg-rose-50"
              >
                Delete User Account & Scrub Data
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: History Timeline */}
        {activeTab === "calc_history" && (
          <div className="max-w-2xl mx-auto border border-slate-200 bg-white p-6 rounded-sm shadow-sm space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">
                Simulations Logging History
              </h2>
              <p className="text-[11px] text-slate-400 font-normal leading-normal">
                Audit logs of tax simulations and compliance calculation matches saved to your account.
              </p>
            </div>

            {simHistory.length === 0 ? (
              <div className="text-xs text-slate-400 py-6 text-center italic border border-dashed border-slate-200 rounded-sm font-normal">
                No simulations logged yet. Go to a bill details page and click 'Save Simulation Log' to append entries.
              </div>
            ) : (
              <div className="relative border-l-2 border-indigo-950/20 pl-6 space-y-6">
                {simHistory.map((item, idx) => (
                  <div key={item.id} className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-brand border border-white"></span>
                    <div className="text-[10px] text-slate-400 font-mono font-medium mb-1">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                    <div className="border border-slate-200 p-4 rounded-sm bg-slate-50">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h4 className="text-xs font-bold text-slate-800">{item.bill_title}</h4>
                        <span className={`text-xs font-bold font-mono ${item.calculated_impact >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.calculated_impact >= 0 ? '+' : ''}₹{item.calculated_impact.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium leading-relaxed whitespace-pre-line">
                        {getTranslatedExplanation(item.explanation)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Auth Forms */}
        {activeTab === "auth" && (
          <div className="max-w-md mx-auto border border-slate-200 bg-white p-6 rounded-sm shadow-sm space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">
                {authForm.isSignUp ? "Create a secure account" : "Sign In to VidhiVyakhya"}
              </h2>
              <p className="text-[11px] text-slate-400 lowercase tracking-normal">
                {authForm.isSignUp ? "store family profiles using AES-256 server encryption" : "access logged histories and comparison cards decks"}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                <input 
                  type="email"
                  required
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  placeholder="name@example.com"
                  className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
                <input 
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-950 hover:bg-indigo-900 text-white py-2 rounded-sm text-[10px] uppercase font-bold tracking-wider"
              >
                {authForm.isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="text-center border-t border-slate-100 pt-4">
              <button 
                onClick={() => setAuthForm({ ...authForm, isSignUp: !authForm.isSignUp })}
                className="text-brand hover:underline text-[10px] font-bold uppercase tracking-wider"
              >
                {authForm.isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* 3. Footer Privacy Warning */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-[10px] font-medium text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          {t.privacyNotice}
        </div>
      </footer>

      {/* Settings Modal (Gemini Key) */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 max-w-md w-full rounded-sm shadow-xl space-y-4 animate-scale">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-slate-400" />
                {t.apiSettingsTitle}
              </h3>
              <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={saveSettings} className="space-y-4">
              <p className="text-[10px] text-slate-400 leading-normal font-normal">
                {t.apiKeyNote}
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={t.apiPlaceholder}
                className="w-full border border-slate-200 p-2 text-xs font-mono rounded-sm focus:outline-none"
              />
              <button 
                type="submit"
                className="w-full bg-indigo-950 hover:bg-indigo-900 text-white py-2 rounded-sm text-[10px] uppercase font-bold tracking-wider"
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Ingest Bill Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 max-w-md w-full rounded-sm shadow-xl space-y-4 animate-scale">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-slate-400" />
                {t.uploadTitle}
              </h3>
              <button onClick={() => setUploadOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <p className="text-[10px] text-slate-400 leading-normal font-normal">
                {t.uploadNote}
              </p>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Bill Title</label>
                <input 
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g. Finance Bill 2026"
                  className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Brief Summary</label>
                <textarea 
                  required
                  rows="2"
                  value={uploadForm.summary}
                  onChange={(e) => setUploadForm({ ...uploadForm, summary: e.target.value })}
                  placeholder="Grounded summaries points..."
                  className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Official Link (Source URL)</label>
                <input 
                  type="url"
                  value={uploadForm.source_url}
                  onChange={(e) => setUploadForm({ ...uploadForm, source_url: e.target.value })}
                  placeholder="https://..."
                  className="border border-slate-200 p-2 rounded-sm text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Parliament Gazette PDF</label>
                <input 
                  type="file"
                  required
                  accept=".pdf"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="text-xs font-medium"
                />
              </div>

              <button 
                type="submit"
                disabled={uploading}
                className="w-full bg-indigo-950 hover:bg-indigo-900 text-white py-2 rounded-sm text-[10px] uppercase font-bold tracking-wider disabled:opacity-50"
              >
                {uploading ? "Ingesting rules..." : "Start Ingestion"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
