import React from 'react';
import type { Magazine } from '../../types'; // Magazine型を定義済みとして想定

interface MagazineFilterProps {
    magazines: Magazine[];
    selectedPlatform: string;
    onPlatformChange: (magazineId: string) => void;
}

export function MagazineFilter({
    magazines,
    selectedPlatform,
    onPlatformChange,
}: MagazineFilterProps) {
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
            {magazines?.map((magazine) => (
                <button
                    key={magazine.magazine_id}
                    onClick={() => onPlatformChange(magazine.magazine_id)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedPlatform === magazine.magazine_id
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    {magazine.magazine_name}
                </button>
            ))}
        </div>
    );
}
