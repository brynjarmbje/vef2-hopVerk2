import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import '@/styles/global.scss';
import Spinner from '@/styles/spinner.svg' ;

import { Metadata } from 'next';
import { Suspense } from 'react';



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
        <Suspense fallback={Spinner}>
        <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
