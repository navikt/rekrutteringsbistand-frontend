'use client';

import Script from 'next/script';

export default function SkyraInit() {
  return (
    <>
      <Script id='skyra-config' strategy='afterInteractive'>
        {`window.SKYRA_CONFIG = {
           org: 'arbeids-og-velferdsetaten-nav',
        };
        window.addEventListener('skyra:ready', function() {
          if (window.skyra && window.skyra.redactSearchParam) {
            window.skyra.redactSearchParam("visKandidatnr");
          }
        });`}
      </Script>
      <Script
        src='https://survey.skyra.no/skyra-survey.js'
        defer
        strategy='afterInteractive'
      />
    </>
  );
}
