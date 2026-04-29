import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 via-white to-white -z-10" />
      
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full border border-indigo-100 mb-6">
          <Sparkles className="w-3 h-3" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Foundey · Senior PD Challenge</span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-bold text-graphite-900 leading-[1.05] mb-6">
          Replenishment that <br />explains itself.
        </h1>

        <p className="text-lg md:text-xl text-graphite-600 leading-relaxed max-w-[680px] mx-auto mb-10 font-medium">
          A 4-day redesign of StockAI's core inventory feature, turning opaque AI recommendations into a transparent co-pilot inventory managers can actually trust.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-400 text-white text-sm font-bold hover:bg-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-400/20 transition-all"
          >
            <Sparkles className="w-4 h-4" strokeWidth={2} />
            <span>Open Live Prototype</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
          <a
            href="#problem"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-graphite-700 text-sm font-semibold border border-graphite-200 hover:border-graphite-300 hover:bg-graphite-50 transition-all"
          >
            <span>Read the case study</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12 text-[11px] uppercase tracking-widest font-bold text-graphite-400">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-graphite-900 text-base font-display">Senior PD</span>
            <span>Role</span>
          </div>
          <div className="w-px h-8 bg-graphite-200" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-graphite-900 text-base font-display">4 days</span>
            <span>Timeline</span>
          </div>
          <div className="w-px h-8 bg-graphite-200" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-graphite-900 text-base font-display">Solo</span>
            <span>PM + PD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
