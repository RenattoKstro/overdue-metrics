
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

interface WorkdayCalendarProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const WorkdayCalendar: React.FC<WorkdayCalendarProps> = ({ isExpanded, onToggleExpand }) => {
  const { data, toggleWorkDay } = useDashboard();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handleCalendarClick = (date: Date) => {
    toggleWorkDay(date);
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={onToggleExpand}
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white"
      >
        <CalendarIcon className="h-5 w-5" />
        <span>Expandir Calendário</span>
      </Button>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700">Calendário de Dias Úteis</h3>
        <Button
          onClick={onToggleExpand}
          className="bg-blue-500 hover:bg-blue-600 text-white"
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
            wd => {
              if (wd.date instanceof Date) {
                return wd.date.getDate() === day && wd.date.getMonth() === currentMonth;
              }
              return false;
            }
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
  );
};

export default WorkdayCalendar;
