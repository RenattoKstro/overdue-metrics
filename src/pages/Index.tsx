import React from 'react';
import { DashboardProvider } from '@/context/DashboardContext';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </div>
  );
};

export default Index;
