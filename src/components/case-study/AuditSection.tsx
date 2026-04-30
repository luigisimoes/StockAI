import React, { useState } from 'react';
import ExpandableSection from './shared/ExpandableSection';
import Lightbox from './shared/Lightbox';

const issues = [
  { n: 1, severity: 'high', title: 'No visible "why" behind recs', screen: 'Step 2', desc: 'The AI proposes +480 units. Zero supporting signals. Maya has nothing to evaluate.' },
  { n: 2, severity: 'high', title: 'No confidence indicator', screen: 'Step 2', desc: 'Every rec looks equally certain. The low-confidence ones are the ones that bite.' },
  { n: 3, severity: 'high', title: 'No constraint check', screen: 'Step 2', desc: 'MOQs, capacity, lead times. None of it visible. Maya has to assume someone checked.' },
  { n: 4, severity: 'med', title: 'No bulk approval', screen: 'Home', desc: '47 recs, reviewed one by one. No multi-select, no triage path.' },
  { n: 5, severity: 'med', title: 'No alternative scenarios', screen: 'Step 2', desc: '"What if I order 300 instead?" requires a manual recalc in another tab.' },
  { n: 6, severity: 'med', title: 'Past decisions invisible', screen: 'Step 3', desc: 'No reference to similar past calls. Same mistake, different week.' },
  { n: 7, severity: 'med', title: 'No external signals', screen: 'Step 2', desc: 'Marathon nearby? Cold snap? Maya finds out from Twitter, not the tool.' },
  { n: 8, severity: 'low', title: 'Cluttered table', screen: 'Home', desc: 'Too many columns competing for attention. No priority sort.' },
];

export default function AuditSection() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <ExpandableSection
      id="audit"
      eyebrow="02 · Design audit"
      title="What's broken in the existing flow."
      summary="I ran the 4-screen flow against three reference patterns: Stripe Radar, Salesforce Einstein, and Microsoft HAX guidelines. 19 issues came out of it, severity-coded. The 8 below are the ones that drove the redesign decisions. Each points at the screen where it lives and the principle it breaks."
      background="cool-gray"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { file: 'home', label: 'Home', caption: 'Replenishment list' },
            { file: 'step-1', label: 'Step 1', caption: 'Pick SKU' },
            { file: 'step-2', label: 'Step 2', caption: 'Configure rec' },
            { file: 'step-3', label: 'Step 3', caption: 'Submit transfer' },
          ].map((screen) => (
            <button
              key={screen.file}
              onClick={() => setLightboxImage(screen.file)}
              className="
                group bg-white border border-graphite-100 rounded-xl p-3 card-shadow
                hover:border-indigo-200 hover:shadow-md transition-all
                text-left cursor-zoom-in
              "
            >
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-graphite-400">
                  {screen.label}
                </p>
                <span className="text-[10px] text-graphite-300 font-mono group-hover:text-indigo-400 transition-colors">
                  click to zoom
                </span>
              </div>
              <img 
                src={`/audit-screenshots/${screen.file}.png`} 
                alt={`Brief ${screen.label}: ${screen.caption}`}
                className="w-full h-auto rounded-lg border border-graphite-100"
                loading="lazy"
              />
              <p className="text-[11px] text-graphite-500 mt-2 px-1 font-medium">
                {screen.caption}
              </p>
            </button>
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

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </ExpandableSection>
  );
}
