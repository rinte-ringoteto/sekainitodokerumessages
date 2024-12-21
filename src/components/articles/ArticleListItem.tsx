import React from 'react';
import type { Article } from '@/types';
import { Trash2 } from 'lucide-react';

interface ArticleListItemProps {
    article: Article;
    onSelect: (articleId: string) => void;
    onDelete: (articleId: string) => Promise<void>;
    onUpdate: (articleData: Article) => Promise<Article>; // ステータス更新用コールバックを追加
}

export function ArticleListItem({ article, onSelect, onDelete, onUpdate }: ArticleListItemProps) {
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // 行クリックと競合しないように
        await onDelete(article.article_id);
    };

    const contentPreview = article.content.length > 15
        ? article.content.substring(0, 15) + '...'
        : article.content;

    // statusに応じてタグのスタイルを変更
    const statusClasses =
        article.status === 'draft'
            ? 'bg-gray-100 text-gray-800'
            : 'bg-green-100 text-green-800';

    const handleStatusClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const newStatus = article.status === 'draft' ? 'published' : 'draft';
        await onUpdate({ ...article, status: newStatus });
    };

    return (
        <tr
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => onSelect(article.article_id)}
        >
            <td className="px-6 py-4 whitespace-nowrap w-12">
                <div className="flex items-center space-x-2">
                    {article.magazine_name && (
                        <img
                            src={`https://lqncxiyjgzdpuatbzaoh.supabase.co/storage/v1/object/public/sns-icons/${article.magazine_name}.png`}
                            alt={article.magazine_name}
                            className="h-5 w-5"
                        />
                    )}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{article.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{contentPreview}</td>

            {/* ステータス列をクリック可能に */}
            <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={handleStatusClick}
            >
                <span className={`inline-block w-20 text-center px-2 py-1 rounded text-xs font-semibold ${statusClasses}`}>
                    {article.status}
                </span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 flex justify-center items-center"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </td>
        </tr>
    );
}
