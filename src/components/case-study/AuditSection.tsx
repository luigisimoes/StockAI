import React from 'react';
import ExpandableSection from './ExpandableSection';

const issues = [
  { n: 1, severity: 'high', title: 'No visible "why" behind recs', screen: 'Step 2', desc: 'AI proposes +480 units with zero supporting signals. Maya can\'t evaluate.' },
  { n: 2, severity: 'high', title: 'No confidence indicator', screen: 'Step 2', desc: 'All recs look equally certain. Low-confidence calls are dangerous.' },
  { n: 3, severity: 'high', title: 'No constraint check', screen: 'Step 2', desc: 'Doesn\'t show whether MOQs, capacity, lead times were validated.' },
  { n: 4, severity: 'med', title: 'No bulk approval', screen: 'Step 1', desc: '47 recs reviewed one-by-one, no multi-select.' },
  { n: 5, severity: 'med', title: 'No alternative scenarios', screen: 'Step 2', desc: '"What if I order 300 instead?" requires manual recalc.' },
  { n: 6, severity: 'med', title: 'Past decisions invisible', screen: 'Step 3', desc: 'No reference to similar past situations and outcomes.' },
  { n: 7, severity: 'med', title: 'No external signals', screen: 'Step 2', desc: 'Marathon nearby? Cold snap? Maya finds out from Twitter.' },
  { n: 8, severity: 'low', title: 'Cluttered table', screen: 'Step 1', desc: 'Too many columns, no priority sort.' },
];

export default function AuditSection() {
  return (
    <ExpandableSection
      id="audit"
      eyebrow="02 · Design audit"
      title="What's broken in the existing flow."
      summary="I audited the 3-screen Replenishment flow against established AI co-pilot UX patterns from Stripe Radar, Salesforce Einstein, and Microsoft HAX guidelines. Mapped 19 issues across the 3 screens, severity-coded. Top 8 listed below — each maps to a specific screen and a clear principle violated."
      background="cool-gray"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['step-1', 'step-2', 'step-3'].map((step, i) => (
            <div key={step} className="bg-white border border-graphite-100 rounded-xl p-3 card-shadow">
              <p className="text-[10px] uppercase tracking-widest font-bold text-graphite-400 mb-2 px-1">
                Brief screen {i + 1}
              </p>
              <div className="w-full h-40 rounded-lg border border-graphite-100 bg-graphite-50 flex items-center justify-center">
                <span className="text-[11px] text-graphite-400 font-mono">Screen {i + 1} — see brief</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">
            Top 8 issues (of 19 total)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {issues.map((issue) => (
              <div key={issue.n} className="flex gap-3 p-4 bg-white border border-graphite-100 rounded-lg">
                <div className={`
                  shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[11px]
                  ${issue.severity === 'high' ? 'bg-rose-100 text-rose-600' : 
                    issue.severity === 'med' ? 'bg-amber-100 text-amber-700' : 
                    'bg-graphite-100 text-graphite-500'}
                `}>
                  {String(issue.n).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-graphite-900 leading-tight">{issue.title}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-graphite-400 mt-0.5 mb-1">
                    {issue.screen}
                  </p>
                  <p className="text-[13px] text-graphite-600 leading-relaxed">{issue.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
}
