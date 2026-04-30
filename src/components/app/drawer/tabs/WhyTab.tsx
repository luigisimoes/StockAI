import { Sparkles, CheckCircle, AlertTriangle, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Recommendation } from '@/lib/mock-data';

interface Props {
  rec: Recommendation;
}

/**
 * "Why this rec?" tab — the transparency layer that earns trust.
 *
 * Three floating cards arranged in a 2-column grid:
 * Left column: external signal callout (optional) + top signals with weight bars.
 * Right column: constraints checked (pass/warn icons) + past similar decisions.
 *
 * Each signal weight bar uses opacity on a 1px indigo bar to visually
 * encode relative importance without competing with the actual weight number.
 */
export default function WhyTab({ rec }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      <div className="space-y-6">
        {/* External Signal Callout — only renders when present */}
        {rec.externalSignal && (
          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 card-shadow">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-graphite-900">External Signal: {rec.externalSignal.label}</h4>
                <p className="text-[13px] text-graphite-700 leading-relaxed">{rec.externalSignal.detail}</p>
              </div>
            </div>
          </div>
        )}

        {/* Top Signals — weight bars show relative importance */}
        <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">Top signals &amp; weights</h3>
          <div className="space-y-2.5">
            {rec.signals.map((sig) => (
              <div key={sig.label} className="p-4 bg-graphite-50/50 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-1 h-8 rounded-full bg-indigo-400 shrink-0" style={{ opacity: sig.weight / 100 }} />
                  <div className="min-w-0">
                    <p className="font-bold text-[13px] text-graphite-900 leading-none mb-1 truncate">{sig.label}</p>
                    <p className="text-[11px] text-graphite-500 font-medium truncate">{sig.detail}</p>
                  </div>
                </div>
                <div className="w-28 shrink-0">
                  <div className="flex justify-between text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5">
                    <span>Weight</span>
                    <span className="tabular-nums">{sig.weight}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-graphite-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-400 transition-all duration-1000" style={{ width: `${sig.weight}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Constraints Checked */}
        <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4 flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2} />
            Constraints checked
          </h3>
          <div className="space-y-2.5">
            {rec.constraints.map((c) => (
              <div key={c.label} className="flex items-start gap-2.5 text-[12px] font-medium text-graphite-600 leading-snug">
                {c.status === 'pass' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
                )}
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Past Similar Decisions */}
        <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4 flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-graphite-500" strokeWidth={2} />
            Past similar decisions
          </h3>
          <div className="space-y-2">
            {rec.pastDecisions.map((pd) => (
              <div key={pd.date} className="p-4 bg-graphite-50/50 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest font-mono">{pd.date}</span>
                  <span className="text-emerald-700 font-bold text-[11px] tabular-nums">{pd.roi}</span>
                </div>
                <p className="text-[12px] text-graphite-500 font-medium leading-relaxed">{pd.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
