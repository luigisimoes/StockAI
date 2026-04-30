import React from 'react';

/**
 * Rendered flowchart comparing current vs proposed user flow.
 *
 * Two parallel columns: gray (current) on the left, indigo (proposed)
 * on the right. Decision diamond in the middle of the proposed flow.
 * Pain point sticky notes (rose) on the left, win sticky notes
 * (emerald) on the right. Legend in the top-right corner.
 *
 * All HTML/CSS — no SVG, no images. Importable to FigJam via the
 * /flow-export route + html.to.design plugin.
 *
 * Mobile fallback at <768px: shows simplified vertical card list
 * since side-by-side columns don't fit narrow screens.
 */
export default function UserFlowDiagram() {
  return (
    <div className="bg-white border border-graphite-200 rounded-2xl overflow-hidden card-shadow">
      {/* Browser-style chrome bar */}
      <div className="bg-graphite-50 border-b border-graphite-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-graphite-300" />
            <div className="w-2 h-2 rounded-full bg-graphite-300" />
            <div className="w-2 h-2 rounded-full bg-graphite-300" />
          </div>
          <span className="text-[10px] text-graphite-400 font-mono ml-2">User flow · before and after</span>
        </div>
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
      <div className="hidden md:block bg-graphite-50/30 p-8 relative min-h-[760px]">
        {/* Legend (top-right corner) */}
        <div className="absolute top-6 right-6 bg-white border border-graphite-200 rounded-lg p-3 shadow-sm w-[220px]">
          <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400 mb-2">Legend</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded bg-graphite-200 border border-graphite-300 flex-shrink-0" />
              <span className="text-[10px] text-graphite-700">Current flow step</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded bg-indigo-100 border border-indigo-300 flex-shrink-0" />
              <span className="text-[10px] text-graphite-700">Proposed flow step</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-100 border border-amber-300 flex-shrink-0" style={{ transform: 'rotate(45deg)' }} />
              <span className="text-[10px] text-graphite-700">Decision point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-rose-200 flex-shrink-0" />
              <span className="text-[10px] text-graphite-700">Pain point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-200 flex-shrink-0" />
              <span className="text-[10px] text-graphite-700">Win</span>
            </div>
          </div>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-2 gap-12 max-w-[900px] mx-auto pt-4">
          {/* ═══════ CURRENT FLOW (LEFT) ═══════ */}
          <div className="space-y-3">
            {/* Header */}
            <div className="text-center mb-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-graphite-500 mb-1">
                Current flow
              </p>
              <p className="text-[11px] text-graphite-400 font-mono">
                3 screens · ~6 min per rec
              </p>
            </div>

            {/* Pain points scattered with steps */}
            <FlowStep
              variant="current"
              number="01"
              title="Open Replenishment"
              description="List view, no priority sort"
            />
            <FlowArrow variant="current" />
            <FlowStep
              variant="current"
              number="02"
              title="Pick a SKU"
              description="Click into detail page"
            />
            <FlowArrow variant="current" />
            <div className="relative">
              <FlowStep
                variant="current"
                number="03"
                title="Configure transfer"
                description="Set quantity, source, destination, date"
              />
              {/* Pain points anchored to step 03 */}
              <StickyNote variant="pain" position="left" top="0">
                No "why" behind the rec
              </StickyNote>
              <StickyNote variant="pain" position="left" top="48px">
                No confidence shown
              </StickyNote>
              <StickyNote variant="pain" position="left" top="96px">
                Switches to Excel for math
              </StickyNote>
            </div>
            <FlowArrow variant="current" />
            <div className="relative">
              <FlowStep
                variant="current"
                number="04"
                title="Submit and exit"
                description="Manual confirmation, return to list"
              />
              <StickyNote variant="pain" position="left" top="0">
                Past decisions invisible
              </StickyNote>
            </div>
            <p className="text-[11px] italic text-graphite-500 text-center pt-3 font-mono">
              ~6 min per rec · 47 recs/day
            </p>
          </div>

          {/* ═══════ PROPOSED FLOW (RIGHT) ═══════ */}
          <div className="space-y-3">
            {/* Header */}
            <div className="text-center mb-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-500 mb-1">
                Proposed flow
              </p>
              <p className="text-[11px] text-indigo-400 font-mono">
                1 dashboard + drawer · ~90 sec avg
              </p>
            </div>

            <div className="relative">
              <FlowStep
                variant="proposed"
                number="01"
                title="Open Dashboard"
                description="Queue ranked by impact. Triage banner: 432 auto-approved, 87 review, 12 conflicts"
              />
              <StickyNote variant="win" position="right" top="8px">
                Reasoning visible upfront
              </StickyNote>
            </div>

            <FlowArrow variant="proposed" />

            {/* Decision Diamond */}
            <div className="relative flex justify-center py-2">
              <div className="w-32 h-32 bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-center" style={{ transform: 'rotate(45deg)' }}>
                <span className="text-[12px] font-bold text-amber-800 leading-tight" style={{ transform: 'rotate(-45deg)' }}>
                  High<br/>confidence?
                </span>
              </div>
              <StickyNote variant="win" position="right" top="32px">
                Confidence honest by tier
              </StickyNote>
            </div>

            {/* Branches */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Branch A — Yes */}
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400 text-center">Yes ↓</p>
                <FlowStep
                  variant="proposed"
                  number="02a"
                  title="Bulk approve"
                  description="Multi-select toolbar"
                  small
                />
              </div>

              {/* Branch B — No (with sub-flow) */}
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400 text-center">No ↓</p>
                <FlowStep
                  variant="proposed"
                  number="02b"
                  title="Open drawer"
                  description="Deep review"
                  small
                />
                <FlowArrow variant="proposed" small />
                <FlowStep variant="proposed-mini" title="Why this rec?" />
                <FlowStep variant="proposed-mini" title="Forecast" />
                <FlowStep variant="proposed-mini" title="Alternatives" />
                <FlowStep variant="proposed-mini" title="Adjust + Approve" />
              </div>
            </div>

            <FlowArrow variant="proposed" />

            <div className="relative">
              <FlowStep
                variant="proposed"
                number="03"
                title="Next rec"
                description="Drawer closes, dashboard remains in context"
              />
              <StickyNote variant="win" position="right" top="0">
                No Excel context switch
              </StickyNote>
              <StickyNote variant="win" position="right" top="48px">
                AI co-pilot answers inline
              </StickyNote>
            </div>

            <p className="text-[11px] italic text-indigo-500 text-center pt-3 font-mono">
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
    'proposed-mini': 'bg-indigo-50/70 border-indigo-200 text-indigo-800 text-[11px]',
  }[variant];

  const sizing = small || variant === 'proposed-mini' 
    ? 'px-3 py-2' 
    : 'px-4 py-3';

  return (
    <div className={`border-2 rounded-lg ${styles} ${sizing} card-shadow`}>
      {number && (
        <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5 opacity-70">
          {number}
        </p>
      )}
      <p className={`font-bold ${variant === 'proposed-mini' ? 'text-[11px]' : 'text-[13px]'} leading-tight`}>
        {title}
      </p>
      {description && (
        <p className={`${small ? 'text-[10px]' : 'text-[11px]'} mt-1 opacity-80 leading-snug`}>
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
      <svg width={small ? 12 : 16} height={small ? 16 : 20} viewBox="0 0 16 20" fill="none">
        <path d="M8 0 L8 16 M2 12 L8 18 L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

interface StickyNoteProps {
  variant: 'pain' | 'win';
  position: 'left' | 'right';
  top: string;
  children: React.ReactNode;
}

function StickyNote({ variant, position, top, children }: StickyNoteProps) {
  const styles = {
    pain: 'bg-rose-100 border-rose-200 text-rose-800',
    win: 'bg-emerald-100 border-emerald-200 text-emerald-800',
  }[variant];

  const positionClass = position === 'left' 
    ? 'right-full mr-4' 
    : 'left-full ml-4';

  return (
    <div
      className={`absolute ${positionClass} ${styles} border rounded px-2 py-1 text-[10px] font-medium shadow-sm whitespace-nowrap z-10 max-w-[180px]`}
      style={{ top, transform: 'rotate(-1deg)' }}
    >
      {children}
    </div>
  );
}
