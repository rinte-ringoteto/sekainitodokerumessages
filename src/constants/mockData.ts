import { Post } from '../types';

export const MOCK_POSTS: Post[] = [
  {
    post_id: '1',
    user_id: '1',
    sns_id: '1',
    sns_name: 'twitter',
    post_content: 'Hello Twitter!',
    post_date: new Date(),
    status: 'draft',
    created_at: new Date(),
  },
  {
    post_id: '2',
    user_id: '1',
    sns_id: '3',
    sns_name: 'reddit',
    post_content: 'Hello Reddit!',
    post_date: new Date(),
    status: 'draft',
    created_at: new Date(),
    subreddit: 'programming',
  },
];