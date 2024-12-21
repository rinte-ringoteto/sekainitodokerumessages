'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ArticleList } from '@/components/articles/ArticleList';
import { useArticles } from '@/hooks/useArticles';
import type { Article } from '@/types';
import { useRouter } from 'next/navigation';

import { useArticleFilters } from '@/hooks/useArticleFilters';
import { useArticleTabs } from '@/hooks/useArticleTabs';
import { ArticleFilterBar } from '@/components/filters/ArticleFilterBar';
import { ArticleTabs } from '@/components/articles/ArticleTabs';
import { useMagazineList } from '@/hooks/useMagazineList';

export default function ArticleDashboard() {
    const { articles, loading, deleteArticle, updateArticle } = useArticles(); // updateArticleを取得
    const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();
    const router = useRouter();

    // 雑誌リストを取得
    const { magazines } = useMagazineList();

    const {
        selectedPlatform,
        setSelectedPlatform,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        filteredArticles,
    } = useArticleFilters(articles);

    const {
        activeTab,
        setActiveTab,
        currentArticles,
        upcomingCount,
        pastCount,
    } = useArticleTabs(filteredArticles);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
            </Layout>
        );
    }

    const handleSelectArticle = (articleId: string) => {
        router.push(`/articles/${articleId}`);
    };

    const handleDeleteArticle = async (articleId: string) => {
        await deleteArticle(articleId);
        if (selectedArticle?.article_id === articleId) {
            setSelectedArticle(undefined);
        }
    };

    // onUpdateハンドラを定義：ArticleListItemから呼ばれると記事を更新する
    const handleUpdateArticle = async (articleData: Article) => {
        const updated = await updateArticle(articleData);
        return updated;
    };

    return (
        <Layout>
            <div className="space-y-8">
                <ArticleFilterBar
                    platforms={magazines}
                    selectedPlatform={selectedPlatform}
                    startDate={startDate}
                    endDate={endDate}
                    onPlatformChange={setSelectedPlatform}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                />

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Articles</h2>
                    <button
                        onClick={() => router.push('/articles/new')}
                        className="px-4 py-2 text-sm font-medium text-white bg-teal-800 hover:bg-teal-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900"
                    >
                        New Article
                    </button>
                </div>

                <ArticleTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    upcomingCount={upcomingCount}
                    pastCount={pastCount}
                />

                {/* onUpdateをArticleListへ渡す */}
                <ArticleList
                    articles={currentArticles}
                    onSelect={handleSelectArticle}
                    onDelete={handleDeleteArticle}
                    onUpdate={handleUpdateArticle} // ここで更新用関数を渡す
                />
            </div>
        </Layout>
    );
}
