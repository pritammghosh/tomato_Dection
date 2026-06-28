import { Upload, Camera, History, FileText, Play, RotateCcw } from "lucide-react";
import { Card, CardContent } from "./ui/Card";

interface LeftSidebarProps {
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
  onReset: () => void;
  onSelectFile: (file: File | null) => void;
  selectedFileName?: string | null;
  onOpenHistory?: () => void;
}

export function LeftSidebar({ onStartAnalysis, isAnalyzing, onReset, onSelectFile, selectedFileName, onOpenHistory }: LeftSidebarProps) {
  const handleUploadClick = () => {
    const input = document.getElementById("tomato-file-input") as HTMLInputElement | null;
    input?.click();
  };

  const fileLabel = selectedFileName
    ? selectedFileName.length > 28
      ? `${selectedFileName.slice(0, 12)}...${selectedFileName.slice(-10)}`
      : selectedFileName
    : "No file selected";

  return (
    <aside className="w-full lg:w-72 bg-white/20 backdrop-blur-md border-r border-white/30 flex flex-col p-6 gap-8 shrink-0 h-full overflow-y-auto custom-scrollbar z-10 ml-2 rounded-r-[2rem]">
      <div>
        <h3 className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mb-4">Input Source</h3>
        <div className="space-y-3">
          <input
            id="tomato-file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => onSelectFile(event.target.files?.[0] ?? null)}
          />
          <button 
            onClick={handleUploadClick}
            className="w-full flex flex-col items-center justify-center gap-3 px-4 py-8 bg-white/50 border border-white/60 rounded-3xl text-[#7a7369] hover:bg-white/80 hover:text-[#1a1a1a] transition-all shadow-sm"
            title={selectedFileName || "No file selected"}
          >
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center">
              <Upload size={18} className="text-[#1a1a1a]" />
            </div>
            <span className="text-sm font-medium">Upload Image</span>
            <span className="w-full px-2 text-center text-[10px] font-mono uppercase tracking-widest text-[#7a7369] truncate">
              {fileLabel}
            </span>
          </button>
          <button 
            onClick={onReset}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-black shadow-lg shadow-black/10 transition-all group"
          >
            <Camera size={16} />
            <span>Open Webcam</span>
            <div className="w-6 h-6 ml-auto bg-white/20 rounded-full flex items-center justify-center text-[10px] group-hover:bg-white/30 transition-colors">&gt;</div>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mb-4">Controls</h3>
        <div className="space-y-2">
          <button 
            onClick={onStartAnalysis}
            disabled={isAnalyzing || !selectedFileName}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-full text-sm font-medium transition-all shadow-md ${
              isAnalyzing || !selectedFileName ? 'bg-[#ff7f3f]/50 text-white cursor-not-allowed' : 'bg-[#ff7f3f] text-white hover:bg-[#ff6b22] hover:shadow-[#ff7f3f]/30'
            }`}
          >
            <span className="flex items-center gap-2">
              <Play size={16} fill="currentColor" />
              {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
            </span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px]">&gt;</div>
          </button>
          
          <div className="pt-2 space-y-2">
            <button 
              onClick={onReset}
              className="w-full flex items-center gap-3 px-5 py-3.5 bg-white/40 border border-white/50 text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-white/70 transition-colors"
            >
              <RotateCcw size={16} className="text-[#7a7369]" />
              Reset View
            </button>
            <button 
              onClick={onOpenHistory}
              className="w-full flex items-center gap-3 px-5 py-3.5 bg-white/40 border border-white/50 text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-white/70 transition-colors"
            >
              <History size={16} className="text-[#7a7369]" />
              Batch History
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-3.5 bg-white/40 border border-white/50 text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-white/70 transition-colors">
              <FileText size={16} className="text-[#7a7369]" />
              Exported Reports
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto bg-white/40 border border-white/50 rounded-[2rem] p-5 shadow-sm">
        <h3 className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mb-3">Batch Metadata</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs"><span className="text-[#7a7369] font-medium">Date</span> <span className="font-semibold text-[#1a1a1a]">{new Date().toISOString().split('T')[0]}</span></div>
          <div className="flex justify-between items-center text-xs"><span className="text-[#7a7369] font-medium">User</span> <span className="font-semibold text-[#1a1a1a] bg-white/60 px-2 py-0.5 rounded-full">Operator_04</span></div>
          <div className="flex justify-between items-center text-xs"><span className="text-[#7a7369] font-medium">Resolution</span> <span className="font-mono text-[#1a1a1a]">4K Ultra HD</span></div>
        </div>
      </div>
    </aside>
  );
}
