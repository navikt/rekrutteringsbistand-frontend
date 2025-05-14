'use client';

import Script from 'next/script';

export const dynamic = 'force-dynamic';
export default function SkyraInit() {
  return (
    <Script
      id='skyra-survey'
      src='https://survey.skyra.no/skyra-survey.js'
      defer
      strategy='afterInteractive'
      onLoad={() => {
        // eslint-disable-next-line no-console
        console.info('Skyra survey script loaded successfully.');
        if (window.skyra && typeof window.skyra.start === 'function') {
          window.skyra.start({
            org: 'arbeids-og-velferdsetaten-nav',
          });
        } else {
          // eslint-disable-next-line no-console
          console.error(
            'Skyra survey loaded, but window.skyra.start is not available.',
          );
        }
      }}
      onError={(e) => {
        // eslint-disable-next-line no-console
        console.error('Error loading Skyra survey script:', e);
      }}
    />
  );
}
