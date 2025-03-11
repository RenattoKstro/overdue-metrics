
import { useState, useEffect } from 'react';
import { WorkDay } from '@/types/dashboard';

const WORKDAYS_STORAGE_KEY = 'workdays_data';

export const useWorkdayManager = (initialWorkDays: WorkDay[]) => {
  const [workDays, setWorkDays] = useState<WorkDay[]>(() => {
    const savedWorkDays = localStorage.getItem(WORKDAYS_STORAGE_KEY);
    if (savedWorkDays) {
      const parsed = JSON.parse(savedWorkDays);
      return parsed.map((wd: any) => ({
        ...wd,
        date: new Date(wd.date)
      }));
    }
    return initialWorkDays;
  });

  const toggleWorkDay = (date: Date) => {
    const existingDay = workDays.find(wd => 
      wd.date instanceof Date && wd.date.toDateString() === date.toDateString()
    );
    
    const newWorkDays = existingDay
      ? workDays.map(wd =>
          wd.date instanceof Date && wd.date.toDateString() === date.toDateString()
            ? { ...wd, isWorkDay: !wd.isWorkDay }
            : wd
        )
      : [...workDays, { date, isWorkDay: true }];
    
    setWorkDays(newWorkDays);
    localStorage.setItem(WORKDAYS_STORAGE_KEY, JSON.stringify(newWorkDays));
  };

  return {
    workDays,
    toggleWorkDay
  };
};
