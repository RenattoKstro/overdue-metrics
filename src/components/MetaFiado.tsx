import React from 'react';
import { Target, DollarSign, Calendar, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/context/DashboardContext';
import { Badge } from '@/components/ui/badge';

const MetaFiado = () => {
  const { data, formatCurrency } = useDashboard();

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-700">Regras da Meta</h3>
                <p className="text-sm text-slate-600">
                  O objetivo é atingir 100% da meta mensal até o final do mês.
                  A meta é ajustada na aba "Ajustes de Metas".
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">A Receber</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(data.aReceber)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Falta Receber Mês</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(data.faltaReceberMes)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Recebido Mês</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(data.recebidoMes)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Recebido Hoje</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(data.recebidoHoje)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Dias Restantes</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {data.diasRestantes}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Recebimento por Dia</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(data.recebimentoPorDia)}
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

export default MetaFiado;
