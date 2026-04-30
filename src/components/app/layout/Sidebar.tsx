import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Package, 
  TrendingUp, 
  BarChart3, 
  Lightbulb,
  Settings, 
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ACTIVE_ID = 'recommendations';

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
      <Link 
        to="/" 
        className="flex items-center gap-1.5 text-[11px] font-medium text-graphite-400 hover:text-indigo-500 transition-colors mb-4 px-2"
      >
        <ArrowLeft className="w-3 h-3" strokeWidth={2} />
        <span>Back to case study</span>
      </Link>
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
        {navItems.map((item) => {
          const isEnabled = item.id === ACTIVE_ID;
          const isActive = activeTab === item.id;

          if (!isEnabled) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <div
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left opacity-40 cursor-not-allowed select-none"
                    title="Coming in v1.1"
                  >
                    <item.icon className="w-[18px] h-[18px] text-graphite-400" strokeWidth={1.5} />
                    <span className="font-medium text-sm text-graphite-500">{item.label}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">Coming in v1.1</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-150 rounded-lg text-left",
                isActive
                  ? "bg-indigo-50 text-indigo-400" 
                  : "text-graphite-500 hover:bg-graphite-50"
              )}
            >
              <item.icon className={cn("w-[18px] h-[18px]", isActive ? "text-indigo-400" : "text-graphite-400")} strokeWidth={1.5} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-graphite-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left opacity-40 cursor-not-allowed select-none" title="Coming in v1.1">
              <Settings className="w-[18px] h-[18px] text-graphite-400" strokeWidth={1.5} />
              <span className="font-medium text-sm text-graphite-500">Settings</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="text-xs">Coming in v1.1</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left opacity-40 cursor-not-allowed select-none" title="Coming in v1.1">
              <HelpCircle className="w-[18px] h-[18px] text-graphite-400" strokeWidth={1.5} />
              <span className="font-medium text-sm text-graphite-500">Support</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="text-xs">Coming in v1.1</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
