import React from 'react';
import { Sparkles, TrendingUp, CheckCircle, Wallet, AlertTriangle, ArrowRight, Info, Edit, X, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const kpis = [
  { label: 'Projected revenue', value: '+$284K', change: '12% increase from avg', icon: TrendingUp, status: 'positive' },
  { label: 'Stockouts avoided', value: '42', change: 'across 8 regions', icon: CheckCircle, status: 'neutral' },
  { label: 'Working capital', value: '$1.2M', change: 'optimized allocation', icon: Wallet, status: 'neutral' },
  { label: 'AI accuracy', value: '91.4%', change: 'Confidence threshold met', icon: Sparkles, status: 'ai' },
];

const recommendations = [
  {
    id: 1,
    title: 'Vortex Runner Pro',
    sku: 'SKU: FTW-CWS-01',
    description: 'North Warehouse • 124 units on hand',
    current: 420,
    proposed: 850,
    confidence: '98% CONF',
    impact: '$12,400',
    type: 'IMPACT',
    alert: 'OOS in 3 days',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7G8NP1jmGpeKq-o27nwfBO-6V03_nVwphsjhqo_BWIEXWrP27JGaQX5frKcu4PV7PC8RgFfI5mqUeF16oA00qp61uFB1YCcEBhmZQXo8sGnCacJKr0Id1u_s8RF7Yl1Ku3RTQjrN1nwrFN9Mj8YdyzPqV1Z6al8lUy1iQlmxRYIsQy-Bf-UhaICIndEcxYUPzt2KIyY_UT8w89VY_Yue5kCtcL2yS4qojsGpSRFweLesVVeAjmOEJfPS9I6DRIPrBb-aF4FbW04V4'
  },
  {
    id: 2,
    title: 'Chronos Minimalist Watch',
    sku: 'SKU: LTH-BAG-09',
    description: 'East Hub • 15 units on hand',
    current: 50,
    proposed: 200,
    confidence: '72% CONF',
    impact: '$8,120',
    type: 'IMPACT',
    alert: 'OOS in 1 day',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfuvaL627H4ulWhN7QWnaH_mxZ4fFR5Cl70wpZ__VBtE0lynFvxYWjAEIL2rMUgO1jie2Ssh3inX9gPWyZu6uKYKa7MOOstXApmT4W6KCyZ7ObrmXORJm-C0C1MwNXi0TpyR1bqSBs_tok0GUf4BEoDnIdYk1fjmRysvN7LiyvF5MYSMfjzetFcyYDxtk4NnfL4ybpDmBq5CJUJX6lIXS3KUhyXl-097cM8koYnUn5jRx3hYayRje_NIi2wnjUFF5XR7_MLaEitBMh'
  },
  {
    id: 3,
    title: 'Apex Wireless Headphones',
    sku: 'SKU: FTW-CWS-01',
    description: 'Global Distribution Center • 1,200 on hand',
    current: 1200,
    proposed: 450,
    confidence: '94% CONF',
    impact: '-$4,200',
    type: 'OVERSTOCK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZFEZaqfQjp8MXVReN9KV2eWokAKu2KBbVtuwOacmf8K4KHAL3DzREYxSbmZTIoccLSGiPixn8SHzwLeIL-HT1i-xK8cN1YwS2sd-eJ5v_K7qTIcVZ2NwOKs23u2oskhldUFWHtbiwgXeeI7N4P56qSsaJQbW_vLD86fABJpDko4EyqFRQTUPZ-9u9pj2BAvE2jqgWgdhQ5A0XSA4dmhkIzAQmXfQkhziYn_7_5qAf7vev3TC7-3Quug0kywE5tp6nk3wYdGs3yADx',
    action: 'Liquidation Rec'
  },
  {
    id: 4,
    title: 'Audiophile Turntable X',
    sku: 'SKU: ACC-WTC-04',
    description: 'South Port Hub • 4 units on hand',
    current: 4,
    proposed: 24,
    confidence: '81% CONF',
    impact: '$5,900',
    type: 'IMPACT',
    alert: 'OOS in 5 days',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_KFvxmoCFvDKDo-3zDmuQ03L0YwO4BzlbIQ_SMsDA7ebhwEhELfJ9cb8bKNsvGMKsZF6h4I1r4IcxqUzODLbjgjz9c_gtzRG0pSxZ2n_9OSP4qFw5wgnZcSEFcubN4pG9KhSpolJEsxA76Iu5hCclg-rGQLGIUzyF3vgzMh7LCORjB9TB0LGEU2ZPhDVcNogkNOhHiFW-DnQn8PwXWaaPApEH7_23CDD9Aax5xolhe5Kun0EE1FMtVk2Z8UDmC77iCxp0RG-1oOuC'
  }
];

interface ReplenishmentViewProps {
  onSelectItem: (id: number) => void;
}

export default function ReplenishmentView({ onSelectItem }: ReplenishmentViewProps) {
  return (
    <div className="space-y-lg pb-32">
      {/* Header */}
      <header className="mb-lg">
        <nav className="flex mb-2">
          <ol className="flex items-center space-x-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <li>Replenishment</li>
            <li className="flex items-center space-x-2">
              <span className="text-secondary opacity-50">/</span>
              <span className="text-slate-900">Today's queue</span>
            </li>
          </ol>
        </nav>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Today's recommendations</h1>
            <p className="text-sm text-slate-500 mt-1">Good morning, Maya — your AI co-pilot prepared 102 actions this morning. Review by impact, approve in bulk.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border hairline-border rounded-lg text-sm font-medium card-shadow hover:bg-slate-50">Today</button>
            <button className="px-4 py-2 bg-white border hairline-border rounded-lg text-sm font-medium card-shadow hover:bg-slate-50">Saved views</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Run new analysis</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-gutter mb-lg">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-lg hairline-border rounded-xl card-shadow">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold tabular-nums text-slate-900">{kpi.value}</h3>
            <p className={cn(
              "text-[12px] mt-2 flex items-center gap-1",
              kpi.status === 'positive' || kpi.status === 'ai' ? "text-primary" : "text-slate-500"
            )}>
              <kpi.icon className="w-3.5 h-3.5" />
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Triage Banner */}
      <div className="mb-lg bg-gradient-to-r from-primary-container/10 to-white border hairline-border border-primary-container/20 rounded-xl p-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-container text-white p-1.5 rounded">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <span className="font-semibold text-primary">432 SKUs auto-approved</span>
            <span className="text-slate-300 mx-3">|</span>
            <span className="text-slate-900 font-medium">87 need review</span>
            <span className="text-slate-300 mx-3">|</span>
            <span className="text-slate-900 font-medium">12 conflicts</span>
            <span className="text-slate-300 mx-3">|</span>
            <span className="text-slate-900 font-medium">3 anomalies</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-primary">
          <a className="hover:underline cursor-pointer">View audit log</a>
          <a className="hover:underline cursor-pointer">Undo auto-approvals</a>
        </div>
      </div>

      {/* List Filter Rail */}
      <div className="flex items-center justify-between mb-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border hairline-border rounded-lg text-slate-900 w-64 focus-within:ring-2 focus-within:ring-primary-container/10">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 placeholder-slate-400" 
              placeholder="Filter recommendations..." 
            />
          </div>
          <button className="px-4 py-1.5 bg-white border hairline-border rounded-full text-[13px] font-semibold text-slate-900 card-shadow">All 102</button>
          <button className="px-4 py-1.5 bg-slate-100/50 text-slate-500 rounded-full text-[13px] font-semibold hover:bg-slate-100 transition-colors">High conf. 68</button>
          <button className="px-4 py-1.5 bg-slate-100/50 text-slate-500 rounded-full text-[13px] font-semibold hover:bg-slate-100 transition-colors">Stockout risk 14</button>
          <button className="px-4 py-1.5 bg-slate-100/50 text-slate-500 rounded-full text-[13px] font-semibold hover:bg-slate-100 transition-colors">Overstock 9</button>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
          <span>Sort by:</span>
          <button className="flex items-center gap-1 font-semibold text-slate-900">
            Impact ($)
            <TrendingUp className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* Recommendation Feed */}
      <div className="space-y-2">
        {recommendations.map((rec) => (
          <motion.div 
            key={rec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelectItem(rec.id)}
            className={cn(
              "bg-white border hairline-border rounded-lg p-md card-shadow hover:-translate-y-0.5 transition-all flex items-center gap-lg cursor-pointer",
              rec.id === 1 && "border-l-4 border-l-primary-container"
            )}
          >
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary-container" checked={rec.id === 1} readOnly tabIndex={-1} />
            
            <div className="w-10 h-10 bg-slate-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden border hairline-border">
              <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">{rec.title}</h4>
              <p className="text-xs text-slate-500 truncate">{rec.description}</p>
            </div>
            
            <div className="flex items-center gap-4 w-48">
              <span className="text-[13px] tabular-nums text-slate-400 w-12 text-right">{rec.current}</span>
              <ArrowRight className="w-4 h-4 text-slate-200" />
              <span className="text-[13px] tabular-nums font-bold text-slate-900 w-12">{rec.proposed}</span>
            </div>
            
            <div className="w-32">
              <div className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit",
                rec.id === 1 ? "bg-emerald-50 text-emerald-700" : 
                rec.id === 2 ? "bg-amber-50 text-amber-700" : "bg-slate-50 text-slate-500"
              )}>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  rec.id === 1 ? "bg-emerald-500" : rec.id === 2 ? "bg-amber-500" : "bg-slate-400"
                )} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{rec.confidence}</span>
              </div>
            </div>
            
            <div className="w-32">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{rec.type}</p>
              <p className={cn(
                "text-sm font-bold tabular-nums",
                rec.type === 'OVERSTOCK' ? "text-slate-400" : "text-slate-900"
              )}>{rec.impact}</p>
            </div>
            
            <div className="w-36 flex justify-end">
              {rec.alert ? (
                <div className="px-3 py-1.5 bg-error-container/40 text-error rounded-lg text-[11px] font-bold border border-error-container flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {rec.alert}
                </div>
              ) : rec.action ? (
                <div className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[11px] font-semibold border hairline-border flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  {rec.action}
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Approval Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-slate-900 text-white px-lg py-3 rounded-full card-shadow border border-white/5 flex items-center gap-lg">
          <div className="flex items-center gap-md border-r border-white/20 pr-lg">
            <span className="text-sm font-medium">1 selected</span>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5">
                <Edit className="w-4 h-4" />
                Adjust
              </button>
              <button className="text-slate-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5">
                <X className="w-4 h-4" />
                Dismiss
              </button>
            </div>
          </div>
          <button className="px-xl py-2.5 bg-primary-container text-white rounded-full text-sm font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            Approve 1 · ⌘⏎
          </button>
        </div>
      </div>
    </div>
  );
}


