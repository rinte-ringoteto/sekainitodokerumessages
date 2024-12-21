// articles/new/page.tsx
'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ArticleForm } from '@/components/articles/ArticleForm';
import { useArticles } from '@/hooks/useArticles';
import { useMagazineList } from '@/hooks/useMagazineList';
import { useRouter } from 'next/navigation';

export default function NewArticlePage() {
    const { createArticle } = useArticles();
    const { magazines } = useMagazineList();
    const router = useRouter();

    // ArticleFormから { title, content, platform_id } が返ってくることを想定
    const handleCreate = async (data: { title: string; content: string; platform_id: string }) => {
        const selectedMagazine = magazines.find(m => m.magazine_id === data.platform_id);
        console.log(data)
        const newArticle = await createArticle({
            ...data,
            status: 'draft',
            magazine_name: selectedMagazine?.magazine_name || ''
        });
        router.push('/articles');
        return newArticle;
    };

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
            <ArticleForm onSubmit={handleCreate} platforms={magazines} />
        </Layout>
    );
}
