'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        // サインアップ成功時の処理
        // ここではログインページにリダイレクトする例を示します。
        router.push('/');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Sign Up</h1>
            <form onSubmit={handleSignup} className="space-y-4">
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
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-sm">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-blue-600 hover:underline"
                >
                    Log in here.
                </button>
            </p>
        </div>
    );
}
