import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Scale,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-32 pb-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-50" />
        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-100 blur-3xl opacity-50" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <div>
            <Badge variant="info">
              🇮🇳 Trusted Indian Legal Intelligence
            </Badge>
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900 lg:text-6xl">
            Understand
            <span className="text-brand-700">
              {" "}Parliament Bills{" "}
            </span>
            Like a Financial Expert.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Upload or choose an Indian Parliamentary Bill.
            Enter your financial profile.
            Instantly discover your
            <span className="font-semibold text-brand-700">
              {" "}exact financial impact
            </span>
            with clause-level legal citations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              rightIcon={<ArrowRight size={18} />}
            >
              Calculate My Impact
            </Button>

            <Button
              size="lg"
              variant="outline"
            >
              Browse Bills
            </Button>
          </div>

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-brand-700">
                150+
              </h2>
              <p className="text-sm text-slate-500">
                Bills Indexed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-brand-700">
                2K+
              </h2>
              <p className="text-sm text-slate-500">
                Rules Extracted
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-brand-700">
                99%
              </h2>
              <p className="text-sm text-slate-500">
                Citation Accuracy
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Card className="overflow-hidden p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Finance Bill 2024
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  Personal Impact
                </h2>
              </div>
              <Scale className="text-brand-700" />
            </div>

            <div className="mt-8 rounded-2xl bg-slate-900 p-8 text-white">
              <p className="text-xs uppercase text-slate-400">
                Estimated Savings
              </p>
              <div className="mt-2 flex items-center gap-2">
                <IndianRupee />
                <span className="text-5xl font-black text-emerald-400">
                  13,000
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Based on your salary profile under the revised
                New Tax Regime.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-slate-50 p-4">
                <FileText className="text-brand-700" />
                <div>
                  <p className="font-semibold">
                    Clause 4
                  </p>
                  <p className="text-sm text-slate-500">
                    Standard Deduction increased
                    ₹50,000 → ₹75,000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-slate-50 p-4">
                <ShieldCheck className="text-emerald-600" />
                <div>
                  <p className="font-semibold">
                    Confidence
                  </p>
                  <p className="text-sm text-slate-500">
                    98% Human Reviewed
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
