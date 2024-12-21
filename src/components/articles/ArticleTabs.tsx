import { CalendarClock, Clock } from 'lucide-react';
import React from 'react';

interface ArticleTabsProps {
    activeTab: 'upcoming' | 'past';
    onTabChange: (tab: 'upcoming' | 'past') => void;
    upcomingCount: number;
    pastCount: number;
}

export function ArticleTabs({ activeTab, onTabChange, upcomingCount, pastCount }: ArticleTabsProps) {
    return (
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
                <button
                    onClick={() => onTabChange('upcoming')}
                    className={`
            flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium
            ${activeTab === 'upcoming'
                            ? 'border-teal-800 text-teal-800'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
          `}
                >
                    <CalendarClock className="h-4 w-4" />
                    Upcoming
                    <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {upcomingCount}
                    </span>
                </button>
                <button
                    onClick={() => onTabChange('past')}
                    className={`
            flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium
            ${activeTab === 'past'
                            ? 'border-teal-800 text-teal-800'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
          `}
                >
                    <Clock className="h-4 w-4" />
                    Past
                    <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {pastCount}
                    </span>
                </button>
            </nav>
        </div>
    );
}
