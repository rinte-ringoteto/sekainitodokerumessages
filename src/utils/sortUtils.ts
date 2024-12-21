import type { Post } from '../types';

export function sortPostsByDate(posts: Post[], ascending: boolean = false): Post[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.post_date).getTime();
    const dateB = new Date(b.post_date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}