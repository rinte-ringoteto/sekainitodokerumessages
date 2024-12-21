import React from 'react';
import type { Post } from '../../types';
import { Trash2 } from 'lucide-react';

interface PostListItemProps {
  post: Post;
  onUpdate: (postData: Post) => Promise<Post>;
  onDelete: (postId: string) => Promise<void>;
  onSelect: (post: Post) => void; // 選択用
}

export function PostListItem({ post, onDelete, onSelect, onUpdate }: PostListItemProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // 行クリックと競合しないように
    onDelete(post.post_id);
  };

  const handleStatusClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 行選択イベントをキャンセル
    const newStatus = post.status === 'draft' ? 'published' : 'draft';
    await onUpdate({ ...post, status: newStatus });
  };

  // statusに応じてタグのスタイルを変更
  const statusClasses =
    post.status === 'draft'
      ? 'bg-gray-100 text-gray-800'
      : 'bg-green-100 text-green-800';

  return (
    <tr
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onSelect(post)} // 行クリックで選択
    >
      <td className="px-6 py-4 whitespace-nowrap w-12">
        <div className="flex items-center space-x-2">
          {post.sns_name && (
            <img
              src={`https://lqncxiyjgzdpuatbzaoh.supabase.co/storage/v1/object/public/sns-icons/${post.sns_name}.png`}
              alt={post.sns_name}
              className="h-5 w-5"
            />
          )}
          <span>
            {post.sns_name === "reddit" && (
              <span className="text-gray-500">(r/{post.subreddit})</span>
            )}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-pre-wrap break-words w-96">
        {post.post_content}
      </td>


      <td
        className="px-6 py-4 whitespace-nowrap w-12 cursor-pointer"
        onClick={handleStatusClick}
      >
        {/* タグを固定幅にし、テキストが短くても長くても同じ幅を占有 */}
        <span className={`inline-block w-20 text-center px-2 py-1 rounded text-xs font-semibold ${statusClasses}`}>
          {post.status}
        </span>
      </td>


      <td className="px-6 py-4 whitespace-nowrap w-12">
        {new Date(post.post_date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap w-12">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 flex justify-center items-center"
        >
          <Trash2 className='h-5 w-5' />
        </button>
      </td>
    </tr>
  );
}
