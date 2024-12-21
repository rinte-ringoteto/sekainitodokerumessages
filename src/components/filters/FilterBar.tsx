import React from 'react';
import { DateFilter } from './DateFilter';
import { PlatformFilter } from './PlatformFilter';
import type { SNS } from '../../types';

interface FilterBarProps {
  platforms: SNS[];
  selectedPlatform: string;
  startDate: string;
  endDate: string;
  onPlatformChange: (platformId: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function FilterBar({
  platforms,
  selectedPlatform,
  startDate,
  endDate,
  onPlatformChange,
  onStartDateChange,
  onEndDateChange,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Platform</h3>
        <PlatformFilter
          platforms={platforms}
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Date Range</h3>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </div>
    </div>
  );
}