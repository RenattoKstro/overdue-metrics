import React, { useState } from 'react';
import { Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/context/DashboardContext';

const MetaDesafio = () => {
  const { data, updateData, formatCurrency } = useDashboard();
  const [inputValue, setInputValue] = useState(formatCurrency(data.metaDesafio));
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9,.]/g, '').replace(',', '.');
    setInputValue(rawValue);
  };

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue.replace(',', '.')) || 0;
    updateData('metaDesafio', numericValue);
    setInputValue(formatCurrency(numericValue));
    setIsEditing(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const rawValue = data.metaDesafio.toString().replace('.', ',');
    setInputValue(rawValue);
    e.target.select();
  };

  // Cálculo do progresso atual
  const progressValue = data.vencidoAtual > 0 ? (data.metaDesafio / data.vencidoAtual) * 100 : 0;

  // Cálculo do "Falta receber" para 100%
  const valorFaltante100 = Math.max(data.vencidoAtual - data.metaDesafio, 0);

  // Cálculo do progresso para a barra de 100%
  const progress100 = data.vencidoAtual > 0 ? Math.min((data.metaDesafio / data.vencidoAtual) * 100, 100) : 0;

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
                  value={isEditing ? inputValue : formatCurrency(data.metaDesafio)}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="font-semibold text-xl"
                />
              </div>
              
              <div className="mb-6">
                <Label className="block mb-2">Progresso</Label>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-yellow-600">{progressValue.toFixed(2)}%</div>
                  </div>
              </div>

              <div className="mb-6">
                <Label className="block mb-2">Recebido</Label>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(data.aberturaVencidoMes - data.vencidoAtual)}</div>
              </div>
            </div>
            
            <div className="space-y-8">
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
