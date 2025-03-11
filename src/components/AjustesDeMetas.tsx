
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import MetaInputGrid from './ajustes-de-metas/MetaInputGrid';
import WorkdayCalendar from './ajustes-de-metas/WorkdayCalendar';

const AjustesDeMetas = () => {
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  return (
    <div className="animate-slide-up">
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
          <div className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-blue-100 animate-float" />
            <CardTitle>Ajustes de Metas</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <MetaInputGrid />
            <WorkdayCalendar 
              isExpanded={isCalendarExpanded} 
              onToggleExpand={() => setIsCalendarExpanded(!isCalendarExpanded)} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AjustesDeMetas;
