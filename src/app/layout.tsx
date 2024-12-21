import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import AuthClientWrapper from './AuthClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SEKAI NI TODOKERU MESSAGES',
  description: 'Manage your social media posts efficiently',
  icons: {
    icon: '/favicon.ico', // ここでfaviconを設定
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthClientWrapper>
          {children}
        </AuthClientWrapper>
      </body>
    </html>
  );
}
