import { Card, CardContent } from "./ui/Card";
import { TomatoData } from "../types";

interface DetailedTableProps {
  data: TomatoData[];
}

export function DetailedTable({ data }: DetailedTableProps) {
  return (
    <div className="h-64 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 overflow-hidden flex flex-col mx-2 mb-4 shrink-0 shadow-sm z-10">
      <div className="px-6 py-4 bg-white/30 border-b border-white/40 flex justify-between items-center backdrop-blur-lg">
        <h3 className="text-[10px] font-semibold uppercase text-[#7a7369] tracking-widest">Detection Registry</h3>
        <span className="text-xs font-medium text-[#1a1a1a] bg-white/60 px-3 py-1 rounded-full shadow-sm">Showing {data.length} items</span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 z-10 bg-white/60 backdrop-blur-xl shadow-sm">
            <tr className="text-[#7a7369] text-[10px] uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">ID</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Confidence</th>
              <th className="px-6 py-3 font-semibold">Size</th>
              <th className="px-6 py-3 font-semibold">Coordinates</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8ded1]/50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-white/50 transition-colors">
                <td className="px-6 py-3 font-mono text-[#1a1a1a] font-medium">{item.id}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase inline-flex items-center gap-1.5 shadow-sm
                    ${item.type === 'Ripe' ? 'bg-[#2e9e4a] text-white' :
                      item.type === 'Unripe' ? 'bg-[#f59e0b] text-white' : 'bg-[#e03131] text-white'
                    }`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-3 font-mono text-[#1a1a1a]">{(item.confidence * 100).toFixed(1)}%</td>
                <td className="px-6 py-3 text-[#1a1a1a]">{item.size}</td>
                <td className="px-6 py-3 text-[#7a7369] font-mono font-medium">({item.position.x}, {item.position.y})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
