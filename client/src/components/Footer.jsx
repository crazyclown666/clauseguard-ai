import React from 'react';
import { Shield, Sparkles, Heart, Scale } from 'lucide-react';

export default function Footer({ onOpenPricing }) {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-dark-900/90 py-10 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white">ClauseGuard AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering freelancers, creators, startups, and tenants to audit contracts in seconds, neutralize predatory terms, and negotiate with institutional confidence.
            </p>
          </div>

          {/* Col 2: Features */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Features</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>0–100 Contract Risk Score</li>
              <li>Plain-English Translation</li>
              <li>AI Counter-Clause Negotiator</li>
              <li>PDF & DOCX Multi-Format Parsing</li>
              <li>Downloadable Audit Reports</li>
            </ul>
          </div>

          {/* Col 3: Legal & Disclaimer */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Compliance</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>Privacy-First Architecture</li>
              <li>No Permanent Document Storage</li>
              <li>Bank-Grade 256-Bit SSL</li>
              <li>
                <button onClick={onOpenPricing} className="text-brand-400 hover:underline">
                  View Pricing Plans
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-6 text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400">⚠️ Legal Disclaimer:</strong> ClauseGuard AI is an automated software analysis and risk assessment tool designed for educational and informational review. ClauseGuard AI does not provide formal legal advice, representation, or attorney-client privileged counsel. For binding legal disputes or high-stakes transactions, always consult a licensed attorney in your jurisdiction.
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} ClauseGuard AI Inc. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with precision for autonomous digital enterprise & passive income.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
