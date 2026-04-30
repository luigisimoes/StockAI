import React, { useState, useEffect, useCallback } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle, History, Rocket, ArrowRight, Minus, Plus, Clock, User, FileText, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { recommendations } from '@/lib/mock-data';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import AskAiPanel from './AskAiPanel';
import DismissReasonPopover from './DismissReasonPopover';

interface ItemDeepReviewProps {
  itemId: number;
  onClose: () => void;
}

export default function ItemDeepReview({ itemId, onClose }: ItemDeepReviewProps) {
  const rec = recommendations.find((r) => r.id === itemId) ?? recommendations[0];
  const [units, setUnits] = useState(rec.proposed - rec.current);
  const isOverstock = rec.type === 'OVERSTOCK';
  const [activeTab, setActiveTab] = useState('why');

  const approve = useStore((s) => s.approve);
  const dismiss = useStore((s) => s.dismiss);

  // Live impact calculation
  const baseUnits = rec.proposed - rec.current;
  const liveImpact = Math.round((units / baseUnits) * rec.baseImpact);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleApprove();
    }
  }, [units]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  function handleApprove() {
    approve(rec.id, units);
    onClose();
    toast.success(`Approved: ${rec.title}`, {
      description: `${units > 0 ? '+' : ''}${units.toLocaleString()} units · $${Math.abs(liveImpact).toLocaleString()} projected impact`,
      action: {
        label: 'Undo',
        onClick: () => {
          useStore.getState().undo(rec.id);
          toast.info(`Approval undone: ${rec.title}`);
        },
      },
    });
  }

  function handleDismiss(reason: string) {
    dismiss(rec.id, reason);
    onClose();
    toast.info(`Dismissed: ${rec.title}`, {
      description: reason,
    });
  }

  return (
    <Sheet open={true} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-[880px] max-w-full p-0 flex flex-col [&>button]:hidden" aria-describedby={undefined}>
        <SheetTitle className="sr-only">{rec.title} — AI Recommendation Review</SheetTitle>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-graphite-400 hover:text-graphite-900 hover:bg-graphite-50 rounded-lg transition-colors z-30"
          aria-label="Close drawer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* ═══ ZONE 1: HEADER (sticky top) ═══ */}
        <div className="sticky top-0 z-20 bg-white border-b border-graphite-100 px-8 pt-6 pb-5">
          <div className="flex gap-5 pr-10">
            {/* Product Thumbnail */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-indigo-50 shrink-0 flex items-center justify-center hairline-border">
              <span className="text-indigo-400 text-lg font-bold font-display">{rec.initials}</span>
            </div>

            {/* Title + Meta */}
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  <Sparkles className="w-3 h-3" strokeWidth={1.5} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI Rec</span>
                </div>
                <div className={cn(
                  "px-2.5 py-0.5 rounded-full border text-[10px] font-bold tabular-nums",
                  rec.confidence.tier === 'high' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  rec.confidence.tier === 'medium' ? "bg-amber-50 text-amber-700 border-amber-200" :
                  "bg-rose-50 text-rose-700 border-rose-200"
                )}>
                  {rec.confidence.score}% · {rec.confidence.tier.charAt(0).toUpperCase() + rec.confidence.tier.slice(1)}
                </div>
                <span className="text-graphite-400 text-[10px] font-bold uppercase tracking-widest font-mono">Model v3.4</span>
              </div>
              <h2 className="font-display text-xl font-bold text-graphite-900">{rec.title}</h2>
              <p className="text-xs text-graphite-500 font-medium font-mono leading-relaxed">
                <span className="whitespace-nowrap">SKU: {rec.sku}</span>
                <span className="mx-1.5 text-graphite-300">·</span>
                <span className="whitespace-nowrap">{rec.description.split(' · ')[0]}</span>
                <span className="mx-1.5 text-graphite-300">·</span>
                <span className="whitespace-nowrap text-graphite-400">Last synced 2m ago</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            <DismissReasonPopover onDismiss={handleDismiss}>
              <button className="px-4 py-2 hairline-border rounded-lg text-sm font-semibold text-graphite-700 hover:bg-graphite-50 transition-colors card-shadow">
                Dismiss
              </button>
            </DismissReasonPopover>
            <button
              onClick={() => document.getElementById('adjustment-input')?.focus()}
              className="px-4 py-2 hairline-border rounded-lg text-sm font-semibold text-graphite-700 hover:bg-graphite-50 transition-colors card-shadow"
            >
              Adjust
            </button>
            <button
              onClick={handleApprove}
              className="px-5 py-2 bg-indigo-400 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-500 active:scale-[0.98] transition-all"
            >
              Approve
            </button>
          </div>
        </div>

        {/* ═══ ZONE 2: CONTENT (scrollable, cool gray) ═══ */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F1F5F9' }}>
          <div className="px-8 py-6 space-y-6">
            {/* Stats Grid — floating white cards */}
            <div className="grid grid-cols-4 gap-4 flex-shrink-0">
              <div className="p-4 bg-white border border-graphite-100 card-shadow rounded-xl">
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2 leading-tight">Recommended action</p>
                <p className="text-xl font-display font-bold text-indigo-400 tabular-nums">{baseUnits > 0 ? '+' : ''}{baseUnits.toLocaleString()} units</p>
                <p className="text-[11px] text-graphite-500 mt-2 font-medium">{rec.statCard.nextRestockGap}</p>
              </div>
              <div className="p-4 bg-white border border-graphite-100 card-shadow rounded-xl">
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2 leading-tight">Projected revenue</p>
                <p className={cn("text-xl font-display font-bold tabular-nums", rec.baseImpact >= 0 ? "text-emerald-600" : "text-rose-600")}>
                  {rec.baseImpact >= 0 ? '+' : '-'}${(Math.abs(rec.baseImpact) / 1000).toFixed(1)}K
                </p>
                <div className={cn("text-[11px] mt-2 font-bold flex items-center gap-1", rec.baseImpact >= 0 ? "text-emerald-600" : "text-graphite-500")}>
                  <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
                  {rec.statCard.forecastDelta}
                </div>
              </div>
              <div className="p-4 bg-white border border-graphite-100 card-shadow rounded-xl">
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2 leading-tight">Days of cover</p>
                <div className="text-xl font-display font-bold text-graphite-900 tabular-nums flex items-baseline gap-2">
                  {rec.statCard.daysOfCoverCurrent} <ArrowRight className="w-3 h-3 text-graphite-300" strokeWidth={1.5} /> {rec.statCard.daysOfCoverProjected}
                </div>
                <p className="text-[11px] text-graphite-500 mt-2 font-medium">Target: {rec.statCard.coverTarget} days</p>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-100 card-shadow rounded-xl">
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-2 leading-tight">If you don't act</p>
                <p className="text-xl font-display font-bold text-rose-600 tabular-nums">
                  {isOverstock ? '' : '-'}${(Math.abs(rec.baseImpact) / 1000).toFixed(0)}K
                </p>
                <p className="text-[11px] text-rose-600 mt-2 font-bold">{rec.alert ?? 'Action recommended'}</p>
              </div>
            </div>

            {/* ─── AI STRIP (always visible, between stat cards and tabs) ─── */}
            <AskAiPanel recId={rec.id} activeTab={activeTab} />

            {/* ─── Tabs ─── */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-auto p-0 bg-transparent border-b border-graphite-200 rounded-none w-full justify-start gap-6 px-0">
                <TabsTrigger 
                  value="why" 
                  className="px-0 pb-3 pt-2 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-graphite-500 hover:text-graphite-900 font-bold text-sm transition-colors"
                >
                  Why this rec?
                </TabsTrigger>
                <TabsTrigger 
                  value="forecast" 
                  className="px-0 pb-3 pt-2 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-graphite-500 hover:text-graphite-900 font-bold text-sm transition-colors"
                >
                  Forecast
                </TabsTrigger>
                <TabsTrigger 
                  value="alternatives" 
                  className="px-0 pb-3 pt-2 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-graphite-500 hover:text-graphite-900 font-bold text-sm transition-colors"
                >
                  Alternatives
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="px-0 pb-3 pt-2 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-graphite-500 hover:text-graphite-900 font-bold text-sm transition-colors"
                >
                  Activity
                </TabsTrigger>
              </TabsList>

              {/* Why Tab — floating cards */}
              <TabsContent value="why">
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="space-y-6">
                    {/* External Signal Callout */}
                    {rec.externalSignal && (
                      <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 card-shadow">
                        <div className="flex gap-3">
                          <Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-graphite-900">External Signal: {rec.externalSignal.label}</h4>
                            <p className="text-[13px] text-graphite-700 leading-relaxed">{rec.externalSignal.detail}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Top Signals — floating card */}
                    <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
                      <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">Top signals &amp; weights</h3>
                      <div className="space-y-2.5">
                        {rec.signals.map((sig) => (
                          <div key={sig.label} className="p-4 bg-graphite-50/50 rounded-lg flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-1 h-8 rounded-full bg-indigo-400 shrink-0" style={{ opacity: sig.weight / 100 }} />
                              <div className="min-w-0">
                                <p className="font-bold text-[13px] text-graphite-900 leading-none mb-1 truncate">{sig.label}</p>
                                <p className="text-[11px] text-graphite-500 font-medium truncate">{sig.detail}</p>
                              </div>
                            </div>
                            <div className="w-28 shrink-0">
                              <div className="flex justify-between text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5">
                                <span>Weight</span>
                                <span className="tabular-nums">{sig.weight}/100</span>
                              </div>
                              <div className="h-1.5 w-full bg-graphite-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-indigo-400 transition-all duration-1000" style={{ width: `${sig.weight}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Constraints Checked — floating card */}
                    <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
                      <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2} />
                        Constraints checked
                      </h3>
                      <div className="space-y-2.5">
                        {rec.constraints.map((c) => (
                          <div key={c.label} className="flex items-start gap-2.5 text-[12px] font-medium text-graphite-600 leading-snug">
                            {c.status === 'pass' ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
                            )}
                            <span>{c.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Past Similar Decisions — floating card */}
                    <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
                      <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4 flex items-center gap-2">
                        <History className="w-3.5 h-3.5 text-graphite-500" strokeWidth={2} />
                        Past similar decisions
                      </h3>
                      <div className="space-y-2">
                        {rec.pastDecisions.map((pd) => (
                          <div key={pd.date} className="p-4 bg-graphite-50/50 rounded-lg space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest font-mono">{pd.date}</span>
                              <span className="text-emerald-700 font-bold text-[11px] tabular-nums">{pd.roi}</span>
                            </div>
                            <p className="text-[12px] text-graphite-500 font-medium leading-relaxed">{pd.outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Forecast Tab */}
              <TabsContent value="forecast">
                <div className="mt-4 space-y-6">
                  <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-6">
                    <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">14-Day Demand Forecast</h3>
                    
                    {(!rec.forecastDays || rec.forecastDays.length === 0) ? (
                      <div className="h-32 flex items-center justify-center bg-graphite-50/50 rounded-lg">
                        <p className="text-[12px] text-graphite-400 font-medium">No forecast data available</p>
                      </div>
                    ) : (
                      <div className="h-32 flex items-end gap-1">
                        {rec.forecastDays.map((val, i) => {
                          const maxVal = Math.max(...rec.forecastDays.filter(v => v > 0), 1);
                          const peak = rec.forecastDays.indexOf(Math.max(...rec.forecastDays));
                          const isPeak = i >= Math.max(0, peak - 2) && i <= Math.min(13, peak + 2);
                          const heightPx = Math.max((val / maxVal) * 120, 4);
                          
                          return (
                            <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                              <div 
                                className={cn(
                                  "w-full rounded-t transition-all duration-700",
                                  isPeak ? "bg-indigo-400" : "bg-graphite-200"
                                )}
                                style={{ height: `${heightPx}px` }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Day labels separated row */}
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <span key={i} className="flex-1 text-center text-[9px] text-graphite-400 tabular-nums font-mono">
                          {i + 1}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-3 text-[10px] font-bold text-graphite-400 uppercase tracking-widest">
                      <span>Day 1</span>
                      <span className="text-indigo-400">Peak demand window</span>
                      <span>Day 14</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-5">
                      <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2">Without action</p>
                      <p className="text-lg font-display font-bold text-rose-600 tabular-nums">{rec.alert ?? 'Action recommended'}</p>
                      <p className="text-[11px] text-graphite-500 mt-1 font-medium">{rec.type === 'OVERSTOCK' ? 'Carrying costs accumulating' : 'Stores at risk of zero inventory'}</p>
                    </div>
                    <div className="bg-white border border-graphite-100 card-shadow rounded-xl p-5">
                      <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2">With recommendation</p>
                      <p className="text-lg font-display font-bold text-emerald-600 tabular-nums">Covered Day 14+</p>
                      <p className="text-[11px] text-graphite-500 mt-1 font-medium">{rec.type === 'OVERSTOCK' ? 'Excess inventory reduced to optimal level' : 'All stores above safety threshold'}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Alternatives Tab */}
              <TabsContent value="alternatives">
                <div className="mt-4 space-y-4">
                  {rec.alternatives.map((alt) => {
                    const isRec = alt.label === 'Recommended';
                    return (
                      <div key={alt.label} className={cn(
                        "p-5 rounded-xl card-shadow flex items-center justify-between",
                        isRec ? "bg-indigo-50 border border-indigo-200" : "bg-white border border-graphite-100"
                      )}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-graphite-900">{alt.label}</h4>
                            {isRec && <span className="text-[10px] font-bold text-indigo-400 bg-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span>}
                          </div>
                          <p className="text-[13px] text-graphite-500 font-medium">{alt.units > 0 ? '+' : ''}{alt.units.toLocaleString()} units · {alt.coverage} coverage · Risk: {alt.risk}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-display font-bold tabular-nums text-graphite-900">{alt.revenue >= 0 ? '' : '-'}${(Math.abs(alt.revenue) / 1000).toFixed(1)}K</p>
                          <p className="text-[11px] text-graphite-400 font-medium">projected impact</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <div className="mt-4 bg-white border border-graphite-100 card-shadow rounded-xl p-6">
                  <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">Activity log</h3>
                  <div className="space-y-1">
                    {rec.activityTimeline.map((entry, i) => {
                      const iconMap: Record<string, typeof Sparkles> = { sparkles: Sparkles, check: CheckCircle, trending: TrendingUp, user: User, alert: AlertTriangle, clock: Clock, file: FileText };
                      const colorMap: Record<string, string> = { sparkles: 'text-indigo-400', check: 'text-emerald-500', trending: 'text-indigo-400', user: 'text-graphite-400', alert: 'text-amber-500', clock: 'text-graphite-400', file: 'text-emerald-500' };
                      const Icon = iconMap[entry.icon] ?? Sparkles;
                      const color = colorMap[entry.icon] ?? 'text-graphite-400';
                      return (
                        <div key={i} className="flex gap-4 py-3 group">
                          <div className="flex flex-col items-center">
                            <div className={cn("w-8 h-8 rounded-lg bg-graphite-50 flex items-center justify-center", color)}>
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            {i < rec.activityTimeline.length - 1 && <div className="w-px h-full bg-graphite-100 mt-2" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-bold text-graphite-900">{entry.user}</span>
                              <span className="text-[11px] text-graphite-400 font-mono">{entry.time}</span>
                            </div>
                            <p className="text-[13px] text-graphite-700 font-medium">{entry.action}</p>
                            <p className="text-[11px] text-graphite-500 mt-0.5">{entry.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* ═══ ZONE 3: DECISION FOOTER (sticky bottom, command-bar) ═══ */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-graphite-200 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] px-8 py-5 flex items-center gap-6 relative">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

          {/* Adjustment Input */}
          <div className="shrink-0">
            <label className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest block mb-1.5">Adjustment</label>
            <div className="flex items-center hairline-border rounded-lg overflow-hidden bg-graphite-50 shadow-inner">
              <button
                onClick={() => setUnits(isOverstock ? Math.min(units + 10, -10) : Math.max(10, units - 10))}
                className="px-3 py-2 hover:bg-graphite-200 transition-colors text-graphite-600"
                aria-label="Decrease units"
              >
                <Minus className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <input
                id="adjustment-input"
                type="number"
                className="w-20 text-center border-none focus:ring-0 font-bold text-graphite-900 bg-transparent tabular-nums text-sm"
                value={units}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setUnits(isOverstock ? Math.min(v, -10) : Math.max(10, v));
                }}
              />
              <button
                onClick={() => setUnits(isOverstock ? units - 10 : units + 10)}
                className="px-3 py-2 hover:bg-graphite-200 transition-colors text-graphite-600"
                aria-label="Increase units"
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest">Impact range</span>
              <span className="text-[11px] font-bold text-indigo-400 tabular-nums">{units > 0 ? '+' : ''}{units.toLocaleString()} units {units === baseUnits ? '(optimal)' : ''}</span>
            </div>
            <input
              type="range"
              className="w-full h-1.5 bg-graphite-100 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              value={isOverstock ? Math.abs(units) : units}
              max={Math.abs(baseUnits) * 2}
              min={isOverstock ? 10 : 10}
              onChange={(e) => setUnits(isOverstock ? -Number(e.target.value) : Number(e.target.value))}
            />
          </div>

          {/* Live Impact + Approve */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="text-right">
              <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest">Live Impact</p>
              <p className={cn("text-lg font-display font-bold tabular-nums", liveImpact >= 0 ? "text-emerald-600" : "text-rose-600")}>
                {liveImpact >= 0 ? '+' : '-'}${Math.abs(liveImpact).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleApprove}
              className="bg-indigo-400 text-white hover:bg-indigo-500 active:scale-[0.98] px-7 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-400/30 transition-all flex items-center gap-2 group whitespace-nowrap"
            >
              Approve · {units > 0 ? '+' : ''}{units.toLocaleString()}
              <Rocket className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
