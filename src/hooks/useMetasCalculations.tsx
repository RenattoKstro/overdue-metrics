
import { DashboardData } from '@/types/dashboard';
import { 
  calcularPercentualMetaFiado, 
  calcularPercentualMetaDesafio, 
  calculatePremiosMetaFiado,
  calculatePremiosMetaDesafio
} from '@/utils/dashboardUtils';

export const useMetasCalculations = (data: DashboardData) => {
  // Calculate percentages for premiums
  const percentMetaFiado = calcularPercentualMetaFiado(data);
  const percentMetaDesafio = calcularPercentualMetaDesafio(data);

  // Calculate premiums
  const premiosMetaFiado = calculatePremiosMetaFiado(percentMetaFiado);
  const premiosMetaDesafio = calculatePremiosMetaDesafio(percentMetaDesafio);

  const premiosValeAlimentacao = data.metaBatida === true ? 100.00 : 0;
  
  const totalPremios = premiosMetaFiado + premiosMetaDesafio + premiosValeAlimentacao;

  return {
    percentMetaFiado,
    percentMetaDesafio,
    premiosMetaFiado,
    premiosMetaDesafio,
    premiosValeAlimentacao,
    totalPremios
  };
};
