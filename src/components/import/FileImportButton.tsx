import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { ImportFormatInfo } from './ImportFormatInfo';
import type { Post } from '../../types';

interface FileImportButtonProps {
  onImport: (importedPosts: Omit<Post, "post_id" | "created_at">[]) => Promise<any>;
  onError: (message: string) => void;
}

export function FileImportButton({ onImport, onError }: FileImportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const posts = JSON.parse(text);

      if (!Array.isArray(posts)) {
        throw new Error('Invalid format: File must contain an array of posts');
      }

      onImport(posts);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to parse JSON file');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Upload className="h-4 w-4" />
        Import Posts
      </button>
      <ImportFormatInfo />
    </div>
  );
}