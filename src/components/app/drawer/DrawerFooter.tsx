import { Minus, Plus, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  units: number;
  setUnits: (v: number) => void;
  baseUnits: number;
  isOverstock: boolean;
  liveImpact: number;
  onApprove: () => void;
}

/**
 * Sticky command-bar footer for the drawer (Zone 3).
 *
 * Three functional areas in a single row:
 * 1. Adjustment input with +/- steppers (10-unit increments)
 * 2. Range slider showing impact range with current position
 * 3. Live Impact display (emerald/rose) + Approve CTA
 *
 * The live impact recalculates on every drag/keystroke via the parent's
 * state. The approve button includes the unit count for confirmation
 * before click ("+480" baked into the label).
 */
export default function DrawerFooter({ units, setUnits, baseUnits, isOverstock, liveImpact, onApprove }: Props) {
  return (
    <div className="sticky bottom-0 z-20 bg-white border-t border-graphite-200 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] px-8 py-5 flex items-center gap-6 relative">
      {/* Accent line — subtle gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

      {/* Adjustment Input */}
      <div className="shrink-0">
        <label className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest block mb-1.5">Adjustment</label>
        <div className="flex items-center hairline-border rounded-lg overflow-hidden bg-graphite-50 shadow-inner">
          <button
            onClick={() => setUnits(isOverstock ? Math.min(units + 10, -10) : Math.max(10, units - 10))}
            className="px-3 py-2 hover:bg-graphite-200 transition-colors text-graphite-600"
            aria-label="Decrease units"
          >
            <Minus className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <input
            id="adjustment-input"
            type="number"
            className="w-20 text-center border-none focus:ring-0 font-bold text-graphite-900 bg-transparent tabular-nums text-sm"
            value={units}
            onChange={(e) => {
              const v = Number(e.target.value);
              setUnits(isOverstock ? Math.min(v, -10) : Math.max(10, v));
            }}
          />
          <button
            onClick={() => setUnits(isOverstock ? units - 10 : units + 10)}
            className="px-3 py-2 hover:bg-graphite-200 transition-colors text-graphite-600"
            aria-label="Increase units"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest">Impact range</span>
          <span className="text-[11px] font-bold text-indigo-400 tabular-nums">{units > 0 ? '+' : ''}{units.toLocaleString()} units {units === baseUnits ? '(optimal)' : ''}</span>
        </div>
        <input
          type="range"
          className="w-full h-1.5 bg-graphite-100 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          value={isOverstock ? Math.abs(units) : units}
          max={Math.abs(baseUnits) * 2}
          min={isOverstock ? 10 : 10}
          onChange={(e) => setUnits(isOverstock ? -Number(e.target.value) : Number(e.target.value))}
        />
      </div>

      {/* Live Impact + Approve */}
      <div className="flex items-center gap-5 shrink-0">
        <div className="shrink-0 flex flex-col items-start">
          <div className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-0.5">Live impact</div>
          <div className={cn(
            "text-2xl font-display font-bold tabular-nums leading-none",
            liveImpact >= 0 ? "text-emerald-600" : "text-rose-600"
          )}>
            {liveImpact >= 0 ? '+' : '-'}${Math.abs(liveImpact).toLocaleString()}
          </div>
        </div>
        <button
          onClick={onApprove}
          className="bg-indigo-400 text-white hover:bg-indigo-500 active:scale-[0.98] px-6 py-2.5 rounded-lg font-bold text-sm shadow-md shadow-indigo-400/25 transition-all flex items-center gap-2 group whitespace-nowrap"
        >
          Approve · {units > 0 ? '+' : ''}{units.toLocaleString()}
          <Rocket className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
