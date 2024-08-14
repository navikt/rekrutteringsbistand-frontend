import '@navikt/ds-css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import { verifyUserLoggedIn } from './auth/auth';
import Header from './header/Header';
import { isLocal } from './util/env';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: isLocal ? 'Local - Rekrutteringsbistand' : 'Rekrutteringsbistand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(
    '🎺 process.env.NEXT_PUBLIC_ENVIRONMENT',
    process.env.NEXT_PUBLIC_ENVIRONMENT
  );
  console.log('🎺 process.env.NODE_ENV', process.env.NODE_ENV);
  await verifyUserLoggedIn();
  return (
    <html lang='no'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css'
        />
        <Script
          defer
          strategy='beforeInteractive'
          src='https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js'
        />
      </head>
      <body className={inter.className}>
        <ApplikasjonContextProvider>
          <Header />
          <main>{children}</main>
        </ApplikasjonContextProvider>
      </body>
    </html>
  );
}
