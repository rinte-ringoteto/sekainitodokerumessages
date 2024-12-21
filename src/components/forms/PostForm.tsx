import React, { useState, useEffect } from 'react';
import { FormField } from './FormField';
import { RedditFields } from './RedditFields';
import { SNS_PLATFORMS } from '../../constants/sns';
import { formatDateForInput } from '../../utils/dateUtils';
import type { Post, SNS } from '../../types';

interface PostFormProps {
  snsList: SNS[];
  onSubmit: (postData: Omit<Post, "post_id" | "created_at" | "user_id">) => Promise<Post>;
  initialData?: Post;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const initialFormState = {
  post_content: '',
  sns_id: '',
  sns_name: '',
  post_date: new Date(),
  status: 'draft' as const,
  subreddit: '',
};

export function PostForm({ snsList, onSubmit, initialData, onSuccess, onError }: PostFormProps) {
  const [formData, setFormData] = useState<Partial<Post>>(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        post_date: new Date(initialData.post_date),
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.post_content?.trim()) {
      onError?.('Post content is required');
      return;
    }

    if (!formData.sns_id) {
      onError?.('Please select a platform');
      return;
    }

    if (!formData.post_date) {
      onError?.('Post date is required');
      return;
    }

    const selectedSNS = snsList.find((sns) => sns.sns_id === formData.sns_id);
    if (selectedSNS?.sns_name === SNS_PLATFORMS.REDDIT && !formData.subreddit) {
      onError?.('Subreddit is required for Reddit posts');
      return;
    }

    try {
      const postData: Omit<Post, "post_id" | "created_at" | "user_id"> = {
        post_content: formData.post_content!,
        sns_id: formData.sns_id!,
        sns_name: formData.sns_name!,
        post_date: formData.post_date!,
        status: formData.status || 'draft',
        subreddit: formData.subreddit || ''
      };
      await onSubmit(postData);
      onSuccess?.();
      if (!initialData) {
        resetForm();
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to save post');
    }
  };

  const selectedSNS = snsList?.find((sns) => sns.sns_id === formData.sns_id);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <FormField label="Post Content" htmlFor="post_content">
        <textarea
          id="post_content"
          rows={4}
          className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:border-teal-800 focus:ring-teal-800"
          value={formData.post_content || ''}
          onChange={(e) => setFormData({ ...formData, post_content: e.target.value })}
        />
      </FormField>

      <FormField label="Platform" htmlFor="sns_id">
        <select
          id="sns_id"
          className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:border-teal-800 focus:ring-teal-800"
          value={formData.sns_id || ''}
          onChange={(e) => {
            const sns = snsList.find(s => s.sns_id === e.target.value);
            setFormData({
              ...formData,
              sns_id: e.target.value,
              sns_name: sns?.sns_name || '',
              subreddit: '',
            });
          }}
        >
          <option value="">Select Platform</option>
          {snsList?.map((sns) => (
            <option key={sns.sns_id} value={sns.sns_id}>
              {sns.sns_name}
            </option>
          ))}
        </select>
      </FormField>

      {selectedSNS?.sns_name === SNS_PLATFORMS.REDDIT && (
        <RedditFields
          subreddit={formData.subreddit || ''}
          onChange={(subreddit) => setFormData({ ...formData, subreddit })}
        />
      )}

      <FormField label="Post Date" htmlFor="post_date">
        <input
          type="datetime-local"
          id="post_date"
          className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:border-teal-800 focus:ring-teal-800"
          value={formData.post_date ? formatDateForInput(new Date(formData.post_date)) : ''}
          onChange={(e) => setFormData({ ...formData, post_date: new Date(e.target.value) })}
        />
      </FormField>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-teal-800 hover:bg-teal-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-800"
        >
          {initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
