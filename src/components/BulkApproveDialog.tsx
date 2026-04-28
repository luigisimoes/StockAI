import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Package, TrendingUp, Wallet } from 'lucide-react';
import { useStore } from '@/lib/store';
import { recommendations } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function BulkApproveDialog() {
  const open = useStore((s) => s.bulkDialogOpen);
  const closeBulkDialog = useStore((s) => s.closeBulkDialog);
  const selectedIds = useStore((s) => s.selectedIds);
  const bulkApprove = useStore((s) => s.bulkApprove);

  const selectedRecs = recommendations.filter((r) => selectedIds.includes(r.id));
  const totalUnits = selectedRecs.reduce((sum, r) => sum + (r.proposed - r.current), 0);
  const totalRevenue = selectedRecs.reduce((sum, r) => sum + r.impactValue, 0);
  const totalCapital = Math.abs(totalRevenue * 0.6); // rough estimate for demo
  const hasConflicts = selectedRecs.some((r) => r.confidence.tier === 'low');

  // Vendor breakdown
  const vendorMap = new Map<string, number>();
  selectedRecs.forEach((r) => {
    vendorMap.set(r.vendor, (vendorMap.get(r.vendor) ?? 0) + 1);
  });

  // Top 5 largest orders
  const topOrders = [...selectedRecs]
    .sort((a, b) => Math.abs(b.impactValue) - Math.abs(a.impactValue))
    .slice(0, 5);

  function handleConfirm() {
    const defaultUnits: Record<number, number> = {};
    selectedRecs.forEach((r) => { defaultUnits[r.id] = r.proposed - r.current; });
    bulkApprove([...selectedIds], defaultUnits);
    toast.success(`${selectedRecs.length} recommendations approved`, {
      description: `+${totalUnits.toLocaleString()} units · $${Math.abs(totalRevenue).toLocaleString()} projected revenue`,
      action: {
        label: 'Undo',
        onClick: () => {
          selectedRecs.forEach((r) => useStore.getState().undo(r.id));
          toast.info('Bulk approval undone');
        },
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeBulkDialog()}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Approve {selectedRecs.length} recommendation{selectedRecs.length !== 1 ? 's' : ''}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Aggregate Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-graphite-50 hairline-border rounded-xl text-center">
              <Package className="w-5 h-5 text-indigo-400 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1">Total units</p>
              <p className="font-display text-lg font-bold tabular-nums text-graphite-900">{totalUnits > 0 ? '+' : ''}{totalUnits.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-graphite-50 hairline-border rounded-xl text-center">
              <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1">Revenue</p>
              <p className="font-display text-lg font-bold tabular-nums text-emerald-600">${Math.abs(totalRevenue).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-graphite-50 hairline-border rounded-xl text-center">
              <Wallet className="w-5 h-5 text-graphite-400 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1">Capital</p>
              <p className="font-display text-lg font-bold tabular-nums text-graphite-900">${totalCapital.toLocaleString()}</p>
            </div>
          </div>

          {/* Vendor Breakdown */}
          <div>
            <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2">Vendor breakdown</p>
            <div className="flex flex-wrap gap-2">
              {[...vendorMap.entries()].map(([vendor, count]) => (
                <div key={vendor} className="px-3 py-1.5 bg-white hairline-border rounded-lg text-xs font-medium text-graphite-700 card-shadow">
                  {vendor} <span className="text-graphite-400 ml-1">({count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Largest Orders */}
          <div>
            <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-2">Top {topOrders.length} largest orders</p>
            <div className="space-y-1.5">
              {topOrders.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between py-2 px-3 bg-white hairline-border rounded-lg card-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-400 text-[10px] font-bold">{rec.initials}</div>
                    <div>
                      <p className="text-sm font-bold text-graphite-900">{rec.title}</p>
                      <p className="text-[11px] text-graphite-400 font-mono">{rec.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums text-graphite-900">{rec.impact}</p>
                    <p className="text-[11px] text-graphite-400 tabular-nums">+{(rec.proposed - rec.current).toLocaleString()} units</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constraint Conflicts */}
          {hasConflicts && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold text-graphite-900">Low-confidence items included</p>
                <p className="text-[13px] text-graphite-600 mt-1">Some selected recommendations have confidence below 50%. Review individually before bulk approval.</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline" className="hairline-border">Cancel</Button>
          </DialogClose>
          <Button onClick={handleConfirm} className="bg-indigo-400 hover:bg-indigo-500 text-white gap-2">
            <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
            Confirm approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
