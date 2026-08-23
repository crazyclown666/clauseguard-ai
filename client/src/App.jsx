import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Filter, 
  ArrowLeft, 
  Printer, 
  Zap, 
  BookOpen, 
  Copy,
  ExternalLink 
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import RiskGauge from './components/RiskGauge';
import ExecutiveSummary from './components/ExecutiveSummary';
import CategoryBreakdown from './components/CategoryBreakdown';
import ClauseCard from './components/ClauseCard';
import CounterClauseModal from './components/CounterClauseModal';
import PricingModal from './components/PricingModal';
import Footer from './components/Footer';

import { 
  analyzeContractText, 
  analyzeContractFile, 
  getUserCredits, 
  isProUser, 
  decrementCredits,
  activateProPlan 
} from './services/api';

export default function App() {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  
  const [activeClauseForCounter, setActiveClauseForCounter] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [credits, setCredits] = useState(getUserCredits());
  const [isPro, setIsPro] = useState(isProUser());
  
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);
  
  const resultsRef = useRef(null);

  // Check URL query parameters for payment success/cancel
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment_success') === 'true') {
      activateProPlan();
      setIsPro(true);
      setCredits(9999);
      showToast('🎉 Payment Successful! Unlimited Pro Access Unlocked.');
      triggerCelebration();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Perform Analysis
  const handleAnalyzeText = async (text, title) => {
    if (!isPro && credits <= 0) {
      setShowPricing(true);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      setLoadingStep('Extracting key provisions & definitions...');

      setTimeout(() => setLoadingStep('Analyzing indemnity, liability caps & IP clauses...'), 900);
      setTimeout(() => setLoadingStep('Generating plain-English translations & counter-proposals...'), 1800);

      const data = await analyzeContractText(text, title);
      setAnalysis(data);

      const nextCredits = decrementCredits();
      setCredits(nextCredits);

      if (data.overallScore >= 80) {
        triggerCelebration();
      }

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);

    } catch (err) {
      console.error('Analysis failed:', err);
      setErrorMessage(err.message || 'Failed to complete analysis. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleAnalyzeFile = async (file) => {
    if (!isPro && credits <= 0) {
      setShowPricing(true);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      setLoadingStep(`Parsing document "${file.name}"...`);

      setTimeout(() => setLoadingStep('Scanning for uncapped liabilities & non-competes...'), 1100);
      setTimeout(() => setLoadingStep('Synthesizing risk report & legal redlines...'), 2200);

      const data = await analyzeContractFile(file);
      setAnalysis(data);

      const nextCredits = decrementCredits();
      setCredits(nextCredits);

      if (data.overallScore >= 80) {
        triggerCelebration();
      }

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);

    } catch (err) {
      console.error('File analysis failed:', err);
      setErrorMessage(err.message || 'Failed to parse file.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleSelectSample = (sample) => {
    handleAnalyzeText(sample.text, sample.name);
  };

  const handleReset = () => {
    setAnalysis(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter clauses
  const filteredClauses = analysis?.clauses ? analysis.clauses.filter(c => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'high') return c.severity === 'high';
    if (filterSeverity === 'medium') return c.severity === 'medium';
    if (filterSeverity === 'safe') return c.severity === 'safe' || c.severity === 'low';
    return true;
  }) : [];

  const highRiskCount = analysis?.clauses?.filter(c => c.severity === 'high').length || 0;
  const mediumRiskCount = analysis?.clauses?.filter(c => c.severity === 'medium').length || 0;
  const safeRiskCount = analysis?.clauses?.filter(c => c.severity === 'safe' || c.severity === 'low').length || 0;

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-brand-500/50 shadow-2xl text-xs sm:text-sm font-semibold text-white flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        credits={credits}
        isPro={isPro}
        onOpenPricing={() => setShowPricing(true)}
        onReset={handleReset}
        hasResults={Boolean(analysis)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        
        {/* Error Alert */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-xs sm:text-sm flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-bold">Error Processing Document</div>
              <div>{errorMessage}</div>
            </div>
          </div>
        )}

        {/* Loading Overlay / Progress Modal */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-panel max-w-md w-full rounded-2xl p-8 border border-brand-500/40 text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 animate-pulse">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-white">ClauseGuard AI Audit in Progress</h3>
              <p className="text-xs text-brand-300 font-mono animate-pulse">
                {loadingStep || 'Analyzing contractual obligations...'}
              </p>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-brand-500 rounded-full w-3/4 animate-pulse-slow" />
              </div>
              <div className="text-[11px] text-slate-500">
                Evaluating liability caps, non-competes, IP assignments & jurisdiction
              </div>
            </div>
          </div>
        )}

        {/* Home / Input View */}
        {!analysis && (
          <>
            <Hero onTrySample={() => {}} />
            <UploadZone
              onAnalyzeText={handleAnalyzeText}
              onAnalyzeFile={handleAnalyzeFile}
              onSelectSample={handleSelectSample}
              isLoading={isLoading}
            />
          </>
        )}

        {/* Audit Results Dashboard */}
        {analysis && (
          <div ref={resultsRef} className="space-y-8 animate-fadeIn">
            
            {/* Header Actions Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Scan Another Contract</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                  <span>Contract Audit: {analysis.documentTitle || analysis.documentType || 'Document'}</span>
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Print / Save PDF Report</span>
                </button>
                <button
                  onClick={() => setShowPricing(true)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-400 text-white transition-colors shadow-md shadow-brand-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Unlock Full Pro Report</span>
                </button>
              </div>
            </div>

            {/* Top Row: Risk Gauge & Executive Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <RiskGauge
                  score={analysis.overallScore}
                  riskLevel={analysis.riskLevel}
                  documentType={analysis.documentType}
                  wordCount={analysis.wordCount}
                  clausesCount={analysis.clauses?.length || 0}
                  highRiskCount={highRiskCount}
                />
              </div>

              <div className="lg:col-span-8">
                <ExecutiveSummary
                  summary={analysis.executiveSummary}
                  onScrollToClauses={() => {}}
                />
              </div>
            </div>

            {/* Domain Breakdown */}
            <CategoryBreakdown breakdown={analysis.categoryBreakdown} />

            {/* Clauses List Section */}
            <div className="space-y-4">
              
              {/* Filter / Search Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Detailed Clause Audit ({filteredClauses.length} clauses)
                  </span>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
                  <button
                    onClick={() => setFilterSeverity('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      filterSeverity === 'all'
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All ({analysis.clauses?.length || 0})
                  </button>

                  <button
                    onClick={() => setFilterSeverity('high')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      filterSeverity === 'high'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🔴 High Risk ({highRiskCount})
                  </button>

                  <button
                    onClick={() => setFilterSeverity('medium')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      filterSeverity === 'medium'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🟡 Moderate ({mediumRiskCount})
                  </button>

                  <button
                    onClick={() => setFilterSeverity('safe')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      filterSeverity === 'safe'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🟢 Safe / Low ({safeRiskCount})
                  </button>
                </div>
              </div>

              {/* Clause Cards */}
              <div className="space-y-4">
                {filteredClauses.map((clause) => (
                  <ClauseCard
                    key={clause.id}
                    clause={clause}
                    onOpenCounterProposal={(c) => setActiveClauseForCounter(c)}
                  />
                ))}
              </div>

            </div>

            {/* Negotiation Playbook */}
            {analysis.negotiationPlaybook && analysis.negotiationPlaybook.length > 0 && (
              <div className="glass-panel rounded-2xl p-6 border border-slate-800">
                <div className="flex items-center space-x-2 text-brand-400 mb-3">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                    Institutional Negotiation Strategy & Tactics
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analysis.negotiationPlaybook.map((play, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-cyan-300 mb-1">
                        {play.tactic}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {play.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Counter Clause Modal */}
      {activeClauseForCounter && (
        <CounterClauseModal
          clause={activeClauseForCounter}
          onClose={() => setActiveClauseForCounter(null)}
        />
      )}

      {/* Pricing Modal */}
      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onUnlockSuccess={() => {
            setIsPro(true);
            setCredits(9999);
            showToast('🎉 Unlimited Pro Plan Activated!');
            triggerCelebration();
          }}
        />
      )}

      {/* Footer */}
      <Footer onOpenPricing={() => setShowPricing(true)} />

    </div>
  );
}
