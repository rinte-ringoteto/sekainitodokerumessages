import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortToggleProps {
  ascending: boolean;
  onToggle: (ascending: boolean) => void;
}

export function SortToggle({ ascending, onToggle }: SortToggleProps) {
  return (
    <button
      onClick={() => onToggle(!ascending)}
      className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm text-gray-700"
    >
      <ArrowUpDown className="h-4 w-4" />
      <span>{ascending ? 'Oldest first' : 'Latest first'}</span>
    </button>
  );
}