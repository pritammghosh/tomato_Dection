import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { BatchStats } from "../types";
import { PackageOpen, CheckCircle2, AlertCircle, XCircle, Activity, Star } from "lucide-react";

interface SummaryCardsProps {
  stats: BatchStats;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6 pt-6 pb-2 shrink-0 z-10 relative">
      <div className="bg-white/40 backdrop-blur-lg p-5 rounded-[2rem] border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:bg-white/60 transition-colors">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7a7369] mb-3">Total Tomatoes</p>
        <p className="text-4xl font-light text-[#1a1a1a]">{stats.total}</p>
      </div>
      <div className="bg-white/40 backdrop-blur-lg p-5 rounded-[2rem] border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:bg-white/60 transition-colors relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#2e9e4a]/10 rounded-full blur-xl"></div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7a7369] mb-3">Ripe</p>
        <p className="text-4xl font-light text-[#2e9e4a]">{stats.ripe}</p>
      </div>
      <div className="bg-white/40 backdrop-blur-lg p-5 rounded-[2rem] border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:bg-white/60 transition-colors relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#f59e0b]/10 rounded-full blur-xl"></div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7a7369] mb-3">Unripe</p>
        <p className="text-4xl font-light text-[#f59e0b]">{stats.unripe}</p>
      </div>
      <div className="bg-white/40 backdrop-blur-lg p-5 rounded-[2rem] border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:bg-white/60 transition-colors relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#e03131]/10 rounded-full blur-xl"></div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7a7369] mb-3">Defective</p>
        <p className="text-4xl font-light text-[#e03131]">{stats.defective}</p>
      </div>
      <div className="bg-[#ff7f3f]/10 backdrop-blur-lg p-5 rounded-[2rem] border border-[#ff7f3f]/20 shadow-[0_4px_20px_rgb(255,127,63,0.1)] relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#ff7f3f]/20 rounded-full blur-xl"></div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#ff7f3f] mb-3">Quality Score</p>
        <div className="flex items-baseline gap-2 relative z-10">
          <p className="text-4xl font-light text-[#1a1a1a]">{stats.qualityScore}%</p>
        </div>
      </div>
      <div className="bg-[#1a1a1a] p-5 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <p className="text-[10px] uppercase tracking-widest font-medium text-white/50 mb-3">Market Ready</p>
        <p className="text-4xl font-light text-white relative z-10">{stats.marketReadyPercentage}%</p>
      </div>
    </section>
  );
}
