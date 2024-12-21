export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          post_id: string
          created_at: string
          user_id: string
          sns_id: string
          sns_name: string
          post_content: string
          post_date: string
          status: 'draft' | 'scheduled' | 'published' | 'failed'
          subreddit?: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          sns_id: string
          sns_name: string
          post_content: string
          post_date: string
          status?: 'draft' | 'scheduled' | 'published' | 'failed'
          subreddit?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          sns_id?: string
          sns_name?: string
          post_content?: string
          post_date?: string
          status?: 'draft' | 'scheduled' | 'published' | 'failed'
          subreddit?: string | null
        }
      }
    }
  }
}