import { useState, useEffect, useContext } from 'react';
import { useToast } from './useToast';
import * as postsService from '../services/posts';
import type { Post } from '../types';
import { AuthContext } from '../contexts/AuthContext';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      loadPosts(user.id);
    } else {
      setLoading(false); // ユーザーがいない場合は何もロードしない
    }
  }, [user]);

  async function loadPosts(userId: string) {
    try {
      const data = await postsService.fetchPosts(userId);
      setPosts(data);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to load posts',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }

  async function createPost(postData: Omit<Post, 'post_id' | 'created_at' | 'user_id'>) {
    if (!user) {
      showToast('Please log in to create posts', 'error');
      throw new Error('Not logged in');
    }

    try {
      // user_idはpostsService側で付与
      console.log(user.id)
      const newPost = await postsService.createPost(postData, user.id);
      setPosts([newPost, ...posts]);
      showToast('Post created successfully', 'success');
      return newPost;
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to create post',
        'error'
      );
      throw error;
    }
  }

  async function updatePost(postData: Omit<Post, 'created_at'>) {
    if (!user) {
      showToast('Please log in to update posts', 'error');
      throw new Error('Not logged in');
    }

    try {
      // user_idはpostsService側で付与
      const updatedPost = await postsService.updatePost(postData, user.id);
      setPosts(posts.map(post =>
        post.post_id === updatedPost.post_id ? updatedPost : post
      ));
      showToast('Post updated successfully', 'success');
      return updatedPost;
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to update post',
        'error'
      );
      throw error;
    }
  }

  async function deletePost(postId: string) {
    if (!user) {
      showToast('Please log in to delete posts', 'error');
      throw new Error('Not logged in');
    }

    try {
      await postsService.deletePost(postId, user.id);
      setPosts(posts.filter(post => post.post_id !== postId));
      showToast('Post deleted successfully', 'success');
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to delete post',
        'error'
      );
      throw error;
    }
  }

  async function importPosts(importedPosts: Omit<Post, 'post_id' | 'created_at' | 'user_id'>[]) {
    if (!user) {
      showToast('Please log in to import posts', 'error');
      throw new Error('Not logged in');
    }

    try {
      // user_idはpostsService側で付与
      const newPosts = await postsService.importPosts(importedPosts, user.id);
      setPosts([...newPosts, ...posts]);
      showToast(`Successfully imported ${newPosts.length} posts`, 'success');
      return newPosts;
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to import posts',
        'error'
      );
      throw error;
    }
  }

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    importPosts,
  };
}
