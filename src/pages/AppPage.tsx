import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/app/layout/Layout';
import ReplenishmentView from '@/components/app/dashboard/ReplenishmentView';
import ItemDeepReview from '@/components/app/drawer/ItemDeepReview';
import BulkApproveDialog from '@/components/app/dialogs/BulkApproveDialog';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useStore } from '@/lib/store';

export default function AppPage() {
  const selectedItemId = useStore((s) => s.selectedItemId);
  const closeDrawer = useStore((s) => s.closeDrawer);

  return (
    <TooltipProvider>
      {/* Mobile fallback — shows under 768px */}
      <div className="md:hidden min-h-screen bg-snow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 border border-indigo-100">
          <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <line x1="8" y1="20" x2="16" y2="20" />
            <line x1="12" y1="18" x2="12" y2="20" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold text-graphite-900 mb-3">
          Best viewed on desktop
        </h1>
        <p className="text-sm text-graphite-600 leading-relaxed mb-6 max-w-[320px]">
          StockAI Replenishment is built for inventory managers working on desktop. The deep-review drawer and dashboard need a wider screen to render properly.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-400 text-white text-sm font-bold shadow-md hover:bg-indigo-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          <span>Read the case study instead</span>
        </Link>
        <p className="text-[11px] text-graphite-400 font-mono mt-8">
          Open this page at 768px+ width
        </p>
      </div>

      {/* Desktop app — shows at 768px+ */}
      <div className="hidden md:block">
        <Layout activeTab="recommendations" onTabChange={() => {}}>
          <ReplenishmentView />

          {selectedItemId !== null && (
            <ItemDeepReview
              itemId={selectedItemId}
              onClose={closeDrawer}
            />
          )}

          <BulkApproveDialog />
        </Layout>
      </div>
    </TooltipProvider>
  );
}
