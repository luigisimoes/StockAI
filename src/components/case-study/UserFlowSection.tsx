import React from 'react';
import ExpandableSection from './ExpandableSection';

export default function UserFlowSection() {
  return (
    <ExpandableSection
      id="user-flow"
      eyebrow="03 · User flow"
      title="From 3 screens to 1 dashboard + drawer."
      summary="The original flow walks Maya through three pages to approve one rec. The new flow puts the queue, the reasoning, and the decision on one surface. Scan, click, approve. Open the drawer when a rec needs more thought."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-graphite-100 rounded-xl p-6 card-shadow">
            <p className="text-[11px] uppercase tracking-widest font-bold text-rose-500 mb-3">
              Current flow (3 screens)
            </p>
            <div className="space-y-3 text-sm">
              {['Browse SKU list', 'Click into SKU detail', 'Configure the transfer', 'Submit, exit, repeat 47 times'].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-graphite-100 flex items-center justify-center text-[10px] font-bold font-mono text-graphite-500">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-graphite-700">{s}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-graphite-500 mt-4 font-mono">~6 min per rec · 47 recs/day</p>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 card-shadow">
            <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-600 mb-3">
              Proposed flow (1 + drawer)
            </p>
            <div className="space-y-3 text-sm">
              {['Open the dashboard, scan the queue', 'Bulk-approve the high-confidence batch', 'Open the drawer for high-stakes recs', 'Adjust inline, approve, next'].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-bold font-mono text-indigo-700">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-graphite-900">{s}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-indigo-600 mt-4 font-mono font-bold">~90 sec avg per rec, hypothesis pending validation</p>
          </div>
        </div>

        <div className="bg-graphite-50 border border-dashed border-graphite-200 rounded-xl p-8 text-center">
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-2">
            Detailed flow diagram
          </p>
          <p className="text-sm text-graphite-600">
            Available in the Figma file, page "User Flow"
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
