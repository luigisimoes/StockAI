import React from 'react';
import LoFiSectionRaw from '@/components/case-study/LoFiSectionRaw';

/**
 * Standalone export page for the Lo-fi wireframes.
 *
 * Renders ONLY the 2 wireframes (Dashboard + Drawer) without any
 * surrounding case study chrome. Uses LoFiSectionRaw (without
 * ExpandableSection wrapper) so wireframes display immediately
 * without a "Read more" click.
 *
 * Used to capture clean Figma imports via the html.to.design plugin.
 * Point the plugin at /lofi-export and it imports both wireframes
 * as editable frames.
 */
export default function LoFiExportPage() {
  return (
    <div className="min-h-screen bg-white text-graphite-900">
      <main id="main-content">
        <LoFiSectionRaw />
      </main>
    </div>
  );
}
