import React from 'react';
import { Search, Bell, History } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 h-14 w-[calc(100%-240px)] bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex justify-between items-center px-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text"
            className="pl-9 pr-4 py-1.5 bg-slate-50 border-0 rounded text-sm w-80 focus:ring-2 focus:ring-primary-container/20 placeholder:text-slate-400 outline-none"
            placeholder="Search SKU, order or supplier..."
          />
        </div>
        <nav className="flex items-center gap-6">
          <a href="#" className="text-sm font-semibold text-primary border-b-2 border-primary pb-1 h-14 flex items-center">Overview</a>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-all">Alerts</a>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-all">Reports</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border-r border-slate-200 pr-4 mr-2">
          <button className="p-2 text-slate-500 hover:text-primary transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-primary transition-all">
            <History className="w-5 h-5" />
          </button>
        </div>
        
        <button className="px-4 py-1.5 border border-slate-200 text-sm font-medium rounded hover:bg-slate-50 transition-all">Export</button>
        <button className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:opacity-90 transition-all shadow-sm">Sync Data</button>
        
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ml-2 border border-slate-100">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg2n8AIUrdd_Lh9G3CrYe0On2dWvJ9YlDvUqiWKUx72erTcNTypaYqO_oyNp2kyRPCwP8F5oUs8ksudeX7NDe98_r1cpq-bGevSS8Sb6Va001Wshqd5t-NeQKaJdZgfG8HRKj0F6v7ZYHETOBOzuq9hhibPj5zcKCICIw8lHSmuc2GZSznfehb4UHj5sJ2mqGDI2_X0uT_UXMLzEfeaESEbTUE5NVnZCE6FKmV-yHll_St9Wzfa2lbHXs6DbCoUEOxepdRv7tXXE1Z" 
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
