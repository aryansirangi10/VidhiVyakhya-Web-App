import React from "react";
import Statistics from "../features/landing/components/Statistics/Statistics";
import TrustedBy from "../features/landing/components/TrustedBy/TrustedBy";
import InteractiveDemo from "../features/landing/components/InteractiveDemo/InteractiveDemo";
import Comparison from "../features/landing/components/Comparison/Comparison";
import FAQ from "../features/landing/components/FAQ/FAQ";
import CTA from "../features/landing/components/CTA/CTA";
import Footer from "../features/landing/components/Footer/Footer";
import Button from "../components/ui/Button";
import { ArrowRight, Scale, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: HEADLINE */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/80 border border-brand-700/50 text-brand-300 text-xs font-mono">
              <Sparkles size={14} className="text-brand-400" />
              <span>VidhiVyakhya 2.0 Statutory Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Understand Indian Laws <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-emerald-400">
                Before They Affect Your Wallet.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal leading-relaxed font-mono">
              Upload any parliamentary bill, budget amendment, gazette notification, or tax circular. View exact rupee impacts grounded in official clause citations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" onClick={() => navigate("/bills")} rightIcon={<ArrowRight size={18} />}>
                Explore Parliamentary Bills
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/calculator")}>
                Calculate Personal Impact
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> 100% Grounded</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-400" /> Zero Hallucinations</span>
              <span className="flex items-center gap-1.5"><Scale size={16} className="text-brand-400" /> Official Gazettes</span>
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT DEMO PREVIEW CARD */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl space-y-4 font-mono relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-slate-500">Live Simulation</span>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">Parliamentary Document</span>
                <h3 className="text-base font-bold text-white">Finance Bill 2024 (Bill No. 112)</h3>
                
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold">Estimated Net Tax Impact</span>
                  <p className="text-2xl font-extrabold text-emerald-400">+₹18,450 / year</p>
                  <p className="text-[10px] text-emerald-300/80">Standard Deduction Increased to ₹75,000</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
                  <span className="text-[10px] text-brand-300 font-bold">Official Statutory Citation</span>
                  <p className="text-slate-400">Finance Bill 2024 • Clause 4 • Section 16(ia) (Page 14, Para 1)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED SOURCES */}
      <TrustedBy />

      {/* LIVE STATISTICS */}
      <Statistics />

      {/* INTERACTIVE DEMO */}
      <InteractiveDemo />

      {/* COMPARISON MATRIX */}
      <Comparison />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FAQ />

      {/* CALL TO ACTION */}
      <CTA />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default LandingPage;
