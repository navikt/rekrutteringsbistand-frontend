import type { Metadata } from 'next';
import { isLocal } from '../util/env';
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
        <Rekrutteringsbistand>{children}</Rekrutteringsbistand>
      </body>
    </html>
  );
}
