import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <span className="text-gray-500">to</span>
      <div className="flex items-center">
        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}