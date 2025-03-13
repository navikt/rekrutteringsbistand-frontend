import { isLocal } from '../util/env';
import MirageInitializer from './components/MirageInitializer';
import './globals.css';
import RekrutteringsbistandProvider from './providers/RekrutteringsbistandProvider';
import { UmamiProvider } from './providers/UmamiContext';
import UmamiAnalytics from './providers/UmamiScript';
import type { Metadata } from 'next';
import Script from 'next/script';

const devBundle =
  'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js';
const prodBundle =
  'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/bundle.js';

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

  console.log('KAKE');
  console.log('umami_src', process.env.NEXT_PUBLIC_UMAMI_SRC);
  console.log('umami_url', process.env.NEXT_PUBLIC_UMAMI_URL);
  console.log('umami_id', process.env.NEXT_PUBLIC_UMAMI_ID);
  return (
    <html
      lang='no'
      className='h-full'
      data-testmode={process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE}
    >
      <Script src={bundle} strategy='afterInteractive' />
      <UmamiAnalytics />
      <body>
        <UmamiProvider>
          <BrukLokalMock>
            <RekrutteringsbistandProvider>
              {children}
            </RekrutteringsbistandProvider>
          </BrukLokalMock>
        </UmamiProvider>
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
