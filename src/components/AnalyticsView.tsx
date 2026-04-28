import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '../lib/utils';

const accuracyData = [
  { name: 'Week 1', footwear: 80, bags: 150, accessories: 220 },
  { name: 'Week 3', footwear: 70, bags: 160, accessories: 200 },
  { name: 'Week 6', footwear: 90, bags: 120, accessories: 210 },
  { name: 'Week 9', footwear: 40, bags: 140, accessories: 190 },
  { name: 'Current', footwear: 20, bags: 110, accessories: 180 },
];

const overrideData = [
  { tier: 'HIGH', rate: 12, fill: '#E2E8F0' },
  { tier: 'MED', rate: 28, fill: '#CBD5E1' },
  { tier: 'LOW', rate: 48, fill: '#5FA8D3' },
];

const exceptions = [
  { sku: 'FTW-992-RED', name: 'Performance Runner', pred: 450, act: 1200, reason: 'Unplanned Promotion', action: 'Retrained', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq89B9I8Q_P6AIW13XBmMJje-f5l3Sm4k5nglOFF4W1BzCT6Lq3b82Wzqfzc9Kv4v5FjWxdSyDpKybATUce6EkVSIcWN8VK1LIsD8m9GjOZNQFX7Jg9mGLphgVbRNAp2lxdTR6LlMkHq9Ya02ty99HPzxd4xwqfn_9NPXGCtI_slrJbTTogrmjzVhoQjpekrSY-ckocnZWpaKkiBRZSYo_JiuBfDIYmOJg_-JMQh-50XYBImXVJTI5mmH1i_gem0ERnfwp4kykpvOc' },
  { sku: 'JKT-LTH-01', name: 'Outerwear', pred: 80, act: 215, reason: 'Local Event Spike', action: 'Retrained', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDansDpK4CbFR9xSux0RIkRJSGSeC6xP5H2y5kohF_t-hJn-S6YHejE282llBGa9M873O-5FZsQQAn_pZvJxnr1Hx_pdH2EW-6TacmscOnNZDOIeARDbnZdAUSV_NhXL8X8oRmQCL93JqQvp0U7XSrPMrPJ8ntENyn8ATktm9sE1ZKv8M4acCcNLtetdQtEaJ_gBY09yPun07S2X9SRymn-MhcE2o7fs6tb3kQ0sodb8FqJRmEkQ8yYieodYFYSFr4t0qtyyoGalLyK' },
  { sku: 'DEN-STR-BLU', name: 'Bottoms', pred: 1200, act: 840, reason: 'Competitor Undercut', action: 'Retrain', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBBgQxBkZMGv2LQKfj-NkTzjTd3HrZgeVGCeSelnmaz-eYrtLxrnvI_bRjmGDq9B3eoT27mYcTmMVTdjf0QDYELrw2TLs6iyHCnfALAqvrGVMzVUtKLznb2SQc-fgQVt8gK3-G0KvhXc3RDiHfD9RC7_vG6tv0YLgpRmGoC3QJqk5QsZkeAP2lVOEOLk8w8l9CFZzYep1-ZO8dbf38AiCMqV9JT8jfsaKZX9yc_rthzyMNseXPFxn7-Q-nA1iH1D4_9hvK3zbpSyby' },
  { sku: 'BAG-LTH-TAN', name: 'Accessories', pred: 30, act: 52, reason: 'Influencer Tag', action: 'Retrained', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANyUCxqw_z3SdGByBzCC7e4AZLyEhdfAKw-oK63shf1SeSfK1VuYy0CkDVE-BDYKSizq8atkhfNvhQwKnIbdUUYIgwzd0mnrerX8jh72HUbHljaKmZ1muJ6n1JnIWtajf-UNaMGoq9HnvSHe1hStqFX8vFxJ4gjb3Eksv12KJWb0eEqQKMDXQJWqiD-Jp7NlGGzyEyvh1aqFRKpeps2RjZwYCPEEKkPGJEPI_ahCmylTJrLNB9dYaFDAxXdEA6WQXy5UULJzGPlTCu' },
];

export default function AnalyticsView() {
  return (
    <div className="space-y-lg">
      {/* Page Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Recommendation performance</h2>
          <p className="text-sm text-slate-500 mt-1">How the AI is doing, week over week</p>
        </div>
        <div className="flex bg-white rounded-lg border hairline-border p-1 card-shadow">
          <button className="px-4 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-primary transition-colors">Last 30 days</button>
          <button className="px-4 py-1.5 text-[11px] font-bold bg-sky-50 text-primary rounded-md uppercase tracking-wider">90 days</button>
          <button className="px-4 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider hover:text-primary transition-colors">YTD</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Forecast accuracy', val: '91.4%', delta: '+1.8 pts', trend: 'pos' },
          { label: 'Approval rate', val: '73%', delta: 'vs 68% avg', trend: 'neutral' },
          { label: 'Override delta', val: '+12%', delta: 'vs predicted', trend: 'neutral' },
          { label: 'Time to decision', val: '3.4 min', delta: 'avg per SKU', trend: 'neutral' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-6 rounded-xl border hairline-border card-shadow transition-transform hover:-translate-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3">{kpi.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums text-slate-900">{kpi.val}</span>
              <span className={cn(
                "text-[11px] font-bold tabular-nums",
                kpi.trend === 'pos' ? "text-emerald-600" : "text-slate-400"
              )}>{kpi.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8 mb-8">
        {/* Left Chart: Forecast Accuracy */}
        <div className="col-span-8 bg-white p-6 rounded-xl border hairline-border card-shadow flex flex-col">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-sm font-bold text-slate-900">Forecast accuracy by category</h3>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Footwear</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bags</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Accessories</span>
              </div>
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  labelStyle={{ fontWeight: 800, marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="footwear" stroke="#5FA8D3" strokeWidth={3} dot={false} strokeDasharray="0" />
                <Line type="monotone" dataKey="bags" stroke="#FDB833" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="accessories" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Override Rate */}
        <div className="col-span-4 bg-white p-6 rounded-xl border hairline-border card-shadow flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 mb-10 px-2 tracking-tight">Override rate by confidence tier</h3>
          <div className="flex-1 px-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overrideData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="tier" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 800, fill: '#64748B' }} 
                  dy={10}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]} barSize={48}>
                  {overrideData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 border-l-4 border-primary-container rounded-r-lg">
            <p className="text-[12px] leading-relaxed text-slate-600 font-medium italic">
              "Planners override Low conf 4x more often — model needs more training data for cold-start SKUs"
            </p>
          </div>
        </div>
      </div>

      {/* Exceptions Table */}
      <div className="bg-white rounded-xl border hairline-border card-shadow overflow-hidden">
        <div className="px-8 py-5 border-b hairline-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Where the AI was wrong</h3>
          <button className="text-xs text-primary font-bold hover:underline py-1 px-2 hover:bg-sky-50 rounded transition-colors">View all exceptions</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr className="border-b hairline-border">
              <th className="px-8 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/3">SKU</th>
              <th className="px-8 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Predicted vs Actual</th>
              <th className="px-8 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Reason</th>
              <th className="px-8 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {exceptions.map((row) => (
              <tr key={row.sku} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-lg border hairline-border object-cover bg-slate-50" src={row.image} alt="" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{row.sku}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{row.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 line-through tabular-nums text-sm font-medium">{row.pred}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                    <span className="text-rose-600 font-bold tabular-nums text-sm">{row.act}</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-center">
                  <span className="bg-slate-100 text-slate-600 text-[11px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">{row.reason}</span>
                </td>
                <td className="px-8 py-4 text-right">
                  {row.action === 'Retrained' ? (
                    <div className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-[11px] uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4" />
                      Retrained
                    </div>
                  ) : (
                    <button className="text-[11px] font-bold text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-sky-50 transition-colors uppercase tracking-widest">Retrain</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Success Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-5 card-shadow">
        <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center text-amber-600 shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-amber-900 mb-1 flex items-center gap-2">
            You taught the model
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </h4>
          <p className="text-amber-800 text-sm leading-relaxed font-medium">
            Maya — your overrides this month improved forecast accuracy on <span className="font-bold underline decoration-amber-400/50">Apparel</span> by <span className="font-bold">4%</span>. Model v3.4 ships Friday with your category corrections built in.
          </p>
        </div>
        <button className="text-slate-400 hover:text-amber-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
