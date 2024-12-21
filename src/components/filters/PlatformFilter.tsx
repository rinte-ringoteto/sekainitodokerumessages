import React from 'react';
import type { SNS } from '../../types';

interface PlatformFilterProps {
  platforms: SNS[];
  selectedPlatform: string;
  onPlatformChange: (platformId: string) => void;
}

export function PlatformFilter({
  platforms,
  selectedPlatform,
  onPlatformChange,
}: PlatformFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPlatformChange('')}
        className={`px-3 py-1 rounded-full text-sm ${selectedPlatform === ''
          ? 'bg-teal-100 text-teal-800'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
      >
        All
      </button>
      {platforms?.map((platform) => (
        <button
          key={platform.sns_id}
          onClick={() => onPlatformChange(platform.sns_id)}
          className={`px-3 py-1 rounded-full text-sm ${selectedPlatform === platform.sns_id
            ? 'bg-teal-100 text-teal-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {platform.sns_name}
        </button>
      ))}
    </div>
  );
}