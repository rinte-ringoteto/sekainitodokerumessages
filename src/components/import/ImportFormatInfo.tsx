import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Popover } from '../ui/Popover';

export function ImportFormatInfo() {
  const formatExample = {
    post_content: "Hello World!",
    sns_id: "x",
    sns_name: "x",
    post_date: "2024-03-20T15:00:00.000Z",
    status: "draft",
    subreddit: "programming" // Optional, only for Reddit posts
  };

  return (
    <Popover
      content={
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Import Format</h3>
            <p className="mt-1 text-sm text-gray-500">
              The JSON file should contain an array of post objects with the following structure:
            </p>
          </div>

          <div className="bg-gray-50 rounded-md p-3">
            <pre className="text-xs text-gray-600 overflow-x-auto">
              {JSON.stringify([formatExample], null, 2)}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-900">Required Fields:</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              <li>post_content: string</li>
              <li>sns_id: string</li>
            </ul>

            <h4 className="text-xs font-medium text-gray-900">Optional Fields:</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              <li>post_date: ISO 8601 date string</li>
              <li>status: "draft" | "scheduled" | "published" | "failed"</li>
              <li>subreddit: string (required for Reddit posts)</li>
            </ul>
          </div>
        </div>
      }
    >
      <HelpCircle className="h-4 w-4" />
    </Popover>
  );
}