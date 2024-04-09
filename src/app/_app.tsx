import type { AppProps } from 'next/app';
import RootLayout from './layout'; // Import your layout component

import '../src/app/globals.css'; // Ensure the path to globals.css is correct

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}