import React, { useState } from "react";
import { BookOpen, X, Sparkles, ExternalLink } from "lucide-react";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { useGlossary } from "../../hooks/useGlossary";
import { GlossaryTerm } from "../../types/glossary";

export function GlossaryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const { data: terms = [] } = useGlossary();

  return (
    <>
      <Button
        size="xs"
        variant="outline"
        leftIcon={<BookOpen size={14} />}
        onClick={() => setIsOpen(true)}
      >
        Legal Glossary
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Statutory Legal Glossary"
      >
        <div className="space-y-6">
          <p className="text-xs text-slate-500">
            Plain-language statutory definitions for terms found in Indian Parliamentary Bills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-auto">
            {terms.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTerm(t)}
                className={`p-4 text-left rounded-2xl border transition-all space-y-2 ${
                  selectedTerm?.id === t.id
                    ? "border-brand-600 bg-brand-50/20 ring-2 ring-brand-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{t.term}</span>
                  <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                    {t.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{t.definition}</p>
              </button>
            ))}
          </div>

          {selectedTerm && (
            <div className="rounded-2xl bg-slate-900 p-5 text-white space-y-3 font-mono text-xs border border-slate-800">
              <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                <Sparkles size={16} />
                <span>{selectedTerm.term}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">{selectedTerm.definition}</p>
              <div className="rounded-xl bg-slate-800 p-3 text-emerald-400 font-mono text-[11px] border border-slate-700">
                Example: {selectedTerm.example}
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span>Related Clauses:</span>
                {selectedTerm.relatedClauses.map((c, idx) => (
                  <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded text-white font-bold">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default GlossaryDrawer;
