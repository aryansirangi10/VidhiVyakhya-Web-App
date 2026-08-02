import React, { useState, useEffect } from "react";
import { BookOpen, Scale, FileText, Newspaper, Building2, Landmark, Search, ShieldCheck, Clock, Bookmark } from "lucide-react";
import Input from "../../../components/ui/Input";
import { StatutoryDocument } from "../types/document";
import { documentsApi } from "../services/documents.api";

const categories = [
  { id: "all", label: "All Documents", icon: <BookOpen size={16} /> },
  { id: "Bill", label: "Bills", icon: <FileText size={16} /> },
  { id: "Act", label: "Acts", icon: <Scale size={16} /> },
  { id: "Rule", label: "Rules", icon: <Newspaper size={16} /> },
  { id: "Circular", label: "Circulars & Notifications", icon: <Building2 size={16} /> },
  { id: "Judgment", label: "Judgments", icon: <Landmark size={16} /> },
];

const ministries = [
  "Ministry of Finance",
  "Ministry of Corporate Affairs",
  "Electronics & IT",
  "Agriculture & Farmers Welfare",
  "Commerce & Industry",
];

export function IntelligenceHome() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<StatutoryDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    documentsApi.getDocuments(activeTab, searchQuery).then((data) => {
      setDocuments(data);
      setIsLoading(false);
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 space-y-8 font-mono">
      {/* HUB HEADER */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
          <ShieldCheck size={14} /> Grounded Legislative Intelligence Hub
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Statutory Documents
        </h1>
        <p className="text-xs text-slate-500 max-w-xl">
          Search and inspect official Bills, Acts, Rules, Gazette notifications, CBDT circulars, and judicial precedents.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-2xl">
        <Input
          placeholder="Search Bills, Acts, Rules, Gazette, Circulars (e.g. CBDT Circular 10/2024)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} />}
        />
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === cat.id
                ? "bg-brand-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* MINISTRY GRID EXPLORER */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Filter by Union Ministry</h3>
        <div className="flex flex-wrap gap-2">
          {ministries.map((m, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer hover:border-brand-500">
              🏛 {m}
            </span>
          ))}
        </div>
      </div>

      {/* DOCUMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200 uppercase">
                  {doc.document_type}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {(doc.confidence * 100).toFixed(0)}% Verified
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{doc.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{doc.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1"><Clock size={12} /> {doc.reading_time}m read ({doc.pages}p)</span>
              <span className="text-brand-600 font-bold hover:underline cursor-pointer">Inspect Document →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntelligenceHome;
