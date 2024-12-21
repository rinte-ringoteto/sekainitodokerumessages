import { useState, useEffect, useContext } from 'react';
import { useToast } from './useToast';
import * as articlesService from '../services/articles';
import type { Article } from '../types';
import { AuthContext } from '../contexts/AuthContext';

export function useArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            loadArticles(user.id);
        } else {
            setLoading(false);
        }
    }, [user]);

    async function loadArticles(authorId: string) {
        try {
            const data = await articlesService.fetchArticles(authorId);
            setArticles(data);
        } catch (error) {
            showToast(
                error instanceof Error ? error.message : 'Failed to load articles',
                'error'
            );
        } finally {
            setLoading(false);
        }
    }

    type CreateArticleData = Omit<Article, 'article_id' | 'author_id' | 'published_at' | 'user_id'>;

    async function createArticle(articleData: CreateArticleData) {
        if (!user) {
            showToast('Please log in to create articles', 'error');
            throw new Error('Not logged in');
        }
        console.log(articleData)

        try {
            const newArticle = await articlesService.createArticle(
                { ...articleData, user_id: user.id },
                user.id
            );
            setArticles([newArticle, ...articles]);
            showToast('Article created successfully', 'success');
            return newArticle;
        } catch (error) {
            showToast(
                error instanceof Error ? error.message : 'Failed to create article',
                'error'
            );
            throw error;
        }
    }

    async function updateArticle(articleData: Partial<Article> & { article_id: string }) {
        if (!user) {
            showToast('Please log in to update articles', 'error');
            throw new Error('Not logged in');
        }

        try {
            const updatedArticle = await articlesService.updateArticle(articleData, user.id);
            setArticles(articles.map(a => a.article_id === updatedArticle.article_id ? updatedArticle : a));
            showToast('Article updated successfully', 'success');
            return updatedArticle;
        } catch (error) {
            showToast(
                error instanceof Error ? error.message : 'Failed to update article',
                'error'
            );
            throw error;
        }
    }

    async function deleteArticle(articleId: string) {
        if (!user) {
            showToast('Please log in to delete articles', 'error');
            throw new Error('Not logged in');
        }

        try {
            await articlesService.deleteArticle(articleId, user.id);
            setArticles(articles.filter(a => a.article_id !== articleId));
            showToast('Article deleted successfully', 'success');
        } catch (error) {
            showToast(
                error instanceof Error ? error.message : 'Failed to delete article',
                'error'
            );
            throw error;
        }
    }

    return {
        articles,
        loading,
        createArticle,
        updateArticle,
        deleteArticle,
    };
}
