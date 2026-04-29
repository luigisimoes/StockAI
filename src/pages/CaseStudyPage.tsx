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

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-white text-graphite-900">
      <StickyTopNav />
      <main>
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
