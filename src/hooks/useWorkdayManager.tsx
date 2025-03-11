
import { useState } from 'react';
import { DashboardData, WorkDay } from '@/types/dashboard';

export const useWorkdayManager = (initialWorkDays: WorkDay[]) => {
  const [workDays, setWorkDays] = useState<WorkDay[]>(initialWorkDays);

  const toggleWorkDay = (date: Date) => {
    const existingDay = workDays.find(wd => 
      wd.date instanceof Date && wd.date.toDateString() === date.toDateString()
    );
    
    if (existingDay) {
      setWorkDays(workDays.map(wd =>
        wd.date instanceof Date && wd.date.toDateString() === date.toDateString()
          ? { ...wd, isWorkDay: !wd.isWorkDay }
          : wd
      ));
    } else {
      setWorkDays([...workDays, { date, isWorkDay: true }]);
    }
  };

  return {
    workDays,
    toggleWorkDay
  };
};
