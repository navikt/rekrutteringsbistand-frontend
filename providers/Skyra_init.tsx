'use client';

import { logger } from '@navikt/next-logger';
import Script from 'next/script';

export default function SkyraInit() {
  return (
    <>
      <Script
        id='skyra-config'
        strategy='afterInteractive'
        onError={(event) => {
          logger.error({ event }, 'Klarte ikke å laste skyra-config');
          window.dispatchEvent(
            new CustomEvent('skyra-status', { detail: 'error' }),
          );
        }}
      >
        {`window.SKYRA_CONFIG = { org: 'arbeids-og-velferdsetaten-nav', controllerVersion: 'v2'}`}
      </Script>

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
