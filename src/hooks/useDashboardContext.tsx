
import React, { createContext, useContext } from 'react';
import { DashboardContextType, WorkDay } from '@/types/dashboard';
import { formatCurrency } from '@/utils/dashboardUtils';
import { useDashboardData } from './useDashboardData';
import { useMetasCalculations } from './useMetasCalculations';
import { useWorkdayManager } from './useWorkdayManager';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hooks to manage different aspects of dashboard state
  const { data, updateData } = useDashboardData();
  const { workDays, toggleWorkDay } = useWorkdayManager(data.workDays);
  
  // Make sure workDays in data are always up to date
  if (data.workDays !== workDays) {
    updateData('workDays', null); // Dummy update to trigger the useEffect
    data.workDays = workDays; // Direct update for immediate consistency
  }
  
  // Calculate all premium-related values
  const { 
    premiosMetaFiado, 
    premiosMetaDesafio, 
    premiosValeAlimentacao, 
    totalPremios 
  } = useMetasCalculations(data);

  return (
    <DashboardContext.Provider value={{ 
      data, 
      updateData, 
      toggleWorkDay, 
      formatCurrency,
      premiosMetaFiado,
      premiosMetaDesafio,
      premiosValeAlimentacao,
      totalPremios
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
