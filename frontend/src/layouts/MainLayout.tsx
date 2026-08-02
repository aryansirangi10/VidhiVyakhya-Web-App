import React from 'react';
import { Navbar } from '@/components/ui/Navbar';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        VidhiVyakhya (विधिव्याख्या) — Law, Decoded Personally • Personal Financial Impact Calculator
      </footer>
    </div>
  );
};
