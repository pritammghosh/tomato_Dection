import { BatchStats } from "../types";

const pieColors = ['#16a34a', '#eab308', '#dc2626'];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildDonutGradient(stats: BatchStats) {
  const total = Math.max(stats.total, 1);
  const ripe = (stats.ripe / total) * 100;
  const unripe = (stats.unripe / total) * 100;
  const defective = (stats.defective / total) * 100;

  const ripeEnd = ripe;
  const unripeEnd = ripe + unripe;
  const defectiveEnd = ripe + unripe + defective;

  return `conic-gradient(${pieColors[0]} 0% ${ripeEnd}%, ${pieColors[1]} ${ripeEnd}% ${unripeEnd}%, ${pieColors[2]} ${unripeEnd}% ${defectiveEnd}%)`;
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function AnalyticsCharts({ stats }: { stats: BatchStats }) {
  const total = Math.max(stats.total, 1);
  const pieData = [
    { name: 'Ripe', value: stats.ripe, color: pieColors[0] },
    { name: 'Unripe', value: stats.unripe, color: pieColors[1] },
    { name: 'Defective', value: stats.defective, color: pieColors[2] },
  ];

  const barData = [
    { name: 'Ripe', count: stats.ripe, color: pieColors[0] },
    { name: 'Unripe', count: stats.unripe, color: pieColors[1] },
    { name: 'Defect', count: stats.defective, color: pieColors[2] },
  ];

  const timelineData = [
    { batch: 'B1', quality: 85 },
    { batch: 'B2', quality: 82 },
    { batch: 'B3', quality: 88 },
    { batch: 'B4', quality: 78 },
    { batch: 'B5', quality: stats.qualityScore },
  ];

  const sparkWidth = 280;
  const sparkHeight = 120;
  const points = timelineData.map((point, index) => {
    const x = (index / (timelineData.length - 1)) * sparkWidth;
    const y = sparkHeight - (clamp(point.quality, 0, 100) / 100) * sparkHeight;
    return `${x},${y}`;
  }).join(' ');

  const maxCount = Math.max(...barData.map(item => item.count), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-2 my-2 shrink-0 z-10">
      <div className="bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 p-6 h-[240px] flex flex-col shadow-sm">
        <h3 className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mb-2">Distribution</h3>
        <div className="flex-1 min-h-0 flex items-center justify-between gap-4">
          <div className="relative w-32 h-32 shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: buildDonutGradient(stats) }}
            />
            <div className="absolute inset-[18px] rounded-full bg-[var(--bg-main)] border border-white/70 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#7a7369] font-semibold">Total</p>
                <p className="text-2xl font-light text-[#1a1a1a]">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-[#1a1a1a] font-medium">{entry.name}</span>
                </div>
                <span className="text-xs font-mono text-[#7a7369]">
                  {entry.value} / {total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 p-6 h-[240px] flex flex-col shadow-sm">
        <h3 className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mb-2">Count Comparison</h3>
        <div className="flex-1 min-h-0 flex items-end gap-4">
          {barData.map((entry) => {
            const height = Math.max((entry.count / maxCount) * 100, entry.count > 0 ? 8 : 0);
            return (
              <div key={entry.name} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-[1.1rem] rounded-b-[1.1rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]"
                    style={{
                      height: `${height}%`,
                      minHeight: entry.count > 0 ? '8px' : '0px',
                      background: `linear-gradient(180deg, ${entry.color} 0%, ${entry.color}cc 100%)`,
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#7a7369] font-semibold">{entry.name}</p>
                  <p className="text-xs font-mono text-[#1a1a1a]">{entry.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 p-6 h-[240px] flex flex-col shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff7f3f]/10 rounded-full blur-2xl pointer-events-none" />
        <h3 className="text-[10px] font-semibold text-[#7a7369] uppercase tracking-widest mb-2 relative z-10">Quality Trend</h3>
        <div className="flex-1 min-h-0 relative z-10">
          <svg viewBox={`0 0 ${sparkWidth} ${sparkHeight}`} className="w-full h-full">
            <defs>
              <linearGradient id="qualityLineFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ff7f3f" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ff7f3f" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="#ff7f3f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            <polygon
              fill="url(#qualityLineFill)"
              points={`0,${sparkHeight} ${points} ${sparkWidth},${sparkHeight}`}
            />
            {timelineData.map((point, index) => {
              const x = (index / (timelineData.length - 1)) * sparkWidth;
              const y = sparkHeight - (clamp(point.quality, 0, 100) / 100) * sparkHeight;
              return <circle key={point.batch} cx={x} cy={y} r="5" fill="#ffffff" stroke="#ff7f3f" strokeWidth="3" />;
            })}
          </svg>
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#7a7369] font-semibold mt-1">
          <span>{timelineData[0].batch}</span>
          <span>{formatPercent(stats.qualityScore)}</span>
          <span>{timelineData[timelineData.length - 1].batch}</span>
        </div>
      </div>
    </div>
  );
}
