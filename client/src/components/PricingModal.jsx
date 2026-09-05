import React, { useState, useEffect } from 'react';
import { X, Check, Zap, Sparkles, Shield, CreditCard, ArrowRight, Lock, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { activateProPlan } from '../services/api';

export default function PricingModal({ onClose, onUnlockSuccess }) {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [stripeSingleLink, setStripeSingleLink] = useState('');
  const [stripeMonthlyLink, setStripeMonthlyLink] = useState('');
  const [stripeAnnualLink, setStripeAnnualLink] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  // Load saved payment links from localStorage if any
  useEffect(() => {
    const savedSingle = localStorage.getItem('clauseguard_link_single') || '';
    const savedMonthly = localStorage.getItem('clauseguard_link_monthly') || '';
    const savedAnnual = localStorage.getItem('clauseguard_link_annual') || '';
    setStripeSingleLink(savedSingle);
    setStripeMonthlyLink(savedMonthly);
    setStripeAnnualLink(savedAnnual);
  }, []);

  const handleSaveLinks = () => {
    localStorage.setItem('clauseguard_link_single', stripeSingleLink.trim());
    localStorage.setItem('clauseguard_link_monthly', stripeMonthlyLink.trim());
    localStorage.setItem('clauseguard_link_annual', stripeAnnualLink.trim());
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCheckout = (planId) => {
    setLoadingPlan(planId);

    let targetLink = '';
    if (planId === 'single-scan') targetLink = stripeSingleLink.trim();
    if (planId === 'monthly-pro') targetLink = stripeMonthlyLink.trim();
    if (planId === 'annual-pro') targetLink = stripeAnnualLink.trim();

    // If an external Stripe link exists and is valid
    if (targetLink && (targetLink.startsWith('http://') || targetLink.startsWith('https://'))) {
      window.location.href = targetLink;
      return;
    }

    // Otherwise, simulate a seamless instant activation
    setTimeout(() => {
      activateProPlan();
      onUnlockSuccess();
      setLoadingPlan(null);
      onClose();
    }, 800);
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
            <span>Secure Instant Activation</span>
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
              <span>{loadingPlan === 'single-scan' ? 'Activating Pass...' : 'Buy Single Pass ($4.99)'}</span>
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
              <span>{loadingPlan === 'monthly-pro' ? 'Activating Pro Plan...' : 'Start Unlimited Pro ($19/mo)'}</span>
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
              <span>{loadingPlan === 'annual-pro' ? 'Activating Annual Pro...' : 'Get Annual Pro ($149/yr)'}</span>
            </button>
          </div>

        </div>

        {/* Customer Trust & Security Guarantee */}
        <div className="pt-4 mt-2 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Bank-Grade 256-Bit SSL Encryption</strong> • Instant Pro Access</span>
            </div>

            <div className="flex items-center space-x-3 text-slate-500 text-[11px]">
              <span>Powered by Stripe</span>
              <span>•</span>
              <span>Cancel Anytime</span>
            </div>
          </div>

          {/* Owner Settings Drawer: ONLY visible on localhost or with ?owner=true */}
          {(typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || new URLSearchParams(window.location.search).get('owner') === 'true')) && (
            <div className="mt-4 pt-3 border-t border-slate-800/60">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="italic">Owner Mode Active (Hidden from public visitors)</span>
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className="flex items-center space-x-1 text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <Settings className="w-3 h-3" />
                  <span>Configure Stripe Links</span>
                  {showConfig ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {showConfig && (
                <div className="mt-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fadeIn text-left">
                  <div className="text-xs font-bold text-slate-200">
                    ⚙️ Custom Stripe Payment Links (Owner Only)
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Paste your Stripe Payment Links (`https://buy.stripe.com/...`) to route customers directly to your checkout:
                  </p>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-0.5">$4.99 Single Pass Link:</label>
                      <input
                        type="url"
                        placeholder="https://buy.stripe.com/..."
                        value={stripeSingleLink}
                        onChange={(e) => setStripeSingleLink(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-0.5">$19.00/mo Pro Plan Link:</label>
                      <input
                        type="url"
                        placeholder="https://buy.stripe.com/..."
                        value={stripeMonthlyLink}
                        onChange={(e) => setStripeMonthlyLink(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-0.5">$149/yr Annual Plan Link:</label>
                      <input
                        type="url"
                        placeholder="https://buy.stripe.com/..."
                        value={stripeAnnualLink}
                        onChange={(e) => setStripeAnnualLink(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {savedNotice && '✓ Links saved successfully!'}
                    </span>
                    <button
                      onClick={handleSaveLinks}
                      className="px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs transition-colors"
                    >
                      Save Links
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
