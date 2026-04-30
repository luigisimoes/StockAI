import { cn } from '@/lib/utils';
import type { Recommendation } from '@/lib/mock-data';

interface Props {
  rec: Recommendation;
}

/**
 * Alternative scenarios tab — shows what other options the AI considered.
 *
 * Three scenarios (Conservative, Recommended, Aggressive) rendered as
 * horizontal cards. The "Recommended" card gets an indigo background
 * and a "Current" pill to make the AI's pick visually obvious without
 * reading the numbers.
 */
export default function AlternativesTab({ rec }: Props) {
  return (
    <div className="mt-4 space-y-4">
      {rec.alternatives.map((alt) => {
        const isRec = alt.label === 'Recommended';
        return (
          <div key={alt.label} className={cn(
            "p-5 rounded-xl card-shadow flex items-center justify-between",
            isRec ? "bg-indigo-50 border border-indigo-200" : "bg-white border border-graphite-100"
          )}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-bold text-graphite-900">{alt.label}</h4>
                {isRec && <span className="text-[10px] font-bold text-indigo-400 bg-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span>}
              </div>
              <p className="text-[13px] text-graphite-500 font-medium">{alt.units > 0 ? '+' : ''}{alt.units.toLocaleString()} units · {alt.coverage} coverage · Risk: {alt.risk}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-display font-bold tabular-nums text-graphite-900">{alt.revenue >= 0 ? '' : '-'}${(Math.abs(alt.revenue) / 1000).toFixed(1)}K</p>
              <p className="text-[11px] text-graphite-400 font-medium">projected impact</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
