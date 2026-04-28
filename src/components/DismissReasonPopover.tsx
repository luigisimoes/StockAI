import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface DismissReasonPopoverProps {
  onDismiss: (reason: string) => void;
  children: React.ReactNode;
}

const REASONS = [
  'Stockout-driven, AI overshot',
  'Cold-start SKU, low confidence',
  'Vendor capacity issue not in model',
  'OTB budget reallocation',
  'Other',
];

export default function DismissReasonPopover({ onDismiss, children }: DismissReasonPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState('');

  function handleSubmit() {
    if (!selected) return;
    const reason = selected === 'Other' ? `Other: ${otherText}` : selected;
    onDismiss(reason);
    setOpen(false);
    setSelected(null);
    setOtherText('');
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start" sideOffset={8}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-graphite-900">Dismiss reason</h4>
            <button onClick={() => setOpen(false)} className="text-graphite-400 hover:text-graphite-900 transition-colors" aria-label="Close">
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-[11px] text-graphite-500 font-medium">Required. Your feedback trains the model.</p>
          
          <div className="space-y-1.5">
            {REASONS.map((reason) => (
              <label key={reason} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-graphite-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="dismiss-reason"
                  checked={selected === reason}
                  onChange={() => setSelected(reason)}
                  className="w-3.5 h-3.5 text-indigo-400 focus:ring-indigo-200 border-graphite-300"
                />
                <span className="text-[13px] font-medium text-graphite-700">{reason}</span>
              </label>
            ))}
          </div>

          {selected === 'Other' && (
            <input
              type="text"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Describe the reason..."
              className="w-full bg-white hairline-border rounded-lg px-3 py-2 text-sm text-graphite-900 placeholder-graphite-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
              autoFocus
            />
          )}

          <Button
            onClick={handleSubmit}
            disabled={!selected || (selected === 'Other' && !otherText.trim())}
            className="w-full bg-graphite-900 hover:bg-graphite-800 text-white"
            size="sm"
          >
            Confirm dismiss
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
