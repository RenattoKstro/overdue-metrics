
import React from 'react';
import { Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/context/DashboardContext';

const MetaDesafio = () => {
  const { data, updateData, calculateProgress, formatCurrency } = useDashboard();

  const handleInputChange = (value: string) => {
    const numValue = parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.'));
    if (!isNaN(numValue)) {
      updateData('metaDesafio', numValue);
    }
  };

  // Cálculos para as barras de progresso
  const progressValue = data.progressoDesafio;
  const progress96 = calculateProgress((data.metaDesafio - data.vencidoAtual) * 0.96 / data.metaDesafio * 100);
  const progress98 = calculateProgress((data.metaDesafio - data.vencidoAtual) * 0.98 / data.metaDesafio * 100);
  const progress100 = calculateProgress((data.metaDesafio - data.vencidoAtual) * 1.00 / data.metaDesafio * 100);

  return (
    <div className="animate-slide-up">
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-100 animate-float" />
            <CardTitle>Meta Desafio</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="metaDesafio" className="block mb-2">Meta Desafio</Label>
              <div className="flex items-center space-x-2 mb-6">
                <Target className="h-5 w-5 text-yellow-500" />
                <Input
                  id="metaDesafio"
                  type="text"
                  value={formatCurrency(data.metaDesafio)}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="font-semibold text-xl"
                />
              </div>
              
              <div className="mb-6">
                <Label className="block mb-2">Progresso</Label>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-yellow-600">{progressValue.toFixed(2)}%</div>
                  <div className="text-sm text-slate-500">(Meta Desafio ÷ Vencido Atual)</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-yellow-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-yellow-500" /> 96%
                  </span>
                  <span className="text-sm text-slate-600">{formatCurrency((data.metaDesafio - data.vencidoAtual) * 0.96)}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill progress-low"
                    style={{ width: `${progress96}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-orange-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-orange-500" /> 98%
                  </span>
                  <span className="text-sm text-slate-600">{formatCurrency((data.metaDesafio - data.vencidoAtual) * 0.98)}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill progress-medium"
                    style={{ width: `${progress98}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-green-500" /> 100%
                  </span>
                  <span className="text-sm text-slate-600">{formatCurrency(data.metaDesafio - data.vencidoAtual)}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill progress-high"
                    style={{ width: `${progress100}%` }}
                  ></div>
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
