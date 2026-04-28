import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Info, History, Rocket, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ItemDeepReviewProps {
  itemId: number;
  onClose: () => void;
}

export default function ItemDeepReview({ itemId, onClose }: ItemDeepReviewProps) {
  // Mock data for the sneaker item (image 1)
  return (
    <>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[60]"
      />
      
      {/* Slide-over Panel */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-[800px] bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-200"
      >
        {/* Header */}
        <div className="p-8 border-b hairline-border flex justify-between items-start">
          <div className="flex gap-6">
            <div className="w-16 h-16 rounded-xl border hairline-border overflow-hidden bg-slate-50">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCGu3iEyT9F4uMuSi4_irJI8E2IUJH4Nijr1eM8XeZvErl1N58f99NiT0zyS3xEyZbMQxe7k9fWCcraVNDKKKFzmngqHxXB7EWcGQ2ySPo5rTSIo_PcV-vnqS7UOgdBzSFPFLUqBFmicnk90v0yRSj_ptlIbXuyddmlSUGBpabRXbi0o0KU-n0C_pZYRIF-KRPmPCKBXJcPVMN2B_1r6VJwYG87RVKGOyOWSQEfom1ZXHlhyBKbzSbNKfaD_8A6cGZ5CTn7B86Y7lA" 
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI Recommendation</span>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 text-[10px] font-bold">
                  94% · High Confidence
                </div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Model v3.4</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">Classic White Sneakers</h2>
              <p className="text-xs text-slate-500 font-medium">SKU: FW-24-WHT-01 · Northeast Regional Hub · Last synced 2m ago</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 border hairline-border rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors card-shadow">Dismiss</button>
            <button className="px-5 py-2 border hairline-border rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors card-shadow">Adjust</button>
            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all">Approve</button>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8 space-y-lg">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-gutter mb-lg">
            <div className="p-4 bg-slate-50 hairline-border rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended action</p>
              <p className="text-xl font-bold text-primary">+480 units</p>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">Next restock gap: Oct 12</p>
            </div>
            <div className="p-4 bg-slate-50 hairline-border rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Projected revenue</p>
              <p className="text-xl font-bold text-emerald-600">+$47.2K</p>
              <div className="text-[11px] text-emerald-600 mt-2 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                14% vs forecast
              </div>
            </div>
            <div className="p-4 bg-slate-50 hairline-border rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Days of cover</p>
              <div className="text-xl font-bold text-slate-900 tabular-nums flex items-baseline gap-1.5">
                2.8 <ArrowRight className="w-3 h-3 text-slate-300" /> 10.6
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">Target: 12.0 days</p>
            </div>
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">If you don't act</p>
              <p className="text-xl font-bold text-rose-600">-$47K</p>
              <p className="text-[11px] text-rose-600 mt-2 font-bold">Stockout imminent: 3 days</p>
            </div>
          </div>

          <div className="flex gap-8 border-b hairline-border mb-lg">
            <button className="pb-4 text-sm font-bold text-primary border-b-2 border-primary">Why this rec?</button>
            <button className="pb-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Sales Forecast</button>
            <button className="pb-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Supply Network</button>
          </div>

          <div className="grid grid-cols-2 gap-lg">
            <div className="space-y-lg">
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 flex gap-4">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-amber-900">External Signal: Northeast Marathon Event</h4>
                  <p className="text-[13px] text-amber-800 leading-relaxed font-medium">
                    Historical data and social trends indicate a 40% surge in athletic footwear demand in the Northeast region coinciding with the upcoming marathon. StockAI detected similar patterns in 2022 and 2023.
                  </p>
                </div>
              </div>

              <div className="space-y-md">
                <h3 className="text-sm font-bold text-slate-900">Top signals & weights</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Sales Velocity', sub: '+34% vs last 7 days', weight: 88, color: 'bg-primary' },
                    { label: 'Market Competitor Low Stock', sub: 'Regional competitors at <10% stock', weight: 62, color: 'bg-primary/50' },
                    { label: 'Weather: Unseasonably Dry', sub: 'Forecast +4°C above seasonal average', weight: 24, color: 'bg-primary/20' },
                  ].map((sig) => (
                    <div key={sig.label} className="bg-white p-4 hairline-border rounded-xl card-shadow flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-1 h-8 rounded-full", sig.color)}></div>
                        <div>
                          <p className="font-bold text-[13px] text-slate-900 leading-none mb-1">{sig.label}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{sig.sub}</p>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          <span>Impact weight</span>
                          <span className="tabular-nums">{sig.weight}/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all duration-1000", sig.color)} style={{ width: `${sig.weight}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-lg">
              <div className="bg-white p-6 hairline-border rounded-xl card-shadow h-fit">
                <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Constraints checked
                </h3>
                <div className="space-y-4">
                  {[
                    'Warehouse capacity (Northeast Distribution)',
                    'Lead time reliability (98%)',
                    'Supplier MOQs met',
                    'Logistics cost variance within +/- 5%',
                  ].map((check) => (
                    <div key={check} className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {check}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 hairline-border rounded-xl card-shadow">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-400" />
                  Past similar decisions
                </h3>
                <div className="p-4 bg-slate-50 border hairline-border rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sep 2023</span>
                    <span className="text-emerald-700 font-bold text-[11px]">+18% ROI</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">Summer Sport Launch</p>
                  <p className="text-[12px] text-slate-500 font-medium">Approved 350 units. Outcome: sold out in 12 days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t hairline-border bg-white/80 backdrop-blur-md sticky bottom-0 flex items-center justify-between">
          <div className="flex items-center gap-12 w-2/3">
            <div className="flex items-center gap-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adjustment</label>
              <div className="flex items-center border hairline-border rounded-lg overflow-hidden bg-slate-50 shadow-inner">
                <button className="px-4 py-2 hover:bg-slate-200 transition-colors font-bold text-slate-600">-</button>
                <input type="number" readOnly className="w-16 text-center border-none focus:ring-0 font-bold text-slate-900 bg-transparent tabular-nums" value="480" />
                <button className="px-4 py-2 hover:bg-slate-200 transition-colors font-bold text-slate-600">+</button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence Impact Range</span>
                <span className="text-[11px] font-bold text-primary">480 units (optimal)</span>
              </div>
              <input 
                type="range" 
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" 
                value="48" 
                max="100" 
                min="0"
                readOnly
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Impact</p>
              <p className="text-lg font-bold text-emerald-600 tabular-nums">+$47,204.00</p>
            </div>
            <button className="bg-primary text-white hover:bg-on-primary-fixed-variant px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center gap-2 group">
              Approve · 480 units
              <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
