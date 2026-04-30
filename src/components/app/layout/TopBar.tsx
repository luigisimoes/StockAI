import React from 'react';
import { Search, Bell, History, RotateCcw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

/**
 * Fixed top bar with search, sub-navigation tabs, and user controls.
 *
 * Spans the area right of the sidebar (calc 100% - 240px). Uses
 * backdrop-blur for a frosted-glass effect over scrolling content.
 * The Maya Chen avatar dropdown includes a "Reset demo" action that
 * clears all approvals, dismissals, and selections — essential for
 * recruiter walkthroughs where state persists via localStorage.
 */
export default function TopBar() {
  const resetAll = useStore((s) => s.resetAll);

  function handleReset() {
    resetAll();
    toast.success('Demo reset', {
      description: 'All approvals, dismissals and selections cleared.',
    });
  }

  return (
    <header className="fixed top-0 right-0 h-14 w-[calc(100%-240px)] bg-white/80 backdrop-blur-md border-b border-graphite-100 z-40 flex justify-between items-center px-8 card-shadow">
      <div className="flex items-center gap-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400 w-4 h-4" strokeWidth={1.5} />
          <input 
            type="text"
            className="pl-9 pr-4 py-1.5 bg-graphite-50 border-0 rounded-lg text-sm w-80 focus:ring-2 focus:ring-indigo-100 placeholder:text-graphite-400 outline-none"
            placeholder="Search SKU, order or supplier..."
          />
        </div>
        <nav className="flex items-center gap-6 h-full">
          {[
            { id: 'overview', label: 'Overview', active: true },
            { id: 'alerts', label: 'Alerts', active: false },
            { id: 'reports', label: 'Reports', active: false },
          ].map((tab) => (
            <a
              key={tab.id}
              href="#"
              className={`relative h-full flex items-center text-sm transition-colors ${
                tab.active
                  ? 'text-indigo-400 font-semibold'
                  : 'text-graphite-500 hover:text-graphite-900 font-medium'
              }`}
            >
              {tab.label}
              {tab.active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400" />
              )}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 border-r border-graphite-200 pr-4 mr-2">
          <button className="p-2 text-graphite-400 hover:text-indigo-400 transition-all rounded-lg hover:bg-graphite-50" aria-label="Notifications">
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
          <button className="p-2 text-graphite-400 hover:text-indigo-400 transition-all rounded-lg hover:bg-graphite-50" aria-label="History">
            <History className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Maya Chen avatar with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white text-xs font-bold tracking-tight hover:ring-2 hover:ring-indigo-200 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-200">
              MC
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem disabled className="text-graphite-400 text-xs font-semibold uppercase tracking-wider">
              Maya Chen
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleReset} className="text-rose-600 focus:text-rose-700 focus:bg-rose-50 cursor-pointer">
              <RotateCcw className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Reset demo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
