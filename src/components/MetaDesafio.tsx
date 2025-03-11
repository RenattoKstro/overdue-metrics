
import React from 'react';
import { Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/context/DashboardContext';

const MetaDesafio = () => {
  const { data, updateData, calculateProgress, formatCurrency } = useDashboard();

  const handleInputChange = (value: string) => {
    // Remove qualquer caractere que não seja número, vírgula ou ponto
    const numericValue = value.replace(/[^\d,.]/g, '')
                              .replace(',', '.'); // Substitui vírgula por ponto
    
    const floatValue = parseFloat(numericValue);
    
    if (!isNaN(floatValue)) {
      updateData('metaDesafio', floatValue);
    }
  };

  // Cálculos para as barras de progresso
  const progressValue = data.progressoDesafio;
  const recebidoDesafio = data.aberturaVencidoMes - data.vencidoAtual;
  
  // Calcular valores restantes para atingir as metas
  const valorFaltante96 = Math.max(data.vencidoAtual - (data.metaDesafio * 0.96), 0);
  const valorFaltante98 = Math.max(data.vencidoAtual - (data.metaDesafio * 0.98), 0);
  const valorFaltante100 = Math.max(data.vencidoAtual - data.metaDesafio, 0);
  
  // Calcular progresso para cada meta
  const progress96 = calculateProgress((data.metaDesafio * 0.96 / data.vencidoAtual) * 100);
  const progress98 = calculateProgress((data.metaDesafio * 0.98 / data.vencidoAtual) * 100);
  const progress100 = calculateProgress((data.metaDesafio / data.vencidoAtual) * 100);

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
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="mb-6">
                <Label className="block mb-2">Progresso</Label>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-yellow-600">{progressValue.toFixed(2)}%</div>
                  <div className="text-sm text-slate-500">(Meta Desafio ÷ Vencido Atual)</div>
                </div>
              </div>

              <div className="mb-6">
                <Label className="block mb-2">Recebido</Label>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(recebidoDesafio)}</div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-yellow-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-yellow-500" /> 96%
                  </span>
                  <span className="text-sm text-slate-600">Meta: {formatCurrency(data.metaDesafio * 0.96)}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-1000"
                    style={{ width: `${progress96}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-slate-500">{progress96.toFixed(1)}%</span>
                  <span className="text-red-500 font-medium">
                    Falta receber: {formatCurrency(valorFaltante96)}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-orange-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-orange-500" /> 98%
                  </span>
                  <span className="text-sm text-slate-600">Meta: {formatCurrency(data.metaDesafio * 0.98)}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-1000"
                    style={{ width: `${progress98}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-slate-500">{progress98.toFixed(1)}%</span>
                  <span className="text-red-500 font-medium">
                    Falta receber: {formatCurrency(valorFaltante98)}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-green-500" /> 100%
                  </span>
                  <span className="text-sm text-slate-600">Meta: {formatCurrency(data.metaDesafio)}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${progress100}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-slate-500">{progress100.toFixed(1)}%</span>
                  <span className="text-red-500 font-medium">
                    Falta receber: {formatCurrency(valorFaltante100)}
                  </span>
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
