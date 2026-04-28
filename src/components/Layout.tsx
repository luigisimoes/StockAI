import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <TopBar />
      <main className="ml-[240px] pt-14 h-screen overflow-auto">
        <div className="max-w-[1440px] mx-auto p-container-padding">
          {children}
        </div>
      </main>
    </div>
  );
}
