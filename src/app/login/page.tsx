'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
        } else {
            // ログイン成功後にダッシュボードへ移動
            router.push('/');
        }
    };

    // Google OAuthログインハンドラ
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}` // Googleログイン成功後のリダイレクト先
            }
        });
        if (error) {
            setError(error.message);
        }
        // 成功時はGoogleのログイン画面にリダイレクトされる
        // 終了後はredirectToで指定したURLに戻る
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="block w-full border rounded p-2"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full border rounded p-2"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full">
                    Login
                </button>
            </form>

            {/* Googleログインボタン */}
            <div className="mt-4">
                <button
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 bg-red-500 text-white rounded w-full hover:bg-red-600"
                >
                    Continue with Google
                </button>
            </div>

            {/* サインアップページへの遷移リンク */}
            <p className="mt-4 text-sm">
                Don&apos;t have an account?{' '}
                <button
                    type="button"
                    onClick={() => router.push('/signup')}
                    className="text-blue-600 hover:underline"
                >
                    Sign up here.
                </button>
            </p>
        </div>
    );
}
