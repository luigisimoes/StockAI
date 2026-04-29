import React from 'react';
import Layout from '../components/Layout';
import ReplenishmentView from '../components/ReplenishmentView';
import ItemDeepReview from '../components/ItemDeepReview';
import BulkApproveDialog from '../components/BulkApproveDialog';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useStore } from '@/lib/store';

export default function AppPage() {
  const selectedItemId = useStore((s) => s.selectedItemId);
  const closeDrawer = useStore((s) => s.closeDrawer);

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
}
