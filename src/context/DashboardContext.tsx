
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WorkDay {
  date: Date;
  isWorkDay: boolean;
}

interface DashboardData {
  // Meta Fiado (editable)
  aberturaVencidoMes: number;
  aberturaVencidoDia: number;
  metaMes: number;
  vencidoAtual: number;
  diasRestantes: number;
  
  // Meta Fiado (calculated)
  aReceber: number;
  faltaReceberMes: number;
  recebidoMes: number;
  recebidoHoje: number;
  recebimentoPorDia: number;
  
  // Meta Desafio
  metaDesafio: number;
  progressoDesafio: number;
  
  // Meta Vale Alimentação
  diaCorte: number;
  diasUteisRestantesAteCorte: number;
  metaValeAlimentacao: number; // 80% do valor
  metaBatida: boolean | null;
  
  // Calendário
  workDays: WorkDay[];
  
  // Data atual
  currentDate: Date;
}

interface DashboardContextProps {
  data: DashboardData;
  updateData: (field: keyof DashboardData, value: any) => void;
  toggleWorkDay: (date: Date) => void;
  calculateProgress: (value: number) => number;
  formatCurrency: (value: number) => string;
  premiosMetaFiado: number;
  premiosMetaDesafio: number;
  premiosValeAlimentacao: number;
  totalPremios: number;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardData>({
    // Meta Fiado (editable)
    aberturaVencidoMes: 1118083.42,
    aberturaVencidoDia: 836527.75,
    metaMes: 448867.63,
    vencidoAtual: 787154.86,
    diasRestantes: 0, // Será calculado automaticamente
    
    // Meta Fiado (calculated)
    aReceber: 0,
    faltaReceberMes: 0,
    recebidoMes: 0,
    recebidoHoje: 0,
    recebimentoPorDia: 0,
    
    // Meta Desafio
    metaDesafio: 446982.1,
    progressoDesafio: 0,
    
    // Meta Vale Alimentação
    diaCorte: 15,
    diasUteisRestantesAteCorte: 0,
    metaValeAlimentacao: 535372.86, // 80% do valor
    metaBatida: null,
    
    // Calendário
    workDays: Array.from({ length: 31 }, (_, i) => ({
      date: new Date(new Date().getFullYear(), new Date().getMonth(), i + 1),
      isWorkDay: ![0, 6].includes(new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).getDay()) // 0 = domingo, 6 = sábado
    })),
    
    // Data atual
    currentDate: new Date()
  });
  
  const [premiosMetaFiado, setPremiosMetaFiado] = useState(0);
  const [premiosMetaDesafio, setPremiosMetaDesafio] = useState(0);
  const [premiosValeAlimentacao, setPremiosValeAlimentacao] = useState(0);
  const [totalPremios, setTotalPremios] = useState(0);

  // Função para calcular dias úteis restantes no mês
  const calcularDiasUteisRestantes = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Filtrar apenas os dias úteis até o fim do mês
    return data.workDays.filter(day => 
      day.isWorkDay && 
      day.date > today && 
      day.date <= lastDayOfMonth
    ).length;
  };

  // Atualiza os valores calculados quando os valores editáveis mudam
  useEffect(() => {
    const aReceber = data.aberturaVencidoMes - data.metaMes;
    const faltaReceberMes = data.vencidoAtual - data.metaMes;
    const recebidoMes = data.aberturaVencidoMes - data.vencidoAtual;
    const recebidoHoje = data.aberturaVencidoDia - data.vencidoAtual;
    
    // Calcular dias úteis restantes automaticamente
    const diasRestantesCalculados = calcularDiasUteisRestantes();
    
    const recebimentoPorDia = diasRestantesCalculados > 0 ? faltaReceberMes / diasRestantesCalculados : 0;
    const progressoDesafio = (data.metaDesafio / data.vencidoAtual) * 100;
    
    // Calcula dias úteis até o dia de corte
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const cutoffDate = new Date(currentYear, currentMonth, data.diaCorte);
    
    // Se já passou do dia de corte, define metaBatida como false
    if (today > cutoffDate) {
      setData(prev => ({
        ...prev,
        metaBatida: false
      }));
    }
    
    // Calcula dias úteis restantes até o dia de corte
    const diasUteisRestantesAteCorte = data.workDays
      .filter(day => 
        day.isWorkDay && 
        day.date > today && 
        day.date <= cutoffDate
      ).length;
    
    setData(prev => ({
      ...prev,
      aReceber,
      faltaReceberMes,
      recebidoMes,
      recebidoHoje,
      recebimentoPorDia,
      progressoDesafio,
      diasUteisRestantesAteCorte,
      diasRestantes: diasRestantesCalculados
    }));
    
    // Calcula prêmios Meta Fiado
    const percentMetaFiado = data.metaMes > 0 ? (recebidoMes / data.metaMes) * 100 : 0;
    let premiosFiado = 0;
    
    if (percentMetaFiado >= 94) premiosFiado += 52.50;
    if (percentMetaFiado >= 96) premiosFiado += 63.00;
    if (percentMetaFiado >= 98) premiosFiado += 84.00;
    if (percentMetaFiado >= 99) premiosFiado += 94.50;
    if (percentMetaFiado >= 100) premiosFiado += 241.50;
    if (percentMetaFiado >= 101) premiosFiado += 84.00;
    if (percentMetaFiado >= 103) premiosFiado += 84.00;
    if (percentMetaFiado >= 105) premiosFiado += 84.00;
    
    setPremiosMetaFiado(premiosFiado);
    
    // Calcula prêmios Meta Desafio
    const percentMetaDesafio = data.vencidoAtual > 0 ? (data.metaDesafio / data.vencidoAtual) * 100 : 0;
    let premiosDesafio = 0;
    
    if (percentMetaDesafio >= 96) premiosDesafio += 200.00;
    if (percentMetaDesafio >= 98) premiosDesafio += 150.00;
    if (percentMetaDesafio >= 100) premiosDesafio += 150.00;
    
    setPremiosMetaDesafio(premiosDesafio);
    
    // Calcula prêmio Vale Alimentação
    let premioVale = 0;
    if (data.metaBatida === true) {
      premioVale = 100.00;
    }
    
    setPremiosValeAlimentacao(premioVale);
    
  }, [data.aberturaVencidoMes, data.aberturaVencidoDia, data.metaMes, data.vencidoAtual, data.metaDesafio, data.workDays, data.diaCorte, data.metaBatida]);

  // Atualiza o total de prêmios
  useEffect(() => {
    setTotalPremios(premiosMetaFiado + premiosMetaDesafio + premiosValeAlimentacao);
  }, [premiosMetaFiado, premiosMetaDesafio, premiosValeAlimentacao]);

  const updateData = (field: keyof DashboardData, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleWorkDay = (date: Date) => {
    setData(prev => ({
      ...prev,
      workDays: prev.workDays.map(day => 
        day.date.getDate() === date.getDate() && day.date.getMonth() === date.getMonth()
          ? { ...day, isWorkDay: !day.isWorkDay }
          : day
      )
    }));
  };

  const calculateProgress = (value: number) => {
    return Math.min(Math.max(value, 0), 100);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <DashboardContext.Provider 
      value={{ 
        data, 
        updateData, 
        toggleWorkDay, 
        calculateProgress, 
        formatCurrency,
        premiosMetaFiado,
        premiosMetaDesafio,
        premiosValeAlimentacao,
        totalPremios
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
