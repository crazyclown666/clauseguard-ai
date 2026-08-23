import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Mail, ShieldCheck, Scale, Send } from 'lucide-react';

export default function CounterClauseModal({ clause, onClose }) {
  const [stance, setStance] = useState('balanced');
  const [copiedType, setCopiedType] = useState(null);

  if (!clause) return null;

  // Generate dynamic wording based on selected stance
  const getProposalByStance = () => {
    const base = clause.counterProposal || '';
    if (stance === 'assertive') {
      return base.replace(/mutual/gi, 'strictly mutual').replace(/reasonable/gi, 'customary');
    }
    if (stance === 'soft') {
      return `For clarity and standard mutual alignment: ${base}`;
    }
    return base;
  };

  const proposalText = getProposalByStance();

  // Email format template ready to send to client or employer
  const emailTemplate = `Hi Team,

Thanks for sharing the agreement. I've reviewed the terms and everything looks great overall.

I have one minor adjustment regarding Section "${clause.title}" to ensure we are aligned with standard industry practices:

Proposed Updated Wording:
"${proposalText}"

Rationale:
${clause.plainEnglish}

Please let me know if this works for you so we can finalize and proceed!

Best regards,`;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2.5 text-brand-400 mb-1">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-bold">AI Counter-Clause Negotiator</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          {clause.title}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Use this legally sound replacement language to protect your liability without jeopardizing the deal.
        </p>

        {/* Stance Selector */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Select Negotiation Stance:
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => setStance('balanced')}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                stance === 'balanced'
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/40'
              }`}
            >
              ⚖️ Balanced & Fair (Recommended)
            </button>
            <button
              onClick={() => setStance('assertive')}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                stance === 'assertive'
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/40'
              }`}
            >
              🛡️ Maximum Protection
            </button>
            <button
              onClick={() => setStance('soft')}
              className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                stance === 'soft'
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/40'
              }`}
            >
              🤝 Soft / Polite Alignment
            </button>
          </div>
        </div>

        {/* Generated Counter-Clause Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span>Proposed Redline Language:</span>
            <button
              onClick={() => handleCopy(proposalText, 'clause')}
              className="flex items-center space-x-1.5 text-xs text-brand-400 hover:text-brand-300 font-bold"
            >
              {copiedType === 'clause' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Clause!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Clause Only</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-brand-500/30 text-xs sm:text-sm font-mono text-emerald-300 leading-relaxed">
            "{proposalText}"
          </div>
        </div>

        {/* Ready-to-Send Email Template */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full Email Reply Template (Ready to Send)</span>
            </span>
            <button
              onClick={() => handleCopy(emailTemplate, 'email')}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-bold"
            >
              {copiedType === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Email!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Email</span>
                </>
              )}
            </button>
          </div>
          <textarea
            readOnly
            rows={7}
            value={emailTemplate}
            className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed focus:outline-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
          <button
            onClick={() => handleCopy(proposalText, 'clause')}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-400 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Counter-Clause</span>
          </button>
        </div>

      </div>
    </div>
  );
}
