import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkdayCalendarFull: React.FC = () => { // Renomeado para evitar duplicata
  const { data, toggleWorkDay } = useDashboard();
  const currentMonth = data.currentDate.toLocaleString('pt-BR', { month: 'long' });
  const currentYear = data.currentDate.getFullYear();

  const daysInMonth = new Date(data.currentDate.getFullYear(), data.currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(data.currentDate.getFullYear(), data.currentDate.getMonth(), 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  const calendarGrid = [...paddingDays, ...calendarDays];

  const isWorkDay = (day: number) => {
    const date = new Date(data.currentDate.getFullYear(), data.currentDate.getMonth(), day);
    const workDay = data.workDays.find(wd =>
      wd.date.getDate() === date.getDate() &&
      wd.date.getMonth() === date.getMonth()
    );
    return workDay?.isWorkDay ?? false;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === data.currentDate.getMonth() &&
      today.getFullYear() === data.currentDate.getFullYear()
    );
  };

  const totalWorkDaysInMonth = data.workDays.filter(day =>
    day.date.getMonth() === data.currentDate.getMonth() && day.isWorkDay
  ).length;

  const today = new Date();
  const remainingWorkDays = data.workDays.filter(day =>
    day.date > today &&
    day.date.getMonth() === today.getMonth() &&
    day.isWorkDay
  ).length;

  const handleToggleWorkDay = (day: number) => {
    const date = new Date(data.currentDate.getFullYear(), data.currentDate.getMonth(), day);
    toggleWorkDay(date);
  };

  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden mx-auto w-full max-w-md">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <CardTitle className="text-lg">{currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)} {currentYear}</CardTitle>
          </div>
          <div className="flex justify-between text-sm">
            <span>Dias úteis no mês: {totalWorkDaysInMonth}</span>
            <span>Dias úteis restantes: {remainingWorkDays}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xs text-slate-600 mb-3">
          Selecione os dias sem expediente.
        </p>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-semibold text-xs py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarGrid.map((day, index) => (
            <div key={index} className="aspect-square">
              {day !== null ? (
                <button
                  className={`w-full h-full flex items-center justify-center rounded-md text-xs font-medium transition-colors duration-200 
                    ${isToday(day)
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : isWorkDay(day)
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-red-50 text-red-500 hover:bg-red-100'
                    }`}
                  onClick={() => handleToggleWorkDay(day)}
                >
                  {day}
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkdayCalendarFull;
