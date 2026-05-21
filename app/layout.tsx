import './globals.css';
import RekrutteringsbistandProvider from '@/providers/RekrutteringsbistandProvider';
import { UmamiProvider } from '@/providers/UmamiContext';
import { isLocal } from '@/util/env';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: isLocal ? 'Local - Rekrutteringsbistand' : 'Rekrutteringsbistand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='no'
      className={`h-full ${inter.variable}`}
      data-testmode={process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE}
    >
      <Script
        src={process.env.NEXT_PUBLIC_DECORATOR_SRC}
        strategy='afterInteractive'
      />
      <Script
        id='umami-analytics'
        defer
        strategy='afterInteractive'
        src={process.env.NEXT_PUBLIC_UMAMI_SRC}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
      />
      <body className='min-h-screen' data-testid='app-root'>
        <UmamiProvider>
          <RekrutteringsbistandProvider>
            {children}
          </RekrutteringsbistandProvider>
        </UmamiProvider>
      </body>
    </html>
  );
}
