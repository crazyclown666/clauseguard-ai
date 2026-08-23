import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, Shield, CreditCard, ArrowRight, Lock } from 'lucide-react';
import { createCheckout } from '../services/api';

export default function PricingModal({ onClose, onUnlockSuccess }) {
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleCheckout = async (planId) => {
    try {
      setLoadingPlan(planId);
      const res = await createCheckout(planId);
      
      if (res && res.url) {
        // Redirect directly to Stripe Checkout
        window.location.href = res.url;
      }
    } catch (err) {
      console.error('Checkout redirect error:', err);
      alert('Could not initialize Stripe checkout. Please try again in a few moments.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 relative max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-Bit Encrypted Checkout</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Unlock Full Contract Protection
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            One bad contract can cost thousands in legal fees or liabilities. Protect your business for less than the cost of lunch.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
          {/* Card 1: Single Scan Pass */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Single Audit Pass
              </div>
              <div className="flex items-baseline space-x-1 mb-4">
                <span className="text-3xl font-extrabold text-white">$4.99</span>
                <span className="text-xs text-slate-400">/ one-time</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Perfect for auditing a single critical agreement or lease right now.
              </p>
              
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>1 In-Depth Contract Risk Audit</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Plain-English Translation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>AI Counter-Clause Generator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>PDF Audit Report Export</span>
                </li>
              </ul>
            </div>

            <button
              disabled={loadingPlan === 'single-scan'}
              onClick={() => handleCheckout('single-scan')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center space-x-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{loadingPlan === 'single-scan' ? 'Redirecting to Stripe...' : 'Pay $4.99 (Stripe Checkout)'}</span>
            </button>
          </div>

          {/* Card 2: Monthly Pro (Popular) */}
          <div className="glass-card rounded-2xl p-6 border-2 border-brand-500/50 bg-brand-950/20 relative flex flex-col justify-between shadow-xl shadow-brand-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-brand-500 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
              Most Popular
            </div>

            <div>
              <div className="text-xs uppercase font-bold text-brand-300 tracking-wider mb-2">
                Unlimited Pro (Monthly)
              </div>
              <div className="flex items-baseline space-x-1 mb-4">
                <span className="text-3xl font-extrabold text-white">$19</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                For active freelancers, founders, and creators signing regular contracts.
              </p>
              
              <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
                <li className="flex items-center space-x-2 font-medium">
                  <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> Contract Audits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span>PDF, DOCX & Plain Text Uploads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span>All Negotiation Stances & Email Templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span>Downloadable PDF Executive Reports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span>Priority Processing Speed</span>
                </li>
              </ul>
            </div>

            <button
              disabled={loadingPlan === 'monthly-pro'}
              onClick={() => handleCheckout('monthly-pro')}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 hover:to-blue-500 shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{loadingPlan === 'monthly-pro' ? 'Redirecting to Stripe...' : 'Subscribe $19/mo (Stripe)'}</span>
            </button>
          </div>

          {/* Card 3: Annual Pro */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Annual Pro (Save 40%)
              </div>
              <div className="flex items-baseline space-x-1 mb-4">
                <span className="text-3xl font-extrabold text-white">$149</span>
                <span className="text-xs text-slate-400">/ year</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Best value for small agencies, boutique studios, and consulting businesses.
              </p>
              
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Everything in Unlimited Pro</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>2 Months Free (Save $79/yr)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Priority Email Support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Early Access to New Legal AI Models</span>
                </li>
              </ul>
            </div>

            <button
              disabled={loadingPlan === 'annual-pro'}
              onClick={() => handleCheckout('annual-pro')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center space-x-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{loadingPlan === 'annual-pro' ? 'Redirecting to Stripe...' : 'Pay $149/yr (Stripe)'}</span>
            </button>
          </div>

        </div>

        {/* Security & Guarantees */}
        <div className="text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
          <Shield className="w-4 h-4 text-brand-400" />
          <span>Payments processed securely by Stripe. Cancel anytime in 1 click.</span>
        </div>

      </div>
    </div>
  );
}
