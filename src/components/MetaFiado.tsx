
import React from 'react';
import { Wallet, Calendar, Sunrise, Target, AlertTriangle, ArrowDown, CheckCircle, Building, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/context/DashboardContext';

const MetaFiado = () => {
  const { data, updateData, formatCurrency } = useDashboard();

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.'));
    if (!isNaN(numValue)) {
      updateData(field as any, numValue);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {/* Editable Cards */}
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

      <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift">
        <CardHeader className="bg-gradient-to-r from-purple-400/90 to-purple-500/90 text-white">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <CardTitle className="text-base">Dias Restantes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Label htmlFor="diasRestantes">Dias</Label>
          <Input
            id="diasRestantes"
            type="number"
            value={data.diasRestantes}
            onChange={(e) => updateData('diasRestantes', parseInt(e.target.value))}
            className="font-semibold text-xl mt-1"
          />
        </CardContent>
      </Card>

      {/* Calculated Cards */}
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
  );
};

export default MetaFiado;
