import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, FileText, Info } from 'lucide-react';

export default function RiskGauge({ score, riskLevel, documentType, wordCount, clausesCount, highRiskCount }) {
  // Determine color scheme based on score
  const getScoreTheme = (val) => {
    if (val >= 80) return { color: 'text-emerald-400', stroke: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', label: 'Safe / Favorable', glow: 'glow-success' };
    if (val >= 65) return { color: 'text-amber-400', stroke: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'Moderate Risk', glow: '' };
    if (val >= 45) return { color: 'text-orange-400', stroke: '#f97316', bg: 'bg-orange-500/10', border: 'border-orange-500/30', label: 'High Risk', glow: '' };
    return { color: 'text-rose-400', stroke: '#f43f5e', bg: 'bg-rose-500/10', border: 'border-rose-500/30', label: 'Severe Risk', glow: 'glow-danger' };
  };

  const theme = getScoreTheme(score);
  
  // Circumference for 120px radius circle
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between ${theme.glow}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Safety & Risk Score</span>
          <h3 className="text-sm font-semibold text-slate-200 mt-0.5">{documentType || 'Contract Document'}</h3>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${theme.bg} ${theme.color} border ${theme.border}`}>
          {riskLevel || theme.label}
        </span>
      </div>

      {/* SVG Circular Gauge */}
      <div className="flex items-center justify-center my-3 relative">
        <svg className="w-36 h-36 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-800/80"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke={theme.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            fill="transparent"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-extrabold tracking-tight ${theme.color}`}>
            {score}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            out of 100
          </span>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center text-xs">
        <div className="bg-slate-800/40 p-2 rounded-lg">
          <div className="text-slate-400 text-[10px]">Clauses</div>
          <div className="font-bold text-slate-200 mt-0.5">{clausesCount}</div>
        </div>
        <div className="bg-slate-800/40 p-2 rounded-lg">
          <div className="text-slate-400 text-[10px]">Red Flags</div>
          <div className={`font-bold mt-0.5 ${highRiskCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {highRiskCount}
          </div>
        </div>
        <div className="bg-slate-800/40 p-2 rounded-lg">
          <div className="text-slate-400 text-[10px]">Words</div>
          <div className="font-bold text-slate-200 mt-0.5">{wordCount || 450}</div>
        </div>
      </div>

    </div>
  );
}
