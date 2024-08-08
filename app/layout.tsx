import '@navikt/ds-css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ApplikasjonContextProvider } from './ApplikasjonContext';
import Header from './header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rekrutteringsbistand',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scriptSrc =
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js';
  const linkHref =
    'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css';

  return (
    <html lang='no'>
      <Script src={scriptSrc} strategy='beforeInteractive'></Script>
      <link rel='stylesheet' href={linkHref} />
      <body className={inter.className}>
        <ApplikasjonContextProvider>
          <Header />
          <main>{children}</main>
        </ApplikasjonContextProvider>
      </body>
    </html>
  );
}
