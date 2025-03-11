import React, { useEffect } from 'react';
import { Utensils, AlertTriangle, Calendar, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/context/DashboardContext';
import { Badge } from '@/components/ui/badge';

const MetaValeAlimentacao = () => {
  const { data, updateData, formatCurrency } = useDashboard();

  const valorJaRecebido = data.aberturaVencidoMes - data.vencidoAtual;
  const percentageReached = data.metaValeAlimentacao > 0
    ? (valorJaRecebido / data.metaValeAlimentacao) * 100
    : 0;
  const progressValue = Math.min(Math.max(percentageReached, 0), 100);

  const valorNecessario = data.metaValeAlimentacao;
  const valorFaltante = Math.max(valorNecessario - valorJaRecebido, 0);
  const recebimentoDiarioNecessario = data.diasUteisRestantesAteCorte > 0
    ? valorFaltante / data.diasUteisRestantesAteCorte
    : 0;

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const cutoffDate = new Date(currentYear, currentMonth, data.diaCorte);

    if (today > cutoffDate && data.metaBatida === null) {
      const percentageAchieved = data.metaValeAlimentacao > 0
        ? (valorJaRecebido / data.metaValeAlimentacao) * 100
        : 0;
      updateData('metaBatida', percentageAchieved >= 80);
    } else if (today <= cutoffDate) {
      const percentageAchieved = data.metaValeAlimentacao > 0
        ? (valorJaRecebido / data.metaValeAlimentacao) * 100
        : 0;
      if (percentageAchieved >= 80) {
        updateData('metaBatida', true);
      } else {
        updateData('metaBatida', null);
      }
    }
  }, [data.vencidoAtual, data.aberturaVencidoMes, data.metaValeAlimentacao, data.diaCorte, updateData]);

  let progressColor = "bg-red-500";
  if (progressValue >= 80) progressColor = "bg-green-500";
  else if (progressValue >= 50) progressColor = "bg-yellow-500";
  else if (progressValue >= 30) progressColor = "bg-orange-500";

  return (
    <div className="animate-slide-up">
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white">
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-emerald-100 animate-float" />
            <CardTitle>Meta Vale Alimentação</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-700">Regras da Meta</h3>
                <p className="text-sm text-slate-600">
                  O objetivo é atingir 80% da meta até o dia 15 do mês.
                  A meta corresponde a 80% do "A Receber" da Meta Fiado, que é recalculada dinamicamente.
                  Se atingir 80% ({formatCurrency(data.metaValeAlimentacao)}) até o dia 15, a meta é batida.
                </p>
              </div>
              {data.metaBatida === true ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                  <Badge variant="outline" className="mr-2 bg-green-500 text-white">Meta Batida</Badge>
                  <p className="text-green-700 text-sm">Parabéns! Você atingiu a meta do vale alimentação.</p>
                </div>
              ) : data.metaBatida === false ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm">Meta Não Batida. Não foi possível atingir 80% até o dia 15.</p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-700 text-sm">
                    Meta em andamento. Você ainda tem tempo para atingir 80% até o dia 15.
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-emerald-600 flex items-center">
                    <Utensils className="h-4 w-4 mr-1" /> Progresso Atual
                  </span>
                  <span>{progressValue.toFixed(2)}%</span>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${progressColor} transition-all duration-1000 ease-out`}
                    style={{ width: `${progressValue}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0%</span>
                  <span>Meta: 80%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Dias úteis até o dia 15</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {data.diasUteisRestantesAteCorte}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Recebimento diário necessário</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(recebimentoDiarioNecessario)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Utensils className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Valor necessário (80%)</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(data.metaValeAlimentacao)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Utensils className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Valor já recebido</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(valorJaRecebido)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaValeAlimentacao;
