import { Alert, Heading } from '@navikt/ds-react';
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
  const bundle =
    process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? prodBundle : devBundle;

  return (
    <html lang='no'>
      <Script src={bundle} strategy='afterInteractive' />
      <body>
        <LokalMockService>
          <BrukerDataWrapper>{children}</BrukerDataWrapper>
        </LokalMockService>
      </body>
    </html>
  );
}

async function BrukerDataWrapper({ children }: { children: React.ReactNode }) {
  try {
    const brukerData = await getBrukerData();

    return (
      <RekrutteringsbistandProvider brukerData={brukerData}>
        {children}
      </RekrutteringsbistandProvider>
    );
  } catch (error) {
    return (
      <Alert variant='error' className='m-12'>
        <Heading spacing size='small' level='3'>
          Kunne ikke laste Rekrutteringsbistand
        </Heading>
        Det oppstod en feil ved innlasting av brukerdata. Prøv å laste siden på
        nytt.
      </Alert>
    );
  }
}

async function LokalMockService({ children }: { children: React.ReactNode }) {
  if (isLocal) {
    return <MirageInitializer>{children}</MirageInitializer>;
  }

  return children;
}
