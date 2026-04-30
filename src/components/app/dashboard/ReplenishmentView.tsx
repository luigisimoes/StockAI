import React, { useState } from 'react';
import { Sparkles, TrendingUp, CheckCircle, Wallet, AlertTriangle, ArrowRight, Info, Edit, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { recommendations } from '@/lib/mock-data';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

const kpis = [
  { label: 'Projected revenue', value: '+$284K', change: '12% increase from avg', icon: TrendingUp, status: 'positive' },
  { label: 'Stockouts avoided', value: '42', change: 'across 8 regions', icon: CheckCircle, status: 'neutral' },
  { label: 'Working capital', value: '$1.2M', change: 'optimized allocation', icon: Wallet, status: 'neutral' },
  { label: 'AI accuracy', value: '91.4%', change: 'Confidence threshold met', icon: Sparkles, status: 'ai' },
];

type FilterType = 'all' | 'high' | 'stockout' | 'overstock';

// Confidence pill colors per tier
function getConfidenceStyles(tier: 'high' | 'medium' | 'low') {
  switch (tier) {
    case 'high': return { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' };
    case 'medium': return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', border: 'border-amber-200' };
    case 'low': return { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' };
  }
}

export default function ReplenishmentView() {
  const selectedIds = useStore((s) => s.selectedIds);
  const toggleSelect = useStore((s) => s.toggleSelect);
  const clearSelection = useStore((s) => s.clearSelection);
  const openDrawer = useStore((s) => s.openDrawer);
  const openBulkDialog = useStore((s) => s.openBulkDialog);
  const selectedItemId = useStore((s) => s.selectedItemId);
  const approvals = useStore((s) => s.approvals);
  const dismissals = useStore((s) => s.dismissals);

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter out approved and dismissed recommendations
  const baseRecs = recommendations.filter(
    (r) => !approvals[r.id] && !dismissals[r.id]
  );

  // Apply category filter + search
  const visibleRecs = baseRecs.filter((r) => {
    // Category filter
    if (activeFilter === 'high' && r.confidence.tier !== 'high') return false;
    if (activeFilter === 'stockout' && !r.alert?.includes('OOS')) return false;
    if (activeFilter === 'overstock' && r.type !== 'OVERSTOCK') return false;
    // Search filter
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selectedCount = selectedIds.length;
  const isDrawerOpen = selectedItemId !== null;

  return (
    <div className="space-y-lg pb-32">
      {/* Header */}
      <header className="mb-lg">
        <nav className="flex mb-2">
          <ol className="flex items-center space-x-2 text-[11px] font-semibold text-graphite-400 uppercase tracking-wider">
            <li>Replenishment</li>
            <li className="flex items-center space-x-2">
              <span className="opacity-50">/</span>
              <span className="text-graphite-900">Today's queue</span>
            </li>
          </ol>
        </nav>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-display text-2xl font-bold text-graphite-900">Today's recommendations</h1>
            <p className="text-sm text-graphite-500 mt-1">Good morning, Maya — your AI co-pilot prepared 102 actions this morning. Review by impact, approve in bulk.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white hairline-border rounded-lg text-sm font-medium card-shadow hover:bg-graphite-50 transition-colors">Today</button>
            <button className="px-4 py-2 bg-white hairline-border rounded-lg text-sm font-medium card-shadow hover:bg-graphite-50 transition-colors">Saved views</button>
            <button className="px-4 py-2 bg-indigo-400 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center gap-2">
              <Sparkles className="w-4 h-4" strokeWidth={1.5} />
              <span>Run new analysis</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-gutter mb-lg">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-6 hairline-border rounded-xl card-shadow">
            <p className="text-[11px] font-bold text-graphite-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-display font-bold tabular-nums text-graphite-900">{kpi.value}</h3>
            <p className={cn(
              "text-[12px] mt-2 flex items-center gap-1 font-medium",
              kpi.status === 'positive' ? "text-emerald-600" :
              kpi.status === 'ai' ? "text-indigo-400" : "text-graphite-500"
            )}>
              <kpi.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Triage Banner */}
      <div className="mb-lg bg-gradient-to-r from-indigo-50 to-white hairline-border border-indigo-100 rounded-xl p-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-400 text-white p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="text-sm flex items-center gap-0.5 flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />432 SKUs auto-approved</span>
            <span className="text-graphite-300 mx-2">|</span>
            <span className="flex items-center gap-1.5 font-medium text-indigo-500"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />87 need review</span>
            <span className="text-graphite-300 mx-2">|</span>
            <span className="flex items-center gap-1.5 font-medium text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />12 conflicts</span>
            <span className="text-graphite-300 mx-2">|</span>
            <span className="flex items-center gap-1.5 font-medium text-rose-700"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />3 anomalies</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-indigo-400">
          <a className="hover:underline cursor-pointer">View audit log</a>
          <a className="hover:underline cursor-pointer">Undo auto-approvals</a>
        </div>
      </div>

      {/* List Filter Rail */}
      <div className="flex items-center justify-between mb-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white hairline-border rounded-lg text-graphite-900 w-64 focus-within:ring-2 focus-within:ring-indigo-100">
            <Search className="w-4 h-4 text-graphite-400" strokeWidth={1.5} />
            <input
              type="text"
              className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 focus:outline-none placeholder-graphite-400"
              placeholder="Filter recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setActiveFilter('all')}
            className={cn(
              "px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors",
              activeFilter === 'all' ? "bg-white hairline-border text-graphite-900 card-shadow" : "bg-graphite-50 text-graphite-500 hover:bg-graphite-100"
            )}
          >All {baseRecs.length}</button>
          <button
            onClick={() => setActiveFilter('high')}
            className={cn(
              "px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors",
              activeFilter === 'high' ? "bg-white hairline-border text-graphite-900 card-shadow" : "bg-graphite-50 text-graphite-500 hover:bg-graphite-100"
            )}
          >High conf. {baseRecs.filter(r => r.confidence.tier === 'high').length}</button>
          <button
            onClick={() => setActiveFilter('stockout')}
            className={cn(
              "px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors",
              activeFilter === 'stockout' ? "bg-white hairline-border text-graphite-900 card-shadow" : "bg-graphite-50 text-graphite-500 hover:bg-graphite-100"
            )}
          >Stockout risk {baseRecs.filter(r => r.alert?.includes('OOS')).length}</button>
          <button
            onClick={() => setActiveFilter('overstock')}
            className={cn(
              "px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors",
              activeFilter === 'overstock' ? "bg-white hairline-border text-graphite-900 card-shadow" : "bg-graphite-50 text-graphite-500 hover:bg-graphite-100"
            )}
          >Overstock {baseRecs.filter(r => r.type === 'OVERSTOCK').length}</button>
        </div>
        <div className="flex items-center gap-2 text-graphite-400 font-medium text-sm">
          <span>Sort by:</span>
          <button className="flex items-center gap-1 font-semibold text-graphite-900">
            Impact ($)
            <TrendingUp className="w-3.5 h-3.5 ml-1" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Recommendation Feed — 8 recs */}
      <div className="space-y-2">
        {visibleRecs.map((rec, index) => {
          const conf = getConfidenceStyles(rec.confidence.tier);
          const isSelected = selectedIds.includes(rec.id);
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => openDrawer(rec.id)}
              className={cn(
                "bg-white hairline-border rounded-xl p-md card-shadow hover:-translate-y-0.5 transition-all flex items-center gap-6 cursor-pointer group",
                isSelected && "border-l-[3px] border-l-indigo-400"
              )}
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-graphite-300 text-indigo-400 focus:ring-indigo-200 accent-indigo-400"
                checked={isSelected}
                onChange={() => {}}
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(rec.id);
                }}
              />

              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden hairline-border">
                <span className="text-indigo-400 text-[11px] font-bold font-display">{rec.initials}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-graphite-900 truncate">{rec.title}</h4>
                <p className="text-xs text-graphite-500 truncate">{rec.description}</p>
              </div>

              {/* Units: Current → Proposed */}
              <div className="flex items-center gap-2 w-44 shrink-0">
                <span className="text-[13px] tabular-nums text-graphite-400 font-medium">{rec.current.toLocaleString()}</span>
                <ArrowRight className="w-3.5 h-3.5 text-graphite-300 shrink-0" strokeWidth={1.5} />
                <span className="text-[13px] tabular-nums font-bold text-graphite-900">{rec.proposed.toLocaleString()}</span>
                <span className={cn(
                  "text-[11px] tabular-nums font-bold ml-auto",
                  rec.proposed > rec.current ? "text-emerald-600" : "text-rose-600"
                )}>
                  {rec.proposed > rec.current ? '+' : ''}{(rec.proposed - rec.current).toLocaleString()}
                </span>
              </div>

              {/* Confidence Pill */}
              <div className="w-36 shrink-0">
                <div className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full w-fit border",
                  conf.bg, conf.text, conf.border
                )}>
                  <div className={cn("w-1.5 h-1.5 rounded-full", conf.dot)} />
                  <span className="text-[11px] font-bold tabular-nums">{rec.confidence.score}%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{rec.confidence.tier}</span>
                </div>
              </div>

              {/* Impact */}
              <div className="w-28 shrink-0">
                <p className="text-[10px] text-graphite-400 font-bold uppercase tracking-widest">{rec.type}</p>
                <p className={cn(
                  "text-sm font-bold tabular-nums",
                  rec.type === 'OVERSTOCK' ? "text-graphite-400" : "text-graphite-900"
                )}>{rec.impact}</p>
              </div>

              {/* Alert Badge */}
              <div className="w-36 flex justify-end shrink-0">
                {rec.alert ? (
                  <div className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-[11px] font-bold border border-rose-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {rec.alert}
                  </div>
                ) : rec.action ? (
                  <div className="px-3 py-1.5 bg-graphite-50 text-graphite-500 rounded-lg text-[11px] font-semibold hairline-border flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {rec.action}
                  </div>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Approval Bar */}
      <div className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isDrawerOpen ? "opacity-0 translate-y-4 pointer-events-none" :
        selectedCount > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="bg-graphite-900 text-white px-8 py-3 rounded-full card-shadow border border-white/5 flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-white/20 pr-6">
            <span className="text-sm font-medium">{selectedCount} selected</span>
            <div className="flex items-center gap-4">
              <button className="text-graphite-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5">
                <Edit className="w-4 h-4" strokeWidth={1.5} />
                Adjust
              </button>
              <button
                onClick={clearSelection}
                className="text-graphite-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
                Clear
              </button>
            </div>
          </div>
          <button
            onClick={openBulkDialog}
            className="px-8 py-2.5 bg-indigo-400 text-white rounded-full text-sm font-bold shadow-lg hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            Approve {selectedCount} · ⌘⏎
          </button>
        </div>
      </div>
    </div>
  );
}
