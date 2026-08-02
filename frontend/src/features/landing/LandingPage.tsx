import React from "react";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/hero/Hero";
import FeaturedBills from "../../components/bills/FeaturedBills";
import { Transparency } from "./components/Transparency";
import { HowItWorks } from "./components/HowItWorks";
import { Statistics } from "./components/Statistics";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <section id="bills" className="py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6">
            <FeaturedBills />
          </div>
        </section>
        <Transparency />
        <HowItWorks />
        <Statistics />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
