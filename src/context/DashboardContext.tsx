
import React, { createContext, useContext, useState } from 'react';

interface WorkDay {
  date: Date;
  isWorkDay: boolean;
}

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
  workDays: WorkDay[];
  aReceberDesafio: number;
  recebidoDesafioMes: number;
  faltaReceberDesafioMes: number;
  progressoDesafio: number;
  metaDesafio: number;
  // Added missing properties
  currentDate: Date;
  metaValeAlimentacao: number;
  diasUteisRestantesAteCorte: number;
  metaBatida: boolean | null;
}

interface DashboardContextType {
  data: DashboardData;
  updateData: (key: keyof DashboardData, value: number | Date | boolean | null) => void;
  toggleWorkDay: (date: Date) => void;
  formatCurrency: (value: number) => string;
  // Added missing properties for MeusPremios
  premiosMetaFiado: number;
  premiosMetaDesafio: number;
  premiosValeAlimentacao: number;
  totalPremios: number;
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
    progressoDesafio: 60,
    metaDesafio: 5000,
    // Added initial values for new properties
    currentDate: new Date(),
    metaValeAlimentacao: 1600, // 80% of aReceber by default
    diasUteisRestantesAteCorte: 10,
    metaBatida: null,
  });

  // Calculate premium values
  const calcularPercentualMetaFiado = () => {
    if (data.metaMes <= 0) return 0;
    return (data.recebidoMes / data.metaMes) * 100;
  };

  const calcularPercentualMetaDesafio = () => {
    if (data.vencidoAtual <= 0) return 0;
    return (data.metaDesafio / data.vencidoAtual) * 100;
  };

  const percentMetaFiado = calcularPercentualMetaFiado();
  const percentMetaDesafio = calcularPercentualMetaDesafio();

  // Calculate premiums
  const premiosMetaFiado = 
    (percentMetaFiado >= 94 ? 52.50 : 0) +
    (percentMetaFiado >= 96 ? 63.00 : 0) +
    (percentMetaFiado >= 98 ? 84.00 : 0) +
    (percentMetaFiado >= 99 ? 94.50 : 0) +
    (percentMetaFiado >= 100 ? 241.50 : 0) +
    (percentMetaFiado >= 101 ? 84.00 : 0) +
    (percentMetaFiado >= 103 ? 84.00 : 0) +
    (percentMetaFiado >= 105 ? 84.00 : 0);

  const premiosMetaDesafio = 
    (percentMetaDesafio >= 96 ? 200.00 : 0) +
    (percentMetaDesafio >= 98 ? 150.00 : 0) +
    (percentMetaDesafio >= 100 ? 150.00 : 0);

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
      
      // Recalcular valores derivados
      newData.faltaReceberMes = newData.aReceber - newData.recebidoMes;
      newData.diasRestantes = newData.diaCorte; // Sincronizar diasRestantes com diaCorte
      newData.recebimentoPorDia = newData.diasRestantes > 0 ? newData.faltaReceberMes / newData.diasRestantes : 0;

      // Recalcular valores de Meta Desafio
      newData.faltaReceberDesafioMes = (newData.aReceberDesafio || 0) - (newData.recebidoDesafioMes || 0);
      newData.progressoDesafio = newData.metaDesafio && newData.metaDesafio > 0
        ? ((newData.recebidoDesafioMes || 0) / newData.metaDesafio) * 100
        : 0;
        
      // Update for Vale Alimentação meta
      newData.metaValeAlimentacao = newData.aReceber * 0.8; // 80% of aReceber

      return newData;
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
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
