/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { SummaryCards } from './components/SummaryCards';
import { MainAnalysisArea } from './components/MainAnalysisArea';
import { RightQualityPanel } from './components/RightQualityPanel';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { DetailedTable } from './components/DetailedTable';
import { AuthPage } from './components/AuthPage';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { AnalysisReport, AppSettings, BatchStats, TomatoData } from './types';
import { analyzeTomatoImage, getModels } from './lib/api';

const INITIAL_STATS: BatchStats = {
  total: 0,
  ripe: 0,
  unripe: 0,
  defective: 0,
  qualityScore: 0,
  batchScore: 0,
  marketReadyPercentage: 0,
};

const INITIAL_SETTINGS: AppSettings = {
  theme: 'light',
  confidenceThreshold: 80,
  autoExport: false,
  soundEnabled: true,
};

function createStatsFromReport(report: AnalysisReport | null): BatchStats {
  if (!report) {
    return INITIAL_STATS;
  }

  const total = report.tomatoCount || report.totals?.regions || 0;
  const ripePct = total > 0 ? (report.ripeCount / total) * 100 : 0;
  const unripePct = total > 0 ? (report.unripeCount / total) * 100 : 0;
  const defectivePct = total > 0 ? (report.defectiveCount / total) * 100 : 0;
  const qualityScore = Math.max(0, Math.min(100, Math.round(ripePct * 0.75 + unripePct * 0.2 - defectivePct * 0.35 + 10)));
  const batchScore = Math.max(0, Math.min(100, Math.round(ripePct * 0.6 + unripePct * 0.15 - defectivePct * 0.8)));

  return {
    total,
    ripe: report.ripeCount,
    unripe: report.unripeCount,
    defective: report.defectiveCount,
    qualityScore,
    batchScore,
    marketReadyPercentage: total > 0 ? Math.round((report.ripeCount / total) * 100) : 0,
  };
}

