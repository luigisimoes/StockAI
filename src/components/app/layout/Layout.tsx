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
    <div className="min-h-screen bg-snow">
      <a 
        href="#app-main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-indigo-400 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm"
      >
        Skip to main content
      </a>
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <TopBar />
      <main id="app-main-content" className="ml-[240px] pt-14 h-screen overflow-auto">
        <div className="max-w-[1440px] mx-auto p-container-padding">
          {children}
        </div>
      </main>
    </div>
  );
}
