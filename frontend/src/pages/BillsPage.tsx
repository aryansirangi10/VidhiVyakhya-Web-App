import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Clock, Building2 } from 'lucide-react';

export const BillsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bills = [
    {
      id: 1,
      title: 'Finance Bill 2024',
      summary: 'Revises tax slabs and increases standard deduction to ₹75,000 for salaried employees under the new tax regime.',
      category: 'Income Tax',
      ministry: 'Ministry of Finance',
      reading_time: 4,
      pages: 412,
      status: 'Implemented',
    },
    {
      id: 2,
      title: 'DPDP Act 2023 (Data Protection)',
      summary: 'Sets personal data protection obligations and mandates penalties up to ₹250 Cr for compliance failures.',
      category: 'Data Privacy',
      ministry: 'Ministry of Electronics & IT',
      reading_time: 6,
      pages: 48,
      status: 'Implemented',
    },
    {
      id: 3,
      title: 'Budget 2024 (Capital Gains Amendment)',
      summary: 'Increases Equity Long-Term Capital Gains (LTCG) tax rate to 12.5% and expands exemption limit to ₹1.25 Lakhs.',
      category: 'Capital Gains',
      ministry: 'Ministry of Finance',
      reading_time: 3,
      pages: 64,
      status: 'Implemented',
    },
  ];

  const filteredBills = bills.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Parliamentary Bills Library</h1>
          <p className="text-xs text-slate-500 mt-1">Select any bill to run personal financial simulations</p>
        </div>
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search bills or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBills.map((bill) => (
          <Card key={bill.id} hoverable className="flex flex-col justify-between">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Badge variant="info">{bill.category}</Badge>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {bill.reading_time} min read
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-base leading-snug">{bill.title}</h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{bill.summary}</p>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1 pt-2 border-t border-slate-100">
                <Building2 className="w-3.5 h-3.5" />
                {bill.ministry}
              </div>
            </CardContent>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700">✓ {bill.status}</span>
              <Link to={`/bills/${bill.id}`}>
                <Button size="sm" variant="ghost" className="text-indigo-600 hover:text-indigo-800">
                  Details &amp; Impact
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
