import { Download, Settings, Box } from "lucide-react";

interface HeaderProps {
  onOpenHistory?: () => void;
  onOpenSettings?: () => void;
}

export function Header({ onOpenHistory, onOpenSettings }: HeaderProps) {
  return (
    <header className="h-20 bg-[var(--bg-panel)] backdrop-blur-xl border-b border-[var(--border-panel)] flex items-center justify-between px-8 shrink-0 z-20 relative">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[var(--btn-bg)] rounded-full flex items-center justify-center shadow-sm">
          <span className="text-[var(--btn-text)] font-medium text-lg">T</span>
        </div>
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[var(--text-main)]">Tomaro<span className="font-semibold">Lab</span></h1>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex flex-col items-end gap-0.5">
          <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">BATCH ID</span>
          <span className="text-xs font-mono font-medium text-[var(--text-main)]">#TM-0982</span>
        </div>
        
        <div className="flex gap-3 items-center">
          <button className="px-5 py-2.5 text-xs font-medium bg-[var(--bg-panel-heavy)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-full hover:bg-[var(--bg-panel)] transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)] hidden lg:block">
            Export PDF
          </button>
          
          <button 
            onClick={onOpenHistory}
            className="w-10 h-10 flex items-center justify-center bg-[var(--bg-panel-heavy)] border border-[var(--border-panel)] text-[var(--text-main)] rounded-full hover:bg-[var(--bg-panel)] transition-all shadow-sm group relative"
            title="View History"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
          </button>

          <button 
            onClick={onOpenSettings}
            className="px-5 py-2.5 text-xs font-medium bg-[var(--btn-bg)] text-[var(--btn-text)] rounded-full hover:opacity-80 transition-colors shadow-md flex items-center gap-2"
          >
            Settings <div className="w-5 h-5 bg-[var(--bg-panel-light)] rounded-full flex items-center justify-center text-[10px]">&gt;</div>
          </button>
        </div>
      </div>
    </header>
  );
}
