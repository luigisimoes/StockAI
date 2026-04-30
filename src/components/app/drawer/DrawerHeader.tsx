import { Sparkles, CheckCircle, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Recommendation } from '@/lib/mock-data';
import DismissReasonPopover from '@/components/app/dialogs/DismissReasonPopover';

interface Props {
  rec: Recommendation;
  onClose: () => void;
  onApprove: () => void;
  onDismiss: (reason: string) => void;
}

/**
 * Sticky white header for the deep-review drawer (Zone 1).
 *
 * Shows product thumbnail (initials), AI badge, confidence tier pill,
 * model version, title, SKU, and the primary action trio (Dismiss,
 * Adjust, Approve). The close X sits absolutely in the top-right corner.
 *
 * The Adjust button focuses the footer's adjustment input via DOM ID
 * rather than lifting state — keeps the header decoupled from footer.
 */
export default function DrawerHeader({ rec, onClose, onApprove, onDismiss }: Props) {
  return (
    <>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-1.5 text-graphite-400 hover:text-graphite-900 hover:bg-graphite-50 rounded-lg transition-colors z-30"
        aria-label="Close drawer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div className="sticky top-0 z-20 bg-white border-b border-graphite-100 px-8 pt-6 pb-5">
        <div className="flex gap-5 pr-10">
          {/* Product Thumbnail */}
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-indigo-50 shrink-0 flex items-center justify-center hairline-border">
            <span className="text-indigo-400 text-lg font-bold font-display">{rec.initials}</span>
          </div>

          {/* Title + Meta */}
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-100">
                <Sparkles className="w-3 h-3" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider">AI Rec</span>
              </div>
              <div className={cn(
                "px-2.5 py-0.5 rounded-full border text-[10px] font-bold tabular-nums",
                rec.confidence.tier === 'high' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                rec.confidence.tier === 'medium' ? "bg-amber-50 text-amber-700 border-amber-200" :
                "bg-rose-50 text-rose-700 border-rose-200"
              )}>
                {rec.confidence.score}% · {rec.confidence.tier.charAt(0).toUpperCase() + rec.confidence.tier.slice(1)}
              </div>
              <span className="text-graphite-400 text-[10px] font-bold uppercase tracking-widest font-mono">Model v3.4</span>
            </div>
            <h2 className="font-display text-xl font-bold text-graphite-900">{rec.title}</h2>
            <p className="text-xs text-graphite-500 font-medium font-mono leading-relaxed">
              <span className="whitespace-nowrap">SKU: {rec.sku}</span>
              <span className="mx-1.5 text-graphite-300">·</span>
              <span className="whitespace-nowrap">{rec.description.split(' · ')[0]}</span>
              <span className="mx-1.5 text-graphite-300">·</span>
              <span className="whitespace-nowrap text-graphite-400">Last synced 2m ago</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <DismissReasonPopover onDismiss={onDismiss}>
            <button className="px-4 py-2 hairline-border rounded-lg text-sm font-semibold text-graphite-700 hover:bg-graphite-50 transition-colors card-shadow">
              Dismiss
            </button>
          </DismissReasonPopover>
          <button
            onClick={() => document.getElementById('adjustment-input')?.focus()}
            className="px-4 py-2 hairline-border rounded-lg text-sm font-semibold text-graphite-700 hover:bg-graphite-50 transition-colors card-shadow"
          >
            Adjust
          </button>
          <button
            onClick={onApprove}
            className="px-5 py-2 bg-indigo-400 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-500 active:scale-[0.98] transition-all"
          >
            Approve
          </button>
        </div>
      </div>
    </>
  );
}
