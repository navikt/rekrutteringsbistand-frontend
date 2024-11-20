import type { Metadata } from 'next';
import { isLocal } from '../util/env';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import MirageInitializer from './components/MirageInitializer';
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
        <MirageInitializer>
          <ApplikasjonContextProvider>{children}</ApplikasjonContextProvider>
        </MirageInitializer>
      </body>
    </html>
  );
}
