import './globals.css';
import NavigasjonWrapper from '@/components/layout/NavigasjonWrapper';
import MirageInitializer from '@/providers/MirageInitializer';
import RekrutteringsbistandProvider from '@/providers/RekrutteringsbistandProvider';
import SkyraInit from '@/providers/Skyra_init';
import { UmamiProvider } from '@/providers/UmamiContext';
import { isLocal } from '@/util/env';
import type { Metadata } from 'next';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: isLocal ? 'Local - Rekrutteringsbistand' : 'Rekrutteringsbistand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='no'
      className='h-full'
      data-testmode={process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE}
    >
      <Script
        src={process.env.NEXT_PUBLIC_DECORATOR_SRC}
        strategy='afterInteractive'
      />
      <Script
        id='umami-analytics'
        defer
        strategy='afterInteractive'
        src={process.env.NEXT_PUBLIC_UMAMI_SRC}
        data-host-url={process.env.NEXT_PUBLIC_UMAMI_URL}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
      />
      <SkyraInit />
      <body className='h-screen overflow-hidden'>
        <UmamiProvider>
          <BrukLokalMock>
            <RekrutteringsbistandProvider>
              <NavigasjonWrapper>{children}</NavigasjonWrapper>
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
