import '@navikt/ds-css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import { verifyUserLoggedIn } from './auth/auth';
import Header from './header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rekrutteringsbistand',
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
        <link
          rel='stylesheet'
          href='https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css'
        />
        <script
          defer
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
