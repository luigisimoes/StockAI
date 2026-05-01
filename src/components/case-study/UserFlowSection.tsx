import React from 'react';
import { ExternalLink } from 'lucide-react';
import ExpandableSection from './shared/ExpandableSection';
import UserFlowDiagram from './UserFlowDiagram';

/**
 * User flow section comparing current 3-screen flow to proposed
 * 1-dashboard + drawer flow.
 *
 * Renders an inline flowchart (UserFlowDiagram) rather than linking
 * out to Figma. The same diagram is also available standalone at
 * /flow-export for html.to.design import into FigJam.
 *
 * The "Open on FigJam" button below the diagram links to the FigJam
 * board version when populated. Until then, points to /flow-export.
 */
export default function UserFlowSection() {
  return (
    <ExpandableSection
      id="user-flow"
      eyebrow="03 · User flow"
      title="From 3 screens to 1 dashboard + drawer."
      summary="The original flow walks Maya through three pages to approve one rec. The new flow puts the queue, the reasoning, and the decision on one surface. Bulk-approve the easy ones, drill into the hard ones via drawer."
      background="white"
    >
      <div className="space-y-8 pt-4">
        <UserFlowDiagram />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {[
            {
              title: 'Reduced cognitive load',
              body: 'From 3 mental models per rec (browse, configure, submit) to 1 (scan dashboard). Drawer adds depth on demand.',
            },
            {
              title: 'Bulk capability',
              body: "Maya's 47-rec queue gets triaged. High-confidence recs auto-approved or batch-approved. She focuses attention on the 12-15 recs that genuinely need it.",
            },
            {
              title: 'Context preserved',
              body: 'Every approval decision happens with full reasoning visible. No tab switching to Excel. No lost context.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-graphite-100 rounded-xl p-5 card-shadow">
              <p className="text-sm font-bold text-graphite-900 mb-2">{card.title}</p>
              <p className="text-[13px] text-graphite-600 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <a
            href="https://www.figma.com/board/EYJhP2XZEb3YX2tSeMXxdE/StockAI-Replenishment-%E2%80%94-Foundey-Senior-PD-Challenge?node-id=0-1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-graphite-200 rounded-lg text-sm font-bold text-graphite-700 hover:bg-graphite-50 hover:border-graphite-300 transition-colors card-shadow"
          >
            <span>Open the full board on FigJam</span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </ExpandableSection>
  );
}