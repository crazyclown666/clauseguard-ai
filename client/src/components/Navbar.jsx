import React from 'react';
import { ShieldAlert, Sparkles, CreditCard, Award, ArrowUpRight, Zap } from 'lucide-react';

export default function Navbar({ credits, isPro, onOpenPricing, onReset, hasResults }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-dark-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={onReset}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-0.5 shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white tracking-tight">ClauseGuard</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                AI
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">Contract & Risk Intelligence</span>
          </div>
        </div>

        {/* Right Nav / Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Credit Status Badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            {isPro ? (
              <>
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium text-amber-300">Pro Lifetime / Active</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-brand-400" />
                <span>
                  <strong className="text-white">{credits}</strong> Free Scan{credits === 1 ? '' : 's'}
                </span>
              </>
            )}
          </div>

          {/* Pricing Button */}
          <button
            onClick={onOpenPricing}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
            <span>Pricing</span>
          </button>

          {/* Upgrade CTA */}
          {!isPro && (
            <button
              onClick={onOpenPricing}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 hover:to-blue-500 shadow-md shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Unlimited Pro</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
