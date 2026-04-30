import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles } from 'lucide-react';

const sections = [
  { id: 'problem', label: 'Problem' },
  { id: 'audit', label: 'Audit' },
  { id: 'user-flow', label: 'Flow' },
  { id: 'lo-fi', label: 'Lo-fi' },
  { id: 'hi-fi', label: 'Hi-fi' },
  { id: 'outcomes', label: 'Outcomes' },
];

/**
 * Sticky top navigation for the case study site.
 *
 * Transparent at page top, gains background and shadow after scrolling
 * 80px so it doesn't fight the hero. Active section highlights via
 * scroll-position comparison against section offsetTop values.
 *
 * Anchor links hidden under md breakpoint � mobile users get logo +
 * Live Prototype CTA only.
 */
export default function StickyTopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const scrollPos = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50
      transition-all duration-300
      ${scrolled 
        ? 'bg-white/85 backdrop-blur-md border-b border-graphite-100 shadow-sm' 
        : 'bg-white/0 border-b border-transparent'
      }
    `}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-3">
        {/* Logo — always visible */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-graphite-900 flex items-center justify-center">
            <span className="text-indigo-300 text-sm font-bold font-display">S</span>
          </div>
          <span className="text-sm font-bold text-graphite-900 hidden sm:inline">StockAI Case Study</span>
          <span className="text-sm font-bold text-graphite-900 sm:hidden">StockAI</span>
        </Link>

        {/* Anchor nav — hidden under md, scrollable horizontal between md and lg */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto" aria-label="Section navigation">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`
                px-3 py-1.5 text-[12px] font-medium rounded-lg transition-colors whitespace-nowrap
                ${activeSection === s.id 
                  ? 'text-indigo-500 bg-indigo-50' 
                  : 'text-graphite-600 hover:text-graphite-900 hover:bg-graphite-50'
                }
              `}
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* CTA — always visible, responsive text */}
        <Link 
          to="/app"
          className="
            inline-flex items-center gap-1.5
            px-3 py-2 rounded-lg
            bg-indigo-400 text-white
            text-[11px] md:text-[12px] font-bold
            hover:bg-indigo-500 active:scale-[0.98]
            shadow-sm hover:shadow-md
            transition-all
            shrink-0
          "
        >
          <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="hidden sm:inline">Live Prototype</span>
          <span className="sm:hidden">Live</span>
          <ExternalLink className="w-3 h-3" strokeWidth={2} />
        </Link>
      </div>
    </header>
  );
}
