import { TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Recommendation } from '@/lib/mock-data';

interface Props {
  rec: Recommendation;
  baseUnits: number;
  isOverstock: boolean;
}

/**
 * Top-of-drawer summary cards — 4 categorical metrics at a glance.
 *
 * Each card has a 3px left accent border that signals its role:
 * - Indigo: the recommended action (the "what to do" answer)
 * - Emerald or rose: projected revenue (sign-conditional)
 * - Graphite: neutral inventory metric (days of cover)
 * - Rose: warning of inaction cost
 *
 * Subtle tinted backgrounds keep the cards floating against the
 * cool-gray drawer content zone (#F1F5F9).
 */
export default function DrawerStatCards({ rec, baseUnits, isOverstock }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 flex-shrink-0">
      {/* Recommended Action — indigo accent */}
      <div className="p-4 bg-indigo-50/50 border border-indigo-100 border-l-[3px] border-l-indigo-400 card-shadow rounded-xl">
        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2 leading-tight">Recommended action</p>
        <p className="text-xl font-display font-bold text-indigo-500 tabular-nums">{baseUnits > 0 ? '+' : ''}{baseUnits.toLocaleString()} units</p>
        <p className="text-[11px] text-graphite-500 mt-2 font-medium">{rec.statCard.nextRestockGap}</p>
      </div>

      {/* Projected Revenue — emerald or rose accent */}
      <div className={cn(
        "p-4 border border-l-[3px] card-shadow rounded-xl",
        rec.baseImpact >= 0 
          ? "bg-emerald-50/50 border-emerald-100 border-l-emerald-500" 
          : "bg-rose-50/40 border-rose-100 border-l-rose-500"
      )}>
        <p className={cn(
          "text-[10px] font-bold uppercase tracking-widest mb-2 leading-tight",
          rec.baseImpact >= 0 ? "text-emerald-700" : "text-rose-600"
        )}>Projected revenue</p>
        <p className={cn("text-xl font-display font-bold tabular-nums", rec.baseImpact >= 0 ? "text-emerald-600" : "text-rose-600")}>
          {rec.baseImpact >= 0 ? '+' : '-'}${(Math.abs(rec.baseImpact) / 1000).toFixed(1)}K
        </p>
        <div className={cn("text-[11px] mt-2 font-bold flex items-center gap-1", rec.baseImpact >= 0 ? "text-emerald-600" : "text-graphite-500")}>
          <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
          {rec.statCard.forecastDelta}
        </div>
      </div>

      {/* Days of Cover — graphite accent (neutral, purely informational) */}
      <div className="p-4 bg-white border border-graphite-100 border-l-[3px] border-l-graphite-400 card-shadow rounded-xl">
        <p className="text-[10px] font-bold text-graphite-500 uppercase tracking-widest mb-2 leading-tight">Days of cover</p>
        <div className="text-xl font-display font-bold text-graphite-900 tabular-nums flex items-baseline gap-2">
          {rec.statCard.daysOfCoverCurrent} <ArrowRight className="w-3 h-3 text-graphite-300" strokeWidth={1.5} /> {rec.statCard.daysOfCoverProjected}
        </div>
        <p className="text-[11px] text-graphite-500 mt-2 font-medium">Target: {rec.statCard.coverTarget} days</p>
      </div>

      {/* If you don't act — rose accent (cost of inaction) */}
      <div className="p-4 bg-rose-50/60 border border-rose-100 border-l-[3px] border-l-rose-500 card-shadow rounded-xl">
        <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-2 leading-tight">If you don't act</p>
        <p className="text-xl font-display font-bold text-rose-600 tabular-nums">
          {isOverstock ? '' : '-'}${(Math.abs(rec.baseImpact) / 1000).toFixed(0)}K
        </p>
        <p className="text-[11px] text-rose-600 mt-2 font-bold">{rec.alert ?? 'Action recommended'}</p>
      </div>
    </div>
  );
}
