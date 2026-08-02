import React from "react";
import { motion } from "framer-motion";
import { FileUp, Cpu, UserCheck, Calculator, ShieldAlert, Sparkles } from "lucide-react";
import Badge from "../../../../components/ui/Badge";

const steps = [
  {
    number: "01",
    title: "Upload & Parse Bill",
    description: "Gazette & Parliamentary PDFs are ingested and converted to high-density text structures.",
    icon: <FileUp className="text-brand-600" size={24} />,
  },
  {
    number: "02",
    title: "Extract Statutory Rules",
    description: "Structured rules, slab rates, deductions, and exemptions are auto-classified.",
    icon: <Cpu className="text-brand-600" size={24} />,
  },
  {
    number: "03",
    title: "Match Citizen Profile",
    description: "Your encrypted financial profile (income, investments, regime) is safely evaluated.",
    icon: <UserCheck className="text-brand-600" size={24} />,
  },
  {
    number: "04",
    title: "Calculate Personal Impact",
    description: "Real-time rupee delta calculation with side-by-side regime comparison.",
    icon: <Calculator className="text-brand-600" size={24} />,
  },
  {
    number: "05",
    title: "Ground & Audit Citation",
    description: "Every rupee change points to the exact PDF page, section, and clause bounding box.",
    icon: <ShieldAlert className="text-brand-600" size={24} />,
  },
  {
    number: "06",
    title: "Plain-English Insights",
    description: "Jargon-free summaries explain what changed and what actions you should take.",
    icon: <Sparkles className="text-brand-600" size={24} />,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="info">End-to-End Pipeline</Badge>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl">
            How VidhiVyakhya Works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A 6-stage deterministic rule processing architecture that translates complex gazette legalese into personal actionable intelligence.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-white p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 border border-brand-100 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-slate-300 group-hover:text-brand-600 transition-colors font-mono">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
