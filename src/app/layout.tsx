import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/reset.css';
import '../styles/globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import AuthSession from './_components/AuthSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '캠퍼스팟 (Camperspot)',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <html lang='ko'>
        <AuthSession>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
        </AuthSession>
      </html>
    
  );
}
