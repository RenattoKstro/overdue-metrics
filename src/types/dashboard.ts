
export interface WorkDay {
  date: Date;
  isWorkDay: boolean;
}

export interface DashboardData {
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
  currentDate: Date;
  metaValeAlimentacao: number;
  diasUteisRestantesAteCorte: number;
  metaBatida: boolean | null;
}

export interface DashboardContextType {
  data: DashboardData;
  updateData: (key: keyof DashboardData, value: number | Date | boolean | null) => void;
  toggleWorkDay: (date: Date) => void;
  formatCurrency: (value: number) => string;
  premiosMetaFiado: number;
  premiosMetaDesafio: number;
  premiosValeAlimentacao: number;
  totalPremios: number;
}
