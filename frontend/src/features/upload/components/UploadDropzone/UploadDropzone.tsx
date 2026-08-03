import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export function UploadDropzone({ onFileSelected }: { onFileSelected: (file: File) => void }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`rounded-3xl border-2 border-dashed p-10 text-center space-y-4 font-mono transition-all ${
        dragActive
          ? "border-brand-500 bg-brand-50/50"
          : "border-slate-300 bg-white hover:border-slate-400"
      }`}
    >
      <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
        <UploadCloud size={32} />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">Drag & Drop Parliamentary PDF</h3>
        <p className="text-xs text-slate-500">Supports Bills, Gazette Notifications, Circulars, and Judgments (Up to 50MB)</p>
      </div>

      <label className="inline-block px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl cursor-pointer shadow-md transition-all">
        Browse File
        <input type="file" accept=".pdf,.txt" onChange={handleChange} className="hidden" />
      </label>
    </div>
  );
}

export default UploadDropzone;
