'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ArticleForm } from '@/components/articles/ArticleForm';
import { useArticles } from '@/hooks/useArticles';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Article } from '@/types';
import { supabase } from '@/lib/supabase';
import { useMagazineList } from '@/hooks/useMagazineList';

interface ArticlePageProps {
    params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const [article, setArticle] = useState<Article | null>(null);
    const { updateArticle } = useArticles();
    const { magazines } = useMagazineList();
    const router = useRouter();

    useEffect(() => {
        async function loadArticle() {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('article_id', params.id)
                .single();

            if (error) {
                console.error('Error loading article:', error.message);
            } else if (data) {
                setArticle(data as Article);
            }
        }
        loadArticle();
    }, [params.id]);

    const handleUpdate = async (updateData: Omit<Article, 'article_id' | 'published_at' | 'author_id'> & { article_id?: string }) => {
        if (!article) throw new Error('Article not found');

        const updated = await updateArticle({
            ...updateData,
            article_id: article.article_id
        });

        setArticle(updated);
        return updated;
    };

    if (!article) {
        return (
            <Layout>
                <div className="max-w-3xl mx-auto mt-10">
                    <p>Loading article...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-3xl mx-auto mt-10 space-y-6">
                <h1 className="text-3xl font-bold mb-4">Edit Article</h1>

                {/* ArticleFormでinitialDataにarticleを渡し、onSubmitでhandleUpdate */}
                <ArticleForm
                    initialData={article}
                    onSubmit={handleUpdate}
                    platforms={magazines}
                />
            </div>
        </Layout>
    );
}
