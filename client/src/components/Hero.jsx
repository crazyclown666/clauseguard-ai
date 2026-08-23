import React from 'react';
import { ShieldCheck, Zap, Lock, FileSearch, Sparkles, AlertTriangle } from 'lucide-react';

export default function Hero({ onTrySample }) {
  return (
    <div className="relative pt-8 pb-6 text-center max-w-4xl mx-auto px-4">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-brand-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Banner Tag */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-5 animate-pulse-slow">
        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
        <span>Next-Gen Legal Risk Intelligence Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
        Never Sign A Bad <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-cyan-400 via-brand-400 to-blue-500 bg-clip-text text-transparent">
          Contract Again.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
        Upload any NDA, freelance agreement, lease, or vendor contract. Instantly detect <strong className="text-rose-300 font-semibold">uncapped liabilities</strong>, <strong className="text-amber-300 font-semibold">IP traps</strong>, and <strong className="text-brand-300 font-semibold">hidden penalties</strong>—with plain-English translations and negotiation counter-clauses.
      </p>

      {/* Key Feature Highlights */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400 mb-4">
        <div className="flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>0–100 Risk Score</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
          <FileSearch className="w-4 h-4 text-cyan-400" />
          <span>Plain-English Breakdown</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Instant Counter-Proposals</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
          <Lock className="w-4 h-4 text-purple-400" />
          <span>Confidential & Safe</span>
        </div>
      </div>
    </div>
  );
}
