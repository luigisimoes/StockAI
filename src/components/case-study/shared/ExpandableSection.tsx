import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandableSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
  background?: 'white' | 'cool-gray' | 'indigo-tint';
}

export default function ExpandableSection({ 
  id, eyebrow, title, summary, children, background = 'white' 
}: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const bgClass = {
    'white': 'bg-white',
    'cool-gray': 'bg-[#F8FAFC]',
    'indigo-tint': 'bg-gradient-to-b from-indigo-50/30 to-white',
  }[background];

  return (
    <section id={id} className={`py-20 ${bgClass}`}>
      <div className="max-w-[900px] mx-auto px-6">
        <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-500 mb-4">
          {eyebrow}
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-graphite-900 mb-6 leading-tight">
          {title}
        </h2>

        <p className="text-lg text-graphite-700 leading-relaxed font-medium mb-6">
          {summary}
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          <span>{expanded ? 'Show less' : 'Read more'}</span>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
            strokeWidth={2} 
          />
        </button>
      </div>
    </section>
  );
}
