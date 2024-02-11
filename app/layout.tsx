import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';
import { NextAuthProvider } from '../components/auth/next-auth-provider';

const inter = Inter({ subsets: ['latin'] });

let title = 'Qr AI - QR Code Generator';
let description = 'Generate your AI QR Code in seconds';
let url = 'https://www.aigenqr.com';
let ogimage = 'https://www.aigenqr.com/og-image.png';
let sitename = 'aigenqr.com';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="aigenqr.com" />
      </head>
      <body className={inter.className}>
      <NextAuthProvider>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
