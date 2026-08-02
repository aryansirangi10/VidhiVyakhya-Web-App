import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StatProps {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

function Counter({ value, suffix = "", decimals = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500; // ms
    const frameTime = 1000 / 60;
    const totalFrames = Math.round(duration / frameTime);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = value * (1 - Math.pow(1 - progress, 2));
      setCount(current);

      if (frame >= totalFrames) {
        setCount(value);
        clearInterval(timer);
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono tracking-tight">
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const statsData = [
  { id: "bills", label: "Bills Indexed", value: 1248 },
  { id: "clauses", label: "Clauses Parsed", value: 98400 },
  { id: "rules", label: "Rules Extracted", value: 5600 },
  { id: "confidence", label: "Average Confidence", value: 97.8, suffix: "%", decimals: 1 },
];

export function Statistics() {
  return (
    <section className="bg-slate-900 py-20 text-white border-y border-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-slate-800/40 border border-slate-800/80 backdrop-blur-sm"
            >
              <h3 className="text-4xl font-black text-white md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} label={stat.label} />
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
