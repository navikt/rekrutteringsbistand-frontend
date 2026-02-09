'use client';

import { logger } from '@navikt/next-logger';
import Script from 'next/script';

/**
 * Laster Skyra-scriptet via vår egen Next-proxy slik at sluttbrukere
 * bak Citrix-brannmur slipper å nå survey.skyra.no direkte.
 *
 * Proxyen omskriver også Skyra sin ingest-URL slik at hendelser
 * sendes via /api/skyra/ingest i stedet for direkte til ingest.staging.skyra.no.
 */
export default function SkyraInit() {
  return (
    <>
      <Script
        src='/api/skyra/survey/skyra-survey.js'
        strategy='afterInteractive'
        onError={(event) => {
          logger.error({ event }, 'Klarte ikke å laste Skyra-scriptet');
          window.dispatchEvent(
            new CustomEvent('skyra-status', { detail: 'error' }),
          );
        }}
        onLoad={() => {
          // Pek Skyra sin ingest mot vår proxy
          if (typeof window !== 'undefined' && window.skyra) {
            window.skyra.start({
              org: 'arbeids-og-velferdsetaten-nav',
              ingestUrl: '/api/skyra/ingest',
            });
          }
          window.dispatchEvent(
            new CustomEvent('skyra-status', { detail: 'loaded' }),
          );
        }}
      />
    </>
  );
}
