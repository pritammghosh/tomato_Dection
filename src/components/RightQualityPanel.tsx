import { Card, CardContent } from "./ui/Card";
import { BatchStats } from "../types";

interface RightQualityPanelProps {
  stats: BatchStats;
}

export function RightQualityPanel({ stats }: RightQualityPanelProps) {
  
  // Calculate percentages safely
  const total = stats.total || 1;
  const ripePct = (stats.ripe / total) * 100;
  const unripePct = (stats.unripe / total) * 100;
  const defPct = (stats.defective / total) * 100;
  const batchScore = stats.batchScore ?? stats.qualityScore;

  let batchStatus = "EXCELLENT";
  let statusColor = "text-[#2e9e4a]";
  let statusBg = "bg-[#2e9e4a]/10 border-[#2e9e4a]/20";
  let dotColor = "bg-[#2e9e4a]";
  let recommendation = "Quality threshold met. Recommended for market distribution.";

  if (batchScore === 0) {
    batchStatus = "WAITING";
    statusColor = "text-[#7a7369]";
    statusBg = "bg-white/40 border-white/50";
    dotColor = "bg-[#7a7369]";
    recommendation = "Run analysis to get AI recommendations.";
  } else if (batchScore < 50) {
    batchStatus = "CRITICAL";
    statusColor = "text-[#e03131]";
    statusBg = "bg-[#e03131]/10 border-[#e03131]/20";
    dotColor = "bg-[#e03131]";
    recommendation = "High defect rate. Separate defective tomatoes immediately.";
  } else if (batchScore < 75) {
    batchStatus = "AVERAGE";
    statusColor = "text-[#f59e0b]";
    statusBg = "bg-[#f59e0b]/10 border-[#f59e0b]/20";
    dotColor = "bg-[#f59e0b]";
    recommendation = "Sort required. High unripe percentage detected.";
  } else if (batchScore < 90) {
    batchStatus = "GOOD";
    statusColor = "text-[#ff7f3f]";
    statusBg = "bg-[#ff7f3f]/10 border-[#ff7f3f]/20";
    dotColor = "bg-[#ff7f3f]";
    recommendation = "Good quality batch. Minor sorting recommended.";
  }

  return (
    <aside className="w-full lg:w-[340px] bg-white/20 backdrop-blur-md border-l border-white/30 flex flex-col overflow-hidden shrink-0 h-full z-10 mr-2 rounded-l-[2rem]">
      <div className="p-8 flex items-center justify-center shrink-0 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#ff7f3f]/20 rounded-full blur-xl pointer-events-none"></div>
         <div className="relative w-44 h-44">
           <svg className="w-full h-full transform -rotate-90">
             <circle cx="88" cy="88" r="78" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/40" />
             <circle cx="88" cy="88" r="78" stroke="url(#gradient)" strokeWidth="8" fill="transparent" strokeDasharray="490" strokeDashoffset={490 - (490 * batchScore) / 100} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
             <defs>
               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#ff7f3f" />
                 <stop offset="100%" stopColor="#ff5050" />
               </linearGradient>
             </defs>
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-5xl font-light text-[#1a1a1a]">{batchScore}</span>
             <span className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mt-1">Batch Score</span>
           </div>
         </div>
      </div>

      <div className="px-6 pb-6 flex gap-6 overflow-hidden flex-1">
        {/* Vertical Quality Meter */}
        <div className="w-8 flex flex-col items-center py-2 shrink-0">
          <div className="flex-1 w-2 bg-gradient-to-t from-[#e03131] via-[#f59e0b] to-[#2e9e4a] rounded-full relative shadow-inner">
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-[#e8ded1] rounded-full shadow-[0_4px_10px_rgb(0,0,0,0.1)] transition-all duration-1000 flex items-center justify-center"
              style={{ bottom: `calc(${batchScore}% - 12px)` }}
            >
              <div className="w-2 h-2 bg-[#1a1a1a] rounded-full"></div>
            </div>
          </div>
          <span className="text-[9px] font-semibold mt-4 uppercase tracking-widest text-[#7a7369] -rotate-90 origin-center whitespace-nowrap mb-6">Index</span>
        </div>

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
          {/* Ripeness Distribution */}
          <div className="bg-white/40 border border-white/50 rounded-3xl p-5 shadow-sm">
            <h3 className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mb-4">Ripeness Stats</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold"><span className="text-[#f59e0b]">Unripe</span> <span className="text-[#1a1a1a]">{unripePct.toFixed(1)}%</span></div>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f59e0b] transition-all duration-1000" style={{ width: `${unripePct}%` }}></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold"><span className="text-[#2e9e4a]">Ripe</span> <span className="text-[#1a1a1a]">{ripePct.toFixed(1)}%</span></div>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2e9e4a] transition-all duration-1000" style={{ width: `${ripePct}%` }}></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold"><span className="text-[#e03131]">Defective</span> <span className="text-[#1a1a1a]">{defPct.toFixed(1)}%</span></div>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e03131] transition-all duration-1000" style={{ width: `${defPct}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className={`${statusBg} border rounded-3xl p-5 relative overflow-hidden transition-colors`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${statusBg} rounded-full blur-xl translate-x-1/2 -translate-y-1/2`}></div>
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <div className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`}></div>
              <h3 className={`text-[10px] font-semibold ${statusColor} uppercase tracking-widest`}>AI Recommendation</h3>
            </div>
            <p className="text-sm font-semibold text-[#1a1a1a] mb-2 relative z-10">{batchStatus}</p>
            <p className="text-xs leading-relaxed text-[#7a7369] font-medium relative z-10">
              {recommendation}
            </p>
          </div>

          <button className="mt-auto w-full py-4 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-black shadow-lg shadow-black/10 transition-all flex items-center justify-between px-6 group">
            <span>Generate Report</span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px] group-hover:bg-white/30 transition-colors">&gt;</div>
          </button>
        </div>
      </div>
    </aside>
  );
}
