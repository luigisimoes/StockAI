import React from 'react';
import { 
  LayoutGrid, 
  Package, 
  TrendingUp, 
  BarChart3, 
  Lightbulb,
  Settings, 
  HelpCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'recommendations', label: 'Replenishment', icon: Package },
  { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
  { id: 'allocations', label: 'Allocations', icon: BarChart3 },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] border-r border-graphite-100 bg-white z-50 flex flex-col py-6 px-4">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-indigo-400 flex items-center justify-center">
          <Package className="text-white w-4.5 h-4.5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-graphite-900 leading-tight">StockAI</h1>
          <p className="text-[10px] text-graphite-400 uppercase tracking-widest font-semibold">Retail Systems</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-150 rounded-lg text-left",
              activeTab === item.id 
                ? "bg-indigo-50 text-indigo-400" 
                : "text-graphite-500 hover:bg-graphite-50"
            )}
          >
            <item.icon className={cn("w-[18px] h-[18px]", activeTab === item.id ? "text-indigo-400" : "text-graphite-400")} strokeWidth={1.5} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-graphite-100">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-graphite-500 hover:bg-graphite-50 transition-colors duration-150 rounded-lg text-left">
          <Settings className="w-[18px] h-[18px] text-graphite-400" strokeWidth={1.5} />
          <span className="font-medium text-sm">Settings</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-graphite-500 hover:bg-graphite-50 transition-colors duration-150 rounded-lg text-left">
          <HelpCircle className="w-[18px] h-[18px] text-graphite-400" strokeWidth={1.5} />
          <span className="font-medium text-sm">Support</span>
        </button>
      </div>
    </aside>
  );
}
