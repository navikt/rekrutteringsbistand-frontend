import type { Metadata } from 'next';
import Script from 'next/script';
import { isLocal } from '../util/env';
import MirageInitializer from './components/MirageInitializer';
import './globals.css';
import Rekrutteringsbistand from './Rekrutteringsbistand';

export const metadata: Metadata = {
  title: isLocal ? 'Local - Rekrutteringsbistand' : 'Rekrutteringsbistand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='no'>
     <Script
        src="https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js"
        strategy="afterInteractive"
      />

      <body>
        <MirageInitializer>
          <Rekrutteringsbistand>{children}</Rekrutteringsbistand>
        </MirageInitializer>
      </body>
    </html>
  );
}
