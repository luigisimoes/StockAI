import React from 'react';
import StickyTopNav from '@/components/case-study/StickyTopNav';
import HeroSection from '@/components/case-study/HeroSection';
import ProblemSection from '@/components/case-study/ProblemSection';
import AuditSection from '@/components/case-study/AuditSection';
import UserFlowSection from '@/components/case-study/UserFlowSection';
import LoFiSection from '@/components/case-study/LoFiSection';
import HiFiSection from '@/components/case-study/HiFiSection';
import OutcomesSection from '@/components/case-study/OutcomesSection';
import Footer from '@/components/case-study/Footer';

/**
 * Root page for the case study site (`/` route).
 *
 * Composes the full narrative: sticky nav, hero, problem, audit, user flow,
 * lo-fi wireframes, hi-fi live prototype, outcomes, and footer. Each section
 * is a self-contained component with its own responsive layout. The page
 * includes a skip-to-content link for keyboard accessibility.
 */
export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-white text-graphite-900">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-indigo-400 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm"
      >
        Skip to main content
      </a>
      <StickyTopNav />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <AuditSection />
        <UserFlowSection />
        <LoFiSection />
        <HiFiSection />
        <OutcomesSection />
      </main>
      <Footer />
    </div>
  );
}
