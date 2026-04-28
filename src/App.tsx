import React, { useState } from 'react';
import Layout from './components/Layout';
import ReplenishmentView from './components/ReplenishmentView';
import ForecastingView from './components/ForecastingView';
import AnalyticsView from './components/AnalyticsView';
import ItemDeepReview from './components/ItemDeepReview';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  // Note: Sidebar is inside Layout, so we need to sync activeTab
  // For simplicity in this demo, we'll keep Layout generic and App controlling state
  
  const renderContent = () => {
    switch (activeTab) {
      case 'recommendations':
        return <ReplenishmentView onSelectItem={(id) => setSelectedItem(id)} />;
      case 'analytics':
        return <AnalyticsView />;
      case 'forecasting':
        return <ForecastingView />;
      default:
        return <ReplenishmentView onSelectItem={(id) => setSelectedItem(id)} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
      
      <AnimatePresence>
        {selectedItem !== null && (
          <ItemDeepReview 
            itemId={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
