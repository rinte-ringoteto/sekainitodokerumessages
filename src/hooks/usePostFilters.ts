import { useState, useMemo } from 'react';
import { isWithinDateRange } from '../utils/dateUtils';
import { sortPostsByDate } from '../utils/sortUtils';
import type { Post } from '../types';

export function usePostFilters(posts: Post[]) {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortAscending, setSortAscending] = useState(false);

  const filteredPosts = useMemo(() => {
    // First, filter the posts
    const filtered = posts.filter((post) => {
      const matchesPlatform = selectedPlatform ? post.sns_id === selectedPlatform : true;
      const matchesDate = isWithinDateRange(post.post_date, startDate, endDate);
      return matchesPlatform && matchesDate;
    });

    // Then, sort the filtered posts
    return sortPostsByDate(filtered, sortAscending);
  }, [posts, selectedPlatform, startDate, endDate, sortAscending]);

  return {
    selectedPlatform,
    setSelectedPlatform,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortAscending,
    setSortAscending,
    filteredPosts,
  };
}