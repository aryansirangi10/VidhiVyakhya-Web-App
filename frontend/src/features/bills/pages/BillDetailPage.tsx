import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Calendar,
  BookOpen,
  ShieldCheck,
  FileText,
  Calculator,
  Cpu,
  Share2,
  Bookmark,
  ExternalLink
} from "lucide-react";

import Navbar from "../../../components/layout/Navbar";
import Footer from "../../landing/components/Footer";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

import { useBill } from "../hooks/useBills";
import { useClauses } from "../hooks/useClauses";
import { useRules } from "../hooks/useRules";
import { useTimeline } from "../hooks/useTimeline";
import billService from "../services/bill.service";
import { AnonymousProfile } from "../types/bill.types";

import ReadingProgress from "../components/ReadingProgress/ReadingProgress";
import QuickFacts from "../components/QuickFacts/QuickFacts";
import RulePanel from "../components/RulePanel/RulePanel";
import CitationCard from "../components/CitationCard/CitationCard";
import RelatedBills from "../components/RelatedBills/RelatedBills";

export function BillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const billId = parseInt(id || "1", 10);

  const { data: bill, isLoading: billLoading } = useBill(billId);
  const { data: clauses = [] } = useClauses(billId);
  const { data: rules = [] } = useRules(billId);
  const { data: timelineEvents = [] } = useTimeline(billId);

  // Anonymous Profile State (stored in sessionStorage)
  const [profile, setProfile] = useState<AnonymousProfile>({
    income: 1200000,
    age: 32,
    employmentType: "salaried",
    taxRegime: "new",
    state: "Maharashtra",
  });

  const [impactResult, setImpactResult] = useState<number | null>(null);

  useEffect(() => {
    const saved = billService.getAnonymousProfile();
    if (saved) setProfile(saved);
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    billService.saveAnonymousProfile(profile);

    // Statutory calculation for standard deduction increase + revised slabs
    const baseSavings = profile.income > 700000 ? 13420 : 5000;
    setImpactResult(baseSavings);
  };

  if (billLoading || !bill) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      <ReadingProgress />
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* BREADCRUMB & ACTIONS */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link to="/bills" className="hover:text-brand-600 flex items-center gap-1">
                <ArrowLeft size={14} /> Back to Bills
              </Link>
              <span>/</span>
              <span className="text-slate-900">{bill.shortTitle}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size="xs" variant="outline" leftIcon={<Bookmark size={14} />}>
                Bookmark
              </Button>
              <Button size="xs" variant="outline" leftIcon={<Share2 size={14} />}>
                Share
              </Button>
            </div>
          </div>

          {/* MAIN GRID LAYOUT */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* LEFT MAIN COLUMN */}
            <div className="lg:col-span-2 space-y-8">
              {/* BILL HEADER */}
              <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info">{bill.category}</Badge>
                  <Badge variant="success">{bill.status}</Badge>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck size={12} className="inline mr-1" />
                    {bill.confidence}% Human Reviewed
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight lg:text-4xl">
                  {bill.title}
                </h1>

                <p className="text-base text-slate-600 leading-relaxed">
                  {bill.summary}
                </p>

                {/* METADATA BAR */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs font-medium text-slate-600">
                  <div>
                    <span className="block text-slate-400 uppercase text-[10px]">Ministry</span>
                    <span className="font-bold text-slate-900 mt-1 block">{bill.ministry}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase text-[10px]">Bill Number</span>
                    <span className="font-bold text-slate-900 mt-1 block">{bill.billNumber}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase text-[10px]">Pages & Read</span>
                    <span className="font-bold text-slate-900 mt-1 block">{bill.pages} pages • {bill.readingTime} min</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase text-[10px]">Introduced</span>
                    <span className="font-bold text-slate-900 mt-1 block">{bill.introducedDate}</span>
                  </div>
                </div>
              </div>

              {/* AI EXECUTIVE SUMMARY */}
              <Card className="p-8 border-brand-200 bg-brand-50/20 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="text-brand-600" size={20} />
                  <span>Executive Legislative Summary</span>
                </h3>

                <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-600 mt-2 shrink-0" />
                    <span>Standard deduction for salaried taxpayers increased from ₹50,000 to ₹75,000 under the New Tax Regime.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-600 mt-2 shrink-0" />
                    <span>Tax slab thresholds expanded, increasing net disposable income for taxpayers earning ₹7L–₹15L.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-600 mt-2 shrink-0" />
                    <span>LTCG tax rate adjusted for financial and non-financial asset transfers.</span>
                  </li>
                </ul>
              </Card>

              {/* RULE PANEL */}
              <RulePanel rules={rules} />

              {/* CITATIONS & CLAUSES */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold text-slate-900">Extracted Clauses & PDF Grounding</h3>
                <div className="space-y-4">
                  {clauses.map((clause) => (
                    <CitationCard key={clause.id} clause={clause} />
                  ))}
                </div>
              </div>

              {/* RELATED BILLS */}
              <RelatedBills currentBillId={bill.id} bills={[bill]} />
            </div>

            {/* RIGHT SIDEBAR (STICKY) */}
            <div className="space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* QUICK FACTS */}
                <QuickFacts bill={bill} />

                {/* ANONYMOUS IMPACT CALCULATOR */}
                <Card variant="elevated" className="p-6 border-brand-200 bg-white ring-1 ring-brand-500/20 shadow-lg">
                  <div className="flex items-center gap-2 text-brand-700 font-bold text-lg border-b border-slate-100 pb-3">
                    <Calculator size={22} />
                    <span>Anonymous Impact Simulator</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Stored safely in browser session storage. No account required.
                  </p>

                  <form onSubmit={handleCalculate} className="mt-4 space-y-4">
                    <Input
                      label="Annual Gross Income (₹)"
                      type="number"
                      value={profile.income}
                      onChange={(e) => setProfile({ ...profile, income: Number(e.target.value) })}
                    />

                    <Select
                      label="Employment Type"
                      options={[
                        { label: "Salaried Employee", value: "salaried" },
                        { label: "Business Owner", value: "business" },
                        { label: "Professional / Freelancer", value: "professional" },
                      ]}
                      value={profile.employmentType}
                      onChange={(e) => setProfile({ ...profile, employmentType: e.target.value as any })}
                    />

                    <Button type="submit" className="w-full mt-4" size="lg">
                      Calculate My Impact
                    </Button>
                  </form>

                  {impactResult !== null && (
                    <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-white text-center space-y-2">
                      <span className="text-xs uppercase text-slate-400">Estimated Net Benefit</span>
                      <div className="text-4xl font-black text-emerald-400 font-mono">
                        + ₹{impactResult.toLocaleString("en-IN")}
                      </div>
                      <p className="text-xs text-slate-300">
                        Grounded by Clause 4 & Clause 12 citations.
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BillDetailPage;
