'use client';

import { Menu } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Kalam } from 'next/font/google';

interface LayoutProps {
  children: React.ReactNode;
}

// Kalamフォントをインポート
const kalam = Kalam({
  subsets: ['latin'],
  weight: '700', // 必要なウエイトを指定
});

export function Layout({ children }: LayoutProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Googleログインの場合のアバター画像URLを取得
  const avatarUrl = user?.user_metadata?.picture;
  const isGoogleUser = !!avatarUrl;
  // メールログインの場合はメールの先頭文字をアイコン化
  const emailLetter = user && user.email ? user.email.charAt(0).toUpperCase() : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* ロゴ＋サービス名をクリックで"/"へ遷移 */}
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 focus:outline-none hover:opacity-80"
              >
                <img src="/sekai-message-logo.svg" alt="Logo" className="h-8 w-8 object-cover rounded-full" />
                {/* Kalamフォントを適用 */}
                <span className={`text-xl font-semibold ${kalam.className}`}>
                  SEKAI NI TODOKERU MESSAGES
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-4 relative">
              <button
                onClick={() => router.push('/sns')}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                SNS
              </button>

              <button
                onClick={() => router.push('/articles')}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                Articles
              </button>

              {!user && (
                <button
                  onClick={() => router.push('/login')}
                  className="text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  Login
                </button>
              )}
              {user && (
                <>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 relative focus:outline-none"
                  >
                    {isGoogleUser && avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-700 font-bold">
                        {emailLetter}
                      </span>
                    )}
                  </button>

                  {menuOpen && (
                    <div className="absolute top-12 right-0 bg-white border rounded shadow-lg py-1 z-50 w-32">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
