import React from 'react';

/**
 * Rendered flowchart comparing current vs proposed user flow.
 *
 * Two parallel columns: gray (current) on the left, indigo (proposed)
 * on the right. Decision diamond in the middle of the proposed flow.
 * Pain point annotations (rose) on current steps, win annotations
 * (emerald) on proposed steps. Legend below the header.
 *
 * All HTML/CSS — no SVG dependencies, no images. Importable to FigJam
 * via the /flow-export route + html.to.design plugin.
 *
 * Sticky notes are rendered INLINE beneath their parent step to avoid
 * absolute-positioning overflow. The diagram fits within the 900px
 * ExpandableSection container at all breakpoints.
 *
 * Mobile fallback at <768px: simplified vertical card list since
 * side-by-side columns don't fit narrow screens.
 */
export default function UserFlowDiagram() {
  return (
    <div className="bg-white border border-graphite-200 rounded-2xl overflow-hidden card-shadow">
      {/* Browser-style chrome bar */}
      <div className="bg-graphite-50 border-b border-graphite-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-graphite-300" />
          <div className="w-2 h-2 rounded-full bg-graphite-300" />
          <div className="w-2 h-2 rounded-full bg-graphite-300" />
        </div>
        <span className="text-[10px] text-graphite-400 font-mono ml-2">User flow · before and after</span>
      </div>

      {/* Mobile fallback — under 768px */}
      <div className="md:hidden bg-graphite-50/50 px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-white border border-graphite-200 flex items-center justify-center mb-4 card-shadow">
          <svg className="w-6 h-6 text-graphite-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <line x1="8" y1="20" x2="16" y2="20" />
            <line x1="12" y1="18" x2="12" y2="20" />
          </svg>
        </div>
        <p className="text-sm font-bold text-graphite-900 mb-1">Wide layout, desktop only</p>
        <p className="text-[12px] text-graphite-500 leading-relaxed max-w-[280px]">
          The flowchart compares two parallel user paths side-by-side. Open at 768px+ to see the full diagram.
        </p>
      </div>

      {/* Desktop diagram — at 768px+ */}
      <div className="hidden md:block bg-graphite-50/30 p-6 lg:p-8">
        {/* Legend (inline, not absolute) */}
        <div className="flex justify-end mb-6">
          <div className="bg-white border border-graphite-200 rounded-lg p-3 shadow-sm">
            <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400 mb-2">Legend</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-2.5 rounded bg-graphite-200 border border-graphite-300 flex-shrink-0" />
                <span className="text-[10px] text-graphite-600">Current step</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-2.5 rounded bg-indigo-100 border border-indigo-300 flex-shrink-0" />
                <span className="text-[10px] text-graphite-600">Proposed step</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-amber-100 border border-amber-300 flex-shrink-0" style={{ transform: 'rotate(45deg)' }} />
                <span className="text-[10px] text-graphite-600 ml-0.5">Decision</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-rose-100 border border-rose-300 flex-shrink-0" />
                <span className="text-[10px] text-graphite-600">Pain point</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300 flex-shrink-0" />
                <span className="text-[10px] text-graphite-600">Win</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-2 gap-6 lg:gap-10">
          {/* ═══════ CURRENT FLOW (LEFT) ═══════ */}
          <div className="space-y-2.5">
            <div className="text-center mb-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-graphite-500 mb-0.5">
                Current flow
              </p>
              <p className="text-[11px] text-graphite-400 font-mono">
                3 screens · ~6 min per rec
              </p>
            </div>

            <FlowStep variant="current" number="01" title="Open Replenishment" description="List view, no priority sort" />
            <FlowArrow variant="current" />

            <FlowStep variant="current" number="02" title="Pick a SKU" description="Click into detail page" />
            <FlowArrow variant="current" />

            <FlowStep variant="current" number="03" title="Configure transfer" description="Set quantity, source, destination, date" />
            <StickyNote variant="pain">No &quot;why&quot; behind the rec</StickyNote>
            <StickyNote variant="pain">No confidence score shown</StickyNote>
            <StickyNote variant="pain">Switches to Excel for math</StickyNote>
            <FlowArrow variant="current" />

            <FlowStep variant="current" number="04" title="Submit and exit" description="Manual confirmation, return to list" />
            <StickyNote variant="pain">Past decisions invisible</StickyNote>

            <p className="text-[11px] italic text-graphite-500 text-center pt-2 font-mono">
              ~6 min per rec · 47 recs/day
            </p>
          </div>

          {/* ═══════ PROPOSED FLOW (RIGHT) ═══════ */}
          <div className="space-y-2.5">
            <div className="text-center mb-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-500 mb-0.5">
                Proposed flow
              </p>
              <p className="text-[11px] text-indigo-400 font-mono">
                1 dashboard + drawer · ~90 sec avg
              </p>
            </div>

            <FlowStep
              variant="proposed"
              number="01"
              title="Open Dashboard"
              description="Queue ranked by impact. Triage: 432 auto-approved, 87 review, 12 conflicts"
            />
            <StickyNote variant="win">Reasoning visible upfront</StickyNote>
            <FlowArrow variant="proposed" />

            {/* Decision Diamond */}
            <div className="flex justify-center py-1">
              <div className="w-24 h-24 lg:w-28 lg:h-28 bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-center shadow-sm" style={{ transform: 'rotate(45deg)' }}>
                <span className="text-[11px] lg:text-[12px] font-bold text-amber-800 leading-tight" style={{ transform: 'rotate(-45deg)' }}>
                  High<br/>confidence?
                </span>
              </div>
            </div>
            <StickyNote variant="win">Confidence honest by tier</StickyNote>

            {/* Branches */}
            <div className="grid grid-cols-2 gap-2 lg:gap-3">
              {/* Branch A — Yes */}
              <div className="space-y-1.5">
                <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400 text-center">Yes ↓</p>
                <FlowStep variant="proposed" number="02a" title="Bulk approve" description="Multi-select toolbar" small />
              </div>

              {/* Branch B — No */}
              <div className="space-y-1.5">
                <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400 text-center">No ↓</p>
                <FlowStep variant="proposed" number="02b" title="Open drawer" description="Deep review" small />
                <FlowArrow variant="proposed" small />
                <FlowStep variant="proposed-mini" title="Why this rec?" />
                <FlowStep variant="proposed-mini" title="Forecast" />
                <FlowStep variant="proposed-mini" title="Alternatives" />
                <FlowStep variant="proposed-mini" title="Adjust + Approve" />
              </div>
            </div>

            <FlowArrow variant="proposed" />

            <FlowStep variant="proposed" number="03" title="Next rec" description="Drawer closes, dashboard remains in context" />
            <StickyNote variant="win">No Excel context switch</StickyNote>
            <StickyNote variant="win">AI co-pilot answers inline</StickyNote>

            <p className="text-[11px] italic text-indigo-500 text-center pt-2 font-mono">
              ~90 sec avg · hypothesis pending validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────

interface FlowStepProps {
  variant: 'current' | 'proposed' | 'proposed-mini';
  number?: string;
  title: string;
  description?: string;
  small?: boolean;
}

function FlowStep({ variant, number, title, description, small }: FlowStepProps) {
  const styles = {
    current: 'bg-graphite-100 border-graphite-300 text-graphite-700',
    proposed: 'bg-indigo-50 border-indigo-300 text-indigo-900',
    'proposed-mini': 'bg-indigo-50/70 border-indigo-200 text-indigo-800',
  }[variant];

  const sizing = small || variant === 'proposed-mini'
    ? 'px-3 py-1.5'
    : 'px-3 py-2.5 lg:px-4 lg:py-3';

  return (
    <div className={`border rounded-lg ${styles} ${sizing} shadow-sm`}>
      {number && (
        <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5 opacity-60">
          {number}
        </p>
      )}
      <p className={`font-bold leading-tight ${variant === 'proposed-mini' ? 'text-[11px]' : 'text-[12px] lg:text-[13px]'}`}>
        {title}
      </p>
      {description && (
        <p className={`mt-0.5 opacity-75 leading-snug ${small ? 'text-[10px]' : 'text-[10px] lg:text-[11px]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function FlowArrow({ variant, small }: { variant: 'current' | 'proposed'; small?: boolean }) {
  const color = variant === 'current' ? 'text-graphite-400' : 'text-indigo-400';
  return (
    <div className={`flex justify-center ${color}`}>
      <svg width={small ? 10 : 14} height={small ? 14 : 18} viewBox="0 0 14 18" fill="none">
        <path d="M7 0 L7 14 M2 10 L7 16 L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

interface StickyNoteProps {
  variant: 'pain' | 'win';
  children: React.ReactNode;
}

/**
 * Inline sticky note — renders as a small tag beneath the parent step.
 * No absolute positioning, so it stays within the flow and never overflows.
 */
function StickyNote({ variant, children }: StickyNoteProps) {
  const styles = {
    pain: 'bg-rose-50 border-rose-200 text-rose-700',
    win: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  }[variant];

  const icon = variant === 'pain' ? '⚠' : '✓';

  return (
    <div className={`${styles} border rounded px-2.5 py-1 text-[10px] font-medium inline-flex items-center gap-1.5 ml-4`}
      style={{ transform: 'rotate(-0.5deg)' }}
    >
      <span className="text-[9px]">{icon}</span>
      {children}
    </div>
  );
}
