import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import FeaturedBills from "../components/bills/FeaturedBills";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <section id="bills" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <FeaturedBills />
        </div>
      </section>
      <section id="features" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
          >
            <span className="font-semibold uppercase text-brand-600">
              Why VidhiVyakhya
            </span>
            <h2 className="mt-3 text-4xl font-bold">
              Built for Transparency
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Every financial estimate is backed by clause-level
              citations instead of black-box AI.
            </p>
          </motion.div>
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-20 text-center">
            <h3 className="text-xl font-semibold">
              Features Component
            </h3>
            <p className="mt-2 text-slate-500">
              (Module 3.3)
            </p>
          </div>
        </div>
      </section>
      <section className="bg-brand-900 py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-5xl font-bold text-white">
            Understand Every Bill Before It Affects You.
          </h2>
          <p className="mt-6 text-lg text-indigo-200">
            Personalized legal intelligence for citizens, professionals, and businesses.
          </p>
          <button className="mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-brand-700 transition hover:scale-105">
            Start Free
          </button>
        </div>
      </section>
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <div>
            <h3 className="font-bold">VidhiVyakhya</h3>
            <p className="text-sm text-slate-500">Law, Decoded Personally.</p>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
