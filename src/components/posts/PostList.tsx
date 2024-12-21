import React from 'react';
import { PostListItem } from './PostListItem';
import type { Post } from '../../types';

interface PostListProps {
  posts: Post[];
  onUpdate: (postData: Post) => Promise<Post>;
  onDelete: (postId: string) => Promise<void>;
  onSelect: (post: Post) => void;
}

export function PostList({ posts, onUpdate, onDelete, onSelect }: PostListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        {/* table-fixedを使用し、全列幅を固定 */}
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/5">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <PostListItem
                key={post.post_id}
                post={post}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
