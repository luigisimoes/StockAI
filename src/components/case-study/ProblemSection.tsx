import React from 'react';
import ExpandableSection from './shared/ExpandableSection';

const principles = [
  { n: '01', title: 'Show the work', desc: 'Every rec carries its signals, constraints, and past comparisons up front.' },
  { n: '02', title: 'Adjustable, not absolute', desc: 'Maya can override the units inline without losing the AI context.' },
  { n: '03', title: 'Honest confidence', desc: 'Low-confidence recs say so. No false certainty.' },
  { n: '04', title: 'Past decisions teach', desc: 'Surface similar past calls and what happened next.' },
  { n: '05', title: 'AI on tap, not in the way', desc: 'The co-pilot is always there, never blocks the workflow.' },
];

export default function ProblemSection() {
  return (
    <ExpandableSection
      id="problem"
      eyebrow="01 · Problem framing"
      title="Inventory managers don't trust AI black boxes."
      summary="The existing flow shows a recommended quantity and asks Maya to trust it. No signals, no constraints checked, no past comparisons. So she opens Excel, rebuilds the math, and approves what she already would have approved on her own. The AI is invisible labor she has to redo."
    >
      <div className="space-y-8">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
          <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-500 mb-3">
            The HMW question
          </p>
          <p className="font-display text-2xl text-graphite-900 leading-snug font-bold">
            How might we make every AI rec carry its reasoning, so Maya approves in 90 seconds instead of rebuilding the math in Excel?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-graphite-100 rounded-xl p-6 card-shadow">
            <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-2">Persona</p>
            <h3 className="font-display text-xl font-bold text-graphite-900 mb-1">Maya Chen</h3>
            <p className="text-sm text-graphite-500 mb-4">Senior Inventory Manager · 8 yrs</p>
            <p className="text-sm text-graphite-700 leading-relaxed">
              1,200 SKUs, 8 warehouses, 8 years on the job. Got burned in 2023 when an AI tool told her to buy six months of summer dresses in October. The Excel sheet she built that weekend is still her source of truth.
            </p>
          </div>

          <div className="bg-white border border-graphite-100 rounded-xl p-6 card-shadow">
            <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-2">Day in the life</p>
            <ul className="space-y-2 text-sm text-graphite-700">
              <li><span className="font-mono text-graphite-400">07:30</span> · Coffee. Scans overnight email alerts.</li>
              <li><span className="font-mono text-graphite-400">08:00</span> · Opens StockAI. 47 new recs waiting.</li>
              <li><span className="font-mono text-graphite-400">08:15</span> · Switches to Excel to validate the first one.</li>
              <li><span className="font-mono text-graphite-400">11:30</span> · Approved 12 of 47 by lunch.</li>
              <li><span className="font-mono text-graphite-400">15:00</span> · Calls a supplier on a rec she dismissed an hour ago.</li>
            </ul>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">
            5 design principles guiding the redesign
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {principles.map((p) => (
              <div key={p.n} className="bg-white border border-graphite-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-[11px] font-bold font-mono text-indigo-400">{p.n}</span>
                  <div>
                    <p className="text-sm font-bold text-graphite-900 mb-0.5">{p.title}</p>
                    <p className="text-[13px] text-graphite-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
}
