
import React, { createContext, useContext, useState } from 'react';
import { DashboardData, DashboardContextType, WorkDay } from '@/types/dashboard';
import { 
  formatCurrency, 
  calculateDerivedValues, 
  calcularPercentualMetaFiado, 
  calcularPercentualMetaDesafio, 
  calculatePremiosMetaFiado,
  calculatePremiosMetaDesafio,
  getInitialDashboardData
} from '@/utils/dashboardUtils';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DashboardData>(getInitialDashboardData());

  // Calculate percentages for premiums
  const percentMetaFiado = calcularPercentualMetaFiado(data);
  const percentMetaDesafio = calcularPercentualMetaDesafio(data);

  // Calculate premiums
  const premiosMetaFiado = calculatePremiosMetaFiado(percentMetaFiado);
  const premiosMetaDesafio = calculatePremiosMetaDesafio(percentMetaDesafio);

  const premiosValeAlimentacao = data.metaBatida === true ? 100.00 : 0;
  
  const totalPremios = premiosMetaFiado + premiosMetaDesafio + premiosValeAlimentacao;

  const updateData = (key: keyof DashboardData, value: number | Date | boolean | null) => {
    setData(prev => {
      const newData = { ...prev };
      
      // Handle specific key updates
      if (typeof value === 'number') {
        (newData[key] as number) = value;
      } else if (value instanceof Date) {
        (newData[key] as Date) = value;
      } else {
        // Handle boolean or null values
        (newData[key] as boolean | null) = value;
      }
      
      // Calculate derived values
      const derivedValues = calculateDerivedValues(newData);
      
      return {
        ...newData,
        ...derivedValues
      };
    });
  };

  const toggleWorkDay = (date: Date) => {
    setData(prev => {
      const existingDay = prev.workDays.find(wd => 
        wd.date instanceof Date && wd.date.toDateString() === date.toDateString()
      );
      
      if (existingDay) {
        return {
          ...prev,
          workDays: prev.workDays.map(wd =>
            wd.date instanceof Date && wd.date.toDateString() === date.toDateString()
              ? { ...wd, isWorkDay: !wd.isWorkDay }
              : wd
          ),
        };
      }
      
      return {
        ...prev,
        workDays: [...prev.workDays, { date, isWorkDay: true }],
      };
    });
  };

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
