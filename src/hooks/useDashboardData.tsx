
import { useState } from 'react';
import { DashboardData } from '@/types/dashboard';
import { calculateDerivedValues, getInitialDashboardData } from '@/utils/dashboardUtils';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>(getInitialDashboardData());

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
      
      return {
        ...newData,
        ...derivedValues
      };
    });
  };

  return {
    data,
    updateData
  };
};
