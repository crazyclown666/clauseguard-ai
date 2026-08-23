import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Sparkles, MessageSquare, Copy, Check, ShieldAlert } from 'lucide-react';

export default function ClauseCard({ clause, onOpenCounterProposal }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return {
          label: 'High Risk / Severe Trap',
          bg: 'bg-rose-500/10',
          text: 'text-rose-400',
          border: 'border-rose-500/30',
          icon: ShieldAlert
        };
      case 'medium':
        return {
          label: 'Moderate Risk / Disadvantageous',
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          icon: AlertTriangle
        };
      case 'low':
        return {
          label: 'Minor Advisory',
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          border: 'border-blue-500/30',
          icon: AlertCircle
        };
      default:
        return {
          label: 'Standard / Safe',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          icon: CheckCircle2
        };
    }
  };

  const badge = getSeverityBadge(clause.severity);
  const BadgeIcon = badge.icon;

  const handleCopyOriginal = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(clause.originalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 transition-all hover:border-slate-700 overflow-hidden shadow-lg">
      
      {/* Clause Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-5 flex items-start sm:items-center justify-between cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 mr-2">
          {/* Badge */}
          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text} border ${badge.border} self-start`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{badge.label}</span>
          </span>

          {/* Title */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block sm:inline sm:mr-2">
              [{clause.category}]
            </span>
            <span className="font-bold text-sm text-slate-100">
              {clause.title}
            </span>
          </div>
        </div>

        {/* Expand / Collapse Icon */}
        <button className="text-slate-400 hover:text-slate-200 p-1">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expanded Content Body */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5 border-t border-slate-800/80 bg-slate-950/40">
          
          {/* Original Clause Text */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              <span>Original Contract Excerpt</span>
              <button
                onClick={handleCopyOriginal}
                className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 transition-colors lowercase"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'copied' : 'copy'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed italic">
              "{clause.originalText}"
            </div>
          </div>

          {/* Plain English Translation */}
          <div className="p-4 rounded-xl bg-brand-950/20 border border-brand-800/40 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-brand-300 uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-brand-400" />
              <span>What It Actually Means (Plain English)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {clause.plainEnglish}
            </p>
          </div>

          {/* Risk Analysis & Recommended Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-rose-300 uppercase tracking-wider mb-1">
                ⚠️ Legal Risk & Pitfall
              </div>
              <p className="text-slate-300 leading-relaxed">
                {clause.riskAnalysis}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-emerald-300 uppercase tracking-wider mb-1">
                💡 Recommended Action
              </div>
              <p className="text-slate-300 leading-relaxed">
                {clause.recommendedAction}
              </p>
            </div>
          </div>

          {/* Action: Open AI Counter-Clause Negotiator */}
          {clause.counterProposal && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onOpenCounterProposal(clause)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 shadow-md shadow-brand-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>View & Copy Negotiation Counter-Clause</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
