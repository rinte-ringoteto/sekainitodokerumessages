import { useState, useMemo } from 'react';
import type { Article } from '@/types';

export function useArticleFilters(articles: Article[]) {
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredArticles = useMemo(() => {
        let filtered = articles;

        if (selectedPlatform) {
            filtered = filtered.filter(a => a.platform_id === selectedPlatform);
        }

        if (startDate) {
            filtered = filtered.filter(a => a.published_at && new Date(a.published_at) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(a => a.published_at && new Date(a.published_at) <= new Date(endDate));
        }

        return filtered;
    }, [articles, selectedPlatform, startDate, endDate]);

    return {
        selectedPlatform,
        setSelectedPlatform,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        filteredArticles,
    };
}
