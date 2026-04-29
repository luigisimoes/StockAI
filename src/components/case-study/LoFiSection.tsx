import React from 'react';
import ExpandableSection from './ExpandableSection';

export default function LoFiSection() {
  return (
    <ExpandableSection
      id="lo-fi"
      eyebrow="04 · Lo-fi wireframes"
      title="5 sketches, 1 hour, before pixels."
      summary="Before opening Figma I drew 5 wireframes by hand to lock the dashboard structure. Stat cards row → AI strip → tabs → content. The drawer concept came out of trying (and failing) to make a 4th screen for deep review."
      background="cool-gray"
    >
      <div className="space-y-6">
        <div className="bg-graphite-50 border border-dashed border-graphite-200 rounded-xl p-8 text-center">
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-2">
            Wireframes
          </p>
          <p className="text-sm text-graphite-600">
            Available in the Figma file — Page "Lo-fi"
          </p>
        </div>

        <div className="bg-white border border-graphite-100 rounded-xl p-6">
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-3">
            Key decisions made at lo-fi
          </p>
          <ul className="space-y-2 text-sm text-graphite-700">
            <li>• Drawer over modal — preserves dashboard context</li>
            <li>• Tabs inside drawer over scroll — Why/Forecast/Alts/Activity</li>
            <li>• Bulk approve as toolbar — appears only on multi-select</li>
            <li>• AI panel persistent inline — not popup</li>
            <li>• Decision footer always visible — adjustment + approve</li>
          </ul>
        </div>
      </div>
    </ExpandableSection>
  );
}
