import type { Metadata } from 'next';
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
      <body>
        <MirageInitializer>
          <Rekrutteringsbistand>{children}</Rekrutteringsbistand>
        </MirageInitializer>
      </body>
    </html>
  );
}
