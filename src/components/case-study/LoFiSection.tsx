import React from 'react';
import ExpandableSection from './ExpandableSection';

export default function LoFiSection() {
  return (
    <ExpandableSection
      id="lo-fi"
      eyebrow="04 · Lo-fi wireframes"
      title="Blocks before pixels."
      summary="Before opening Figma I locked the structure with simple block wireframes. Stat cards row, AI strip, tabs, content. The drawer came out of trying to fit deep review into a fourth screen and realizing a slide-over was the right answer."
      background="cool-gray"
    >
      <div className="space-y-12">
        {/* ─── WIREFRAME 1: DASHBOARD ─── */}
        <div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">
            Wireframe 01 · Opportunity Dashboard
          </p>
          
          <div className="bg-white border border-graphite-200 rounded-xl overflow-hidden card-shadow">
            <div className="bg-graphite-50 border-b border-graphite-200 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-graphite-300" />
                <div className="w-2 h-2 rounded-full bg-graphite-300" />
                <div className="w-2 h-2 rounded-full bg-graphite-300" />
              </div>
              <span className="text-[10px] text-graphite-400 font-mono ml-2">Dashboard wireframe</span>
            </div>

            <div className="bg-graphite-50/50 p-4 flex gap-4 min-h-[420px]">
              {/* Sidebar */}
              <div className="w-32 bg-white border border-graphite-200 rounded-lg p-3 flex-shrink-0 space-y-2">
                <div className="h-6 bg-graphite-200 rounded" />
                <div className="h-1 bg-graphite-100 rounded mt-3" />
                <div className="space-y-1.5 pt-2">
                  <div className="h-5 bg-graphite-100 rounded" />
                  <div className="h-5 bg-indigo-200 rounded" />
                  <div className="h-5 bg-graphite-100 rounded" />
                  <div className="h-5 bg-graphite-100 rounded" />
                  <div className="h-5 bg-graphite-100 rounded" />
                </div>
              </div>

              {/* Main column */}
              <div className="flex-1 space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 h-8 bg-white border border-graphite-200 rounded-lg" />
                  <div className="w-20 h-8 bg-graphite-200 rounded-lg" />
                  <div className="w-20 h-8 bg-graphite-200 rounded-lg" />
                  <div className="w-8 h-8 bg-graphite-200 rounded-full" />
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="h-3 w-32 bg-graphite-300 rounded" />
                  <div className="h-5 w-64 bg-graphite-700 rounded" />
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 bg-white border border-graphite-200 rounded-lg p-2 space-y-1">
                      <div className="h-1.5 w-12 bg-graphite-200 rounded" />
                      <div className="h-5 w-16 bg-graphite-300 rounded mt-2" />
                      <div className="h-1 w-10 bg-graphite-100 rounded" />
                    </div>
                  ))}
                </div>

                <div className="h-8 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center gap-1.5 px-2">
                  <div className="h-3 w-12 bg-indigo-200 rounded" />
                  <div className="h-3 w-16 bg-graphite-200 rounded" />
                  <div className="h-3 w-14 bg-graphite-200 rounded" />
                  <div className="h-3 w-10 bg-graphite-200 rounded" />
                </div>

                <div className="bg-white border border-graphite-200 rounded-lg overflow-hidden">
                  <div className="bg-graphite-50 border-b border-graphite-200 px-3 py-1.5 flex gap-3">
                    <div className="h-2 w-3 bg-graphite-300 rounded" />
                    <div className="h-2 w-20 bg-graphite-300 rounded" />
                    <div className="h-2 flex-1 bg-graphite-300 rounded" />
                    <div className="h-2 w-12 bg-graphite-300 rounded" />
                    <div className="h-2 w-10 bg-graphite-300 rounded" />
                    <div className="h-2 w-14 bg-graphite-300 rounded" />
                  </div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="border-b border-graphite-100 px-3 py-2 flex gap-3 items-center">
                      <div className="h-3 w-3 border border-graphite-300 rounded" />
                      <div className="h-3 w-20 bg-graphite-200 rounded" />
                      <div className="h-3 flex-1 bg-graphite-100 rounded" />
                      <div className="h-3 w-12 bg-graphite-200 rounded" />
                      <div className="h-3 w-10 bg-emerald-200 rounded-full" />
                      <div className="h-5 w-14 bg-indigo-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-graphite-500 font-mono mt-3">
            Sidebar · Top bar · 4 stat cards · Filter chips · Sortable rec table · Bulk action footer (appears on multi-select)
          </p>
        </div>

        {/* ─── WIREFRAME 2: DRAWER ─── */}
        <div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">
            Wireframe 02 · Deep Review Drawer
          </p>

          <div className="bg-white border border-graphite-200 rounded-xl overflow-hidden card-shadow">
            <div className="bg-graphite-50 border-b border-graphite-200 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-graphite-300" />
                <div className="w-2 h-2 rounded-full bg-graphite-300" />
                <div className="w-2 h-2 rounded-full bg-graphite-300" />
              </div>
              <span className="text-[10px] text-graphite-400 font-mono ml-2">Drawer wireframe, 3 zones</span>
            </div>

            <div className="bg-graphite-100 p-6 flex justify-end">
              <div className="w-full max-w-[680px] bg-white border border-graphite-200 rounded-xl overflow-hidden flex flex-col" style={{ minHeight: '500px' }}>
                {/* ZONE 1: Header */}
                <div className="bg-white border-b-2 border-graphite-200 p-4 space-y-3 relative">
                  <div className="absolute top-2 right-2 w-3 h-3 border border-graphite-300 rounded-sm" />
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-indigo-100 border border-indigo-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-12 bg-indigo-200 rounded-full" />
                        <div className="h-3 w-14 bg-emerald-200 rounded-full" />
                        <div className="h-2 w-12 bg-graphite-200 rounded mt-0.5" />
                      </div>
                      <div className="h-4 w-48 bg-graphite-700 rounded" />
                      <div className="h-2 w-64 bg-graphite-200 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <div className="h-7 w-16 bg-white border border-graphite-200 rounded-md" />
                    <div className="h-7 w-14 bg-white border border-graphite-200 rounded-md" />
                    <div className="h-7 w-20 bg-indigo-300 rounded-md" />
                  </div>
                  <div className="absolute top-1 right-12 text-[8px] uppercase tracking-widest font-bold text-graphite-400">
                    Zone 1 · Header
                  </div>
                </div>

                {/* ZONE 2: Content */}
                <div className="flex-1 p-4 space-y-3 relative" style={{ backgroundColor: '#F1F5F9' }}>
                  <div className="absolute top-1 right-2 text-[8px] uppercase tracking-widest font-bold text-graphite-400">
                    Zone 2 · Content
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 bg-white border border-graphite-200 rounded-lg p-2 space-y-1 shadow-sm">
                        <div className="h-1.5 w-10 bg-graphite-200 rounded" />
                        <div className="h-4 w-12 bg-graphite-300 rounded mt-1" />
                        <div className="h-1 w-8 bg-graphite-100 rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="h-10 bg-gradient-to-r from-indigo-50 to-white border border-indigo-200 rounded-lg flex items-center gap-2 px-3">
                    <div className="w-5 h-5 bg-indigo-300 rounded-md flex-shrink-0" />
                    <div className="h-2 w-16 bg-graphite-300 rounded" />
                    <div className="flex-1" />
                    <div className="h-5 w-20 bg-white border border-indigo-200 rounded-full" />
                    <div className="h-5 w-20 bg-white border border-indigo-200 rounded-full" />
                    <div className="h-2 w-6 bg-indigo-300 rounded" />
                  </div>

                  <div className="flex gap-1 border-b border-graphite-200 pb-1">
                    <div className="h-6 w-20 bg-indigo-200 rounded-t" />
                    <div className="h-6 w-16 bg-graphite-100 rounded-t" />
                    <div className="h-6 w-20 bg-graphite-100 rounded-t" />
                    <div className="h-6 w-14 bg-graphite-100 rounded-t" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 h-16 space-y-1">
                        <div className="h-2 w-20 bg-yellow-300 rounded" />
                        <div className="h-1.5 w-full bg-graphite-200 rounded mt-1" />
                        <div className="h-1.5 w-3/4 bg-graphite-200 rounded" />
                      </div>
                      <div className="bg-white border border-graphite-200 rounded-lg p-2 h-24 space-y-1.5">
                        <div className="h-1.5 w-16 bg-graphite-300 rounded" />
                        <div className="h-3 w-full bg-graphite-100 rounded mt-1" />
                        <div className="h-3 w-full bg-graphite-100 rounded" />
                        <div className="h-3 w-full bg-graphite-100 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white border border-graphite-200 rounded-lg p-2 h-16 space-y-1">
                        <div className="h-1.5 w-20 bg-graphite-300 rounded" />
                        <div className="h-1.5 w-full bg-graphite-100 rounded mt-1" />
                        <div className="h-1.5 w-5/6 bg-graphite-100 rounded" />
                        <div className="h-1.5 w-4/6 bg-graphite-100 rounded" />
                      </div>
                      <div className="bg-white border border-graphite-200 rounded-lg p-2 h-24 space-y-1.5">
                        <div className="h-1.5 w-16 bg-graphite-300 rounded" />
                        <div className="h-8 w-full bg-graphite-100 rounded mt-1" />
                        <div className="h-8 w-full bg-graphite-100 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ZONE 3: Footer */}
                <div className="bg-white border-t-2 border-graphite-200 p-3 relative" style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.04)' }}>
                  <div className="absolute -top-px left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
                  <div className="absolute top-1 right-2 text-[8px] uppercase tracking-widest font-bold text-graphite-400">
                    Zone 3 · Footer
                  </div>

                  {/* Row 1: configuration controls */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="space-y-1 flex-shrink-0">
                      <div className="h-1.5 w-12 bg-graphite-300 rounded" />
                      <div className="h-7 w-24 bg-graphite-100 border border-graphite-200 rounded-md" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between">
                        <div className="h-1.5 w-10 bg-graphite-300 rounded" />
                        <div className="h-1.5 w-16 bg-indigo-300 rounded" />
                      </div>
                      <div className="h-1.5 w-full bg-graphite-200 rounded-full relative">
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-indigo-400 rounded-full -translate-y-1/2" />
                      </div>
                    </div>
                    <div className="space-y-1 flex-shrink-0">
                      <div className="h-1.5 w-12 bg-graphite-300 rounded" />
                      <div className="h-5 w-16 bg-rose-200 rounded" />
                    </div>
                  </div>

                  {/* Row 2: primary CTA, right-aligned */}
                  <div className="flex justify-end">
                    <div className="h-9 w-32 bg-indigo-400 rounded-lg flex items-center justify-center gap-1.5">
                      <div className="h-1.5 w-12 bg-white/40 rounded" />
                      <div className="h-2 w-2 bg-white/40 rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-graphite-500 font-mono mt-3">
            3 zones · Sticky white header · Cool gray content · Sticky white command-bar footer · Persistent inline AI strip
          </p>
        </div>

        {/* Key decisions card */}
        <div className="bg-white border border-graphite-100 rounded-xl p-6 card-shadow">
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-3">
            Key decisions made at lo-fi
          </p>
          <ul className="space-y-2 text-sm text-graphite-700">
            <li>· Drawer beats modal. Maya keeps her place in the queue.</li>
            <li>· Tabs inside the drawer (Why, Forecast, Alternatives, Activity) sort the four mental models a reviewer carries.</li>
            <li>· Bulk approve is a toolbar that only shows up on multi-select. Default state stays clean.</li>
            <li>· The AI panel sits inline. Not a popup, not an overlay. Maya never has to dismiss it.</li>
            <li>· The decision footer is sticky. Adjust + slider + Approve are always one glance away.</li>
          </ul>
        </div>
      </div>
    </ExpandableSection>
  );
}
