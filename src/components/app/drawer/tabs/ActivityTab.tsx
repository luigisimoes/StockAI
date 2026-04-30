import { Sparkles, TrendingUp, AlertTriangle, CheckCircle, Clock, User, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Recommendation } from '@/lib/mock-data';

interface Props {
  rec: Recommendation;
}

/**
 * Activity timeline tab — full audit trail for the recommendation.
 *
 * Each entry shows who did what and when: the AI generating the rec,
 * system constraint checks, human reviews, and historical decisions.
 * A vertical connector line links entries into a visual timeline.
 *
 * Icons are mapped from string keys to Lucide components because the
 * mock data stores icon names as strings for serialization simplicity.
 */
export default function ActivityTab({ rec }: Props) {
  const iconMap: Record<string, typeof Sparkles> = {
    sparkles: Sparkles,
    check: CheckCircle,
    trending: TrendingUp,
    user: User,
    alert: AlertTriangle,
    clock: Clock,
    file: FileText,
  };

  const colorMap: Record<string, string> = {
    sparkles: 'text-indigo-400',
    check: 'text-emerald-500',
    trending: 'text-indigo-400',
    user: 'text-graphite-400',
    alert: 'text-amber-500',
    clock: 'text-graphite-400',
    file: 'text-emerald-500',
  };

  return (
    <div className="mt-4 bg-white border border-graphite-100 card-shadow rounded-xl p-6">
      <h3 className="text-[11px] uppercase tracking-widest font-bold text-graphite-400 mb-4">Activity log</h3>
      <div className="space-y-1">
        {rec.activityTimeline.map((entry, i) => {
          const Icon = iconMap[entry.icon] ?? Sparkles;
          const color = colorMap[entry.icon] ?? 'text-graphite-400';
          return (
            <div key={i} className="flex gap-4 py-3 group">
              <div className="flex flex-col items-center">
                <div className={cn("w-8 h-8 rounded-lg bg-graphite-50 flex items-center justify-center", color)}>
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                {i < rec.activityTimeline.length - 1 && <div className="w-px h-full bg-graphite-100 mt-2" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-graphite-900">{entry.user}</span>
                  <span className="text-[11px] text-graphite-400 font-mono">{entry.time}</span>
                </div>
                <p className="text-[13px] text-graphite-700 font-medium">{entry.action}</p>
                <p className="text-[11px] text-graphite-500 mt-0.5">{entry.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
