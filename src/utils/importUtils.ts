import type { Post } from '../types';

export function validateImportedPosts(posts: unknown[]): Partial<Post>[] {
  return posts.map((post, index) => {
    if (typeof post !== 'object' || post === null) {
      throw new Error(`Invalid post at index ${index}: Post must be an object`);
    }

    const validatedPost = post as Partial<Post>;
    
    if (!validatedPost.post_content) {
      throw new Error(`Invalid post at index ${index}: post_content is required`);
    }
    
    if (!validatedPost.sns_id) {
      throw new Error(`Invalid post at index ${index}: sns_id is required`);
    }

    return validatedPost;
  });
}

export function processImportedPosts(posts: Partial<Post>[]): Partial<Post>[] {
  return posts.map(post => ({
    ...post,
    post_date: post.post_date ? new Date(post.post_date) : new Date(),
    status: post.status || 'draft',
  }));
}