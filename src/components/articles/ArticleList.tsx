import React from 'react';
import type { Article } from '@/types';
import { ArticleListItem } from './ArticleListItem';

interface ArticleListProps {
    articles: Article[];
    onSelect: (articleId: string) => void;
    onDelete: (articleId: string) => Promise<void>;
    onUpdate: (article: Article) => Promise<Article>;
}

export function ArticleList({ articles, onSelect, onDelete, onUpdate }: ArticleListProps) {
    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Magazine</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            {/* 新たにStatus列を追加 */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {articles.map(article => (
                            <ArticleListItem
                                key={article.article_id}
                                article={article}
                                onSelect={onSelect}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
