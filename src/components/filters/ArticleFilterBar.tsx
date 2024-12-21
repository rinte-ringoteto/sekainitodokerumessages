import React from 'react';
import { DateFilter } from './DateFilter';
import { MagazineFilter } from './MagazineFilter';
import type { Magazine } from '../../types';

interface ArticleFilterBarProps {
    platforms: Magazine[];
    selectedPlatform: string;
    startDate: string;
    endDate: string;
    onPlatformChange: (magazineId: string) => void;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
}

export function ArticleFilterBar({
    platforms,
    selectedPlatform,
    startDate,
    endDate,
    onPlatformChange,
    onStartDateChange,
    onEndDateChange,
}: ArticleFilterBarProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Magazine</h3>
                <MagazineFilter
                    magazines={platforms}
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
