import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage security, AES-256 profile encryption preferences, and notifications</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-slate-900 text-sm">Security &amp; Encryption</h3>
          <p className="text-xs text-slate-600">
            Your personal financial attributes (income, age, state, employment) are stored using AES-256-CBC encryption at rest.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
