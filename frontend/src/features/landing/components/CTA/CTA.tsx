import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../../../../shared/ui/Button";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-24 text-white">
      <div className="absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-800/80 px-4 py-1.5 text-xs font-semibold text-brand-200 border border-brand-700">
            <ShieldCheck size={16} />
            <span>100% Free & Transparent Legal Intelligence</span>
          </div>

          <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Understand Every Bill Before It Affects You.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
            Personalized legal financial impact analysis for Indian citizens, CA consultants, and legal professionals.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="xl"
              className="bg-white text-brand-900 hover:bg-slate-100 shadow-xl"
              rightIcon={<ArrowRight size={20} />}
              onClick={() => window.location.href = "#bills"}
            >
              Start Calculating Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
