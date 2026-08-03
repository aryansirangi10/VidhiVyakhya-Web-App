import React, { useState } from "react";
import { BookOpen, Plus, Trash2, Save, FileText, Sparkles, Calculator } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

interface NotebookCell {
  id: string;
  type: "text" | "ai_explanation" | "calculator_trace";
  content: string;
  citation?: string;
}

export function NotebookPage() {
  const [cells, setCells] = useState<NotebookCell[]>([
    {
      id: "c-1",
      type: "ai_explanation",
      content: "Under Finance Bill 2024, standard deduction under Section 16(ia) is increased to ₹75,000.",
      citation: "Finance Bill 2024 • Clause 4 • Page 14",
    },
    {
      id: "c-2",
      type: "calculator_trace",
      content: "Calculated Net Savings for ₹12,00,000 Taxable Income: +₹18,450",
      citation: "Section 115BAC Slabs Engine",
    },
  ]);
  const [newNote, setNewNote] = useState("");

  const addCell = () => {
    if (!newNote.trim()) return;
    setCells([
      ...cells,
      { id: `c-${Date.now()}`, type: "text", content: newNote, citation: "User Note" },
    ]);
    setNewNote("");
  };

  const removeCell = (id: string) => {
    setCells(cells.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-8 font-mono">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen size={24} className="text-brand-600" /> AI Statutory Research Notebook
          </h1>
          <p className="text-xs text-slate-500">Store Jupyter-style statutory research cells, highlighted PDF snippets, and calculation outputs.</p>
        </div>
        <Button size="sm" rightIcon={<Save size={16} />}>
          Export Notebook
        </Button>
      </div>

      {/* CELL LIST */}
      <div className="space-y-4">
        {cells.map((cell) => (
          <div key={cell.id} className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md uppercase">
                {cell.type.replace("_", " ")}
              </span>
              <button onClick={() => removeCell(cell.id)} className="text-slate-400 hover:text-rose-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-sans">{cell.content}</p>
            {cell.citation && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
                📌 {cell.citation}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ADD NEW CELL INPUT */}
      <div className="p-4 rounded-3xl bg-slate-900 text-white space-y-3 shadow-xl">
        <Input
          placeholder="Add research note or legal synthesis..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="bg-slate-950 text-white border-slate-800"
        />
        <Button size="sm" onClick={addCell} rightIcon={<Plus size={16} />}>
          Add Research Cell
        </Button>
      </div>
    </div>
  );
}

export default NotebookPage;
