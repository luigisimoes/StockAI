import { useState, useEffect, useCallback } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { recommendations } from '@/lib/mock-data';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

import DrawerHeader from './DrawerHeader';
import DrawerStatCards from './DrawerStatCards';
import DrawerFooter from './DrawerFooter';
import AskAiPanel from '@/components/app/ai-copilot/AskAiPanel';
import WhyTab from './tabs/WhyTab';
import ForecastTab from './tabs/ForecastTab';
import AlternativesTab from './tabs/AlternativesTab';
import ActivityTab from './tabs/ActivityTab';

interface Props {
  itemId: number;
  onClose: () => void;
}

/**
 * Deep-review drawer for individual AI recommendations.
 *
 * Opens as an 880px right-side slide-over. Three visual zones:
 * white header (sticky), cool-gray scrollable content, white command-bar
 * footer (sticky). Contains the full reasoning behind a single rec:
 * top signals with weights, constraints checked, past similar decisions,
 * alternative scenarios, and complete activity log.
 *
 * Keyboard shortcuts:
 * - Escape: close drawer
 * - Cmd/Ctrl + Enter: approve current adjustment
 */
export default function ItemDeepReview({ itemId, onClose }: Props) {
  const rec = recommendations.find((r) => r.id === itemId) ?? recommendations[0];
  const [units, setUnits] = useState(rec.proposed - rec.current);
  const isOverstock = rec.type === 'OVERSTOCK';
  const [activeTab, setActiveTab] = useState('why');

  const approve = useStore((s) => s.approve);
  const dismiss = useStore((s) => s.dismiss);

  // Live impact recalculates on every slider drag. O(1) operation, no
  // memoization needed (React batches re-renders during input changes).
  const baseUnits = rec.proposed - rec.current;
  const liveImpact = Math.round((units / baseUnits) * rec.baseImpact);

  const handleApprove = useCallback(() => {
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
  }, [rec, units, liveImpact, approve, onClose]);

  const handleDismiss = useCallback((reason: string) => {
    dismiss(rec.id, reason);
    onClose();
    toast.info(`Dismissed: ${rec.title}`, { description: reason });
  }, [rec, dismiss, onClose]);

  // Keyboard shortcuts: Escape closes, Cmd/Ctrl+Enter approves
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleApprove();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleApprove, onClose]);

  return (
    <Sheet open={true} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-[880px] max-w-full p-0 flex flex-col [&>button]:hidden" aria-describedby={undefined}>
        <SheetTitle className="sr-only">{rec.title} — AI Recommendation Review</SheetTitle>

        {/* Zone 1 — Sticky white header */}
        <DrawerHeader
          rec={rec}
          onClose={onClose}
          onApprove={handleApprove}
          onDismiss={handleDismiss}
        />

        {/* Zone 2 — Scrollable cool-gray content area */}
        {/* Cool gray (#F1F5F9) inline because slate is not in our token system.
            White floating cards on this background give the visual surface
            separation the redesign relies on. */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: '#F1F5F9' }}>
          <div className="px-8 py-6 space-y-6">
            <DrawerStatCards rec={rec} baseUnits={baseUnits} isOverstock={isOverstock} />

            {/* Persistent inline AI strip — always visible, expands in place */}
            <AskAiPanel recId={rec.id} activeTab={activeTab} />

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-auto p-0 bg-transparent border-b border-graphite-200 rounded-none w-full justify-start gap-7 pl-0 pr-0">
                {[
                  { value: 'why', label: 'Why this rec?' },
                  { value: 'forecast', label: 'Forecast' },
                  { value: 'alternatives', label: 'Alternatives' },
                  { value: 'activity', label: 'Activity' },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="px-1 pb-3 pt-2 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-graphite-500 hover:text-graphite-900 font-bold text-sm transition-colors"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="why"><WhyTab rec={rec} /></TabsContent>
              <TabsContent value="forecast"><ForecastTab rec={rec} /></TabsContent>
              <TabsContent value="alternatives"><AlternativesTab rec={rec} /></TabsContent>
              <TabsContent value="activity"><ActivityTab rec={rec} /></TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Zone 3 — Sticky white command-bar footer */}
        <DrawerFooter
          units={units}
          setUnits={setUnits}
          baseUnits={baseUnits}
          isOverstock={isOverstock}
          liveImpact={liveImpact}
          onApprove={handleApprove}
        />
      </SheetContent>
    </Sheet>
  );
}
