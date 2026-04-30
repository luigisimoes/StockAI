import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Rendered flowchart comparing current vs proposed user flow.
 *
 * Two parallel columns: gray (current) on the left, indigo (proposed)
 * on the right. Decision diamond in the middle of the proposed flow.
 * Pain point annotations (rose) on current steps, win annotations
 * (emerald) on proposed steps.
 *
 * Supports two render modes:
 * - **inline** (default): compact version inside ExpandableSection
 * - **expanded**: full-viewport lightbox overlay with larger spacing
 *
 * Click-to-expand follows the same pattern as the Lightbox component
 * used by AuditSection, but renders native JSX instead of an image.
 *
 * Mobile fallback at <768px: simplified message since side-by-side
 * columns don't fit narrow screens.
 */
export default function UserFlowDiagram() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Inline version — clickable to expand */}
      <div
        className="bg-white border border-graphite-200 rounded-2xl overflow-hidden card-shadow cursor-zoom-in group relative"
        onClick={() => setExpanded(true)}
        role="button"
        tabIndex={0}
        aria-label="Click to expand user flow diagram"
        onKeyDown={(e) => { if (e.key === 'Enter') setExpanded(true); }}
      >
        {/* Zoom hint overlay */}
        <div className="absolute inset-0 z-10 bg-graphite-900/0 group-hover:bg-graphite-900/5 transition-colors flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-sm border border-graphite-200 rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-indigo-500" strokeWidth={2} />
            <span className="text-[12px] font-bold text-graphite-700">Click to expand</span>
          </div>
        </div>

        <DiagramChrome />

        {/* Mobile fallback */}
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

        {/* Desktop inline diagram */}
        <div className="hidden md:block">
          <FlowDiagramContent compact />
        </div>
      </div>

      {/* Expanded lightbox overlay */}
      <FlowLightbox open={expanded} onClose={() => setExpanded(false)} />
    </>
  );
}

// ─── Lightbox overlay (full-viewport) ───────────────────────────

