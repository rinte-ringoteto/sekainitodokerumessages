import React from 'react';
import { FormField } from './FormField';

interface RedditFieldsProps {
  subreddit: string;
  onChange: (subreddit: string) => void;
}

// Popular subreddits for demonstration
const POPULAR_SUBREDDITS = [
  'SaaS',
  'microsaas',
  'roastmystartup',
  'GrowthHacking',
  'MarketingAutomation',
  'roastmystartup',
  'apps',
  'Development',
  'Entrepreneur',
  'generativeai',
  'indiehackers',
];

export function RedditFields({ subreddit, onChange }: RedditFieldsProps) {
  return (
    <FormField label="Subreddit" htmlFor="subreddit">
      <div className="space-y-4">
        <input
          type="text"
          id="subreddit"
          className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:border-teal-800 focus:ring-teal-800"
          value={subreddit}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter subreddit name"
        />
        <div>
          <p className="text-sm text-gray-500 mb-2">Popular subreddits:</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SUBREDDITS.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onChange(name)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
              >
                r/{name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FormField>
  );
}