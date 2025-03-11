import React from 'react';
import { Target, DollarSign, Calendar, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/context/DashboardContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const MetaFiado = () => {
  const { data, formatCurrency } = useDashboard();

  const progresso = data.metaMes > 0 ? (data.recebidoMes / data.metaMes) * 100 : 0;

  const valueCards = [
    { icon: DollarSign, label: 'A Receber', value: formatCurrency(data.aReceber) },
    { icon: DollarSign, label: 'Falta Receber Mês', value: formatCurrency(data.faltaReceberMes) },
    { icon: DollarSign, label: 'Recebido Mês', value: formatCurrency(data.recebidoMes) },
    { icon: DollarSign, label: 'Recebido Hoje', value: formatCurrency(data.recebidoHoje) },
    { icon: Calendar, label: 'Dias Restantes', value: data.diasRestantes.toString() },
    { icon: BarChart, label: 'Recebimento por Dia', value: formatCurrency(data.recebimentoPorDia) },
  ];

  return (
    <div className="animate-slide-up">
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
          <div className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-blue-100 animate-float" />
            <CardTitle>Meta Fiado</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Progresso da Meta</h3>
            <div className="flex items-center space-x-4">
              <div className="w-full">
                <Progress value={progresso} className="h-4 bg-blue-100" />
              </div>
              <Badge variant="outline" className="font-semibold text-lg">
                {progresso.toFixed(1)}%
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueCards.map((card, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200">
                <CardContent className="p-6 flex flex-col items-center justify-center h-40">
                  <card.icon className="h-8 w-8 text-blue-500 mb-4 animate-pulse" />
                  <h3 className="text-md font-medium text-slate-700 mb-2">{card.label}</h3>
                  <Badge variant="outline" className="text-xl font-bold text-blue-600">
                    {card.value}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaFiado;
