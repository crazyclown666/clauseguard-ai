import React from 'react';
import { Shield, Sparkles, AlertCircle, DollarSign, Clock, Lock, Briefcase } from 'lucide-react';

export default function CategoryBreakdown({ breakdown }) {
  if (!breakdown) return null;

  const categories = [
    { key: 'liability', label: 'Liability & Indemnity', icon: Shield, score: breakdown.liability || 80 },
    { key: 'intellectualProperty', label: 'IP & Work for Hire', icon: Sparkles, score: breakdown.intellectualProperty || 85 },
    { key: 'paymentTerms', label: 'Payment Terms & Delays', icon: DollarSign, score: breakdown.paymentTerms || 90 },
    { key: 'termination', label: 'Termination & Auto-Renewal', icon: Clock, score: breakdown.termination || 75 },
    { key: 'confidentiality', label: 'Confidentiality & NDA', icon: Lock, score: breakdown.confidentiality || 90 },
    { key: 'nonCompete', label: 'Non-Compete Restrictions', icon: Briefcase, score: breakdown.nonCompete || 70 },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-emerald-500 text-emerald-400';
    if (score >= 60) return 'bg-amber-500 text-amber-400';
    return 'bg-rose-500 text-rose-400';
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 mb-8">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
        Domain Vulnerability Breakdown
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isDanger = cat.score < 60;
          const isWarning = cat.score >= 60 && cat.score < 80;

          return (
            <div
              key={cat.key}
              className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${isDanger ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span className="text-xs font-semibold text-slate-200">{cat.label}</span>
                </div>
                <span className="text-xs font-bold font-mono text-slate-300">
                  {cat.score}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    cat.score >= 80 ? 'bg-emerald-400' : cat.score >= 60 ? 'bg-amber-400' : 'bg-rose-500'
                  }`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
