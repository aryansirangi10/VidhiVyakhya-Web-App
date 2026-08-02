import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Calculation History</h1>
        <p className="text-xs text-slate-500 mt-1">Audit log of your past tax impact simulations</p>
      </div>

      <Card>
        <CardContent className="p-0 divide-y divide-slate-100">
          <div className="p-4 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-900 block">Finance Bill 2024</span>
              <span className="text-slate-500">Income ₹12L • Salaried • New Regime</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-600 font-mono text-sm block">+₹14,300</span>
              <span className="text-slate-400">Aug 2, 2026</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
