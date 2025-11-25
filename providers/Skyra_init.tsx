'use client';

import { logger } from '@navikt/next-logger';
import Script from 'next/script';

export default function SkyraInit() {
  return (
    <>
      <script
        id='skyra-config'
        dangerouslySetInnerHTML={{
          __html: `window.SKYRA_CONFIG = { org: 'arbeids-og-velferdsetaten-nav' }`,
        }}
      />

      <Script
        src='https://survey.skyra.no/skyra-survey.js'
        strategy='afterInteractive'
        onError={(event) => {
          logger.error({ event }, 'Klarte ikke å laste Skyra-scriptet');
          window.dispatchEvent(
            new CustomEvent('skyra-status', { detail: 'error' }),
          );
        }}
        onLoad={() => {
          window.dispatchEvent(
            new CustomEvent('skyra-status', { detail: 'loaded' }),
          );
        }}
      />
    </>
  );
}
