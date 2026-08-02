import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Badge from "../../../../components/ui/Badge";

const faqData = [
  {
    question: "Is VidhiVyakhya providing formal legal advice?",
    answer: "No. VidhiVyakhya provides automated statutory financial impact analysis based on officially published gazette bills. It serves as an intelligence tool for citizens, tax consultants, and financial professionals, but does not replace licensed legal counsel."
  },
  {
    question: "How accurate are the financial calculations?",
    answer: "Our rule extraction engine achieves over 97.8% citation accuracy. Every calculated rupee delta includes direct links to the relevant bill clause, section, and human-verified auditor review logs."
  },
  {
    question: "What financial data is stored, and is it private?",
    answer: "Your salary and financial profile inputs are protected with AES-256-CBC encryption at rest. We never sell, share, or monetize user data."
  },
  {
    question: "Can I compare multiple bills or tax regimes side-by-side?",
    answer: "Yes! VidhiVyakhya's Impact Simulator allows you to benchmark your outcome across Old vs. New Tax Regimes as well as compare historical Budget Amendments (2023 vs 2024)."
  },
  {
    question: "How quickly are newly introduced bills added to the platform?",
    answer: "Parliamentary bills are parsed and indexed within hours of being introduced in the Lok Sabha or Rajya Sabha."
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Badge variant="info">Frequently Asked Questions</Badge>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl">
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Answers to common questions about legal citations, data privacy, and accuracy guarantees.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-slate-900 text-lg hover:bg-slate-50/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-600" : ""
                    }`}
                    size={20}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
