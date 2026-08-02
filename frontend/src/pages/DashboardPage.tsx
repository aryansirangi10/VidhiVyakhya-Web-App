import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { TrendingUp, History, User } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Overview of your saved financial profiles &amp; bill impact history</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Estimated Net Savings</span>
              <div className="text-xl font-bold text-emerald-600 font-mono">+₹14,300</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Active Profiles</span>
              <div className="text-xl font-bold text-slate-900 font-mono">3 Saved</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Calculations Logged</span>
              <div className="text-xl font-bold text-slate-900 font-mono">12 Total</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
