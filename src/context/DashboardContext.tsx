// src/context/DashboardContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface DashboardData {
  metaMes: number;
  aberturaVencidoMes: number;
  aberturaVencidoDia: number;
  vencidoAtual: number;
  diaCorte: number;
  aReceber: number;
  recebidoMes: number;
  recebidoHoje: number;
  faltaReceberMes: number;
  diasRestantes: number;
  recebimentoPorDia: number;
  workDays: { date: Date; isWorkDay: boolean }[];
  aReceberDesafio: number;
  recebidoDesafioMes: number;
  faltaReceberDesafioMes: number;
  progressoDesafio: number; // Adicionado explicitamente
  // Outros campos...
}

interface DashboardContextType {
  data: DashboardData;
  updateData: (key: keyof DashboardData, value: number | Date | boolean) => void;
  toggleWorkDay: (date: Date) => void;
  formatCurrency: (value: number) => string;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DashboardData>({
    metaMes: 10000,
    aberturaVencidoMes: 2000,
    aberturaVencidoDia: 500,
    vencidoAtual: 1500,
    diaCorte: 25,
    aReceber: 8000,
    recebidoMes: 4000,
    recebidoHoje: 200,
    faltaReceberMes: 4000,
    diasRestantes: 15,
    recebimentoPorDia: 266.67,
    workDays: [],
    aReceberDesafio: 5000,
    recebidoDesafioMes: 3000,
    faltaReceberDesafioMes: 2000,
    progressoDesafio: 60, // Exemplo de valor inicial
    // Outros campos...
  });

  const updateData = (key: keyof DashboardData, value: number | Date | boolean) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const toggleWorkDay = (date: Date) => {
    setData(prev => {
      const existingDay = prev.workDays.find(wd => wd.date.toDateString() === date.toDateString());
      if (existingDay) {
        return {
          ...prev,
          workDays: prev.workDays.map(wd =>
            wd.date.toDateString() === date.toDateString()
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <DashboardContext.Provider value={{ data, updateData, toggleWorkDay, formatCurrency }}>
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
