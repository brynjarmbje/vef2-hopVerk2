import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import '@/styles/global.scss';

import { Metadata } from 'next';
import React from 'react';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Cinema App',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
