import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart, 
  ReferenceLine 
} from 'recharts';
import { 
  TrendingDown, 
  TrendingUp,
  Info, 
  Wallet, 
  Sparkles, 
  CheckCircle, 
  Download, 
  ChevronRight, 
  Star,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const data = [
  { name: 'MAY 01', hist: 260, forecast: null },
  { name: 'MAY 08', hist: 255, forecast: null },
  { name: 'MAY 15', hist: 265, forecast: null },
  { name: 'MAY 22', hist: 240, forecast: null },
  { name: 'JUN 01', hist: 250, forecast: null },
  { name: 'JUN 08', hist: 220, forecast: null },
  { name: 'JUN 15', hist: 235, forecast: null },
  { name: 'TODAY', hist: 210, forecast: 210 },
  { name: 'JUL 01', hist: null, forecast: 200 },
  { name: 'JUL 08', hist: null, forecast: 220 },
  { name: 'JUL 15', hist: null, forecast: 180 },
  { name: 'JUL 22', hist: null, forecast: 190 },
  { name: 'AUG 01', hist: null, forecast: 150 },
  { name: 'AUG 08', hist: null, forecast: 160 },
  { name: 'AUG 15', hist: null, forecast: 130 },
  { name: 'AUG 22', hist: null, forecast: 140 },
  { name: 'SEP 01', hist: null, forecast: 110 },
];

// Mock for confidence interval
const areaData = data.map(d => ({
  ...d,
  low: d.forecast ? d.forecast - 40 : null,
  high: d.forecast ? d.forecast + 40 : null
}));

const performanceData = [
  { sku: 'EcoWatch Series 4', code: 'SKU: WAT-004-SIL', avg: 1240, forecast: 1580, var: '+27.4%', status: 'Trending Up', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHGpbra8ifUNQwZdfGoVTj2pJC8goH16wP-saLGFejKg-qPctnh9oUcEsCfiYm3dByfcquq8YfwWKUQFv2EaSaFPlY44vioFMVM03-JtXvuo4TDDJhDC_R8rfCbYD7AuzKnzs5Q4cB88InaiuKB0xepJZkpfAFMX7rFlLJsPIwfhbz4BXwLiEBwJSFx3SjyJzv4Z8lgJOaXtQ4uBtDFk-FyvBfnH46eeWmS0G5lnM8OOcwdrORJSyoNpvvm8gaHtlN38WYctfza8tz' },
  { sku: 'SonicPro Headphones', code: 'SKU: AUD-992-BLK', avg: 840, forecast: 720, var: '-14.2%', status: 'Trending Down', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8vZdB5At0uOsL8Q6w7OJBQxgmFORVC_aq9M9Ubm321MmXOBNCNx8SsZbxDBDbV9wjgtBpleHFz5YBVcL0bRCqYXEFeJ_7mOiMBY3-uFvYlnaX_sThTQ2jWrIzmCDjC6XB4W1PsaZcQoZyg36INZt0p1Y81z-snHYVFjCYwJw2UGTiFdRt-6w5dx4dj-2M1-BdPCffPeiliB8XDVBPbdTKwyTSjJJmhw6_Dz01YWgw2S8TjrZVxWZzoWwMgdIOjMMLyMDJCkxxmkdn' },
  { sku: 'Lumina Smart Bulb', code: 'SKU: HOM-114-RGB', avg: 2100, forecast: 2150, var: '+2.3%', status: 'Stable', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZsQgsIQiVIJ8kiostrUd7-dVL9Tstz7tmoMp-4aZtvuHIYzdlONRexv3MM-13L5k45YfclvJm4UbX5ZQoUhP4dEU66jSx8HBVS2RO3W8RC5zxr-r08yTUTE43ABG7IatHFyZgPdveiRsfXsmWX_039X0mU6zrLe5pkVmrOLYcL3QmOQHH0HwgtqvpYULkpDFG0aAeH80Jtk8Vynq2UDmvFoLYP9zTEzm6xq4PiBVOCvjJxvSp4fPpa5cWRLdXwFONdeIz4EeMs_Sz' },
];

export default function ForecastingView() {
  return (
    <div className="space-y-lg">
      {/* Breadcrumbs & Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-2 tracking-wide uppercase">
            <span>Forecasting</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary">Demand Projection</span>
          </nav>
          <h2 className="font-display text-2xl font-bold text-slate-900">Demand Forecast: Q3 FY24</h2>
          <p className="text-sm text-slate-500 mt-1">AI-generated projections based on seasonal trends, promotional calendars, and market signals.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border hairline-border rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 card-shadow transition-all">Export Forecast</button>
          <button className="px-4 py-2 border hairline-border rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 card-shadow transition-all">Adjust Baseline</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 active:scale-[0.99] card-shadow transition-all">Commit Forecast</button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-4 gap-gutter mb-8">
        <div className="bg-white p-lg border hairline-border card-shadow rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">MEAN ABS. % ERROR (MAPE)</span>
            <TrendingDown className="text-emerald-500 w-5 h-5" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900">8.4%</div>
          <div className="text-xs text-emerald-600 mt-2 font-semibold flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Below threshold (10.0%)
          </div>
        </div>

        <div className="bg-white p-lg border hairline-border card-shadow rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">BIAS</span>
            <Info className="text-amber-500 w-5 h-5" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900">+1.2%</div>
          <p className="text-xs text-slate-500 mt-2">Slight over-forecast bias detected</p>
        </div>

        <div className="bg-white p-lg border hairline-border card-shadow rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">PROJECTED GMV</span>
            <Wallet className="text-slate-400 w-5 h-5" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900">$4.2M</div>
          <p className="text-xs text-slate-500 mt-2">Q3 expected revenue contribution</p>
        </div>

        <div className="bg-white p-lg border hairline-border card-shadow rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">CONFIDENCE LEVEL</span>
            <div className="bg-primary-container/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold text-primary">AI</span>
            </div>
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900">92%</div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>

      {/* Primary Chart Area */}
      <div className="bg-white border hairline-border card-shadow rounded-xl p-lg mb-8">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-sm font-bold text-slate-900">Demand Forecasting vs. Historical Sales</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-slate-400"></div>
              <span className="text-xs font-semibold text-slate-500">Historical Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-primary"></div>
              <span className="text-xs font-semibold text-slate-500">AI Forecast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/10 border hairline-border border-primary/20"></div>
              <span className="text-xs font-semibold text-slate-500">Confidence Interval</span>
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
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
              <Area 
                type="monotone" 
                dataKey="high" 
                stroke="none" 
                fill="#5FA8D3" 
                fillOpacity={0.08} 
                connectNulls 
              />
              <Area 
                type="monotone" 
                dataKey="low" 
                stroke="none" 
                fill="#FAFAFA" 
                fillOpacity={1} 
                connectNulls 
              />
              <Line 
                type="monotone" 
                dataKey="hist" 
                stroke="#486172" 
                strokeWidth={2} 
                dot={false} 
                strokeDasharray="0"
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#00658d" 
                strokeWidth={2.5} 
                dot={false}
                connectNulls
              />
              <ReferenceLine x="TODAY" stroke="#5FA8D3" strokeDasharray="5 5" label={{ position: 'top', value: 'TODAY', fill: '#5FA8D3', fontSize: 10, fontWeight: 800 }} />
              <ReferenceLine x="AUG 01" stroke="#E2E8F0" strokeDasharray="3 3" label={{ position: 'top', value: 'PRIME DAY', fill: '#64748B', fontSize: 10, fontWeight: 800 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-gutter">
        {/* SKU Performance Table */}
        <div className="col-span-6 bg-white border hairline-border card-shadow rounded-xl overflow-hidden">
          <div className="p-lg border-b hairline-border flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">SKU Performance Table</h3>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Filter by category:</span>
              <select className="text-[12px] font-semibold border-slate-200 rounded-md py-1 pl-2 pr-8 focus:ring-primary-container/20">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Apparel</option>
              </select>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b hairline-border">
                <th className="px-lg py-3">Product SKU</th>
                <th className="px-lg py-3 text-right">Hist. Avg</th>
                <th className="px-lg py-3 text-right">Forecasted</th>
                <th className="px-lg py-3 text-right">Variance</th>
                <th className="px-lg py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y hairline-border">
              {performanceData.map((row) => (
                <tr key={row.sku} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-lg py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg border hairline-border overflow-hidden bg-slate-50">
                        <img src={row.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{row.sku}</div>
                        <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{row.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-lg py-4 text-right tabular-nums font-medium text-slate-500">{row.avg.toLocaleString()}</td>
                  <td className="px-lg py-4 text-right tabular-nums font-bold text-primary">{row.forecast.toLocaleString()}</td>
                  <td className={cn(
                    "px-lg py-4 text-right tabular-nums font-bold",
                    row.var.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                  )}>{row.var}</td>
                  <td className="px-lg py-4">
                    <span className={cn(
                      "flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider",
                      row.status === 'Trending Up' ? "text-emerald-600" : row.status === 'Trending Down' ? "text-rose-600" : "text-slate-500"
                    )}>
                      {row.status === 'Trending Up' && <TrendingUp className="w-3.5 h-3.5" />}
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-slate-50/30 text-center">
            <button className="text-[12px] font-bold text-primary hover:underline">View All 1,248 SKUs</button>
          </div>
        </div>

        {/* Influencing Factors */}
        <div className="col-span-4 flex flex-col gap-gutter">
          <div className="bg-white border hairline-border card-shadow rounded-xl flex-1 flex flex-col overflow-hidden">
            <div className="p-lg border-b hairline-border">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Influencing Factors
              </h3>
            </div>
            <div className="p-lg space-y-6 flex-1 overflow-auto">
              {[
                { id: '01', title: 'Upcoming Promotion', val: '+12%', desc: 'Scheduled "Summer Tech" campaign across major social channels starting July 10.', type: 'pos' },
                { id: '02', title: 'Social Media Sentiment', val: '+5%', desc: "Rising brand mentions in 'Smart Home' communities (92% positive sentiment).", type: 'pos' },
                { id: '03', title: 'Competitor Pricing', val: '-2%', desc: 'Major competitor announced aggressive price cuts for wearable categories.', type: 'neg' },
                { id: '04', title: 'Macroeconomic Indices', val: '+0.4%', desc: 'Minimal impact expected from current inflation consumer spending index.', type: 'neutral' },
              ].map((factor) => (
                <div key={factor.id} className="flex items-start gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[12px] font-bold",
                    factor.type === 'pos' ? "bg-emerald-50 text-emerald-600" : factor.type === 'neg' ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400"
                  )}>
                    {factor.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{factor.title}</h4>
                      <span className={cn(
                        "font-bold tabular-nums",
                        factor.type === 'pos' ? "text-emerald-600" : factor.type === 'neg' ? "text-rose-600" : "text-slate-400"
                      )}>{factor.val}</span>
                    </div>
                    <p className="text-[12px] text-slate-500 leading-normal">{factor.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-sky-50/20 border-t hairline-border">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[11px] text-slate-600 font-semibold leading-snug">These factors have been weighted by StockAI's multi-layered neural network.</p>
              </div>
            </div>
          </div>
          
          {/* Urgent Alert */}
          <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-5 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                <AlertCircle className="w-6 h-6 " />
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-sm">Warehouse Depletion Imminent</h4>
                <p className="text-[11px] opacity-80 font-medium">SKU: WAT-004-SIL stockout predicted in 4 days.</p>
              </div>
            </div>
            <button className="bg-white text-rose-600 px-4 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-rose-50 transition-colors">Address Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
