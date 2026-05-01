import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Hero section of the case study site.
 *
 * Apple-style wide hero: the cover image bleeds edge-to-edge with no
 * frame, rounded corners, or shadow — deeply integrated into the page
 * so it feels like part of the surface rather than a boxed asset.
 *
 * Mobile-first responsive: tighter spacing, smaller typography, stacked
 * CTAs on narrow viewports. Desktop scales up aggressively.
 *
 * Sets up the narrative arc: 4-day Foundey challenge, single-feature
 * redesign, transparent AI co-pilot. Below the meta strip sits a Loom
 * video slot (placeholder until recording is ready).
 */
export default function HeroSection() {
  return (
    <section className="relative pb-12 md:pb-24 overflow-hidden">

      {/* Edge-to-edge cover image — Apple-style, no frame */}
      <div
        className="relative w-full mt-4 md:mt-10"
        style={{ animation: 'heroFadeIn 0.8s ease-out both' }}
      >
        <img
          src="/hero-foundey.png"
          alt="StockAI Replenishment – Foundey Senior PD Challenge cover showing laptop mockup with the live prototype interface"
          className="w-full h-auto block"
          loading="eager"
          fetchPriority="high"
        />
        {/* Bottom gradient bleed — dissolves image into white content area */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative -mt-4 md:-mt-16 max-w-[900px] mx-auto px-4 md:px-6 text-center">
        <div className="inline-flex items-center gap-1 md:gap-1.5 bg-indigo-50 text-indigo-500 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-indigo-100 mb-4 md:mb-6">
          <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={2} />
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Foundey · Senior PD Challenge</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-graphite-900 leading-[1.15] md:leading-[1.05] mb-4 md:mb-6">
          Replenishment that <br className="hidden sm:inline" />explains itself.
        </h1>

        <p className="text-sm md:text-lg lg:text-xl text-graphite-600 leading-relaxed max-w-[680px] mx-auto mb-6 md:mb-10 font-medium">
          Four days. One feature redesigned end to end. The brief asked for a transfer wizard; I delivered a co-pilot that shows its work, so an inventory manager can approve the call without leaving the page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 md:gap-3">
          <Link
            to="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-xl bg-indigo-400 text-white text-sm font-bold hover:bg-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-400/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
            <span>Open Live Prototype</span>
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
          </Link>
          <a
            href="#problem"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-xl bg-white text-graphite-700 text-sm font-semibold border border-graphite-200 hover:border-graphite-300 hover:bg-graphite-50 transition-all"
          >
            <span>Read the case study</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-6 mt-8 md:mt-12 text-[9px] md:text-[11px] uppercase tracking-widest font-bold text-graphite-400">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-graphite-900 text-xs md:text-base font-display">Senior PD</span>
            <span>Role</span>
          </div>
          <div className="w-px h-6 md:h-8 bg-graphite-200" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-graphite-900 text-xs md:text-base font-display">4 days</span>
            <span>Timeline</span>
          </div>
          <div className="w-px h-6 md:h-8 bg-graphite-200" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-graphite-900 text-xs md:text-base font-display">Solo</span>
            <span>PM + PD</span>
          </div>
        </div>
      </div>

      {/* Loom video slot */}
      <div className="max-w-[860px] mx-auto mt-10 md:mt-16 px-4 md:px-6">
        <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-500 text-center mb-3">
          90-second walkthrough
        </p>
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-graphite-900 shadow-xl shadow-indigo-400/10 aspect-video">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 md:mb-4 border border-white/20">
              <svg className="w-5 h-5 md:w-7 md:h-7 ml-0.5 md:ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p className="text-xs md:text-sm font-medium text-white/80 text-center">Loom walkthrough coming soon</p>
            <p className="text-[10px] md:text-[11px] text-white/40 font-mono mt-1">90 seconds · live demo</p>
          </div>

          {/* WHEN LOOM IS READY: uncomment this and remove placeholder above
          <iframe
            src="https://www.loom.com/embed/YOUR_LOOM_ID_HERE"
            title="StockAI Replenishment 90-second walkthrough"
            frameBorder="0"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          */}
        </div>
      </div>
    </section>
  );
}
