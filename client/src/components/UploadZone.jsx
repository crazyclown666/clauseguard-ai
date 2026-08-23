import React, { useState, useRef } from 'react';
import { Upload, FileText, Sparkles, AlertCircle, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../data/sampleContracts';

export default function UploadZone({ onAnalyzeText, onAnalyzeFile, isLoading, onSelectSample }) {
  const [activeTab, setActiveTab] = useState('samples'); // default to samples for quick testing
  const [pastedText, setPastedText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [customTitle, setCustomTitle] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
    if (!customTitle) {
      setCustomTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleStartAnalysis = () => {
    if (activeTab === 'upload' && selectedFile) {
      onAnalyzeFile(selectedFile);
    } else if (activeTab === 'paste' && pastedText.trim()) {
      onAnalyzeText(pastedText, customTitle || 'Custom Agreement');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-12">
      <div className="glass-panel rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800 relative overflow-hidden">
        
        {/* Glowing border highlight */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-500" />

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('samples')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'samples'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>⚡ 1-Click Sample Contracts</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Upload PDF / Word / TXT</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'paste'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Paste Text</span>
          </button>
        </div>

        {/* Tab 1: 1-Click Sample Contracts */}
        {activeTab === 'samples' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400 mb-2">
              Select a preloaded contract to instantly test our risk audit & counter-clause generator:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SAMPLE_CONTRACTS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => onSelectSample(sample)}
                  className="glass-card rounded-xl p-4 cursor-pointer hover:border-brand-400/50 transition-all hover:scale-[1.01] flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {sample.badge}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-brand-300 transition-colors mb-1">
                      {sample.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {sample.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-brand-400 font-medium">
                    <span>Click to Run Audit</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Upload File */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-brand-400 bg-brand-500/10'
                  : selectedFile
                  ? 'border-emerald-500/50 bg-emerald-950/20'
                  : 'border-slate-700 hover:border-slate-500 bg-slate-900/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              />

              {selectedFile ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-white text-sm">{selectedFile.name}</div>
                  <div className="text-xs text-slate-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB • Click or drop another file to replace
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    Drag and drop your contract here, or <span className="text-brand-400 underline">browse files</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Supports PDF, Word (.docx), and plain text (.txt) up to 10MB
                  </div>
                </div>
              )}
            </div>

            {selectedFile && (
              <button
                disabled={isLoading}
                onClick={handleStartAnalysis}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 hover:to-blue-500 shadow-lg shadow-brand-500/20 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Scanning & Auditing Contract Clauses...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze "{selectedFile.name}" Now</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Tab 3: Paste Text */}
        {activeTab === 'paste' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Document Title (Optional)
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Master Services Agreement with Client X"
                className="w-full px-3.5 py-2 text-xs bg-slate-900/80 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Contract Clauses / Full Agreement Text
                </label>
                <span className="text-[11px] text-slate-500">
                  {pastedText.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={7}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the full contract or specific clauses here (e.g. Indemnification, IP ownership, Non-compete, Payment terms)..."
                className="w-full p-3.5 text-xs font-mono bg-slate-900/80 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-500 leading-relaxed"
              />
            </div>

            <button
              disabled={isLoading || pastedText.trim().length < 20}
              onClick={handleStartAnalysis}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 hover:to-blue-500 shadow-lg shadow-brand-500/20 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Auditing Clauses & Calculating Risk Score...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Legal Risk Audit ({pastedText.split(/\s+/).filter(Boolean).length} words)</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
