import React from 'react';
import { Trophy, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/context/DashboardContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const MetaDesafio = () => {
  const { data, formatCurrency, progressoDesafio } = useDashboard();

  return (
    <div className="animate-slide-up">
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-blue-100 animate-float" />
            <CardTitle>Meta Desafio</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
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
                      {formatCurrency(data.recebidoDesafioMes)}
                    </Badge>
                  </div>
                </div>
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
                    {formatCurrency(data.aReceberDesafio)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Falta Receber</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {formatCurrency(data.faltaReceberDesafioMes)}
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
