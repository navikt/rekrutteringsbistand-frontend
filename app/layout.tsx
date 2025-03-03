import { isLocal } from '../util/env';
import RekrutteringsbistandProvider from './RekrutteringsbistandProvider';
import { ThemeProvider } from './ThemeProvider';
import MirageInitializer from './components/MirageInitializer';
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

const devBundle =
  'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js';
const prodBundle = devBundle;
// TODO Prod ikke oppdatert.
// 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/bundle.js';

export const metadata: Metadata = {
  title: isLocal ? 'Local - Rekrutteringsbistand' : 'Rekrutteringsbistand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bundle =
    process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? prodBundle : devBundle;
  return (
    <html
      lang='no'
      className='h-full'
      data-testmode={process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE}
    >
      <Script src={bundle} strategy='afterInteractive' />
      <body>
        <ThemeProvider>
          <BrukLokalMock>
            <RekrutteringsbistandProvider>
              {children}
            </RekrutteringsbistandProvider>
          </BrukLokalMock>
        </ThemeProvider>
      </body>
    </html>
  );
}

const BrukLokalMock = ({ children }: { children: React.ReactNode }) => {
  if (isLocal) {
    return <MirageInitializer>{children}</MirageInitializer>;
  }
  return children;
};
