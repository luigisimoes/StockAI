import React from 'react';
import ExpandableSection from './ExpandableSection';
import { TrendingDown, TrendingUp, Clock } from 'lucide-react';

export default function OutcomesSection() {
  return (
    <ExpandableSection
      id="outcomes"
      eyebrow="06 · Outcomes & metrics"
      title="What this would unlock — grounded in industry data."
      summary="The hypothesis behind the redesign is grounded in published benchmarks. AI-driven replenishment with transparency layers has been shown to reduce review time, drop stockouts, and recover lost sales. These aren't claims about this prototype — they're the targets the design is engineered to hit."
      background="cool-gray"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              icon: Clock,
              metric: '75%',
              label: 'Replenishment time reduction',
              source: 'Hackett Group / Nextail benchmark, 2023'
            },
            { 
              icon: TrendingDown,
              metric: '24%',
              label: 'Stockout drop after AI rollout',
              source: 'River Island × Nextail, 18 mo case study'
            },
            { 
              icon: TrendingUp,
              metric: '1.2-1.9 pts',
              label: 'Gross margin uplift',
              source: 'Bain & Co. AI in retail, 2024'
            },
          ].map((b) => (
            <div key={b.label} className="bg-white border border-graphite-100 rounded-xl p-6 card-shadow">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-indigo-500" strokeWidth={1.5} />
              </div>
              <p className="font-display text-3xl font-bold text-graphite-900 mb-1 tabular-nums">{b.metric}</p>
              <p className="text-sm font-bold text-graphite-700 mb-2">{b.label}</p>
              <p className="text-[11px] text-graphite-400 font-mono leading-relaxed">{b.source}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-[11px] uppercase tracking-widest font-bold text-amber-700 mb-2">
            Hypothesis, not proof
          </p>
          <p className="text-sm text-graphite-700 leading-relaxed">
            These benchmarks are from published industry case studies, not measurements of this prototype. A real validation would require A/B testing in production with Maya's actual queue. The redesign is built to align with these benchmarks, but the proof is downstream.
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
