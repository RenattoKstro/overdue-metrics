
import { useState, useEffect } from 'react';
import { DashboardData } from '@/types/dashboard';
import { calculateDerivedValues, getInitialDashboardData } from '@/utils/dashboardUtils';

const STORAGE_KEY = 'dashboard_data';

export const useDashboardData = () => {
  // Initialize with data from localStorage or default values
  const [data, setData] = useState<DashboardData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Convert date strings back to Date objects
      parsedData.currentDate = new Date(parsedData.currentDate);
      parsedData.workDays = parsedData.workDays.map((wd: any) => ({
        ...wd,
        date: new Date(wd.date)
      }));
      return parsedData;
    }
    return getInitialDashboardData();
  });

  const updateData = (key: keyof DashboardData, value: number | Date | boolean | null) => {
    setData(prev => {
      const newData = { ...prev };
      
      // Handle specific key updates
      if (typeof value === 'number') {
        (newData[key] as number) = value;
      } else if (value instanceof Date) {
        (newData[key] as Date) = value;
      } else {
        // Handle boolean or null values
        (newData[key] as boolean | null) = value;
      }
      
      // Calculate derived values
      const derivedValues = calculateDerivedValues(newData);
      const finalData = {
        ...newData,
        ...derivedValues
      };

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
      
      return finalData;
    });
  };

  return {
    data,
    updateData
  };
};
