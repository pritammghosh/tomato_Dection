import { useMemo, useState } from "react";
import { Maximize2, ZoomIn, ZoomOut, Layers, Sparkles, ScanSearch } from "lucide-react";
import { AnalysisReport, TomatoData } from "../types";

interface MainAnalysisAreaProps {
  data: TomatoData[];
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  report: AnalysisReport | null;
}

type ViewMode = "detection" | "segmentation" | "heatmap";

function getBackgroundImage(report: AnalysisReport | null, viewMode: ViewMode) {
  if (!report) {
    return "";
  }
  switch (viewMode) {
    case "segmentation":
      return report.segmentationImage || report.image;
    case "heatmap":
      return report.heatmapImage || report.image;
    default:
      return report.image;
  }
}

function getModeLabel(viewMode: ViewMode) {
  switch (viewMode) {
    case "segmentation":
      return "Segmentation Mask";
    case "heatmap":
      return "Defect Heatmap";
    default:
      return "Detection Overlay";
  }
}

export function MainAnalysisArea({ data, isAnalyzing, isAnalyzed, report }: MainAnalysisAreaProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("detection");

  const sourceImage = getBackgroundImage(report, viewMode);
  const imageAspectRatio = report?.imageWidth && report?.imageHeight ? `${report.imageWidth} / ${report.imageHeight}` : "1 / 1";

  const overlays = useMemo(() => {
    if (!report) {
      return [];
    }

    return report.assessments.map((item) => {
      const [x1, y1, x2, y2] = item.box;
      const widthPct = Math.max(((x2 - x1) / Math.max(report.imageWidth, 1)) * 100, 1.5);
      const heightPct = Math.max(((y2 - y1) / Math.max(report.imageHeight, 1)) * 100, 1.5);
      const leftPct = (x1 / Math.max(report.imageWidth, 1)) * 100;
      const topPct = (y1 / Math.max(report.imageHeight, 1)) * 100;
      const centerLeft = ((item.centerX ?? (x1 + x2) / 2) / Math.max(report.imageWidth, 1)) * 100;
      const centerTop = ((item.centerY ?? (y1 + y2) / 2) / Math.max(report.imageHeight, 1)) * 100;
      const intensity = Math.max(0.25, Math.min(1, (item.defectPercent / 100) + item.confidence * 0.4));
      const statusColor =
        item.status === "Ripe" ? "#2e9e4a" :
        item.status === "Unripe" ? "#f59e0b" : "#e03131";

      return {
        ...item,
        widthPct,
        heightPct,
        leftPct,
        topPct,
        centerLeft,
        centerTop,
        intensity,
        statusColor,
      };
    });
  }, [report]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-transparent p-0 gap-4 min-h-[400px]">
      <div className="flex-1 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 relative overflow-hidden flex items-center justify-center mx-2 mb-0 shadow-sm">
        <div className="absolute inset-0 bg-[#e8ded1]/30 opacity-40" />

        {sourceImage ? (
          <div className="absolute inset-4 rounded-[1.5rem] overflow-hidden bg-black/5">
            <div className="relative w-full" style={{ aspectRatio: imageAspectRatio }}>
              <img
                src={sourceImage}
                alt="Analysis source"
                className="object-contain w-full h-full"
                style={{ opacity: 1 }}
              />
              <div className="absolute inset-0">
                {viewMode === "detection" && isAnalyzed && (
                  <div className="absolute inset-0 pointer-events-none">
                    {overlays.map((item) => (
                      <div
                        key={item.number}
                        className="absolute border-[1.5px] rounded-[1.5rem] backdrop-blur-[1px] shadow-[0_0_20px_rgba(0,0,0,0.12)]"
                        style={{
                          top: `${item.topPct}%`,
                          left: `${item.leftPct}%`,
                          width: `${item.widthPct}%`,
                          height: `${item.heightPct}%`,
                          borderColor: item.statusColor,
                          backgroundColor: `${item.statusColor}14`,
                        }}
                      >
                        <span
                          className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-white px-3 py-1 font-semibold rounded-full shadow-sm whitespace-nowrap tracking-wider"
                          style={{ backgroundColor: item.statusColor }}
                        >
                          {item.status.toUpperCase()} {(item.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {!isAnalyzed && !isAnalyzing && (
              <div className="text-white text-center z-10 bg-black/30 backdrop-blur-md px-6 py-4 rounded-[2rem]">
                <p className="text-sm uppercase tracking-widest font-semibold">Waiting for input</p>
                <p className="text-xs font-mono mt-1 opacity-80">Upload an image to begin</p>
              </div>
            )}
            {isAnalyzing && (
              <div className="text-white text-center z-10 bg-black/30 backdrop-blur-md px-6 py-4 rounded-[2rem]">
                <p className="text-sm uppercase tracking-widest font-semibold animate-pulse">AI Analysis Active</p>
                <p className="text-xs font-mono mt-1 opacity-80">Processing frame...</p>
              </div>
            )}
          </>
        )}

        {viewMode === "segmentation" && sourceImage && isAnalyzed && (
          <div className="absolute top-8 left-8 z-30 flex items-center gap-2 rounded-full border border-white/40 bg-black/35 px-4 py-2 text-white backdrop-blur-md">
            <Layers size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{getModeLabel(viewMode)}</span>
          </div>
        )}

        {viewMode === "heatmap" && sourceImage && isAnalyzed && (
          <div className="absolute top-8 left-8 z-30 flex items-center gap-2 rounded-full border border-white/40 bg-black/35 px-4 py-2 text-white backdrop-blur-md">
            <Sparkles size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{getModeLabel(viewMode)}</span>
          </div>
        )}

        {viewMode === "detection" && sourceImage && isAnalyzed && (
          <div className="absolute top-8 left-8 z-30 flex items-center gap-2 rounded-full border border-white/40 bg-black/35 px-4 py-2 text-white backdrop-blur-md">
            <ScanSearch size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{getModeLabel(viewMode)}</span>
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-white/70 backdrop-blur-xl p-1.5 rounded-full border border-white z-30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <button
            onClick={() => setViewMode("detection")}
            className={`px-5 py-2 text-[10px] font-bold rounded-full transition-all tracking-widest ${viewMode === "detection" ? "bg-[#1a1a1a] text-white shadow-md" : "text-[#7a7369] hover:bg-white/50"}`}
          >
            DETECTION
          </button>
          <button
            onClick={() => setViewMode("segmentation")}
            className={`px-5 py-2 text-[10px] font-bold rounded-full transition-all tracking-widest ${viewMode === "segmentation" ? "bg-[#1a1a1a] text-white shadow-md" : "text-[#7a7369] hover:bg-white/50"}`}
          >
            SEGMENTATION
          </button>
          <button
            onClick={() => setViewMode("heatmap")}
            className={`px-5 py-2 text-[10px] font-bold rounded-full transition-all tracking-widest ${viewMode === "heatmap" ? "bg-[#1a1a1a] text-white shadow-md" : "text-[#7a7369] hover:bg-white/50"}`}
          >
            HEATMAP
          </button>
        </div>

        <div className="absolute top-8 right-8 flex flex-col gap-2 bg-white/70 backdrop-blur-xl p-2 rounded-full border border-white z-30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-[#1a1a1a]">
          <button className="p-2 bg-white rounded-full hover:bg-[#f3ece4] transition-colors shadow-sm"><ZoomIn size={16} /></button>
          <button className="p-2 bg-white rounded-full hover:bg-[#f3ece4] transition-colors shadow-sm"><ZoomOut size={16} /></button>
          <button className="p-2 bg-[#1a1a1a] text-white rounded-full hover:bg-black transition-colors shadow-sm mt-1"><Maximize2 size={16} /></button>
        </div>
      </div>
    </div>
  );
}
