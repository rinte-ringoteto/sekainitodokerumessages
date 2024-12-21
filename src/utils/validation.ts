import { z } from 'zod';

export const postSchema = z.object({
  post_content: z.string().min(1, 'Content is required'),
  sns_id: z.string().min(1, 'Platform is required'),
  post_date: z.date(),
  status: z.enum(['draft', 'scheduled', 'published', 'failed']),
  subreddit: z.string().optional(),
});

export const importSchema = z.array(postSchema);

export function validatePost(data: unknown) {
  return postSchema.parse(data);
}

export function validateImport(data: unknown) {
  return importSchema.parse(data);
}