import { useState, useMemo } from 'react';
import type { Article } from '@/types';

export function useArticleTabs(articles: Article[]) {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const now = new Date();
    // 今日の日付(0時0分0秒)を取得して日付のみ比較に使用
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const { upcomingArticles, pastArticles } = useMemo(() => {
        const upcoming: Article[] = [];
        const past: Article[] = [];

        articles.forEach(a => {
            if (!a.published_at) {
                past.push(a);
                return;
            }
            const pubDate = new Date(a.published_at);
            // pubDateの日付のみ抽出
            const pubDateOnly = new Date(pubDate.getFullYear(), pubDate.getMonth(), pubDate.getDate());

            // 本日または未来日付はupcoming、それより前の日はpast
            if (pubDateOnly.getTime() >= today.getTime()) {
                upcoming.push(a);
            } else {
                past.push(a);
            }
        });

        // upcoming: 古い順(昇順)
        upcoming.sort((a, b) => {
            const aDate = new Date(a.published_at);
            const bDate = new Date(b.published_at);
            return aDate.getTime() - bDate.getTime();
        });

        // past: 新しい順(降順)
        past.sort((a, b) => {
            const aDate = new Date(a.published_at);
            const bDate = new Date(b.published_at);
            return bDate.getTime() - aDate.getTime();
        });

        return { upcomingArticles: upcoming, pastArticles: past };
    }, [articles, today]);

    const currentArticles = activeTab === 'upcoming' ? upcomingArticles : pastArticles;

    return {
        activeTab,
        setActiveTab,
        currentArticles,
        upcomingCount: upcomingArticles.length,
        pastCount: pastArticles.length,
    };
}
