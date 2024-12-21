export interface SNS {
  sns_id: string;
  sns_name: string;
  api_config: {
    api_key: string;
    api_secret: string;
    access_token: string;
  };
}

export interface Post {
  user_id: string;
  post_id: string;
  sns_id: string;
  sns_name: string;
  post_content: string;
  post_date: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  created_at: Date;
  subreddit?: string;
}

export interface PostSchedule {
  schedule_id: string;
  post_id: string;
  scheduled_at: Date;
  created_at: Date;
}

export interface Article {
  user_id: string;
  article_id: string;
  platform_id: string;
  author_id: string;
  title: string;
  content: string;
  published_at: Date;
  status: 'draft' | 'published';
  magazine_name: string; // 新規追加
}


export interface Magazine {
  magazine_id: string;
  magazine_name: string;
  description?: string;
}