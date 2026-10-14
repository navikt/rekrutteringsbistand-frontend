import './globals.css';
import ApmRutetracker from '@/components/ApmRutetracker';
import HoppTilHovedinnhold from '@/components/layout/HoppTilHovedinnhold';
import RekrutteringsbistandProvider from '@/providers/RekrutteringsbistandProvider';
import { UmamiProvider } from '@/providers/UmamiContext';
import { isLocal } from '@/util/env';
import { versionFromImage } from '@nais/apm';
import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: isLocal ? 'Local - Rekrutteringsbistand' : 'Rekrutteringsbistand',
    other: {
      'nais-app': process.env.NAIS_APP_NAME ?? 'rekrutteringsbistand',
      'nais-team': 'toi',
      'nais-cluster': process.env.NAIS_CLUSTER_NAME ?? 'local',
      'nais-version': versionFromImage(process.env.NAIS_APP_IMAGE) ?? 'local',
      ...(process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL && {
        'nais-telemetry-url': process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
      }),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='no'
      className={`h-full ${sourceSans3.variable}`}
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
        <ApmRutetracker />
        <HoppTilHovedinnhold />
        <UmamiProvider>
          <RekrutteringsbistandProvider>
            {children}
          </RekrutteringsbistandProvider>
        </UmamiProvider>
      </body>
    </html>
  );
}
