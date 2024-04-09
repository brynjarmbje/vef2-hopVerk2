import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import '../styles/global.scss';

import { Metadata } from 'next';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
