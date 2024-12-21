import type { Database } from '../types/database';
import type { Post } from '../types';

type DatabasePost = Database['public']['Tables']['posts']['Row'];

export function mapDatabasePostToPost(dbPost: DatabasePost): Post {
  return {
    post_id: dbPost.post_id,
    sns_id: dbPost.sns_id,
    sns_name: dbPost.sns_name,
    post_content: dbPost.post_content,
    post_date: new Date(dbPost.post_date),
    status: dbPost.status,
    created_at: new Date(dbPost.created_at),
    subreddit: dbPost.subreddit || undefined,
    user_id: dbPost.user_id,
  };
}

export function mapPostToDatabasePost(post: Partial<Post>): Partial<DatabasePost> {
  return {
    post_id: post.post_id,
    sns_id: post.sns_id,
    sns_name: post.sns_name,
    post_content: post.post_content,
    post_date: post.post_date?.toISOString(),
    status: post.status,
    subreddit: post.subreddit,
    user_id: post.user_id,
  };
}