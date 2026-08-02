import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Calculator } from 'lucide-react';

export const BillDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Link to="/bills">
        <Button variant="ghost" size="sm" className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Library
        </Button>
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="info">Income Tax</Badge>
          <span className="text-xs text-slate-500">Bill #{id || '1'}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Finance Bill 2024</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Revises tax slabs and increases standard deduction to ₹75,000 for salaried employees under the new tax regime.
        </p>

        <div className="flex gap-4 pt-4 border-t border-slate-100">
          <Link to="/calculate">
            <Button>
              <Calculator className="w-4 h-4 mr-1" />
              Calculate My Personal Impact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
