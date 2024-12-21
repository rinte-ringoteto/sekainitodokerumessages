import { supabase } from '@/lib/supabase';
import type { Article } from '@/types';

export async function fetchArticles(authorId: string) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('author_id', authorId)
        .order('published_at', { ascending: false });

    if (error) throw error;
    return data as Article[];
}

export async function createArticle(
    articleData: Omit<Article, 'article_id' | 'published_at' | 'author_id'>,
    authorId: string
) {
    const { data, error } = await supabase
        .from('articles')
        .insert({ ...articleData, author_id: authorId })
        .select()
        .single();
    console.log(articleData)
    console.log(authorId)
    console.log(error)
    if (error) throw error;
    return data as Article;
}

export async function updateArticle(articleData: Partial<Article> & { article_id: string }, authorId: string) {
    const { data, error } = await supabase
        .from('articles')
        .update({ ...articleData, author_id: authorId })
        .eq('article_id', articleData.article_id)
        .eq('author_id', authorId)
        .select()
        .single();

    if (error) throw error;
    return data as Article;
}

export async function deleteArticle(articleId: string, authorId: string) {
    const { error } = await supabase
        .from('articles')
        .delete()
        .eq('article_id', articleId)
        .eq('author_id', authorId);

    if (error) throw error;
}
