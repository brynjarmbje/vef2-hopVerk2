import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import '@/styles/global.scss';

import { Metadata } from 'next';
import { Suspense } from 'react';
import Loadingsvg from '@/components/Loadingsvg';

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
        <Navbar />
        <Suspense fallback={<Loadingsvg />}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