function FlowLightbox({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-graphite-900/90 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-6 cursor-zoom-out"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Close expanded view"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-[1200px] w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <DiagramChrome />
            <FlowDiagramContent compact={false} />
          </motion.div>

          <p className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-white/60 font-mono tracking-widest uppercase">
            Click anywhere or press Esc to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Browser chrome bar ─────────────────────────────────────────

function DiagramChrome() {
  return (
    <div className="bg-graphite-50 border-b border-graphite-200 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-graphite-300" />
        <div className="w-2 h-2 rounded-full bg-graphite-300" />
        <div className="w-2 h-2 rounded-full bg-graphite-300" />
      </div>
      <span className="text-[10px] text-graphite-400 font-mono ml-2">User flow · before and after</span>
    </div>
  );
}

// ─── Main diagram content ───────────────────────────────────────

function FlowDiagramContent({ compact }: { compact: boolean }) {
  const pad = compact ? 'p-5 lg:p-6' : 'p-8 lg:p-10';
  const gap = compact ? 'gap-4 lg:gap-6' : 'gap-8 lg:gap-12';
  const stepSize = compact ? 'compact' : 'full';

  return (
    <div className={`bg-graphite-50/30 ${pad}`}>
      {/* Legend */}
      <div className="flex justify-center mb-6">
        <div className="bg-white border border-graphite-200 rounded-lg px-4 py-2.5 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            <LegendItem color="bg-graphite-200 border-graphite-300" label="Current step" />
            <LegendItem color="bg-indigo-100 border-indigo-300" label="Proposed step" />
            <LegendItem color="bg-amber-100 border-amber-300" label="Decision" diamond />
            <LegendItem color="bg-rose-100 border-rose-300" label="Pain point" />
            <LegendItem color="bg-emerald-100 border-emerald-300" label="Win" />
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className={`grid grid-cols-2 ${gap}`}>
        {/* ═══════ CURRENT FLOW (LEFT) ═══════ */}
        <div>
          <div className="text-center mb-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-graphite-500 mb-0.5">
              Current flow
            </p>
            <p className="text-[11px] text-graphite-400 font-mono">
              3 screens · ~6 min per rec
            </p>
          </div>

          <div className="flex flex-col items-center space-y-0">
            <FlowStep size={stepSize} variant="current" number="01" title="Open Replenishment" description="List view, no priority sort" />
            <FlowArrow />

            <FlowStep size={stepSize} variant="current" number="02" title="Pick a SKU" description="Click into detail page" />
            <FlowArrow />

            <FlowStep size={stepSize} variant="current" number="03" title="Configure transfer" description="Set quantity, source, destination, date" />
            <div className="flex flex-wrap gap-1.5 py-1.5 justify-center w-full">
              <StickyNote variant="pain">No "why" behind the rec</StickyNote>
              <StickyNote variant="pain">No confidence shown</StickyNote>
            </div>
            <div className="flex justify-center w-full pb-1">
              <StickyNote variant="pain">Switches to Excel for math</StickyNote>
            </div>
            <FlowArrow />

            <FlowStep size={stepSize} variant="current" number="04" title="Submit and exit" description="Manual confirmation, return to list" />
            <div className="flex justify-center w-full py-1.5">
              <StickyNote variant="pain">Past decisions invisible</StickyNote>
            </div>
          </div>

          <p className="text-[11px] italic text-graphite-500 text-center pt-3 font-mono">
            ~6 min per rec · 47 recs/day
          </p>
        </div>

        {/* ═══════ PROPOSED FLOW (RIGHT) ═══════ */}
        <div>
          <div className="text-center mb-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-500 mb-0.5">
              Proposed flow
            </p>
            <p className="text-[11px] text-indigo-400 font-mono">
              1 dashboard + drawer · ~90 sec avg
            </p>
          </div>

          <div className="flex flex-col items-center space-y-0">
            <FlowStep
              size={stepSize}
              variant="proposed"
              number="01"
              title="Open Dashboard"
              description="Queue ranked by impact · triage banner"
            />
            <div className="flex justify-center w-full py-1.5">
              <StickyNote variant="win">Reasoning visible upfront</StickyNote>
            </div>
            <FlowArrow />

            {/* Decision Diamond */}
            <div className="py-2">
              <div
                className="w-[88px] h-[88px] bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-center shadow-sm"
                style={{ transform: 'rotate(45deg)' }}
              >
                <span
                  className="text-[11px] font-bold text-amber-800 leading-tight"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  High<br />confidence?
                </span>
              </div>
            </div>
            <div className="flex justify-center w-full py-1.5">
              <StickyNote variant="win">Confidence honest by tier</StickyNote>
            </div>

            {/* Branches side-by-side */}
            <div className="grid grid-cols-2 gap-2 w-full pt-1">
              {/* Branch A — Yes */}
              <div className="flex flex-col items-center space-y-1.5">
                <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400">Yes ↓</p>
                <FlowStep size={stepSize} variant="proposed" number="02a" title="Bulk approve" description="Multi-select toolbar" small />
              </div>

              {/* Branch B — No */}
              <div className="flex flex-col items-center space-y-1.5">
                <p className="text-[9px] uppercase tracking-widest font-bold text-graphite-400">No ↓</p>
                <FlowStep size={stepSize} variant="proposed" number="02b" title="Open drawer" description="Deep review" small />
                <FlowArrow small />
                <FlowStep size={stepSize} variant="proposed-mini" title="Why this rec?" />
                <FlowStep size={stepSize} variant="proposed-mini" title="Forecast" />
                <FlowStep size={stepSize} variant="proposed-mini" title="Alternatives" />
                <FlowStep size={stepSize} variant="proposed-mini" title="Adjust + Approve" />
              </div>
            </div>

            <FlowArrow />

            <FlowStep size={stepSize} variant="proposed" number="03" title="Next rec" description="Drawer closes, dashboard remains in context" />
            <div className="flex flex-wrap gap-1.5 py-1.5 justify-center w-full">
              <StickyNote variant="win">No Excel context switch</StickyNote>
              <StickyNote variant="win">AI co-pilot answers inline</StickyNote>
            </div>
          </div>

          <p className="text-[11px] italic text-indigo-500 text-center pt-3 font-mono">
            ~90 sec avg · hypothesis pending validation
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────

function LegendItem({ color, label, diamond }: { color: string; label: string; diamond?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-3 h-3 ${diamond ? '' : 'rounded-sm'} ${color} border flex-shrink-0`}
        style={diamond ? { transform: 'rotate(45deg)', width: 10, height: 10 } : undefined}
      />
      <span className="text-[10px] text-graphite-600">{label}</span>
    </div>
  );
}

interface FlowStepProps {
  variant: 'current' | 'proposed' | 'proposed-mini';
  number?: string;
  title: string;
  description?: string;
  small?: boolean;
  size: 'compact' | 'full';
}

function FlowStep({ variant, number, title, description, small, size }: FlowStepProps) {
  const styles = {
    current: 'bg-graphite-100 border-graphite-300 text-graphite-700',
    proposed: 'bg-indigo-50 border-indigo-300 text-indigo-900',
    'proposed-mini': 'bg-indigo-50/70 border-indigo-200 text-indigo-800',
  }[variant];

  const isMini = variant === 'proposed-mini';
  const isFull = size === 'full';

  const padding = isMini || small
    ? (isFull ? 'px-3 py-2' : 'px-2.5 py-1.5')
    : (isFull ? 'px-5 py-3' : 'px-3 py-2');

  return (
    <div className={`border rounded-lg ${styles} ${padding} shadow-sm w-full max-w-[340px]`}>
      {number && (
        <p className={`font-bold uppercase tracking-widest mb-0.5 opacity-60 ${isFull ? 'text-[10px]' : 'text-[9px]'}`}>
          {number}
        </p>
      )}
      <p className={`font-bold leading-tight ${isMini ? 'text-[11px]' : (isFull ? 'text-[14px]' : 'text-[12px]')}`}>
        {title}
      </p>
      {description && (
        <p className={`mt-0.5 opacity-75 leading-snug ${isFull ? 'text-[12px]' : 'text-[10px]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function FlowArrow({ small }: { small?: boolean }) {
  const h = small ? 20 : 28;
  return (
    <div className="flex justify-center text-graphite-400 py-0.5">
      <svg width="16" height={h} viewBox={`0 0 16 ${h}`} fill="none">
        <line x1="8" y1="0" x2="8" y2={h - 6} stroke="currentColor" strokeWidth="1.5" />
        <path d={`M4 ${h - 8} L8 ${h} L12 ${h - 8}`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

interface StickyNoteProps {
  variant: 'pain' | 'win';
  children: React.ReactNode;
}

function StickyNote({ variant, children }: StickyNoteProps) {
  const styles = {
    pain: 'bg-rose-50 border-rose-200 text-rose-700',
    win: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  }[variant];

  const icon = variant === 'pain' ? '⚠' : '✓';

  return (
    <span
      className={`${styles} border rounded px-2 py-0.5 text-[10px] font-medium inline-flex items-center gap-1`}
      style={{ transform: 'rotate(-0.5deg)' }}
    >
      <span className="text-[9px]">{icon}</span>
      {children}
    </span>
  );
}
