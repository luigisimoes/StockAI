import React from 'react';
import { 
  LayoutGrid, 
  Package, 
  TrendingUp, 
  Truck, 
  Warehouse, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'recommendations', label: 'Recommendations', icon: TrendingUp },
  { id: 'suppliers', label: 'Suppliers', icon: Truck },
  { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] border-r border-slate-200 bg-white z-50 flex flex-col py-6 px-4">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <Warehouse className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">StockAI</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Retail Systems</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 transition-all duration-150 rounded text-left",
              activeTab === item.id 
                ? "bg-sky-50/50 text-primary border-r-2 border-primary" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-primary" : "text-slate-400")} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-slate-100">
        <button className="w-full mb-4 py-2.5 bg-primary text-white font-semibold text-sm rounded shadow-sm hover:opacity-90 active:scale-95 duration-100 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New Forecast</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 transition-colors duration-150 rounded text-left">
          <Settings className="w-5 h-5 text-slate-400" />
          <span className="font-medium text-sm">Settings</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 transition-colors duration-150 rounded text-left">
          <HelpCircle className="w-5 h-5 text-slate-400" />
          <span className="font-medium text-sm">Support</span>
        </button>
      </div>
    </aside>
  );
}
