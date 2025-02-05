'use client';

import { Layout } from '../layout/Layout';
import { PostList } from '../posts/PostList';
import { PostForm } from '../forms/PostForm';
import { FilterBar } from '../filters/FilterBar';
import { SortToggle } from '../filters/SortToggle';
import { FileImportButton } from '../import/FileImportButton';
import { PostTabs } from '../posts/PostTabs';
import { usePostFilters } from '@/hooks/usePostFilters';
import { usePostTabs } from '@/hooks/usePostTabs';
import { usePosts } from '@/hooks/usePosts';
import { useSNSList } from '@/hooks/useSNSList';
import React, { useState } from 'react';
import type { Post } from '../../types';
import { useToast } from '@/hooks/useToast';
import { Toast } from '../ui/Toast';

export function Dashboard() {
  const { toast, showToast, hideToast } = useToast();
  const { posts, loading, createPost, updatePost, deletePost, importPosts } = usePosts();
  const { snsList } = useSNSList();

  const {
    selectedPlatform,
    setSelectedPlatform,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortAscending,
    setSortAscending,
    filteredPosts,
  } = usePostFilters(posts);

  const {
    activeTab,
    setActiveTab,
    currentPosts,
    upcomingCount,
    pastCount,
  } = usePostTabs(filteredPosts);

  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </Layout>
    );
  }

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
  };

  const handleSuccess = () => {
    // 成功時のコールバック
    setSelectedPost(undefined);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <FilterBar
          selectedPlatform={selectedPlatform}
          startDate={startDate}
          endDate={endDate}
          onPlatformChange={setSelectedPlatform}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          platforms={snsList}
        />

        <div className="flex items-center justify-between">
          {/* 左側: Posts */}
          <h2 className="text-2xl font-bold">SNS</h2>

          {/* 右側:  */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setSelectedPost(undefined)}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-800 hover:bg-teal-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900"
            >
              New Post
            </button>
            <FileImportButton
              onImport={importPosts}
              onError={(message) => console.error(message)}
            />
          </div>
        </div>
        <div className='space-y-4'>
          <PostTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            upcomingCount={upcomingCount}
            pastCount={pastCount}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <PostList
                posts={currentPosts}
                onUpdate={updatePost}
                onDelete={async (id) => {
                  try {
                    await deletePost(id);
                    showToast('Post deleted successfully', 'success');
                  } catch {
                    showToast('Failed to delete post', 'error');
                  }
                }}
                onSelect={handleSelectPost}
              />
            </div>
            <div>
              <PostForm
                onSubmit={selectedPost ?
                  (postData) => updatePost({ ...selectedPost, ...postData }) :
                  createPost}
                snsList={snsList}
                initialData={selectedPost}
                onSuccess={() => {
                  handleSuccess();
                  showToast(selectedPost ? 'Post updated successfully' : 'Post created successfully', 'success');
                }}
                onError={(err) => showToast(err, 'error')}
              />
            </div>
          </div>
        </div>
        {toast.isVisible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </Layout>
  );
}
