export interface TomatoData {
  id: string;
  type: 'Ripe' | 'Unripe' | 'Defective';
  confidence: number;
  size: 'Small' | 'Medium' | 'Large';
  position: { x: number; y: number };
  boxSize: { width: number; height: number };
}

export interface AnalysisAssessment {
  number: number;
  label: string;
  status: 'Ripe' | 'Unripe' | 'Defective';
  color: string;
  defectPercent: number;
  confidence: number;
  classifierLabel: 'Ripe' | 'Unripe' | 'Defective' | null;
  classifierConfidence: number;
  centerX: number;
  centerY: number;
  box: [number, number, number, number];
}

export interface AnalysisReport {
  reportId: string;
  generatedAt: string;
  fileName: string;
  storedImage?: string;
  imageWidth: number;
  imageHeight: number;
  image: string;
  annotatedImage: string;
  segmentationImage: string;
  heatmapImage: string;
  summaryChart: string;
  tomatoCount: number;
  ripeCount: number;
  unripeCount: number;
  defectiveCount: number;
  ripePct: number;
  unripePct: number;
  defectPct: number;
  summary: string;
  assessments: AnalysisAssessment[];
  detailImages: Array<{
    title: string;
    caption: string;
    image: string;
  }>;
  totals: {
    regions: number;
    ripe: number;
    unripe: number;
    defective: number;
  };
  modelInfo?: {
    detector?: string;
    classifier?: string | null;
    classifierActive?: boolean;
  };
  classifierUsedCount?: number;
}

export interface ReportSummary {
  reportId: string;
  generatedAt: string | null;
  fileName: string | null;
  summary: string | null;
  totals: {
    regions?: number;
    ripe?: number;
    unripe?: number;
    defective?: number;
  };
  tomatoCount: number;
  ripeCount: number;
  unripeCount: number;
  defectiveCount: number;
  ripePct: number;
  unripePct: number;
  defectPct: number;
  modelInfo?: {
    detector?: string;
    classifier?: string | null;
    classifierActive?: boolean;
  };
  classifierUsedCount?: number;
}

export interface BatchStats {
  total: number;
  ripe: number;
  unripe: number;
  defective: number;
  qualityScore: number;
  batchScore: number;
  marketReadyPercentage: number;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  confidenceThreshold: number;
  autoExport: boolean;
  soundEnabled: boolean;
}
