import React from 'react';
import { Trophy, DollarSign } from 'lucide-react'; // Garantindo importação correta
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/context/DashboardContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const MetaDesafio = () => {
  const { data, formatCurrency } = useDashboard();

  // Calcular progresso com proteção contra divisão por zero
  const progressoDesafio = data.metaDesafio && data.metaDesafio > 0
    ? (data.recebidoDesafioMes / data.metaDesafio) * 100
    : 0;

  return (
    <div className="animate-slide-up">
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
          <div className="flex items-center space-x-2">
            {Trophy ? <Trophy className="h-6 w-6 text-blue-100 animate-float" /> : null}
            <CardTitle>Meta Desafio</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-700">Progresso do Desafio</h3>
              <div className="flex items-center space-x-4">
                <div className="w-full">
                  <Progress value={progressoDesafio} className="h-4 bg-blue-100" />
                </div>
                <Badge variant="outline" className="font-semibold text-lg">
                  {progressoDesafio.toFixed(1)}%
                </Badge>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                  <Badge variant="outline" className="font-semibold text-lg">
                    {formatCurrency(data.recebidoDesafioMes || 0)}
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

export default MetaDesafio;
