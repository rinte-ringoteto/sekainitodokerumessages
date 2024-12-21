'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Article } from '@/types';
import { formatDateForInput } from '../../utils/dateUtils';
import dynamic from 'next/dynamic';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
});

import 'easymde/dist/easymde.min.css';

interface Platform {
    magazine_id: string;
    magazine_name: string;
}

interface ArticleFormProps {
    initialData?: Article;
    onSubmit: (data: Omit<Article, 'article_id' | 'published_at' | 'author_id'> & Partial<Pick<Article, 'article_id'>>) => Promise<Article>;
    platforms: Platform[];
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function ArticleForm({ initialData, onSubmit, platforms, onSuccess, onError }: ArticleFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [publishedAt, setPublishedAt] = useState<Date | null>(null);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setSelectedPlatform(initialData.platform_id || '');
            setPublishedAt(initialData.published_at ? new Date(initialData.published_at) : null);
        } else {
            setTitle('');
            setContent('');
            setSelectedPlatform(platforms.length > 0 ? platforms[0].magazine_id : '');
            setPublishedAt(null);
        }
    }, [initialData, platforms]);

    const options = useMemo(() => ({
        spellChecker: false,
        placeholder: 'Write your article in Markdown...',
        // 必要に応じて他のオプションを設定
    }), []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedMagazine = platforms.find(p => p.magazine_id === selectedPlatform);
        const magazine_name = selectedMagazine ? selectedMagazine.magazine_name : '';

        const formData: any = {
            title,
            content,
            platform_id: selectedPlatform,
            magazine_name,
            status: 'draft' as const
        };

        if (publishedAt) {
            formData.published_at = publishedAt.toISOString();
        }

        try {
            const newArticle = await onSubmit(initialData ? { ...formData, article_id: initialData.article_id } : formData);
            onSuccess?.();
            if (!initialData) {
                setTitle('');
                setContent('');
                setSelectedPlatform(platforms.length > 0 ? platforms[0].magazine_id : '');
                setPublishedAt(null);
            }
            return newArticle;
        } catch (error) {
            onError?.(error instanceof Error ? error.message : 'Failed to save article');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    id="title"
                    className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-teal-800 focus:ring-1 focus:ring-teal-800 mt-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content (Markdown supported)</label>
                <p className="text-xs text-gray-500 mb-1">Use the toolbar to format your Markdown.</p>
                <SimpleMdeReact
                    id="content"
                    value={content}
                    onChange={setContent}
                    options={options} // optionsをuseMemoで安定化
                />
            </div>

            <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
                <select
                    id="platform"
                    className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-teal-800 focus:ring-1 focus:ring-teal-800 mt-1"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                >
                    {platforms.map((p) => (
                        <option key={p.magazine_id} value={p.magazine_id}>
                            {p.magazine_name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="published_at" className="block text-sm font-medium text-gray-700">Published At</label>
                <input
                    type="datetime-local"
                    id="published_at"
                    className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-teal-800 focus:ring-1 focus:ring-teal-800 mt-1"
                    value={publishedAt ? formatDateForInput(publishedAt) : ''}
                    onChange={(e) => setPublishedAt(e.target.value ? new Date(e.target.value) : null)}
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-800 hover:bg-teal-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-800"
            >
                {initialData ? 'Update Article' : 'Create Article'}
            </button>
        </form>
    );
}
