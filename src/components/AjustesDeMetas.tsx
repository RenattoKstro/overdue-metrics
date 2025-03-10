import React, { useState } from 'react';
import { Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/context/DashboardContext';

const AjustesDeMetas = () => {
  const { data, updateData, toggleWorkDay, formatCurrency } = useDashboard();
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [inputs, setInputs] = useState({
    aberturaVencidoMes: formatCurrency(data.aberturaVencidoMes),
    aberturaVencidoDia: formatCurrency(data.aberturaVencidoDia),
    metaMes: formatCurrency(data.metaMes),
    vencidoAtual: formatCurrency(data.vencidoAtual),
    diaCorte: data.diaCorte.toString(),
  });
  const [isEditing, setIsEditing] = useState({
    aberturaVencidoMes: false,
    aberturaVencidoDia: false,
    metaMes: false,
    vencidoAtual: false,
    diaCorte: false,
  });

  const handleInputChange = (field: keyof typeof inputs, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9,.]/g, '').replace(',', '.');
    setInputs(prev => ({ ...prev, [field]: rawValue }));
  };

  const handleBlur = (field: keyof typeof inputs) => {
    const numericValue = parseFloat(inputs[field].replace(',', '.')) || 0;
    updateData(field as keyof DashboardData, field === 'diaCorte' ? parseInt(inputs[field], 10) : numericValue);
    setInputs(prev => ({ ...prev, [field]: formatCurrency(numericValue) }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleFocus = (field: keyof typeof inputs, e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
    const rawValue = (data[field as keyof DashboardData] as number).toString().replace('.', ',');
    setInputs(prev => ({ ...prev, [field]: rawValue }));
    e.target.select();
  };

  const handleCalendarClick = (date: Date) => {
    toggleWorkDay(date);
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="animate-slide-up">
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 text-white">
          <div className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-100 animate-float" />
            <CardTitle>Ajustes de Metas</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Campos Editáveis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="aberturaVencidoMes" className="block mb-2">Abertura Vencido Mês</Label>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <Input
                    id="aberturaVencidoMes"
                    value={isEditing.aberturaVencidoMes ? inputs.aberturaVencidoMes : formatCurrency(data.aberturaVencidoMes)}
                    onChange={(e) => handleInputChange('aberturaVencidoMes', e)}
                    onBlur={() => handleBlur('aberturaVencidoMes')}
                    onFocus={(e) => handleFocus('aberturaVencidoMes', e)}
                    className="font-semibold text-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="aberturaVencidoDia" className="block mb-2">Abertura Vencido Dia</Label>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <Input
                    id="aberturaVencidoDia"
                    value={isEditing.aberturaVencidoDia ? inputs.aberturaVencidoDia : formatCurrency(data.aberturaVencidoDia)}
                    onChange={(e) => handleInputChange('aberturaVencidoDia', e)}
                    onBlur={() => handleBlur('aberturaVencidoDia')}
                    onFocus={(e) => handleFocus('aberturaVencidoDia', e)}
                    className="font-semibold text-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="metaMes" className="block mb-2">Meta Mês</Label>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <Input
                    id="metaMes"
                    value={isEditing.metaMes ? inputs.metaMes : formatCurrency(data.metaMes)}
                    onChange={(e) => handleInputChange('metaMes', e)}
                    onBlur={() => handleBlur('metaMes')}
                    onFocus={(e) => handleFocus('metaMes', e)}
                    className="font-semibold text-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="vencidoAtual" className="block mb-2">Vencido Atual</Label>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <Input
                    id="vencidoAtual"
                    value={isEditing.vencidoAtual ? inputs.vencidoAtual : formatCurrency(data.vencidoAtual)}
                    onChange={(e) => handleInputChange('vencidoAtual', e)}
                    onBlur={() => handleBlur('vencidoAtual')}
                    onFocus={(e) => handleFocus('vencidoAtual', e)}
                    className="font-semibold text-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="diaCorte" className="block mb-2">Dia de Corte</Label>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <Input
                    id="diaCorte"
                    value={isEditing.diaCorte ? inputs.diaCorte : data.diaCorte}
                    onChange={(e) => handleInputChange('diaCorte', e)}
                    onBlur={() => handleBlur('diaCorte')}
                    onFocus={(e) => handleFocus('diaCorte', e)}
                    className="font-semibold text-xl"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Botão do Calendário */}
            <div>
              {!isCalendarExpanded ? (
                <Button
                  onClick={() => setIsCalendarExpanded(true)}
                  className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Expandir Calendário</span>
                </Button>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-700">Calendário de Dias Úteis</h3>
                    <Button
                      onClick={() => setIsCalendarExpanded(false)}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Fechar Calendário
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                      <div key={index} className="font-semibold text-slate-700">
                        {day}
                      </div>
                    ))}
                    {paddingDays.map((_, index) => (
                      <div key={`padding-${index}`} />
                    ))}
                    {daysArray.map(day => {
                      const date = new Date(currentYear, currentMonth, day);
                      const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
                      const workDay = data.workDays.find(
                        wd => wd.date.getDate() === day && wd.date.getMonth() === currentMonth
                      );
                      const isWorkDay = workDay ? workDay.isWorkDay : true;

                      return (
                        <div
                          key={day}
                          onClick={() => handleCalendarClick(date)}
                          className={`p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                            isToday
                              ? 'bg-blue-500 text-white'
                              : isWorkDay
                              ? 'bg-green-200 hover:bg-green-300'
                              : 'bg-red-200 hover:bg-red-300'
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AjustesDeMetas;
