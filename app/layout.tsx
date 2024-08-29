import type { Metadata } from 'next';
import Script from 'next/script';
import * as React from 'react';
import { verifyUserLoggedIn } from '../tilgangskontroll/auth';
import { isLocal } from '../util/env';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import './globals.css';

export const metadata: Metadata = {
  title: isLocal ? 'Local - Rekrutteringsbistand' : 'Rekrutteringsbistand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await verifyUserLoggedIn();
  return (
    <html lang='no'>
      <head>
        {!isLocal && (
          <link
            href='https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css'
            rel='stylesheet'
          />
        )}
        {!isLocal && (
          <Script
            defer
            src='https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js'
            strategy='beforeInteractive'
          />
        )}
      </head>
      <body>
        <ApplikasjonContextProvider>{children}</ApplikasjonContextProvider>
      </body>
    </html>
  );
}
