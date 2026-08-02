import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck } from 'lucide-react';

export const AdminPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reviewer &amp; Auditor Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Audit extracted rules and verify clause citations</p>
        </div>
        <Badge variant="success" className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Auditor Role Verified
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-slate-900 text-sm">Extracted Rule Review Queue</h3>
          <p className="text-xs text-slate-600">
            Rules extracted from PDF Gazettes are presented here for human-in-the-loop verification before publication.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
