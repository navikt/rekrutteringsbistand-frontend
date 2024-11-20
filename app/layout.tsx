import type { Metadata } from 'next';
import { isLocal } from '../util/env';
import './globals.css';

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
      <body>
        kake
        {/* <MirageInitializer>
          <ApplikasjonContextProvider>{children}</ApplikasjonContextProvider>
        </MirageInitializer> */}
      </body>
    </html>
  );
}
