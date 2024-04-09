import type { ReactNode } from 'react';
import { Inter } from "next/font/google";
import Navbar from './Navbar'; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar /> {/* Include the Navbar at the top of the layout */}
      <div className={inter.className}>
        <main>{children}</main> {/* The rest of the page content goes here */}
      </div>
    </>
  );
}
