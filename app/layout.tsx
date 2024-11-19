import { validateToken } from '@navikt/oasis';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import * as React from 'react';
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
  const headersList = await headers();
  const token = headersList.get('authorization')?.replace('Bearer ', '');

  const redirectPath = headersList.get('x-path');

  if (!token) {
    redirect(`/oauth2/login?redirect=${redirectPath}`);
  }

  try {
    await validateToken(token);
  } catch (error) {
    redirect(`/oauth2/login?redirect=${redirectPath}`);
  }

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
