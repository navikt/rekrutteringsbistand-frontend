import type { Metadata } from 'next';
import { isLocal } from '../util/env';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
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
        {/* <ApplikasjonContextProvider>{children}</ApplikasjonContextProvider> */}
        <Rekrutteringsbistand>{children}</Rekrutteringsbistand>
      </body>
    </html>
  );
}
