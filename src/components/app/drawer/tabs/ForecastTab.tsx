import { cn } from '@/lib/utils';
import type { Recommendation } from '@/lib/mock-data';

const FORECAST_CHART = {
  MAX_HEIGHT_PX: 120,
  MIN_BAR_HEIGHT_PX: 4,
  PEAK_WINDOW_SIZE: 2,
} as const;

interface Props {
  rec: Recommendation;
}

/**
 * 14-day demand forecast chart with peak highlighting.
 *
 * Pixel heights instead of percentages because the parent flex column
 * doesn't have an explicit height — height: 100% on the bar would resolve
 * to 0. Using max(val/maxVal * 120, 4) ensures even zero values get a
 * visible 4px nub for visual continuity.
 *
 * Below the chart: two comparison cards showing "without action" vs
 * "with recommendation" outcomes side by side.
 */
export default function ForecastTab({ rec }: Props) {
  return (
    <div className="mt-4 space-y-6">
      <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
        <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">14-Day Demand Forecast</h3>
        
        {(!rec.forecastDays || rec.forecastDays.length === 0) ? (
          <div className="h-32 flex items-center justify-center bg-graphite-50/50 rounded-lg">
            <p className="text-[12px] text-graphite-400 font-medium">No forecast data available</p>
          </div>
        ) : (
          <div className="h-32 flex items-end gap-1">
            {rec.forecastDays.map((val, i) => {
              const maxVal = Math.max(...rec.forecastDays.filter(v => v > 0), 1);
              const peak = rec.forecastDays.indexOf(Math.max(...rec.forecastDays));
              const isPeak = i >= Math.max(0, peak - FORECAST_CHART.PEAK_WINDOW_SIZE) && i <= Math.min(13, peak + FORECAST_CHART.PEAK_WINDOW_SIZE);
              const heightPx = Math.max((val / maxVal) * FORECAST_CHART.MAX_HEIGHT_PX, FORECAST_CHART.MIN_BAR_HEIGHT_PX);
              
              return (
                <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                  <div 
                    className={cn(
                      "w-full rounded-t transition-all duration-700",
                      isPeak ? "bg-indigo-400" : "bg-graphite-200"
                    )}
                    style={{ height: `${heightPx}px` }}
                  />
                </div>
              );
            })}
          </div>
        )}
        
        {/* Day labels */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="flex-1 text-center text-[9px] text-graphite-400 tabular-nums font-mono">
              {i + 1}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between mt-3 text-[10px] font-bold text-graphite-400 uppercase tracking-widest">
          <span>Day 1</span>
          <span className="text-indigo-400">Peak demand window</span>
          <span>Day 14</span>
        </div>
      </div>

      {/* Without vs With comparison */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-5">
          <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2">Without action</p>
          <p className="text-lg font-display font-bold text-rose-600 tabular-nums">{rec.alert ?? 'Action recommended'}</p>
          <p className="text-[11px] text-graphite-500 mt-1 font-medium">{rec.type === 'OVERSTOCK' ? 'Carrying costs accumulating' : 'Stores at risk of zero inventory'}</p>
        </div>
        <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-5">
          <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2">With recommendation</p>
          <p className="text-lg font-display font-bold text-emerald-600 tabular-nums">Covered Day 14+</p>
          <p className="text-[11px] text-graphite-500 mt-1 font-medium">{rec.type === 'OVERSTOCK' ? 'Excess inventory reduced to optimal level' : 'All stores above safety threshold'}</p>
        </div>
      </div>
    </div>
  );
}
