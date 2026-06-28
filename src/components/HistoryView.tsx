import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Filter, ArrowRight, CheckCircle2, AlertTriangle, XCircle, FileText } from 'lucide-react';
import { ReportSummary } from '../types';
import { getReports } from '../lib/api';

interface HistoryViewProps {
  onClose: () => void;
}

export function HistoryView({ onClose }: HistoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    void getReports()
      .then((items) => {
        if (mounted) {
          setHistory(items);
        }
      })
      .catch(() => {
        if (mounted) {
          setHistory([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredHistory = history.filter((record) => {
    const haystack = `${record.reportId} ${record.fileName ?? ''} ${record.summary ?? ''}`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#1a1a1a]/40 dark:bg-black/60 backdrop-blur-sm flex justify-end"
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl h-full bg-[var(--bg-main)] shadow-2xl flex flex-col"
      >
        <div className="px-8 py-6 bg-[var(--bg-panel)] backdrop-blur-xl border-b border-[var(--border-panel)] flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-light text-[var(--text-main)]">Analysis History</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-medium tracking-widest uppercase">Saved backend reports</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-[var(--bg-panel-heavy)] rounded-full flex items-center justify-center text-[var(--text-main)] shadow-sm hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 border-b border-[var(--border-panel)] bg-[var(--bg-panel-light)] shrink-0">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input 
                type="text" 
                placeholder="Search by report ID or file name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[var(--bg-panel-heavy)] border border-[var(--border-panel)] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 shadow-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
              />
            </div>
            <button className="px-6 py-3 bg-[var(--bg-panel-heavy)] border border-[var(--border-panel)] rounded-full text-sm font-medium text-[var(--text-main)] flex items-center gap-2 shadow-sm hover:bg-[var(--bg-panel)] transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-4">
          {loading && (
            <div className="text-center py-20 text-[var(--text-muted)]">Loading reports...</div>
          )}

          {!loading && filteredHistory.map((record) => (
            <div key={record.reportId} className="bg-[var(--bg-panel)] backdrop-blur-md border border-[var(--border-panel)] rounded-[2rem] p-6 shadow-sm hover:bg-[var(--bg-panel-heavy)] transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-[var(--text-main)] font-medium">{record.reportId}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase ${
                      (record.ripePct ?? 0) >= 90 ? 'bg-[#2e9e4a]/20 text-[#2e9e4a]' :
                      (record.ripePct ?? 0) >= 75 ? 'bg-[#ff7f3f]/20 text-[#ff7f3f]' :
                      (record.ripePct ?? 0) >= 50 ? 'bg-[#f59e0b]/20 text-[#f59e0b]' :
                      'bg-[#e03131]/20 text-[#e03131]'
                    }`}>
                      Score {record.ripePct?.toFixed(1) ?? '0.0'}%
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                    <span>{record.fileName ?? 'Unknown file'}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]/30"></span>
                    <span>{record.generatedAt ? new Date(record.generatedAt).toLocaleString() : 'Unknown date'}</span>
                  </div>
                </div>
                
                <button className="w-10 h-10 rounded-full bg-[var(--bg-panel-heavy)] flex items-center justify-center shadow-sm text-[var(--text-main)] group-hover:bg-[var(--btn-bg)] group-hover:text-[var(--btn-text)] transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 p-4 bg-[var(--bg-panel)] rounded-[1.5rem]">
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold tracking-wider mb-1">Total</p>
                  <p className="text-lg font-light text-[var(--text-main)]">{record.tomatoCount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#2e9e4a] uppercase font-semibold tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 size={10}/> Ripe</p>
                  <p className="text-lg font-light text-[var(--text-main)]">{record.ripeCount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#f59e0b] uppercase font-semibold tracking-wider mb-1 flex items-center gap-1"><AlertTriangle size={10}/> Unripe</p>
                  <p className="text-lg font-light text-[var(--text-main)]">{record.unripeCount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#e03131] uppercase font-semibold tracking-wider mb-1 flex items-center gap-1"><XCircle size={10}/> Defect</p>
                  <p className="text-lg font-light text-[var(--text-main)]">{record.defectiveCount}</p>
                </div>
              </div>
            </div>
          ))}
          
          {!loading && filteredHistory.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[var(--bg-panel)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
                <FileText size={24} />
              </div>
              <p className="text-[var(--text-main)] font-medium">No reports found</p>
              <p className="text-sm text-[var(--text-muted)]">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
