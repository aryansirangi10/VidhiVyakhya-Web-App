import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ShieldCheck, FileText, Scale } from "lucide-react";
import Card from "../../../../components/ui/Card";
import Badge from "../../../../components/ui/Badge";

export function Transparency() {
  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="info">Zero Hallucinations</Badge>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl">
            Built for 100% Legal Transparency
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Generic LLMs guess financial numbers. VidhiVyakhya grounds every single estimate in raw Parliamentary PDF clauses with human verification.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* AI GUESS (BAD) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="bordered" className="p-8 border-rose-200 bg-rose-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-600 font-bold">
                  <XCircle size={22} />
                  <span>Generic AI Chatbot</span>
                </div>
                <span className="text-xs font-semibold uppercase text-rose-500 bg-rose-100 px-2.5 py-1 rounded-full">
                  Unverified
                </span>
              </div>

              <div className="mt-6 rounded-xl bg-white p-5 border border-rose-200 space-y-3 font-mono text-sm text-slate-700">
                <p className="text-slate-500 text-xs">Prompt: How much tax do I save under Finance Bill 2024?</p>
                <p className="text-rose-900 font-medium">
                  "You will probably save around ₹15,000 because tax slabs were changed."
                </p>
              </div>

              <div className="mt-6 space-y-2 text-xs text-rose-700">
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  No specific clause number cited
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Hallucinated slab boundaries
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  0% audit trail for tax professionals
                </p>
              </div>
            </Card>
          </motion.div>

          {/* GROUNDED CLAUSE (VIDHIVYAKHYA - GOOD) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="elevated" className="p-8 border-emerald-200 bg-emerald-50/20 ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 size={22} className="text-emerald-600" />
                  <span>VidhiVyakhya Engine</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="success">98% Human Reviewed</Badge>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase text-slate-400">Standard Deduction Impact</span>
                  <span className="text-emerald-400 font-mono font-bold">+ ₹13,420 Net Benefit</span>
                </div>
                <div className="rounded-lg bg-slate-800 p-3 border border-slate-700 text-xs font-mono">
                  <p className="text-brand-400 font-semibold flex items-center gap-1.5">
                    <FileText size={14} /> Clause 4, Sub-section (2)(b)
                  </p>
                  <p className="text-slate-300 mt-1">
                    "In Section 16 of the Income-tax Act, for clause (ia), the words 'seventy-five thousand rupees' shall be substituted..."
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-xs text-emerald-800">
                <p className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Ground-truth PDF bounding box coordinate highlighting
                </p>
                <p className="flex items-center gap-2">
                  <Scale size={16} className="text-emerald-600" />
                  Verified rule checksum validation & auditor log trace
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Transparency;
