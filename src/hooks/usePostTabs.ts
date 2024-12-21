import { useState, useMemo } from 'react';
import { isUpcomingPost } from '../utils/dateUtils';
import type { Post } from '../types';

export function usePostTabs(posts: Post[]) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const { upcomingPosts, pastPosts } = useMemo(() => {
    const upcoming: Post[] = [];
    const past: Post[] = [];

    posts.forEach(post => {
      if (isUpcomingPost(post.post_date)) {
        upcoming.push(post);
      } else {
        past.push(post);
      }
    });

    // upcoming: 古い順(昇順)
    upcoming.sort((a, b) => {
      return new Date(a.post_date).getTime() - new Date(b.post_date).getTime();
    });

    // past: 新しい順(降順)
    past.sort((a, b) => {
      return new Date(b.post_date).getTime() - new Date(a.post_date).getTime();
    });

    return {
      upcomingPosts: upcoming,
      pastPosts: past,
    };
  }, [posts]);

  const currentPosts = activeTab === 'upcoming' ? upcomingPosts : pastPosts;

  return {
    activeTab,
    setActiveTab,
    currentPosts,
    upcomingCount: upcomingPosts.length,
    pastCount: pastPosts.length,
  };
}
