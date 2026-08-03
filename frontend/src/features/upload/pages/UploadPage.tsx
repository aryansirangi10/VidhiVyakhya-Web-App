import React, { useState } from "react";
import { UploadCloud, CheckCircle2, Sparkles, FileText, ShieldCheck } from "lucide-react";
import UploadDropzone from "../components/UploadDropzone/UploadDropzone";
import { uploadApi, IngestionResult } from "../services/upload.api";
import Spinner from "../../../components/ui/Spinner";

export function UploadPage() {
  const [docType, setDocType] = useState("Bill");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<IngestionResult | null>(null);

  const handleFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const res = await uploadApi.uploadDocument(file, docType);
      setResult(res);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-8 font-mono">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
          <Sparkles size={14} /> Universal AI Ingestion Pipeline
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Ingest Statutory Document</h1>
        <p className="text-xs text-slate-500">Automatically run OCR, segment chapters & clauses, extract statutory rules, and index vectors.</p>
      </div>

      {/* DOCUMENT TYPE SELECTOR */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase">Select Document Type</label>
        <div className="flex flex-wrap gap-2">
          {["Bill", "Act", "Rule", "Gazette", "Circular", "Judgment"].map((t) => (
            <button
              key={t}
              onClick={() => setDocType(t)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                docType === t
                  ? "bg-brand-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* DROPZONE */}
      <UploadDropzone onFileSelected={handleFile} />

      {/* PROCESSING INDICATOR */}
      {isProcessing && (
        <div className="rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Spinner size="md" />
            <h3 className="text-sm font-bold">Executing Statutory AI Pipeline...</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
            <span>✓ SHA-256 Checksum Validation</span>
            <span>✓ OCR & Preprocessing</span>
            <span>✓ Chapter & Section Segmentation</span>
            <span>✓ Clause & Rule Extraction</span>
          </div>
        </div>
      )}

      {/* INGESTION RESULT */}
      {result && (
        <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-4 animate-fade">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" /> Ingestion Completed
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              {(result.extracted_metadata.confidence_score * 100).toFixed(0)}% Verified
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Chapters</span>
              <p className="font-bold text-slate-900">{result.extracted_metadata.chapters_count}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Sections</span>
              <p className="font-bold text-slate-900">{result.extracted_metadata.sections_count}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Clauses Parsed</span>
              <p className="font-bold text-slate-900">{result.extracted_metadata.clauses_count}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Rules Extracted</span>
              <p className="font-bold text-slate-900">{result.extracted_metadata.rules_extracted}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
