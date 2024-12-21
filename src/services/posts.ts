import { supabase } from '@/lib/supabase';
import type { Post } from '@/types';
import { mapDatabasePostToPost, mapPostToDatabasePost } from '@/utils/mappers';

export async function fetchPosts(userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('post_date', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapDatabasePostToPost);
}

export async function createPost(post: Omit<Post, 'post_id' | 'created_at' | 'user_id'>, userId: string) {
  const dbPost = mapPostToDatabasePost({ ...post, user_id: userId });
  console.log(userId)
  const { data, error } = await supabase
    .from('posts')
    .insert(dbPost)
    .select()
    .single();

  if (error) throw error;
  return mapDatabasePostToPost(data);
}

export async function updatePost(post: Omit<Post, 'created_at'>, userId: string) {
  const dbPost = mapPostToDatabasePost({ ...post, user_id: userId });
  const { data, error } = await supabase
    .from('posts')
    .update(dbPost)
    .eq('post_id', post.post_id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return mapDatabasePostToPost(data);
}

export async function deletePost(postId: string, userId: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) throw error;
}

export async function importPosts(importedPosts: Omit<Post, 'post_id' | 'created_at' | 'user_id'>[], userId: string) {
  // 全てのpostにuser_idを付与
  const postsWithUserId = importedPosts.map(p => ({ ...p, user_id: userId }));

  const response = await fetch('/api/posts/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postsWithUserId),
  });

  if (!response.ok) {
    throw new Error('Failed to import posts');
  }

  return response.json();
}
