// src/app/AuthClientWrapper.tsx
'use client';

import { AuthProvider } from '../contexts/AuthContext';

export default function AuthClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
