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
            // ログイン成功後にトップページへ移動
            router.push('/');
        }
    };

    // Google OAuthログインハンドラ
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `https://sekainitodokerumessages-jv97m27iq-rinteringotetos-projects.vercel.app/`
            }
        });
        if (error) {
            setError(error.message);
        }
        // Googleログイン画面へリダイレクト
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow">
            <h1 className="text-2xl font-bold mb-4 text-teal-800">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-teal-800">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="block w-full mt-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-teal-800">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="block w-full mt-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded w-full hover:bg-teal-700 transition-colors"
                >
                    Login
                </button>
            </form>

            {/* Googleログインボタン */}
            <div className="mt-4">
                <button
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 bg-teal-600 text-white rounded w-full hover:bg-teal-700 transition-colors"
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
                    className="text-teal-700 hover:underline"
                >
                    Sign up here.
                </button>
            </p>
        </div>
    );
}
