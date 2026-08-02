import React from "react";
import { Scale, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* BRAND */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md">
                <Scale size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                VidhiVyakhya
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Law, Decoded Personally. Indian legal intelligence platform delivering clause-grounded financial impact analysis.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://github.com/aryansirangi10/VidhiVyakhya-Web-App.git" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#bills" className="hover:text-brand-600 transition-colors">Bills Explorer</a></li>
              <li><a href="#calculator" className="hover:text-brand-600 transition-colors">Impact Simulator</a></li>
              <li><a href="#features" className="hover:text-brand-600 transition-colors">Rule Citation Engine</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-600 transition-colors">PDF Bounding Box</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/docs" className="hover:text-brand-600 transition-colors">Documentation</a></li>
              <li><a href="#faq" className="hover:text-brand-600 transition-colors">FAQ</a></li>
              <li><a href="/api/docs" className="hover:text-brand-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Auditor Portal</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Security & Encryption</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} VidhiVyakhya. All rights reserved.</p>
          <p>Built with React 19, FastAPI, & PostgreSQL.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
