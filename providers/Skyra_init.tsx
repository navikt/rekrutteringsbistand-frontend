'use client';

import { logger } from '@navikt/next-logger';
import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Laster Skyra-scriptet via vår egen Next-proxy slik at sluttbrukere
 * bak Citrix-brannmur slipper å nå survey.skyra.no direkte.
 *
 * Proxyen omskriver også Skyra sin ingest-URL slik at hendelser
 * sendes via /api/skyra/ingest i stedet for direkte til ingest.staging.skyra.no.
 */
export default function SkyraInit() {
  // Sett Skyra-config før scriptet laster, slik at start() bruker proxyen
  useEffect(() => {
    window.__SKYRA_CONFIG__ = { ingestUrl: '/api/skyra/ingest' };
  }, []);

  return (
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
        window.dispatchEvent(
          new CustomEvent('skyra-status', { detail: 'loaded' }),
        );
      }}
    />
  );
}
