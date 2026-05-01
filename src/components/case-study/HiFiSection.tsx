import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Maximize2, Figma } from 'lucide-react';

/**
 * Hi-fi section � embeds the actual deployed product as an iframe.
 *
 * The iframe loads `/app` with sandbox restrictions for security.
 * Browser chrome mockup (traffic light dots + URL bar) frames the embed
 * to signal it is a live application. Responsive height scales from
 * 500px (mobile) to 820px (desktop).
 */
export default function HiFiSection() {
  return (
    <section id="hi-fi" className="py-16 md:py-20 bg-gradient-to-b from-indigo-50/30 via-white to-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="max-w-[900px] mx-auto mb-10">
          <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-500 mb-4">
            05 · Hi-fi UI · Live prototype
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-graphite-900 mb-6 leading-tight">
            Built it. It works. Try it.
          </h2>
          <p className="text-base md:text-lg text-graphite-700 leading-relaxed font-medium mb-2">
            Below is the actual production build, not a Figma prototype. Click any rec, open the drawer, talk to the co-pilot, drag the slider, approve. Built with React, Tailwind, shadcn, deployed on Vercel.
          </p>
          <p className="text-[13px] text-graphite-500 font-mono">
            Stack: React 19 · Vite · TypeScript · Tailwind v4 · shadcn/ui · Zustand · Framer Motion · Sonner
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 mb-4 px-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
            </div>
            <p className="text-[12px] text-graphite-500 font-mono">stockai-luigi.com/app</p>
          </div>
          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-graphite-900 text-white text-[12px] font-bold hover:bg-graphite-700 active:scale-[0.98] shadow-sm hover:shadow-md transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Open Fullscreen</span>
            <ExternalLink className="w-3 h-3" strokeWidth={2} />
          </Link>
        </div>

        <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-graphite-200 shadow-2xl shadow-indigo-400/10 bg-graphite-50 h-[500px] sm:h-[600px] md:h-[820px]">
          <div className="bg-graphite-100 border-b border-graphite-200 px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white px-3 py-0.5 rounded-md text-[11px] text-graphite-500 font-mono border border-graphite-200">
                stockai-luigi.com/app
              </div>
            </div>
          </div>

          <iframe
            src="/app"
            title="StockAI Live Prototype"
            className="w-full h-[calc(100%-44px)] border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>

        <div className="max-w-[900px] mx-auto mt-8">
          <p className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-3">
            Try this in 30 seconds
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { n: '01', tip: 'Click row 1 (Sneakers). The drawer opens with the deep review.' },
              { n: '02', tip: 'Click a chip in the AI Co-Pilot strip. The co-pilot answers inline.' },
              { n: '03', tip: 'Drag the impact slider in the footer. The numbers update live.' },
            ].map((item) => (
              <div key={item.n} className="flex gap-3 p-4 bg-white border border-graphite-100 rounded-lg card-shadow">
                <span className="text-[11px] font-bold font-mono text-indigo-400">{item.n}</span>
                <p className="text-[13px] text-graphite-700 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <a
              href="https://www.figma.com/design/g1jMxBZGvVClAoaPfN4O7O/StockAI-Replenishment-%E2%80%94-Foundey-Senior-PD-Challenge?node-id=20-2328&m=dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-graphite-200 rounded-lg text-sm font-bold text-graphite-700 hover:bg-graphite-50 hover:border-graphite-300 transition-colors card-shadow"
            >
              <Figma className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Open the hi-fi designs in Figma</span>
              <ExternalLink className="w-3 h-3" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
