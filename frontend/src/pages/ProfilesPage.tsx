import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus } from 'lucide-react';

export const ProfilesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Saved Financial Profiles</h1>
          <p className="text-xs text-slate-500 mt-1">Manage profiles for family members and business entities</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <span className="font-semibold text-slate-900 text-sm">Self Salaried</span>
              </div>
              <Badge variant="success">Default</Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
              <p>Income: <span className="font-mono font-medium">₹12,00,000</span></p>
              <p>Regime: <span className="font-medium">New Tax Regime</span></p>
              <p>Employment: <span className="font-medium">Salaried</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
