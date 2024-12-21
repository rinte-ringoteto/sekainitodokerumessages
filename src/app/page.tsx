'use client';

import React, { useEffect, useState, useContext } from 'react';
import { Layout } from '@/components/layout/Layout';
import type { Post } from '@/types';
import type { Article } from '@/types';
import { AuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation'; // ルーターを使用して遷移用
import { BookOpen, Users } from 'lucide-react';

interface CombinedItem {
  type: 'post' | 'article';
  id: string;
  name: string;
  status: string;
  date: Date;
}

export default function Home() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState<CombinedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 本日の日付をデフォルトで選択
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadData() {
      setLoading(true);

      // 今日の日付(0時0分0秒)
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const posts: Post[] = await fetchPosts(user.id);
      const articles: Article[] = await fetchArticles(user.id);

      // 文字列の日付をDateオブジェクトに変換
      const convertedPosts = posts.map((p) => ({ ...p, post_date: new Date(p.post_date) }));
      const convertedArticles = articles.map((a) => ({
        ...a,
        published_at: new Date(a.published_at),
      }));

      // 本日以降（今日と未来日付）のものを全てitemsに入れる
      const upcomingPosts = convertedPosts
        .filter((p) => {
          const postDateOnly = new Date(
            p.post_date.getFullYear(),
            p.post_date.getMonth(),
            p.post_date.getDate()
          );
          return postDateOnly.getTime() >= today.getTime();
        })
        .map<CombinedItem>((p) => ({
          type: 'post',
          id: p.post_id,
          name: p.sns_name,
          status: p.status,
          date: p.post_date,
        }));

      const upcomingArticles = convertedArticles
        .filter((a) => {
          const articleDateOnly = new Date(
            a.published_at.getFullYear(),
            a.published_at.getMonth(),
            a.published_at.getDate()
          );
          return articleDateOnly.getTime() >= today.getTime();
        })
        .map<CombinedItem>((a) => ({
          type: 'article',
          id: a.article_id,
          name: a.magazine_name,
          status: a.status,
          date: a.published_at,
        }));

      const combined = [...upcomingPosts, ...upcomingArticles].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );

      setItems(combined);
      setLoading(false);
    }

    loadData();
  }, [user]);

  // 日付ごとの項目をまとめる
  const markedDates = new Map<string, CombinedItem[]>();
  items.forEach((item) => {
    const d = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());
    const key = d.toISOString().split('T')[0];
    if (!markedDates.has(key)) {
      markedDates.set(key, []);
    }
    markedDates.get(key)!.push(item);
  });

  // カレンダーの日付に複数の印をタイプ別に表示
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const key = date.toISOString().split('T')[0];
      const dayItems = markedDates.get(key);

      if (dayItems && dayItems.length > 0) {
        return (
          <div className="flex space-x-1 mt-1">
            {dayItems.map((item, index) => {
              const colorClass = item.type === 'post' ? 'text-red-500' : 'text-blue-500';
              return (
                <span key={index} className={`${colorClass} text-xs`}>
                  ●
                </span>
              );
            })}
          </div>
        );
      }
    }
    return null;
  };

  // selectedDateとitemsから、selectedDateに該当するitemsのみ抽出
  const selectedDateKey = selectedDate.toISOString().split('T')[0];
  const filteredItems = items.filter((item) => {
    const d = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());
    return d.toISOString().split('T')[0] === selectedDateKey;
  });

  const handleDateChange: any = (date: Date | Date[]) => {
    const selected = Array.isArray(date) ? date[0] : date;
    const newDate = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
    setSelectedDate(newDate);
  };

  return (
    <Layout>
      <div className="flex gap-8">
        <div className="w-1/2 bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <Calendar
            locale="en-US"
            tileContent={tileContent}
            onChange={handleDateChange}
            value={selectedDate}
            className="my-calendar mx-auto border-none shadow-md rounded-lg p-2 text-sm"
          />
        </div>

        {/* 右側: 選択された日付のリストを表示 */}
        <div className="w-1/2 bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            {loading ? 'Loading...' : `Posts/Articles on ${selectedDate.toLocaleDateString('en-US')}`}
          </h2>
          {loading ? (
            <div>Loading...</div>
          ) : filteredItems.length === 0 ? (
            <div>
              No posts or articles on this day.
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => router.push('/sns')}
                  className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-900 focus:outline-none flex items-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  SNS
                </button>
                <button
                  onClick={() => router.push('/articles')}
                  className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-900 focus:outline-none flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Articles
                </button>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const statusClasses =
                    item.status === 'draft'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800';

                  return (
                    <tr key={item.type + '_' + item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {item.type === 'post' ? 'SNS Post' : 'Article'}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          {item.name && (
                            <img
                              src={`https://lqncxiyjgzdpuatbzaoh.supabase.co/storage/v1/object/public/sns-icons/${item.name}.png`}
                              alt={item.name}
                              className="h-5 w-5"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        <span
                          className={`inline-block w-20 text-center px-2 py-1 rounded text-xs font-semibold ${statusClasses}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {item.date.toLocaleDateString('en-US')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

async function fetchPosts(userId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Failed to fetch posts:', error.message);
    return [];
  }

  return (data ?? []) as Post[];
}

async function fetchArticles(userId: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Failed to fetch articles:', error.message);
    return [];
  }

  return (data ?? []) as Article[];
}
