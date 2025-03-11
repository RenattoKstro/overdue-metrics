
import { DashboardData } from '@/types/dashboard';

export const calculateDerivedValues = (data: DashboardData): Partial<DashboardData> => {
  const newData: Partial<DashboardData> = {};
  
  newData.faltaReceberMes = data.aReceber - data.recebidoMes;
  newData.diasRestantes = data.diaCorte;
  newData.recebimentoPorDia = data.diasRestantes > 0 ? newData.faltaReceberMes! / data.diasRestantes : 0;

  newData.faltaReceberDesafioMes = (data.aReceberDesafio || 0) - (data.recebidoDesafioMes || 0);
  newData.progressoDesafio = data.metaDesafio && data.metaDesafio > 0
    ? ((data.recebidoDesafioMes || 0) / data.metaDesafio) * 100
    : 0;
    
  newData.metaValeAlimentacao = data.aReceber * 0.8; // 80% of aReceber

  return newData;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const calcularPercentualMetaFiado = (data: DashboardData): number => {
  if (data.metaMes <= 0) return 0;
  return (data.recebidoMes / data.metaMes) * 100;
};

export const calcularPercentualMetaDesafio = (data: DashboardData): number => {
  if (data.vencidoAtual <= 0) return 0;
  return (data.metaDesafio / data.vencidoAtual) * 100;
};

export const calculatePremiosMetaFiado = (percentMetaFiado: number): number => {
  return (percentMetaFiado >= 94 ? 52.50 : 0) +
    (percentMetaFiado >= 96 ? 63.00 : 0) +
    (percentMetaFiado >= 98 ? 84.00 : 0) +
    (percentMetaFiado >= 99 ? 94.50 : 0) +
    (percentMetaFiado >= 100 ? 241.50 : 0) +
    (percentMetaFiado >= 101 ? 84.00 : 0) +
    (percentMetaFiado >= 103 ? 84.00 : 0) +
    (percentMetaFiado >= 105 ? 84.00 : 0);
};

export const calculatePremiosMetaDesafio = (percentMetaDesafio: number): number => {
  return (percentMetaDesafio >= 96 ? 200.00 : 0) +
    (percentMetaDesafio >= 98 ? 150.00 : 0) +
    (percentMetaDesafio >= 100 ? 150.00 : 0);
};

export const getInitialDashboardData = (): DashboardData => {
  return {
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
    currentDate: new Date(),
    metaValeAlimentacao: 1600, // 80% of aReceber by default
    diasUteisRestantesAteCorte: 10,
    metaBatida: null,
  };
};
