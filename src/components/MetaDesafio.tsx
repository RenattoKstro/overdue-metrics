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

  // Valores alvo para cada percentual (baseado nos dados fornecidos)
  const metaDesafio = 446982.10; // Valor fixo para 100%
  const target96 = 465606.00;   // Vencido Atual para 96%
  const target98 = 456100.00;   // Vencido Atual para 98%
  const target100 = 446982.10;  // Vencido Atual para 100%

  // Cálculo do progresso atual
  const currentProgress = data.vencidoAtual > 0 ? (data.vencidoAtual / metaDesafio) * 100 : 0;

  // Cálculo do "Falta receber" para cada percentual
  const falta96 = Math.max(data.vencidoAtual - target96, 0);
  const falta98 = Math.max(data.vencidoAtual - target98, 0);
  const falta100 = Math.max(data.vencidoAtual - target100, 0);

  // Progresso das barras (inverter a lógica para refletir o percentual correto)
  const progress96 = Math.min(Math.max(((target96 - data.vencidoAtual) / (target96 - target100)) * 100, 0), 100);
  const progress98 = Math.min(Math.max(((target98 - data.vencidoAtual) / (target98 - target100)) * 100, 0), 100);
  const progress100 = Math.min(Math.max(((target100 - data.vencidoAtual) / (target100 - target100)) * 100, 0), 100);

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
                  <div className="text-2xl font-bold text-yellow-600">{currentProgress.toFixed(2)}%</div>
                  <div className="text-sm text-slate-500">(Vencido Atual ÷ Meta Desafio)</div>
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
                  <span className="font-medium text-yellow-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-yellow-500" /> 96%
                  </span>
                  <span className="text-sm text-slate-600">Meta: {formatCurrency(target96)}</span>
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
                    Falta receber: {formatCurrency(falta96)}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-orange-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-orange-500" /> 98%
                  </span>
                  <span className="text-sm text-slate-600">Meta: {formatCurrency(target98)}</span>
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
                    Falta receber: {formatCurrency(falta98)}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-600 flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-green-500" /> 100%
                  </span>
                  <span className="text-sm text-slate-600">Meta: {formatCurrency(target100)}</span>
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
                    Falta receber: {formatCurrency(falta100)}
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
