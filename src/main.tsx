import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CaseStudyPage from './pages/CaseStudyPage';
import AppPage from './pages/AppPage';
import LoFiExportPage from './pages/LoFiExportPage';
import { Toaster } from '@/components/ui/sonner';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CaseStudyPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/lofi-export" element={<LoFiExportPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
