import type { Metadata } from 'next';
import Script from 'next/script';
import { isLocal } from '../util/env';
import { getBrukerData } from './api/bruker/getBrukerData';
import MirageInitializer from './components/MirageInitializer';
import './globals.css';
import RekrutteringsbistandProvider from './RekrutteringsbistandProvider';

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
  const brukerData = await getBrukerData();

  const bundle =
    process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? prodBundle : devBundle;

  return (
    <html lang='no'>
      <Script src={bundle} strategy='afterInteractive' />
      <body>
        <LokalMockService>
          <RekrutteringsbistandProvider brukerData={brukerData}>
            {children}
          </RekrutteringsbistandProvider>
        </LokalMockService>
      </body>
    </html>
  );
}

async function LokalMockService({ children }: { children: React.ReactNode }) {
  if (isLocal) {
    return <MirageInitializer>{children}</MirageInitializer>;
  }

  return children;
}
