import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '../components/header/Header';
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
            rel='stylesheet'
            href='https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css'
          />
        )}
        {!isLocal && (
          <Script
            defer
            strategy='beforeInteractive'
            src='https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js'
          />
        )}
      </head>
      <body>
        <ApplikasjonContextProvider>
         
          {children}
        </ApplikasjonContextProvider>
      </body>
    </html>
  );
}