function createTableData(report: AnalysisReport | null): TomatoData[] {
  if (!report || !report.imageWidth || !report.imageHeight) {
    return [];
  }

  return report.assessments.map((item) => {
    const [x1, y1, x2, y2] = item.box;
    const widthPct = Math.max(((x2 - x1) / report.imageWidth) * 100, 2);
    const heightPct = Math.max(((y2 - y1) / report.imageHeight) * 100, 2);
    const averageSpan = (widthPct + heightPct) / 2;
    const size = averageSpan < 8 ? 'Small' : averageSpan < 14 ? 'Medium' : 'Large';

    return {
      id: `#${String(item.number).padStart(3, '0')}`,
      type: item.status,
      confidence: item.confidence,
      size,
      position: {
        x: Math.max((x1 / report.imageWidth) * 100, 0),
        y: Math.max((y1 / report.imageHeight) * 100, 0),
      },
      boxSize: {
        width: Math.min(widthPct, 100),
        height: Math.min(heightPct, 100),
      },
    };
  });
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [backendModels, setBackendModels] = useState<{
    detector: { path: string; name: string; active: boolean };
    classifier: { path: string | null; name: string | null; active: boolean };
  } | null>(null);

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  useEffect(() => {
    void getModels()
      .then(setBackendModels)
      .catch(() => setBackendModels(null));
  }, []);

  const stats = useMemo(() => createStatsFromReport(report), [report]);
  const tableData = useMemo(() => createTableData(report), [report]);

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const onSelectFile = (file: File | null) => {
    setSelectedFile(file);
    setAnalysisError(null);
    setIsAnalyzed(false);
    setReport(null);
    setProgress(0);
  };

  const startAnalysis = async () => {
    if (!selectedFile || isAnalyzing) {
      return;
    }

    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setAnalysisError(null);
    setProgress(5);

    const timer = window.setInterval(() => {
      setProgress((prev) => (prev >= 92 ? prev : prev + 6));
    }, 220);

    try {
      const result = await analyzeTomatoImage(selectedFile, settings.confidenceThreshold / 100);
      setReport(result);
      setProgress(100);
      setIsAnalyzed(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Analysis failed';
      setAnalysisError(message);
      setIsAnalyzed(false);
    } finally {
      window.clearInterval(timer);
      window.setTimeout(() => {
        setIsAnalyzing(false);
        setProgress(0);
      }, 350);
    }
  };

  const resetData = () => {
    setSelectedFile(null);
    setReport(null);
    setAnalysisError(null);
    setIsAnalyzed(false);
    setProgress(0);
  };

  const modelLabel = report?.modelInfo?.detector || backendModels?.detector.name || 'YOLO model';
  const classifierLabel = report?.modelInfo?.classifier || backendModels?.classifier.name || 'Classifier inactive';

  return (
    <div className="h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans relative overflow-hidden transition-colors duration-300">
      <Header 
        onOpenHistory={() => setShowHistory(true)} 
        onOpenSettings={() => setShowSettings(true)}
      />

      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/80 backdrop-blur-sm">
          <div className="flex flex-col items-center max-w-md w-full px-6 bg-[var(--bg-panel-heavy)] p-8 rounded-[2rem] shadow-2xl border border-[var(--border-panel)] backdrop-blur-lg">
            <div className="w-12 h-12 border-4 border-[var(--border-panel)] border-t-[var(--accent)] rounded-full animate-spin mb-6"></div>
            <h2 className="text-xl font-semibold mb-2 text-[var(--text-main)]">Analyzing Tomato Quality...</h2>
            <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-widest mb-6">Running model inference and report generation</p>
            <div className="w-full h-1.5 bg-[var(--bg-panel-light)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="mt-2 text-right w-full text-[10px] font-bold text-[var(--accent)] tracking-widest">{Math.min(progress, 100)}% COMPLETE</div>
          </div>
        </div>
      )}

      <SummaryCards stats={stats} />

      <main className="flex-1 flex overflow-hidden w-full max-w-[1920px] mx-auto">
        <LeftSidebar 
          onStartAnalysis={startAnalysis} 
          isAnalyzing={isAnalyzing} 
          onReset={resetData}
          onSelectFile={onSelectFile}
          selectedFileName={selectedFile?.name ?? report?.fileName ?? null}
          onOpenHistory={() => setShowHistory(true)}
        />
        
        <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-main)] overflow-y-auto custom-scrollbar">
          <MainAnalysisArea data={tableData} isAnalyzing={isAnalyzing} isAnalyzed={isAnalyzed} report={report} />
          <AnalyticsCharts stats={stats} />
          <DetailedTable data={tableData} />
          {analysisError && (
            <div className="mx-2 mb-4 rounded-[1.5rem] border border-[#e03131]/20 bg-[#e03131]/10 px-5 py-4 text-sm text-[#e03131]">
              {analysisError}
            </div>
          )}
        </div>

        <RightQualityPanel stats={stats} />
      </main>
      
      <footer className="h-10 bg-[var(--btn-bg)] text-[var(--text-muted)] flex items-center px-8 justify-between text-[10px] font-semibold tracking-widest shrink-0 z-20 relative">
        <div className="flex gap-8">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse shadow-[0_0_8px_rgba(46,158,74,0.6)]"></span>
            MODEL: {modelLabel}
          </span>
          <span>CLASSIFIER: {classifierLabel}</span>
          <span>ACCURACY: {report ? `${report.ripePct.toFixed(1)}% ripe coverage` : 'Waiting for analysis'}</span>
        </div>
        <div className="opacity-60">TOMARO LAB v2.4.0 • SYSTEM OPERATIONAL</div>
      </footer>

      <AnimatePresence>
        {showHistory && (
          <HistoryView onClose={() => setShowHistory(false)} />
        )}
        {showSettings && (
          <SettingsView 
            settings={settings}
            onUpdateSettings={setSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
