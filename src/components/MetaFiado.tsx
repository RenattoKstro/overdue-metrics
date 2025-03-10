import React from 'react';
import { Wallet, Calendar, Sunrise, Target, AlertTriangle, ArrowDown, CheckCircle, Building, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/context/DashboardContext';
import { Badge } from '@/components/ui/badge';

const MetaFiado = () => {
  const { data, updateData, formatCurrency } = useDashboard();
  
  const percentageReached = data.metaMes !== 0 
    ? (data.recebidoMes / data.metaMes) * 100
    : 0;
    
  const progressValue = Math.min(Math.max(percentageReached, 0), 100);
  
  let progressColor = "bg-red-500";
  if (progressValue >= 90) {
    progressColor = "bg-green-500";
  } else if (progressValue >= 70) {
    progressColor = "bg-yellow-500";
  } else if (progressValue >= 50) {
    progressColor = "bg-orange-500";
  }

  const handleInputChange = (field: keyof typeof data, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const floatValue = parseFloat(numericValue) / 100;
    
    if (!isNaN(floatValue)) {
      updateData(field, floatValue);
    }
  };

  return (
    <div className="animate-slide-up">
      <Card className="mb-6 shadow-card hover:shadow-card-hover transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white py-4">
          <div className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <CardTitle className="text-base">Progresso Meta Fiado</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700">Progresso:</span>
              <Badge variant="outline" className="font-semibold">
                {progressValue.toFixed(2)}%
              </Badge>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${progressColor} transition-all duration-1000 ease-out`} 
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift">
          <CardHeader className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <CardTitle className="text-base">Abertura de Vencido do Mês</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Label htmlFor="aberturaVencidoMes">Valor</Label>
            <Input
              id="aberturaVencidoMes"
              type="text"
              value={formatCurrency(data.aberturaVencidoMes)}
              onChange={(e) => handleInputChange('aberturaVencidoMes', e.target.value)}
              className="font-semibold text-xl mt-1"
              onFocus={(e) => e.target.select()}
            />
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift">
          <CardHeader className="bg-gradient-to-r from-orange-400/90 to-orange-500/90 text-white">
            <div className="flex items-center space-x-2">
              <Sunrise className="h-5 w-5" />
              <CardTitle className="text-base">Abertura do Dia</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Label htmlFor="aberturaVencidoDia">Valor</Label>
            <Input
              id="aberturaVencidoDia"
              type="text"
              value={formatCurrency(data.aberturaVencidoDia)}
              onChange={(e) => handleInputChange('aberturaVencidoDia', e.target.value)}
              className="font-semibold text-xl mt-1"
            />
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift">
          <CardHeader className="bg-gradient-to-r from-emerald-400/90 to-emerald-500/90 text-white">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <CardTitle className="text-base">Meta do Mês</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Label htmlFor="metaMes">Valor</Label>
            <Input
              id="metaMes"
              type="text"
              value={formatCurrency(data.metaMes)}
              onChange={(e) => handleInputChange('metaMes', e.target.value)}
              className="font-semibold text-xl mt-1"
            />
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift">
          <CardHeader className="bg-gradient-to-r from-red-400/90 to-red-500/90 text-white">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <CardTitle className="text-base">Vencido Atual</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Label htmlFor="vencidoAtual">Valor</Label>
            <Input
              id="vencidoAtual"
              type="text"
              value={formatCurrency(data.vencidoAtual)}
              onChange={(e) => handleInputChange('vencidoAtual', e.target.value)}
              className="font-semibold text-xl mt-1"
            />
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="bg-gradient-to-r from-violet-400/90 to-violet-500/90 text-white">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <CardTitle className="text-base">A Receber</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(data.aReceber)}</div>
            <div className="text-sm text-slate-500 mt-1">Abertura de Vencido Mês - Meta do Mês</div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="bg-gradient-to-r from-pink-400/90 to-pink-500/90 text-white">
            <div className="flex items-center space-x-2">
              <ArrowDown className="h-5 w-5" />
              <CardTitle className="text-base">Falta Receber/Mês</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(data.faltaReceberMes)}</div>
            <div className="text-sm text-slate-500 mt-1">Vencido Atual - Meta do Mês</div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="bg-gradient-to-r from-green-400/90 to-green-500/90 text-white">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <CardTitle className="text-base">Recebido Mês</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(data.recebidoMes)}</div>
            <div className="text-sm text-slate-500 mt-1">Abertura de Vencido Mês - Vencido Atual</div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="bg-gradient-to-r from-cyan-400/90 to-cyan-500/90 text-white">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <CardTitle className="text-base">Recebido Hoje</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(data.recebidoHoje)}</div>
            <div className="text-sm text-slate-500 mt-1">Abertura do Dia - Vencido Atual</div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="bg-gradient-to-r from-amber-400/90 to-amber-500/90 text-white">
            <div className="flex items-center space-x-2">
              <BarChart className="h-5 w-5" />
              <CardTitle className="text-base">Recebimento por Dia</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(data.recebimentoPorDia)}</div>
            <div className="text-sm text-slate-500 mt-1">Falta Receber/Mês ÷ Dias Restantes</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetaFiado;
