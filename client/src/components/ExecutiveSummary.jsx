import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, DollarSign, Scale, ArrowRight } from 'lucide-react';

export default function ExecutiveSummary({ summary, onScrollToClauses }) {
  if (!summary) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-5">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
          <Scale className="w-4 h-4 text-brand-400" />
          <span>Executive Legal Verdict</span>
        </div>
        <p className="text-sm font-medium text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          {summary.verdict}
        </p>
      </div>

      {/* Top Red Flags */}
      {summary.topRedFlags && summary.topRedFlags.length > 0 && (
        <div>
          <div className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Critical Attention Items</span>
          </div>
          <div className="space-y-2">
            {summary.topRedFlags.map((flag, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/90 leading-snug"
              >
                <span className="font-bold text-rose-400">#{idx + 1}</span>
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exposure & Leverage Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Financial Exposure</div>
          <div className="text-sm font-bold text-amber-300 mt-0.5">
            {summary.financialExposure || 'Moderate'}
          </div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Negotiation Action</div>
          <div className="text-sm font-bold text-cyan-300 mt-0.5">
            {summary.negotiationLeverage || 'Review Revisions'}
          </div>
        </div>
      </div>

    </div>
  );
}
