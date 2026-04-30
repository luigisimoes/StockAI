import React from 'react';
import UserFlowDiagram from '@/components/case-study/UserFlowDiagram';

/**
 * Standalone export page for the User Flow diagram.
 *
 * Renders ONLY the flowchart without any surrounding case study
 * chrome. Used to capture clean Figma/FigJam imports via the
 * html.to.design plugin.
 */
export default function FlowExportPage() {
  return (
    <div className="min-h-screen bg-white text-graphite-900">
      <main id="main-content" className="py-12 px-6">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-500 mb-4">
            03 · User flow
          </p>
          <h2 className="font-display text-3xl font-bold text-graphite-900 mb-6">
            From 3 screens to 1 dashboard + drawer.
          </h2>
          <UserFlowDiagram />
        </div>
      </main>
    </div>
  );
}
