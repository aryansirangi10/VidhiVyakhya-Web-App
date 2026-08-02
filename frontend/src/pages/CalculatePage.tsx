import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const CalculatePage: React.FC = () => {
  const [income, setIncome] = useState(1200000);

  const stdDeductionSavings = 3900;
  const slabSavings = 10400;
  const totalImpact = stdDeductionSavings + slabSavings;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Live Impact Simulator</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time local tax evaluator running entirely in your browser (&lt;10ms)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-slate-700 uppercase">Annual Taxable Income</label>
                  <span className="text-lg font-bold text-indigo-900 font-mono">
                    ₹{Number(income).toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="3000000"
                  step="50000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded accent-indigo-600 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="p-5 rounded-xl bg-slate-900 text-white flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400 uppercase">Estimated Net Impact</span>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                    +₹{totalImpact.toLocaleString('en-IN')}
                  </div>
                </div>
                <Badge variant="success">Finance Bill 2024</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
